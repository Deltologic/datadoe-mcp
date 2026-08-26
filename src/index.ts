/**
 * This server is just a scheme of the actual DataDoe MCP server made for exposing DataDoe MCP to various MCP registries.
 * It is a No-Op server, it does not do anything beside exposing the schema of DataDoe MCP.
 * If you want to use DataDoe MCP, learn how to set it up here: https://www.datadoe.com/hub/docs/datadoe-mcp/overview.
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
    'DataDoe is one place to connect, analyze, and act on Amazon data: query Seller Central, Vendor Central, and Amazon Ads data, then run write Actions like updating listings, managing orders, and optimizing Amazon Ads campaigns.' as const;
export const MCP_SERVER_VERSION = '0.4.0' as const;
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

export const MCP_EXPORT_SOURCES_MAX_PAGE_SIZE = 8 as const;
export const MCP_EXPORT_SOURCES_DEFAULT_PAGE_SIZE = 5 as const;
export const MCP_EXPORT_LIST_MAX_PAGE_SIZE = 25 as const;
export const MCP_EXPORT_LIST_DEFAULT_PAGE_SIZE = 25 as const;
export const PUBLIC_EXPORT_UTILITY_COLUMNS_NOTICE =
    'Each export includes default utility columns that identify the seller or vendor and marketplace of each row. You do not need to request those columns.' as const;

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
            ),
        page: z.coerce.number().int().min(1).default(1).optional(),
        pageSize: z.coerce
            .number()
            .int()
            .min(1)
            .max(MCP_EXPORT_SOURCES_MAX_PAGE_SIZE)
            .default(MCP_EXPORT_SOURCES_DEFAULT_PAGE_SIZE)
            .optional()
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
        aggregation: z
            .enum(['count', 'countDistinct', 'sum', 'avg', 'min', 'max'])
            .describe(
                'sum requires a numeric column. min, max, and avg accept numeric or date/datetime columns. count/countDistinct accept any column.'
            ),
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

export const MCP_EXPORT_MAX_ROW_LIMIT = 5_000 as const;
export const MCP_PUBLIC_RESOURCE_ACCESS_TTL_MINUTES = 15 as const;
export const MCP_SELLERS_AND_VENDORS_MAX_PAGE_SIZE = 10 as const;
export const MCP_SELLERS_AND_VENDORS_DEFAULT_PAGE_SIZE = 10 as const;
export const MCP_FILES_CREATE_MAX_SIZE_MEGABYTES = 0.5 as const;
export const MCP_MAX_COGS_UPSERT_ITEMS = 25 as const;
export const MCP_MAX_VENDOR_CODE_UPSERT_ITEMS = 25 as const;
export const PLUGIN_MEMORY_TYPES = ['ORGANIZATION', 'PERSONAL'] as const;
export const MEMORY_TYPES = [
    'BUSINESS_INFORMATION',
    'BUSINESS_GOAL',
    'BUSINESS_KNOW_HOW',
    'BRAND_INFORMATION',
    'KPI_DEFINITION',
    'AGENT_MEMORY',
    'AGENT_RULE',
    'AGENT_SOUL',
    'AGENT_IDENTITY',
    'USER_INFO'
] as const;
export const PLUGIN_SKILL_ELEMENT_TYPES = ['BODY', 'SCRIPT', 'REFERENCE', 'ASSET'] as const;
export const SKILL_PATH_MAX_LENGTH = 512 as const;
export const MEMORY_NAME_MAX_LENGTH = 128 as const;
export const MEMORY_CONTENT_MAX_LENGTH = 16_384 as const;

export const ExportsCreateInputSchema = z
    .object({
        sellerOrVendorIds: z.array(ZodUUID).min(1).max(5),
        sourceId: z.string().regex(/^[a-f0-9]{10}$/),
        columns: z
            .array(ZodExportColumn)
            .min(1)
            .max(128)
            .describe(
                `Selected output fields. Can include source columns and aggregation aliases. ${PUBLIC_EXPORT_UTILITY_COLUMNS_NOTICE}`
            ),
        from: z.iso
            .date()
            .optional()
            .describe(
                'Start date for the export. Only allowed when the source has a date column; required together with to for those sources.'
            ),
        to: z.iso
            .date()
            .optional()
            .describe(
                'End date for the export. Only allowed when the source has a date column; required together with from for those sources.'
            ),
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
            .describe(
                `Sets maximum number of rows to return. Capped at ${String(MCP_EXPORT_MAX_ROW_LIMIT)} rows per export.`
            ),
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

export const ExportsListInputSchema = z
    .object({
        page: z.coerce.number().int().min(1).default(1).optional(),
        pageSize: z.coerce
            .number()
            .int()
            .min(1)
            .max(MCP_EXPORT_LIST_MAX_PAGE_SIZE)
            .default(MCP_EXPORT_LIST_DEFAULT_PAGE_SIZE)
            .optional(),
        exportIds: z.array(ZodUUID).min(1).max(10).optional()
    })
    .strict();
export type ExportsListToolInput = z.infer<typeof ExportsListInputSchema>;

export const ExportsRawDownloadInputSchema = z
    .object({
        exportId: ZodUUID
    })
    .strict();

export const ExportsDeleteInputSchema = z
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

export const SellersAndVendorsListInputSchema = z
    .object({
        page: z.coerce.number().int().min(1).default(1).optional(),
        pageSize: z.coerce
            .number()
            .int()
            .min(1)
            .max(MCP_SELLERS_AND_VENDORS_MAX_PAGE_SIZE)
            .default(MCP_SELLERS_AND_VENDORS_DEFAULT_PAGE_SIZE)
            .optional(),
        query: z.string().trim().max(256).optional(),
        marketplaceCountryCode: z.string().trim().length(2).optional()
    })
    .strict();

export const FilesCreateInputSchema = z
    .object({
        name: z.string().trim().min(1).max(256),
        group: z.enum(['LISTING_IMAGES', 'APLUS_IMAGES']),
        type: z.enum(['PNG', 'TIFF', 'JPG']),
        sellerOrVendorId: z.uuid(),
        ttlHours: z.coerce.number().int().min(1).max(720).optional(),
        contentBase64: z
            .string()
            .trim()
            .min(1)
            .describe(
                `File content as base64-encoded string. File size must be less than ${String(MCP_FILES_CREATE_MAX_SIZE_MEGABYTES)}MB.`
            )
    })
    .strict();

export const FilesListInputSchema = z
    .object({
        group: z.enum(['LISTING_IMAGES', 'APLUS_IMAGES']).optional(),
        page: z.coerce.number().int().min(1).default(1).optional(),
        pageSize: z.coerce.number().int().min(1).max(100).default(25).optional(),
        query: z.string().trim().max(256).optional(),
        statuses: z
            .array(z.enum(['WAITING_FOR_UPLOAD', 'UPLOADED', 'EXPIRED', 'DELETED']))
            .optional(),
        types: z.array(z.enum(['PNG', 'TIFF', 'JPG'])).optional(),
        sources: z.array(z.enum(['API', 'MCP', 'DATA', 'UI'])).optional(),
        sellerOrVendorIds: z.array(z.uuid()).optional()
    })
    .strict();

export const FilesGetInputSchema = z
    .object({
        fileId: z.uuid()
    })
    .strict();

export const FilesDeleteInputSchema = FilesGetInputSchema;
export const FilesDownloadUrlGetInputSchema = FilesGetInputSchema;

export const PluginsMemoriesCreateInputSchema = z
    .object({
        memoryType: z
            .enum(PLUGIN_MEMORY_TYPES)
            .describe('ORGANIZATION for shared org plugins, PERSONAL for the authenticated user.'),
        type: z.enum(MEMORY_TYPES).describe('Plugin kind of this Memory.'),
        name: z.string().trim().min(1).max(MEMORY_NAME_MAX_LENGTH),
        content: z.string().min(1).max(MEMORY_CONTENT_MAX_LENGTH)
    })
    .strict();

export const PluginsMemoriesEditInputSchema = z
    .object({
        memoryType: z
            .enum(PLUGIN_MEMORY_TYPES)
            .describe('ORGANIZATION for shared org plugins, PERSONAL for the authenticated user.'),
        memoryId: ZodUUID,
        content: z.string().min(1).max(MEMORY_CONTENT_MAX_LENGTH)
    })
    .strict();

export const PluginsSkillsGetInputSchema = z
    .object({
        skillId: ZodUUID,
        elementType: z
            .enum(PLUGIN_SKILL_ELEMENT_TYPES)
            .describe(
                'BODY returns SKILL.md. SCRIPT, REFERENCE, and ASSET return a supporting file by path.'
            ),
        elementName: z
            .string()
            .trim()
            .min(1)
            .max(SKILL_PATH_MAX_LENGTH)
            .nullable()
            .optional()
            .describe('Required for SCRIPT, REFERENCE, and ASSET. Omit or null for BODY.')
    })
    .strict();

export const PluginsFilesGetInputSchema = z
    .object({
        fileId: ZodUUID.describe('File plugin id returned by plugins_get.')
    })
    .strict();

const CogsUpsertRowSchema = z
    .object({
        asin: z.string().min(1),
        sku: z.string().min(1),
        costCurrency: z.string().min(1),
        fromDate: z.iso.date(),
        costItemValue: z.number(),
        costItemShippingValue: z.number(),
        itemSupplierName: z.string().max(128).optional()
    })
    .strict();

export const CogsUpsertToolInputSchema = z
    .object({
        sellerOrVendorId: ZodUUID,
        cogsToUpsert: z.array(CogsUpsertRowSchema).min(1).max(MCP_MAX_COGS_UPSERT_ITEMS)
    })
    .strict();

export const CogsDeleteToolInputSchema = z
    .object({
        sellerOrVendorId: ZodUUID,
        from: z.iso.date().optional(),
        to: z.iso.date().optional(),
        sku: z.string().min(1).optional(),
        asin: z.string().min(1).optional()
    })
    .strict();

const VendorCodeUpsertRowSchema = z
    .object({
        asin: z.string().min(1).optional(),
        sku: z.string().min(1).optional(),
        vendorCode: z.string().min(1)
    })
    .strict()
    .refine((value): boolean => Boolean(value.asin) !== Boolean(value.sku), {
        message: 'Exactly one of asin or sku must be provided.'
    });

export const VendorCodeUpsertToolInputSchema = z
    .object({
        sellerOrVendorId: ZodUUID,
        vendorCodesToUpsert: z
            .array(VendorCodeUpsertRowSchema)
            .min(1)
            .max(MCP_MAX_VENDOR_CODE_UPSERT_ITEMS)
    })
    .strict();

export const VendorCodeDeleteToolInputSchema = z
    .object({
        sellerOrVendorId: ZodUUID,
        sku: z.string().min(1).optional(),
        asin: z.string().min(1).optional()
    })
    .strict();

export const ActionTypes = [
    'AMAZON_LISTINGS_UPDATE',
    'AMAZON_LISTINGS_DETAILS_UPDATE',
    'AMAZON_LISTINGS_CREATE',
    'AMAZON_LISTINGS_FIND',
    'AMAZON_LISTINGS_FEES_ESTIMATE',
    'AMAZON_LISTINGS_FEATURED_PRICE_ESTIMATE',
    'AMAZON_LISTINGS_COMPETITIVE_SUMMARY_FIND',
    'AMAZON_LISTINGS_PRODUCT_TYPES_FIND',
    'AMAZON_LISTINGS_PRODUCT_TYPE_SUGGEST',
    'AMAZON_LISTINGS_PRODUCT_TYPE_DEFINITION_FIND',
    'AMAZON_ORDERS_CANCEL',
    'AMAZON_ORDERS_CONFIRM_SHIPMENT',
    'AMAZON_ORDERS_SOLICITATION_FEEDBACK_SEND',
    'AMAZON_APLUS_CONTENT_ADD',
    'AMAZON_APLUS_CONTENT_UPDATE',
    'AMAZON_APLUS_CONTENT_FIND',
    'AMAZON_APLUS_CONTENT_ASINS_UPDATE',
    'AMAZON_APLUS_CONTENT_ASINS_FIND',
    'AMAZON_APLUS_CONTENT_VALIDATE',
    'AMAZON_APLUS_CONTENT_PUBLISH',
    'AMAZON_APLUS_CONTENT_SUSPEND',
    'AMAZON_APLUS_CONTENT_PUBLISH_RECORDS_FIND',
    'AMAZON_ADS_CAMPAIGNS_ADD',
    'AMAZON_ADS_CAMPAIGNS_REMOVE',
    'AMAZON_ADS_CAMPAIGNS_UPDATE',
    'AMAZON_ADS_AD_GROUPS_ADD',
    'AMAZON_ADS_AD_GROUPS_REMOVE',
    'AMAZON_ADS_AD_GROUPS_UPDATE',
    'AMAZON_ADS_TARGETS_ADD',
    'AMAZON_ADS_TARGETS_REMOVE',
    'AMAZON_ADS_TARGETS_UPDATE',
    'AMAZON_ADS_ADS_ADD',
    'AMAZON_ADS_ADS_REMOVE',
    'AMAZON_ADS_ADS_UPDATE',
    'AMAZON_ADS_AD_ASSOCIATIONS_ADD',
    'AMAZON_ADS_AD_ASSOCIATIONS_REMOVE',
    'AMAZON_ADS_AD_ASSOCIATIONS_UPDATE',
    'AMAZON_ADS_CAMPAIGNS_FIND',
    'AMAZON_ADS_AD_GROUPS_FIND',
    'AMAZON_ADS_TARGETS_FIND',
    'AMAZON_ADS_ADS_FIND',
    'AMAZON_ADS_AD_ASSOCIATIONS_FIND',
    'AMAZON_ADS_PORTFOLIOS_ADD',
    'AMAZON_ADS_PORTFOLIOS_UPDATE',
    'AMAZON_ADS_PORTFOLIOS_FIND'
] as const;
export type ActionType = (typeof ActionTypes)[number];

export const ActionStatuses = [
    'PENDING',
    'IN_PROGRESS',
    'WAITING_EXTERNAL_PROCESSING',
    'COMPLETED',
    'PARTIALLY_COMPLETED',
    'COMPLETED_WITH_ISSUES',
    'ERROR',
    'BLOCKED_NO_TOKENS',
    'BLOCKED_INVALID_INPUT',
    'VALIDATED',
    'CANCELED'
] as const;

export const ActionCreators = ['API', 'MCP', 'SYSTEM'] as const;

export const ActionsDetailsSchemaGetInputSchema = z
    .object({
        type: z.enum(ActionTypes).describe('Action type to retrieve the details payload schema for.')
    })
    .strict();

export const ActionStartToolDeclaredInputSchema = z
    .object({
        type: z
            .enum(ActionTypes)
            .describe(
                'Type of the action to start. Details field schema must match the action type.'
            ),
        sellerOrVendorId: ZodUUID.describe(
            'UUID of the Seller or Vendor whose Amazon account the action will target.'
        ),
        dryRun: z
            .boolean()
            .optional()
            .default(false)
            .describe('When set to true, action will be validated without being executed.'),
        details: z
            .record(z.string(), z.unknown())
            .describe(
                'Action request details for the selected type. Retrieve the exact JSON Schema with the actions_details_schema_get tool before calling actions_start.'
            )
    })
    .strict();

export const ActionsGetInputSchema = z
    .object({
        actionId: ZodUUID
    })
    .strict();

export const ActionsListInputSchema = z
    .object({
        page: z.coerce.number().int().min(1).default(1).optional(),
        pageSize: z.coerce.number().int().min(1).max(5).default(5).optional(),
        statuses: z.array(z.enum(ActionStatuses)).min(1).optional(),
        types: z.array(z.enum(ActionTypes)).min(1).optional(),
        creators: z.array(z.enum(ActionCreators)).min(1).optional(),
        createdAtFrom: z.iso.datetime().optional(),
        createdAtTo: z.iso.datetime().optional(),
        updatedAtFrom: z.iso.datetime().optional(),
        updatedAtTo: z.iso.datetime().optional()
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

const WRITABLE_ANNOTATIONS = {
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
    readOnlyHint: false
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

function createNoOpTool(params: {
    readonly name: string;
    readonly title: string;
    readonly description: string;
    readonly inputSchema: z.ZodType;
    readonly outputSchema: z.ZodType;
    readonly annotations: ToolAnnotations;
    readonly data?: unknown;
}): McpToolDefinition {
    return {
        name: params.name,
        title: params.title,
        description: params.description,
        inputSchema: params.inputSchema,
        outputSchema: params.outputSchema,
        execute: (input: unknown): Promise<McpToolCallResult> =>
            executeWithErrorHandling(params.name, async (): Promise<McpToolCallResult> => {
                params.inputSchema.parse(input);
                return toMcpToolSuccessResult({
                    toolName: params.name,
                    summary: `DataDoe MCP facade is a no-op server for ${params.name}.`,
                    data: params.data ?? NOOP_GENERIC_DATA,
                    outputSchema: params.outputSchema
                });
            }),
        annotations: params.annotations
    };
}

function createDocsMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: DATADOE_USER_DOCS_TABLE_OF_CONTENTS_TOOL_NAME,
            title: 'Get DataDoe user documentation table of contents',
            description: 'Returns the list of page names in the DataDoe user documentation.',
            inputSchema: EmptyInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: DATADOE_USER_DOCS_PAGE_TOOL_NAME,
            title: 'Get DataDoe user documentation page',
            description:
                'Returns a DataDoe user documentation page content by page name, which can be used to answer questions about DataDoe features, pricing, and capabilities.',
            inputSchema: DatadoeUserDocsPageInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        })
    ] as const;
}

function createUtilityMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'sellers_and_vendors_list',
            title: 'List organization sellers and vendors',
            description: `Lists Amazon sellers and vendors connected to the caller's DataDoe organization. Returns a paginated list (default page size ${MCP_SELLERS_AND_VENDORS_DEFAULT_PAGE_SIZE}, max ${MCP_SELLERS_AND_VENDORS_MAX_PAGE_SIZE}) of objects, each with: a unique ID (UUID; required input for exports_sources_get and exports_create), a user-chosen display name, the Amazon marketplace ID plus its country code and country name, the connection type (Seller Central or Vendor Central), and whether an Amazon Ads connection is attached. Optional filters: query (case-insensitive name search) and marketplaceCountryCode (two-letter country code, e.g. US, PL). Most operations in DataDoe require at least one Seller or Vendor ID.`,
            inputSchema: SellersAndVendorsListInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'organization_and_subscription_details_get',
            title: 'Get organization and subscription details',
            description: 'Returns organization profile and plan details.',
            inputSchema: EmptyInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        })
    ] as const;
}

function createExportsMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'exports_sources_get',
            title: 'List export sources for sellers and vendors',
            description:
                'Searches export source templates that your selected seller or vendor can use to create exports. Requires sellerOrVendorIds retrieved from the sellers_and_vendors_list tool and a query to narrow the result set. Supports pagination via page and pageSize (default 5, max 8). The response includes matching sources plus a recommendedSources list with the best starting points, and meta with totalResults and hasNextPage when more matches exist. Each source includes enabled: false when a user disabled the table for your organization in DataDoe settings; exports cannot be created from disabled sources. Sources may include dataAvailability with intraday or real-time update details.',
            inputSchema: ExportsGetSourcesInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'exports_create',
            title: 'Create a new export',
            description: `Creates an export job that runs a structured query against DataDoe's Amazon dataset for one or more sellers/vendors and produces a downloadable file (CSV or JSON). Required inputs: sellerOrVendorIds (from sellers_and_vendors_list), sourceId and columns (from exports_sources_get — each source exposes its own column set), and outputType (CSV or JSON). Optional inputs shape the query like SQL: filters (WHERE — applied to raw rows before aggregation, with and/or combinators and per-rule operators including =, >, in, between, contains, null, etc.), groupBy and aggregations (GROUP BY + sum on numeric columns, min/max/avg on numeric or date/datetime columns, count/countDistinct, with optional aliases), from/to (inclusive date range on the source's date column — only allowed when the source has a date column; otherwise use filters on a time column), dateInterval (DAY/WEEK/MONTH — collapses a date group-by to that bucket), orderByColumn + orderByDirection, and limit/skip (pagination; limit is capped at ${MCP_EXPORT_MAX_ROW_LIMIT} rows per export). Returns an export id and a status. Exports run asynchronously; status transitions from PENDING/PROCESSING to COMPLETED or FAILED. Completed exports expire 24 hours after generation. Poll exports_get to track status, then read the result with exports_raw_download (inline content) or exports_raw_url_get (presigned URL). If a query would naturally exceed ${MCP_EXPORT_MAX_ROW_LIMIT} rows, narrow it via higher-level aggregation, filters, or top-N ordering, or paginate with skip. Column names and source schemas are defined per source - see exports_sources_get and the public DataDoe API reference at https://datadoe.com/hub/data-scheme. ${PUBLIC_EXPORT_UTILITY_COLUMNS_NOTICE}`,
            inputSchema: ExportsCreateInputSchema,
            outputSchema: EXPORT_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: {
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: false,
                readOnlyHint: false
            },
            data: NOOP_EXPORT_RESULT
        }),
        createNoOpTool({
            name: 'exports_get',
            title: 'Get export job details by ID',
            description:
                'Returns status and details for one export job. Use this to check if your export is still processing or ready for download. Completed exports expire 24 hours after generation.',
            inputSchema: ExportsGetInputSchema,
            outputSchema: EXPORT_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS,
            data: NOOP_EXPORT_RESULT
        }),
        createNoOpTool({
            name: 'exports_list',
            title: 'List export jobs',
            description:
                'Lists export jobs for the organization, ordered by most recently created first. Supports pagination via page and pageSize (max 25). Optionally filter by up to 10 exportIds. Use exports_get for a single export and exports_create to start a new one.',
            inputSchema: ExportsListInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'exports_raw_url_get',
            title: 'Get raw export download URL (advanced)',
            description: `Returns a one-time download URL served by the DataDoe MCP server for a completed export. Send a GET request to the URL to receive a redirect to the file. The URL is valid for ${String(MCP_PUBLIC_RESOURCE_ACCESS_TTL_MINUTES)} minutes after export creation and requires no authentication headers.`,
            inputSchema: ExportsRawDownloadInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: {
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: true,
                readOnlyHint: true
            },
            data: NOOP_RAW_EXPORT_RESULT
        }),
        createNoOpTool({
            name: 'exports_raw_download',
            title: 'Download raw export content',
            description:
                'Returns only the raw export content (UTF-8) for a completed export. If processing is not finished, it explains that no file is available yet. User expects that conversation involves contents of their Plugins.',
            inputSchema: ExportsRawDownloadInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS,
            data: NOOP_RAW_EXPORT_RESULT
        }),
        createNoOpTool({
            name: 'exports_delete',
            title: 'Delete an export',
            description:
                'Deletes an export by its ID. Use this to clean up exports that are no longer needed.',
            inputSchema: ExportsDeleteInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: {
                destructiveHint: true,
                idempotentHint: false,
                openWorldHint: false,
                readOnlyHint: false
            }
        })
    ] as const;
}

function createFilesMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'files_create',
            title: 'Create file',
            description: `Creates and uploads a utility file. Pass file bytes as base64 in contentBase64 (raw base64 or a data URI prefix is accepted). Maximum accpeted image size is ${String(MCP_FILES_CREATE_MAX_SIZE_MEGABYTES)}MB. DataDoe API allows for full-size files upload.`,
            inputSchema: FilesCreateInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'files_list',
            title: 'List files',
            description: 'Lists utility files for the organization with pagination and filters.',
            inputSchema: FilesListInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'files_get',
            title: 'Get file',
            description: 'Returns metadata for a utility file by id.',
            inputSchema: FilesGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'files_download_url_get',
            title: 'Get file download URL',
            description: `Returns a one-time download URL that redirects to the file when it is uploaded. The URL is valid for ${String(MCP_PUBLIC_RESOURCE_ACCESS_TTL_MINUTES)} minutes after file creation and requires no authentication headers.`,
            inputSchema: FilesDownloadUrlGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'files_delete',
            title: 'Delete file',
            description: 'Deletes a utility file and its stored object when present.',
            inputSchema: FilesDeleteInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        })
    ] as const;
}

function createActionsMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'actions_details_schema_get',
            title: 'Get details schema for starting an Action',
            description:
                'Returns the JSON Schema for the `details` object of a given action type required to start an Action.',
            inputSchema: ActionsDetailsSchemaGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'actions_start',
            title: 'Start an Action',
            description:
                'Starts an action that manipulates Amazon accounts of selected Seller or Vendor. Each action type has a specific details schema, which can be retrieved with actions_details_schema_get tool. It is possible to validate the request without creating or queuing the action by setting dryRun=true. For Ads FIND actions, adProductFilter.include must contain exactly one ad product type; use separate requests to query multiple product types. Details, flows and best practises for Actions are avaiable in a dedicated docs page.',
            inputSchema: ActionStartToolDeclaredInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'actions_get',
            title: 'Get an Action by ID',
            description: 'Returns the current status and result of a specific action.',
            inputSchema: ActionsGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'actions_list',
            title: 'Lists history of Actions',
            description:
                'Returns paginated action history for the current organization. Supports filtering by status, type, createdAt, and updatedAt ranges. Max page size is 5. Details, flows and best practises for Actions are avaiable in a dedicated docs page.',
            inputSchema: ActionsListInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        })
    ] as const;
}

function createCogsMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'cogs_upsert',
            title: 'Upsert COGS',
            description:
                'Creates or updates cost-of-goods-sold (COGS) rows for a seller or vendor. Each row is keyed by asin, sku, costCurrency, and fromDate - upserting a row with a matching key updates its values.',
            inputSchema: CogsUpsertToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'cogs_delete',
            title: 'Delete COGS',
            description:
                'Deletes COGS rows for a seller or vendor. sellerOrVendorId is required; from, to, sku, and asin are optional filters that narrow the rows deleted within that seller or vendor.',
            inputSchema: CogsDeleteToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: {
                destructiveHint: true,
                idempotentHint: false,
                openWorldHint: false,
                readOnlyHint: false
            }
        })
    ] as const;
}

function createVendorCodesMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'vendor_code_upsert',
            title: 'Upsert Vendor Codes',
            description:
                'Creates or updates vendor code rows for a seller or vendor. Each row must contain exactly one of asin or sku - upserting a row with a matching key updates its value.',
            inputSchema: VendorCodeUpsertToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'vendor_code_delete',
            title: 'Delete Vendor Codes',
            description:
                'Deletes vendor code rows for a seller or vendor. sellerOrVendorId is required; sku and asin are optional filters that narrow the rows deleted within that seller or vendor.',
            inputSchema: VendorCodeDeleteToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: {
                destructiveHint: true,
                idempotentHint: false,
                openWorldHint: false,
                readOnlyHint: false
            }
        })
    ] as const;
}

function createPluginsMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'plugins_get',
            title: 'Get Plugins required by user',
            description:
                'Returns DataDoe Plugins for the user. The user has explicitly enabled these Plugins and expects them to be always loaded into the conversation and followed without being asked for.',
            inputSchema: EmptyInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'plugins_memories_create',
            title: 'Create a Plugin',
            description:
                'Creates a memory Plugin for the user or organization. Agents can proactively suggest creation of new Memories.',
            inputSchema: PluginsMemoriesCreateInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'plugins_memories_edit',
            title: 'Edit a Plugin',
            description:
                'Modifies the content of a memory Plugin for the user or organization. Agents can proactively suggest modification of existing Memories.',
            inputSchema: PluginsMemoriesEditInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'plugins_skills_get',
            title: 'Get a Skill element',
            description:
                'Returns the instructions or a supporting file of a Skill listed by plugins_get. Skills BODY contains the SKILL.md instructions. SCRIPT, REFERENCE, and ASSET return a single supporting file that can be loaded lazily.',
            inputSchema: PluginsSkillsGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'plugins_files_get',
            title: 'Get a File plugin content',
            description:
                'Returns the converted markdown content of a File plugin listed by plugins_get. Files should be loaded lazily when the file is relevant.',
            inputSchema: PluginsFilesGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        })
    ] as const;
}

export function createMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        ...createDocsMcpToolDefinitions(),
        ...createUtilityMcpToolDefinitions(),
        ...createExportsMcpToolDefinitions(),
        ...createFilesMcpToolDefinitions(),
        ...createActionsMcpToolDefinitions(),
        ...createCogsMcpToolDefinitions(),
        ...createVendorCodesMcpToolDefinitions(),
        ...createPluginsMcpToolDefinitions()
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
