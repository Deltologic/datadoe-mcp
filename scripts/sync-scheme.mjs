// Refreshes the hardcoded DataDoe data scheme, Action scheme and webhook scheme in scheme/
// from the public DataDoe specification endpoints. No API key is needed.
// Usage: yarn sync:scheme
// Set DATADOE_SPEC_BASE_URL to read another DataDoe API, for example a local one:
// DATADOE_SPEC_BASE_URL=http://localhost:3002/api/v1/spec yarn sync:scheme

import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SPEC_BASE_URL = (process.env.DATADOE_SPEC_BASE_URL ?? 'https://api.datadoe.com/api/v1/spec').replace(/\/$/, '');
const SCHEME_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'scheme');
const TABLES_DIR = join(SCHEME_DIR, 'data-scheme');
// Markdown links use the origin the API is configured with, so match any host.
const TABLE_LINK_PATTERN = /https?:\/\/[^\s)<>]+\/api\/v1\/spec\/data-scheme\/([a-z0-9_]+)\.md/g;
const INDEX_LINK_PATTERN = /https?:\/\/[^\s)<>]+\/api\/v1\/spec\/data-scheme\.md/g;
const TABLE_FETCH_CONCURRENCY = 8;
const REQUEST_TIMEOUT_MS = 60_000;

async function fetchText(path, accept) {
    const response = await fetch(`${SPEC_BASE_URL}${path}`, {
        headers: { accept },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });
    if (!response.ok) {
        throw new Error(`Spec request failed: path=${path}, status=${String(response.status)}.`);
    }
    return response.text();
}

async function fetchJson(path) {
    return JSON.parse(await fetchText(path, 'application/json'));
}

async function writeJson(fileName, value) {
    await writeFile(join(SCHEME_DIR, fileName), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function writeMarkdown(path, markdown) {
    await writeFile(path, markdown.endsWith('\n') ? markdown : `${markdown}\n`, 'utf8');
}

async function syncTables(indexMarkdown) {
    const tableNames = [...new Set([...indexMarkdown.matchAll(TABLE_LINK_PATTERN)].map(match => match[1]))].sort();
    if (tableNames.length === 0) {
        throw new Error('Data scheme index has no table links; keeping the current table pages.');
    }
    await rm(TABLES_DIR, { recursive: true, force: true });
    await mkdir(TABLES_DIR, { recursive: true });

    const queue = [...tableNames];
    const workers = Array.from({ length: TABLE_FETCH_CONCURRENCY }, async () => {
        for (let tableName = queue.shift(); tableName; tableName = queue.shift()) {
            const markdown = await fetchText(`/data-scheme/${tableName}.md`, 'text/markdown');
            // Table pages link to each other and to the index; point those links at the local copies.
            const localMarkdown = markdown
                .replace(TABLE_LINK_PATTERN, (_match, linkedTable) => `${linkedTable}.md`)
                .replace(INDEX_LINK_PATTERN, '../data-scheme.md');
            await writeMarkdown(join(TABLES_DIR, `${tableName}.md`), localMarkdown);
        }
    });
    await Promise.all(workers);

    const written = (await readdir(TABLES_DIR)).length;
    if (written !== tableNames.length) {
        throw new Error(`Table pages incomplete: expected=${String(tableNames.length)}, written=${String(written)}.`);
    }
    return tableNames.length;
}

async function main() {
    await mkdir(SCHEME_DIR, { recursive: true });

    const [dataScheme, dataSchemeMarkdown, actionScheme, actionSchemeMarkdown, webhookScheme] = await Promise.all([
        fetchJson('/data-scheme'),
        fetchText('/data-scheme.md', 'text/markdown'),
        fetchJson('/action-scheme'),
        fetchText('/action-scheme.md', 'text/markdown'),
        fetchJson('/webhook-scheme')
    ]);

    const tableCount = await syncTables(dataSchemeMarkdown);
    await writeJson('data-scheme.json', dataScheme);
    await writeMarkdown(
        join(SCHEME_DIR, 'data-scheme.md'),
        dataSchemeMarkdown.replace(TABLE_LINK_PATTERN, (_match, tableName) => `data-scheme/${tableName}.md`)
    );
    await writeJson('actions.json', actionScheme);
    await writeMarkdown(join(SCHEME_DIR, 'actions.md'), actionSchemeMarkdown);
    await writeJson('webhooks.json', webhookScheme);

    console.log(
        `Scheme synced: sources=${String(dataScheme.sources.length)}, tables=${String(tableCount)}, actions=${String(actionScheme.actions.length)}, webhookMessages=${String(webhookScheme.messages.length)}.`
    );
}

main().catch(error => {
    console.error(error instanceof Error ? (error.stack ?? error.message) : String(error));
    process.exitCode = 1;
});
