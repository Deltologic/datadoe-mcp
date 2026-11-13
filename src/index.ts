/**
 * Public schema facade of the hosted DataDoe MCP server, made for MCP registries, users and AI agents
 * that want to see what DataDoe offers before connecting.
 *
 * - It lists the same tools as the hosted server (scheme/mcp-tools.json).
 * - It answers the discovery tools (exports_sources_get, exports_source_get, actions_details_schema_get)
 *   from the hardcoded DataDoe data scheme and Action scheme in scheme/.
 * - It exposes the data scheme, Action scheme and webhook scheme as MCP resources.
 * - Every other tool is a no-op: it never reads or changes Amazon data.
 *
 * To use DataDoe with live Amazon data, connect to https://mcp.datadoe.com/mcp/v1.
 * Setup guides: https://www.datadoe.com/hub/docs/datadoe-mcp/overview.
 */

import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListResourcesRequestSchema,
    ListToolsRequestSchema,
    ReadResourceRequestSchema,
    type CallToolResult,
    type ReadResourceResult,
    type Resource,
    type Tool
} from '@modelcontextprotocol/sdk/types.js';

export const MCP_SERVER_NAME = 'DataDoe MCP' as const;
export const MCP_SERVER_DESCRIPTION =
    'DataDoe is one place to connect, analyze, and act on Amazon data: query Seller Central, Vendor Central, and Amazon Ads data, then run write Actions like updating listings, managing orders, and optimizing Amazon Ads campaigns.' as const;
export const MCP_SERVER_VERSION = '0.7.0' as const;
export const MCP_SERVER_INSTRUCTIONS =
    'DataDoe provides tools for reading Amazon Seller and Vendor data, running Actions, and managing saved Plugins. This is the public schema facade of DataDoe MCP: exports_sources_get, exports_source_get and actions_details_schema_get return the public DataDoe data scheme and Action scheme, and the resources hold the full data, Action and webhook schemes. Other tools do nothing here. To work with live Amazon data, connect to https://mcp.datadoe.com/mcp/v1 with a DataDoe MCP key.' as const;
export const MCP_SERVER_WEBSITE_URL = 'https://app.datadoe.com/integrations/mcp' as const;
export const HOSTED_MCP_URL = 'https://mcp.datadoe.com/mcp/v1' as const;
export const MCP_SETUP_DOCS_URL = 'https://www.datadoe.com/hub/docs/datadoe-mcp/overview' as const;

export const EXPORT_SOURCES_DEFAULT_PAGE_SIZE = 8 as const;
export const EXPORT_SOURCES_MAX_PAGE_SIZE = 12 as const;
export const EXPORT_SOURCE_COLUMNS_DEFAULT_PAGE_SIZE = 40 as const;
export const EXPORT_SOURCE_COLUMNS_MAX_PAGE_SIZE = 40 as const;
export const PUBLIC_SOURCE_ID_LENGTH = 10 as const;

const FACADE_NOTICE = `This is the public DataDoe MCP schema facade. It returns the public DataDoe scheme, not your account data. Connect to ${HOSTED_MCP_URL} for live data: ${MCP_SETUP_DOCS_URL}.`;
const SCHEME_DIRECTORY_URL = new URL('../scheme/', import.meta.url);

export interface DataSchemeColumn {
    readonly name: string;
    readonly type: string;
    readonly nullable: boolean;
    readonly description: string;
    readonly [key: string]: unknown;
}

export interface DataSchemeIssue {
    readonly title: string;
    readonly description?: string;
    readonly [key: string]: unknown;
}

export interface DataSchemeSource {
    readonly id: string;
    readonly name: string;
    readonly tableName: string;
    readonly type: string;
    readonly description: string;
    readonly columns: readonly DataSchemeColumn[];
    readonly requiresDatePeriod: boolean;
    readonly issues?: readonly DataSchemeIssue[];
    readonly searchAliases?: readonly string[];
    readonly [key: string]: unknown;
}

export interface DataScheme {
    readonly sources: readonly DataSchemeSource[];
}

export interface ActionSchemeEntry {
    readonly type: string;
    readonly label: string;
    readonly group: string;
    readonly access: string;
    readonly detailsJsonSchema: unknown;
    readonly [key: string]: unknown;
}

