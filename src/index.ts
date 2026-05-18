/**
 * This server is just a scheme of the actual DataDoe MCP server made for exposing DataDoe MCP to various MCP registries.
 * It is a No-Op server, it does not do anything beside exposing the schema of DataDoe MCP.
 * If you want to use DataDoe MCP, learn how to set it up here: https://app.datadoe.com/hub/docs/data-doe-mcp/overview.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import type { ToolAnnotations } from '@modelcontextprotocol/sdk/types';
import { pathToFileURL } from 'node:url';
import { z } from 'zod';

interface McpToolContent {
    readonly type: 'text';
    readonly text: string;
}

type McpToolResponse = Readonly<{
    summary: string;
    readonly isError?: boolean;
    readonly data: unknown;
}>;

export interface McpToolCallResult {
    readonly content: McpToolContent[];
    readonly structuredContent?: McpToolResponse;
    readonly isError?: boolean;
    readonly [key: string]: unknown;
}

export interface McpToolDefinition {
    readonly name: string;
    readonly title: string;
    readonly description: string;
    readonly inputSchema: z.ZodType;
    readonly outputSchema?: z.ZodType;
    readonly execute: (input: unknown) => Promise<McpToolCallResult>;
    readonly annotations: ToolAnnotations;
}

export const MCP_SERVER_NAME = 'DataDoe MCP' as const;
export const MCP_SERVER_DESCRIPTION =
    'DataDoe is one place to connect, view, analyze, and work with Amazon data.' as const;
export const MCP_SERVER_VERSION = '0.0.1' as const;
export const MCP_SERVER_WEBSITE_URL = 'https://app.datadoe.com/integrations/mcp' as const;

export const PublicFilterOperators = [
    '=',
    '!=',
    '>',
    '>=',
    '<',
    '<=',
    'contains',
    'beginsWith',
    'endsWith',
    'doesNotContain',
    'doesNotBeginWith',
    'doesNotEndWith',
    'in',
    'notIn',
    'between',
    'notBetween',
    'null',
    'notNull'
] as const;
export type PublicFilterOperator = (typeof PublicFilterOperators)[number];

export const PublicCombinators = ['and', 'or'] as const;
export type PublicCombinator = (typeof PublicCombinators)[number];

export const EmptyInputSchema = z.object({}).strict();
const ZodUUID = z.string().min(36).max(36).describe('UUID of the entity.').readonly();

export const ExportsGetSourcesInputSchema = z
    .object({
        sellerOrVendorIds: z.array(ZodUUID).min(1).max(32),
        query: z
            .string()
            .trim()
            .min(1)
            .max(256)
            .describe(
                'Full-text search query across source names, table names, descriptions, and columns.'
            )
    })
    .strict();
export type ExportsGetSourcesToolInput = z.infer<typeof ExportsGetSourcesInputSchema>;

const ZodExportColumn = z
    .string()
    .min(2)
    .max(128)
    .regex(/^[a-zA-Z0-9_]+$/)
    .describe('Name of the column selected from the export source.');

export const ExportAggregationSchema = z
    .object({
        column: ZodExportColumn,
        aggregation: z.enum(['count', 'countDistinct', 'sum', 'avg', 'min', 'max']),
        alias: z.string().min(2).max(128).nullable().optional()
    })
    .strict();

export const ExportFilterRuleSchema = z
    .object({
        field: ZodExportColumn,
        operator: z.enum(PublicFilterOperators),
        value: z.string(),
        not: z.boolean()
    })
    .strict();

export const ExportFilterGroupSchema = z
    .object({
        combinator: z.enum(PublicCombinators),
        rules: z.array(ExportFilterRuleSchema).max(16)
    })
    .strict();

export const MCP_EXPORT_MAX_ROW_LIMIT = 2_500 as const;

export const ExportsCreateInputSchema = z
    .object({
        sellerOrVendorIds: z.array(ZodUUID).min(1).max(5),
        sourceId: z.string().regex(/^[a-f0-9]{10}$/),
        columns: z
            .array(ZodExportColumn)
            .min(1)
            .max(128)
            .describe('Selected output fields. Can include source columns and aggregation aliases.'),
        from: z.iso.date().optional().describe(
            'Start date for the export. Required if the source has a date column.'
        ),
        to: z.iso
            .date()
            .optional()
            .describe('End date for the export. Required if the source has a date column.'),
        filters: ExportFilterGroupSchema.optional().describe(
            'Filters applied to the export. Each filter is applied to raw rows before aggregation like SQL WHERE clause.'
        ),
        groupBy: z.array(ZodExportColumn).min(0).max(16).optional(),
        aggregations: z.array(ExportAggregationSchema).min(0).max(16).optional(),
        orderByColumn: ZodExportColumn.optional().describe(
            'Sort field. Must be a source column or an aggregation alias or empty.'
        ),
        orderByDirection: z.enum(['ASC', 'DESC'] as const).optional(),
        limit: z
            .number()
            .int()
            .min(1)
            .max(MCP_EXPORT_MAX_ROW_LIMIT)
            .describe('Sets maximum number of rows to return.'),
        skip: z
            .number()
            .int()
            .min(0)
            .optional()
            .describe('Optional zero-based row offset to use together with limit for pagination.'),
        dateInterval: z.enum(['DAY', 'WEEK', 'MONTH'] as const).optional().describe(
            'Use when groupingBy `date` column to have specific date aggregation, like changing day date to just month.'
        ),
        outputType: z.enum(['CSV', 'JSON'] as const)
    })
    .strict();
export type ExportsCreateToolInput = z.infer<typeof ExportsCreateInputSchema>;

export const ExportsGetInputSchema = z
    .object({
        exportId: ZodUUID
    })
    .strict();

export const ExportsRawDownloadInputSchema = z
    .object({
        exportId: ZodUUID
    })
    .strict();

export const ReportStatusValues = [
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'ERROR',
    'BLOCKED_NO_TOKENS'
] as const;

export const ExportResultsSchema = z
    .object({
        exportId: ZodUUID,
        sourceId: z.string().regex(/^[a-f0-9]{10}$/),
        sellerOrVendorIds: z.array(ZodUUID).readonly(),
        status: z.enum(ReportStatusValues),
        rowCount: z.number().int().min(0).nullable().optional(),
        limit: z.number().int().min(0).nullable().optional(),
        skip: z.number().int().min(0).nullable().optional()
    })
    .strict();
export type ExportResult = Readonly<z.infer<typeof ExportResultsSchema>>;

export interface DatadoeUserDocsPageInput {
    readonly pageName: string;
}

export const DatadoeUserDocsPageInputSchema: z.ZodType<DatadoeUserDocsPageInput> = z
    .object({
        pageName: z
            .string()
            .trim()
            .min(1)
            .max(128)
            .describe('Exact DataDoe docs page name from the table of contents.')
    })
    .strict();

export const GENERIC_MCP_TOOL_RESPONSE_SCHEMA = buildMcpToolResponseSchema();
export const EXPORT_MCP_TOOL_RESPONSE_SCHEMA = buildMcpToolResponseSchema(ExportResultsSchema);

const READONLY_ANNOTATIONS = {
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
    readOnlyHint: true
} as const;

const NOOP_GENERIC_DATA = {} as const;
const NOOP_RAW_EXPORT_RESULT = {
    completed: false
} as const;
const NOOP_EXPORT_RESULT: ExportResult = {
    exportId: '00000000-0000-0000-0000-000000000000',
    sourceId: '0000000000',
    sellerOrVendorIds: [],
    status: 'PENDING',
    rowCount: null,
    limit: null,
    skip: null
} as const;

const DATADOE_USER_DOCS_TABLE_OF_CONTENTS_TOOL_NAME =
    'datadoe_user_docs_table_of_contents_get' as const;
const DATADOE_USER_DOCS_PAGE_TOOL_NAME = 'datadoe_user_docs_page_get' as const;

function buildMcpToolResponseSchema(responseDataSchema?: z.ZodType): z.ZodType {
    return z
        .object({
            summary: z.string().min(1).max(1024).describe('Brief summary of the tool response.'),
            isError: z.boolean().optional().describe('True if the tool response is an error.'),
            data:
                responseDataSchema ??
                z.unknown().describe('Data of the tool response in format specific to the tool.')
        })
        .strict();
}

function toTextContent(text: string): McpToolContent[] {
    return [{ type: 'text', text }];
}

function toMcpToolSuccessResult(payload: {
    readonly toolName: string;
    readonly summary: string;
    readonly data: unknown;
    readonly outputSchema: z.ZodType;
}): McpToolCallResult {
    const structuredResponse: McpToolResponse = {
        summary: payload.summary,
        data: payload.data
    };
    const parsedResponse = payload.outputSchema.safeParse(structuredResponse);

    if (!parsedResponse.success) {
        throw new Error(
            'MCP tool response validation failed. Please try a different approach or contact support if the problem persists.'
        );
    }

    const validatedResponse = parsedResponse.data as McpToolResponse;
    const text = `${validatedResponse.summary}\n\n${JSON.stringify(validatedResponse.data, null, 2)}`;

    return {
        content: toTextContent(text),
        structuredContent: validatedResponse
    } as const;
}

function toMcpToolErrorResult(toolName: string, error: unknown): McpToolCallResult {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
        content: toTextContent(
            `Tool failed: toolName=${toolName}. This facade is intentionally a no-op. ${errorMessage}`
        ),
        isError: true
    } as const;
}

async function executeWithErrorHandling(
    toolName: string,
    action: () => McpToolCallResult | Promise<McpToolCallResult>
): Promise<McpToolCallResult> {
    try {
        return await Promise.resolve(action());
    } catch (error) {
        return toMcpToolErrorResult(toolName, error);
    }
}

function createDocsMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        {
            name: DATADOE_USER_DOCS_TABLE_OF_CONTENTS_TOOL_NAME,
            title: 'Get DataDoe user documentation table of contents',
            description: 'Returns the list of page names in the DataDoe user documentation.',
            inputSchema: EmptyInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            execute: (input: unknown): Promise<McpToolCallResult> =>
                executeWithErrorHandling(
                    DATADOE_USER_DOCS_TABLE_OF_CONTENTS_TOOL_NAME,
                    async (): Promise<McpToolCallResult> => {
                        EmptyInputSchema.parse(input);
                        return toMcpToolSuccessResult({
                            toolName: DATADOE_USER_DOCS_TABLE_OF_CONTENTS_TOOL_NAME,
                            summary:
                                'DataDoe MCP facade is a no-op server for datadoe_user_docs_table_of_contents_get.',
                            data: NOOP_GENERIC_DATA,
                            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA
                        });
                    }
                ),
            annotations: READONLY_ANNOTATIONS
        },
        {
            name: DATADOE_USER_DOCS_PAGE_TOOL_NAME,
            title: 'Get DataDoe user documentation page',
            description:
                'Returns a DataDoe user documentation page content by page name, which can be used to answer questions about DataDoe features, pricing, and capabilities.',
            inputSchema: DatadoeUserDocsPageInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            execute: (input: unknown): Promise<McpToolCallResult> =>
                executeWithErrorHandling(
                    DATADOE_USER_DOCS_PAGE_TOOL_NAME,
                    async (): Promise<McpToolCallResult> => {
                        DatadoeUserDocsPageInputSchema.parse(input);
                        return toMcpToolSuccessResult({
                            toolName: DATADOE_USER_DOCS_PAGE_TOOL_NAME,
                            summary:
                                'DataDoe MCP facade is a no-op server for datadoe_user_docs_page_get.',
                            data: NOOP_GENERIC_DATA,
                            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA
                        });
                    }
                ),
            annotations: READONLY_ANNOTATIONS
        }
    ] as const;
}

function createUtilityMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        {
            name: 'sellers_and_vendors_list',
            title: 'List organization sellers and vendors',
            description: `Lists every Amazon seller and vendor connected to the caller's DataDoe organization. Returns a list of objects, each with: a unique ID (UUID; required input for exports_sources_get and exports_create), a user-chosen display name, the Amazon marketplace (one country/region per seller, e.g. amazon.co.uk, amazon.de), the connection type (Seller Central or Vendor Central), and whether an Amazon Ads connection is attached. Most operations in DataDoe require at least one Seller or Vendor ID.`,
            inputSchema: EmptyInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            execute: (input: unknown): Promise<McpToolCallResult> =>
                executeWithErrorHandling('sellers_and_vendors_list', async (): Promise<McpToolCallResult> => {
                    EmptyInputSchema.parse(input);
                    return toMcpToolSuccessResult({
                        toolName: 'sellers_and_vendors_list',
                        summary: 'DataDoe MCP facade is a no-op server for sellers_and_vendors_list.',
                        data: NOOP_GENERIC_DATA,
                        outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA
                    });
                }),
            annotations: READONLY_ANNOTATIONS
        },
        {
            name: 'organization_and_subscription_details_get',
            title: 'Get organization and subscription details',
            description: 'Returns organization profile and plan details.',
            inputSchema: EmptyInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            execute: (input: unknown): Promise<McpToolCallResult> =>
                executeWithErrorHandling(
                    'organization_and_subscription_details_get',
                    async (): Promise<McpToolCallResult> => {
                        EmptyInputSchema.parse(input);
                        return toMcpToolSuccessResult({
                            toolName: 'organization_and_subscription_details_get',
                            summary:
                                'DataDoe MCP facade is a no-op server for organization_and_subscription_details_get.',
                            data: NOOP_GENERIC_DATA,
                            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA
                        });
                    }
                ),
            annotations: READONLY_ANNOTATIONS
        }
    ] as const;
}

function createExportsMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        {
            name: 'exports_sources_get',
            title: 'List export sources for sellers and vendors',
            description:
                'Searches export source templates that your selected seller or vendor can use to create exports. Requires sellerOrVendorIds retrieved from the sellers_and_vendors_list tool and a query to narrow the result set. The response includes matching sources plus a recommendedSources list with the best starting points.',
            inputSchema: ExportsGetSourcesInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            execute: (input: unknown): Promise<McpToolCallResult> =>
                executeWithErrorHandling('exports_sources_get', async (): Promise<McpToolCallResult> => {
                    ExportsGetSourcesInputSchema.parse(input);
                    return toMcpToolSuccessResult({
                        toolName: 'exports_sources_get',
                        summary: 'DataDoe MCP facade is a no-op server for exports_sources_get.',
                        data: NOOP_GENERIC_DATA,
                        outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA
                    });
                }),
            annotations: READONLY_ANNOTATIONS
        },
        {
            name: 'exports_create',
            title: 'Create a new export',
            description: `Creates an export job that runs a structured query against DataDoe's Amazon dataset for one or more sellers/vendors and produces a downloadable file (CSV or JSON). Required inputs: sellerOrVendorIds (from sellers_and_vendors_list), sourceId and columns (from exports_sources_get - each source exposes its own column set), and outputType (CSV or JSON). Optional inputs shape the query like SQL: filters (WHERE - applied to raw rows before aggregation, with and/or combinators and per-rule operators including =, >, in, between, contains, null, etc.), groupBy and aggregations (GROUP BY + sum/avg/count/min/max with optional aliases), from/to (inclusive date range on the source's primary date column), dateInterval (DAY/WEEK/MONTH - collapses a date group-by to that bucket), orderByColumn + orderByDirection, and limit/skip (pagination; limit is capped at ${MCP_EXPORT_MAX_ROW_LIMIT} rows per export). Returns an export id and a status. Exports run asynchronously; status transitions from PENDING/PROCESSING to COMPLETED or FAILED. Poll exports_get to track status, then read the result with exports_raw_download (inline content) or exports_raw_url_get (presigned URL). If a query would naturally exceed ${MCP_EXPORT_MAX_ROW_LIMIT} rows, narrow it via higher-level aggregation, filters, or top-N ordering, or paginate with skip. Column names and source schemas are defined per source - see exports_sources_get and the public DataDoe API reference at https://app.datadoe.com/hub/data-scheme. For easier analysis, the tool may add unitily columns to the resulting Export.`,
            inputSchema: ExportsCreateInputSchema,
            outputSchema: EXPORT_MCP_TOOL_RESPONSE_SCHEMA,
            execute: (input: unknown): Promise<McpToolCallResult> =>
                executeWithErrorHandling('exports_create', async (): Promise<McpToolCallResult> => {
                    ExportsCreateInputSchema.parse(input);
                    return toMcpToolSuccessResult({
                        toolName: 'exports_create',
                        summary: 'DataDoe MCP facade is a no-op server for exports_create.',
                        data: NOOP_EXPORT_RESULT,
                        outputSchema: EXPORT_MCP_TOOL_RESPONSE_SCHEMA
                    });
                }),
            annotations: {
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: false,
                readOnlyHint: false
            }
        },
        {
            name: 'exports_get',
            title: 'Get export job details by ID',
            description:
                'Returns status and details for one export job. Use this to check if your export is still processing or ready for download.',
            inputSchema: ExportsGetInputSchema,
            outputSchema: EXPORT_MCP_TOOL_RESPONSE_SCHEMA,
            execute: (input: unknown): Promise<McpToolCallResult> =>
                executeWithErrorHandling('exports_get', async (): Promise<McpToolCallResult> => {
                    ExportsGetInputSchema.parse(input);
                    return toMcpToolSuccessResult({
                        toolName: 'exports_get',
                        summary: 'DataDoe MCP facade is a no-op server for exports_get.',
                        data: NOOP_EXPORT_RESULT,
                        outputSchema: EXPORT_MCP_TOOL_RESPONSE_SCHEMA
                    });
                }),
            annotations: READONLY_ANNOTATIONS
        },
        {
            name: 'exports_raw_url_get',
            title: 'Get one-time raw export download URL (advanced)',
            description:
                'Returns a presigned download URL for the export file. URL is valid for 60 seconds and intended for clients that prefer direct download over inline content.',
            inputSchema: ExportsRawDownloadInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            execute: (input: unknown): Promise<McpToolCallResult> =>
                executeWithErrorHandling('exports_raw_url_get', async (): Promise<McpToolCallResult> => {
                    ExportsRawDownloadInputSchema.parse(input);
                    return toMcpToolSuccessResult({
                        toolName: 'exports_raw_url_get',
                        summary: 'DataDoe MCP facade is a no-op server for exports_raw_url_get.',
                        data: NOOP_RAW_EXPORT_RESULT,
                        outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA
                    });
                }),
            annotations: {
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: true,
                readOnlyHint: true
            }
        },
        {
            name: 'exports_raw_download',
            title: 'Download raw export content',
            description:
                'Returns only the raw export content (UTF-8) for a completed export. If processing is not finished, it explains that no file is available yet.',
            inputSchema: ExportsRawDownloadInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            execute: (input: unknown): Promise<McpToolCallResult> =>
                executeWithErrorHandling('exports_raw_download', async (): Promise<McpToolCallResult> => {
                    ExportsRawDownloadInputSchema.parse(input);
                    return toMcpToolSuccessResult({
                        toolName: 'exports_raw_download',
                        summary: 'DataDoe MCP facade is a no-op server for exports_raw_download.',
                        data: NOOP_RAW_EXPORT_RESULT,
                        outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA
                    });
                }),
            annotations: READONLY_ANNOTATIONS
        }
    ] as const;
}

export function createMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        ...createDocsMcpToolDefinitions(),
        ...createUtilityMcpToolDefinitions(),
        ...createExportsMcpToolDefinitions()
    ] as const;
}

export function createMcpServer(): McpServer {
    const server = new McpServer({
        name: MCP_SERVER_NAME,
        title: MCP_SERVER_NAME,
        description: MCP_SERVER_DESCRIPTION,
        version: MCP_SERVER_VERSION,
        websiteUrl: MCP_SERVER_WEBSITE_URL
    });

    for (const definition of createMcpToolDefinitions()) {
        server.registerTool(
            definition.name,
            {
                title: definition.title,
                description: definition.description,
                inputSchema: definition.inputSchema,
                outputSchema: definition.outputSchema,
                annotations: definition.annotations
            },
            (input: unknown): Promise<McpToolCallResult> => definition.execute(input)
        );
    }

    return server;
}

export async function main(): Promise<void> {
    const server = createMcpServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    void main().catch((error: unknown) => {
        const message = error instanceof Error ? error.stack ?? error.message : String(error);
        console.error(message);
        process.exitCode = 1;
    });
}
