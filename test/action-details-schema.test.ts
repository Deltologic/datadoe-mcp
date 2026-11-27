import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { callTool } from '../src/index.ts';

const tools = JSON.parse(readFileSync(new URL('../scheme/mcp-tools.json', import.meta.url), 'utf8')) as {
    tools: readonly { name: string; description?: string }[];
};
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

function dataOf(type: string): Record<string, unknown> {
    const result = callTool('actions_details_schema_get', { type });
    assert.equal(result.isError, undefined);
    const structured = result.structuredContent as { summary: string; data: Record<string, unknown> };
    const text = result.content[0];
    assert.equal(text?.type, 'text');
    assert.equal(typeof text?.text, 'string');
    const textData = JSON.parse(text.text.slice(text.text.indexOf('\n\n') + 2)) as Record<string, unknown>;
    assert.deepEqual(textData, structured.data);
    assert.match(structured.summary, /description, result, group, item limit and group guides/);
    return structured.data;
}

test('should return listing documentation in the text and structured result', () => {
    const data = dataOf('AMAZON_LISTINGS_UPDATE');

    assert.equal(data.type, 'AMAZON_LISTINGS_UPDATE');
    assert.equal(typeof data.description, 'string');
    assert.match(String(data.description), /https:\/\/www\.datadoe\.com\/hub\//);
    assert.equal(data.result, 'Confirmation that Amazon accepted the Action.');
    assert.deepEqual(data.group, { id: 'listings', label: 'Listings' });
    assert.equal(data.maxItems, 50);
    assert.equal(data.docsPageName, 'Action types: Listings');
    const guides = data.guides as readonly { title: string }[];
    assert.ok(guides.some(guide => guide.title === 'Listing images'));
    assert.equal(Object.hasOwn(guides[0] ?? {}, 'markdown'), false);
});

test('should return a null item limit when every call counts as one item', () => {
    const data = dataOf('AMAZON_ADS_CAMPAIGNS_FIND');

    assert.equal(data.maxItems, null);
    assert.equal(data.docsPageName, 'Action types: Amazon Ads Campaign management');
});

test('should list every Studio tool in the public inventory', () => {
    const studioTools = tools.tools.filter(tool => tool.name.startsWith('studio_'));
    assert.equal(studioTools.length, 11);
    for (const tool of studioTools) {
        assert.match(readme, new RegExp(`\`${tool.name}\``));
    }
});

test('should describe the first blocked account on a live write', () => {
    const actionsStart = tools.tools.find(tool => tool.name === 'actions_start');
    assert.ok(actionsStart?.description);
    assert.match(actionsStart.description, /The rejection names the first account that blocks the request/);
    assert.match(
        actionsStart.description,
        /A dry run of a write Action still validates and returns a warning for each Read only account the caller can access/
    );
    assert.doesNotMatch(actionsStart.description, /The rejection names each account/);
});