export interface ActionScheme {
    readonly platforms: readonly unknown[];
    readonly groups: readonly unknown[];
    readonly actions: readonly ActionSchemeEntry[];
}

export interface ToolsSnapshot {
    readonly tools: readonly Tool[];
}

interface SchemeResource {
    readonly resource: Resource;
    readonly fileName: string;
}

const SCHEME_RESOURCES: readonly SchemeResource[] = [
    {
        fileName: 'data-scheme.json',
        resource: {
            uri: 'datadoe://scheme/data-scheme.json',
            name: 'data-scheme',
            title: 'DataDoe data scheme',
            description:
                'Every DataDoe table (Seller Central, Vendor Central and Amazon Ads) with its description, columns, fetch periods and search aliases.',
            mimeType: 'application/json'
        }
    },
    {
        fileName: 'data-scheme.md',
        resource: {
            uri: 'datadoe://scheme/data-scheme.md',
            name: 'data-scheme-index',
            title: 'DataDoe data scheme index',
            description: 'Markdown index of every DataDoe table, grouped by source type.',
            mimeType: 'text/markdown'
        }
    },
    {
        fileName: 'actions.json',
        resource: {
            uri: 'datadoe://scheme/actions.json',
            name: 'action-scheme',
            title: 'DataDoe Action scheme',
            description:
                'Every DataDoe Action type with its access mode, limits, result and the JSON Schema of its details payload.',
            mimeType: 'application/json'
        }
    },
    {
        fileName: 'actions.md',
        resource: {
            uri: 'datadoe://scheme/actions.md',
            name: 'action-scheme-docs',
            title: 'DataDoe Actions documentation',
            description: 'Markdown documentation of every DataDoe Action type, grouped by platform and group.',
            mimeType: 'text/markdown'
        }
    },
    {
        fileName: 'webhooks.json',
        resource: {
            uri: 'datadoe://scheme/webhooks.json',
            name: 'webhook-scheme',
            title: 'DataDoe webhook scheme',
            description: 'Every DataDoe webhook message type with its summary and details fields.',
            mimeType: 'application/json'
        }
    }
] as const;

function readSchemeFile(fileName: string): string {
    return readFileSync(new URL(fileName, SCHEME_DIRECTORY_URL), 'utf8');
}

function readSchemeJson<T>(fileName: string): T {
    return JSON.parse(readSchemeFile(fileName)) as T;
}

let toolsSnapshot: ToolsSnapshot | undefined;
let dataScheme: DataScheme | undefined;
let actionScheme: ActionScheme | undefined;

export function getTools(): readonly Tool[] {
    toolsSnapshot ??= readSchemeJson<ToolsSnapshot>('mcp-tools.json');
    return toolsSnapshot.tools;
}

export function getDataScheme(): DataScheme {
    dataScheme ??= readSchemeJson<DataScheme>('data-scheme.json');
    return dataScheme;
}

export function getActionScheme(): ActionScheme {
    actionScheme ??= readSchemeJson<ActionScheme>('actions.json');
    return actionScheme;
}

export function toPublicSourceId(sourceId: string): string {
    return sourceId.slice(0, PUBLIC_SOURCE_ID_LENGTH);
}

class FacadeInputError extends Error {}

function asRecord(input: unknown): Readonly<Record<string, unknown>> {
    return typeof input === 'object' && input !== null && !Array.isArray(input)
        ? (input as Record<string, unknown>)
        : {};
}

function requireString(input: Readonly<Record<string, unknown>>, key: string): string {
    const value = input[key];
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new FacadeInputError(`${key} is required.`);
    }
    return value.trim();
}

function readPageParameter(params: {
    readonly input: Readonly<Record<string, unknown>>;
    readonly key: string;
    readonly defaultValue: number;
    readonly max: number;
}): number {
    const value = params.input[params.key];
    if (value === undefined) {
        return params.defaultValue;
    }
    const numberValue = typeof value === 'string' ? Number(value) : value;
    if (typeof numberValue !== 'number' || !Number.isInteger(numberValue) || numberValue < 1) {
        throw new FacadeInputError(`${params.key} must be a positive integer.`);
    }
    if (numberValue > params.max) {
        throw new FacadeInputError(`${params.key} must be at most ${String(params.max)}.`);
    }
    return numberValue;
}

function paginate<T>(items: readonly T[], page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    return {
        items: items.slice(start, start + pageSize),
        meta: {
            page,
            pageSize,
            total: items.length,
            hasNextPage: start + pageSize < items.length
        }
    } as const;
}

function toSuccessResult(summary: string, data: unknown): CallToolResult {
    const structuredContent = { summary: `${summary} ${FACADE_NOTICE}`, data };
    return {
        content: [
            {
                type: 'text',
                text: `${structuredContent.summary}\n\n${JSON.stringify(data, null, 2)}`
            }
        ],
        structuredContent
    };
}

function toErrorResult(toolName: string, message: string): CallToolResult {
    return {
        content: [{ type: 'text', text: `Tool failed: toolName=${toolName}. ${message}` }],
        isError: true
    };
}

function normalize(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

interface SourceMatch {
    readonly source: DataSchemeSource;
    readonly score: number;
    readonly whyMatched: string;
}

function matchSource(source: DataSchemeSource, query: string): SourceMatch | undefined {
    if ([source.id, toPublicSourceId(source.id), source.tableName].some(id => normalize(id) === query)) {
        return { source, score: 100, whyMatched: 'Matched the source id or table name.' };
    }
    const checks: readonly (readonly [number, string, boolean])[] = [
        [8, 'name', normalize(source.name).includes(query)],
        [8, 'table name', source.tableName.includes(query.replace(/ /g, '_'))],
        [5, 'search alias', (source.searchAliases ?? []).some(alias => normalize(alias).includes(query))],
        [2, 'column', source.columns.some(column => column.name.includes(query.replace(/ /g, '_')))],
        [1, 'description', normalize(source.description).includes(query)]
    ];
    const matched = checks.filter(([, , isMatch]) => isMatch);
    if (matched.length === 0) {
        return undefined;
    }
    return {
        source,
        score: matched.reduce((sum, [weight]) => sum + weight, 0),
        whyMatched: `Matched ${matched.map(([, label]) => label).join(', ')}.`
    };
}

function toCompactSource(source: DataSchemeSource, whyMatched: string | null) {
    return {
        id: toPublicSourceId(source.id),
        name: source.name,
        tableName: source.tableName,
        type: source.type,
        description: source.description,
        requiresDatePeriod: source.requiresDatePeriod,
        whyMatched,
        ...(source.issues && source.issues.length > 0
            ? {
                  issues: source.issues.map(issue => ({
                      title: issue.title,
                      ...(issue.description ? { description: issue.description } : {})
                  }))
              }
            : {})
    } as const;
}

function searchExportSources(input: unknown): CallToolResult {
    const request = asRecord(input);
    const query = normalize(requireString(request, 'query'));
    const page = readPageParameter({
        input: request,
        key: 'page',
        defaultValue: 1,
        max: Number.MAX_SAFE_INTEGER
    });
    const pageSize = readPageParameter({
        input: request,
        key: 'pageSize',
        defaultValue: EXPORT_SOURCES_DEFAULT_PAGE_SIZE,
        max: EXPORT_SOURCES_MAX_PAGE_SIZE
    });
    const matches = getDataScheme()
        .sources.map(source => matchSource(source, query))
        .filter((match): match is SourceMatch => match !== undefined)
        .sort((left, right) => right.score - left.score);
    const result = paginate(matches, page, pageSize);
    return toSuccessResult(`Found ${String(matches.length)} export sources for "${query}".`, {
        sources: result.items.map(match => toCompactSource(match.source, match.whyMatched)),
        meta: result.meta
    });
}

function getExportSource(input: unknown): CallToolResult {
    const request = asRecord(input);
    const sourceId = requireString(request, 'sourceId').toLowerCase();
    const page = readPageParameter({
        input: request,
        key: 'page',
        defaultValue: 1,
        max: Number.MAX_SAFE_INTEGER
    });
    const pageSize = readPageParameter({
        input: request,
        key: 'pageSize',
        defaultValue: EXPORT_SOURCE_COLUMNS_DEFAULT_PAGE_SIZE,
        max: EXPORT_SOURCE_COLUMNS_MAX_PAGE_SIZE
    });
    const source = getDataScheme().sources.find(
        candidate => toPublicSourceId(candidate.id) === sourceId || candidate.id === sourceId
    );
    if (!source) {
        throw new FacadeInputError(`Source not found: sourceId=${sourceId}. Copy the id from exports_sources_get.`);
    }
    const { columns, id: _id, ...metadata } = source;
    const result = paginate(columns, page, pageSize);
    return toSuccessResult(
        `Returned columns ${String((page - 1) * pageSize + 1)}-${String((page - 1) * pageSize + result.items.length)} of ${String(columns.length)} for ${source.tableName}.`,
        {
            source: { ...metadata, id: toPublicSourceId(source.id) },
            columns: result.items,
            columnsMeta: result.meta
        }
    );
}

function getActionDetailsSchema(input: unknown): CallToolResult {
    const type = requireString(asRecord(input), 'type').toUpperCase();
    const action = getActionScheme().actions.find(candidate => candidate.type === type);
    if (!action) {
        throw new FacadeInputError(
            `Action type is not in the public Action scheme: type=${type}. Some Action types are in private beta. See the datadoe://scheme/actions.json resource.`
        );
    }
    // Same shape as the hosted server. Action types are disabled until an Organization owner enables them.
    return toSuccessResult(
        `Returned the details schema of ${action.type} (${action.label}, ${action.access}). An Organization owner enables each Action type in the DataDoe app under Settings > Actions.`,
        {
            accessAllowed: true,
            type: action.type,
            access: action.access,
            requiresPii: action.requiresPii === true,
            startTool: 'actions_start',
            enabled: false,
            jsonSchema: action.detailsJsonSchema
        }
    );
}

const SCHEME_TOOL_HANDLERS: Readonly<Record<string, (input: unknown) => CallToolResult>> = {
    exports_sources_get: searchExportSources,
    exports_source_get: getExportSource,
    actions_details_schema_get: getActionDetailsSchema
};

export function callTool(name: string, input: unknown): CallToolResult {
    if (!getTools().some(tool => tool.name === name)) {
        return toErrorResult(name, 'Unknown tool.');
    }
    const handler = SCHEME_TOOL_HANDLERS[name];
    if (!handler) {
        return toErrorResult(
            name,
            `This facade does not read or change Amazon data. ${FACADE_NOTICE}`
        );
    }
    try {
        return handler(input);
    } catch (error) {
        if (error instanceof FacadeInputError) {
            return toErrorResult(name, error.message);
        }
        throw error;
    }
}

export function readResource(uri: string): ReadResourceResult {
    const entry = SCHEME_RESOURCES.find(candidate => candidate.resource.uri === uri);
    if (!entry) {
        throw new Error(`Resource not found: uri=${uri}.`);
    }
    return {
        contents: [
            {
                uri: entry.resource.uri,
                mimeType: entry.resource.mimeType,
                text: readSchemeFile(entry.fileName)
            }
        ]
    };
}

export function createMcpServer(): Server {
    const server = new Server(
        {
            name: MCP_SERVER_NAME,
            title: MCP_SERVER_NAME,
            description: MCP_SERVER_DESCRIPTION,
            version: MCP_SERVER_VERSION,
            websiteUrl: MCP_SERVER_WEBSITE_URL
        },
        {
            capabilities: { tools: {}, resources: {} },
            instructions: MCP_SERVER_INSTRUCTIONS
        }
    );

    server.setRequestHandler(ListToolsRequestSchema, () => ({ tools: [...getTools()] }));
    server.setRequestHandler(CallToolRequestSchema, request =>
        callTool(request.params.name, request.params.arguments ?? {})
    );
    server.setRequestHandler(ListResourcesRequestSchema, () => ({
        resources: SCHEME_RESOURCES.map(entry => entry.resource)
    }));
    server.setRequestHandler(ReadResourceRequestSchema, request => readResource(request.params.uri));

    return server;
}

export async function main(): Promise<void> {
    const server = createMcpServer();
    await server.connect(new StdioServerTransport());
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    void main().catch((error: unknown) => {
        console.error(error instanceof Error ? (error.stack ?? error.message) : String(error));
        process.exitCode = 1;
    });
}
