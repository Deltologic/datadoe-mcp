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
export const MCP_SERVER_VERSION = '0.5.0' as const;
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

export const MCP_EXPORT_SOURCES_MAX_PAGE_SIZE = 12 as const;
export const MCP_EXPORT_SOURCES_DEFAULT_PAGE_SIZE = 8 as const;
export const MCP_EXPORT_SOURCE_COLUMNS_MAX_PAGE_SIZE = 40 as const;
export const MCP_EXPORT_SOURCE_COLUMNS_DEFAULT_PAGE_SIZE = 40 as const;
export const MCP_EXPORT_LIST_MAX_PAGE_SIZE = 25 as const;
export const MCP_EXPORT_LIST_DEFAULT_PAGE_SIZE = 25 as const;
export const PUBLIC_EXPORT_MAX_COLUMN_COUNT = 256 as const;
export const PUBLIC_EXPORT_UTILITY_COLUMNS_NOTICE =
    'Each export includes default utility columns that identify the seller or vendor and marketplace of each row. You do not need to request those columns.' as const;
export const EXPORT_SOURCE_SEARCH_QUERY_DESCRIPTION =
    'Keyword search across source names, table names, aliases, descriptions, and columns. This is not natural language search. Do not send a full question. Use one short Amazon or business term, for example ppc, roas, sessions, buy box, fba stock, payout. The source display name, table name, or source id returns that source.' as const;
export const MCP_EXPORT_ROW_LIMIT_DESCRIPTION =
    'JSON exports support at most 1,000 rows; CSV exports support at most 5,000 rows. Raw Listings, raw Catalog, and raw Ads snapshots support at most 100 rows in JSON or 250 rows in CSV. Use limit and skip to paginate within these limits.' as const;
export const PUBLIC_EXPORT_DATE_PERIOD_FROM_DESCRIPTION =
    'Inclusive start calendar date (YYYY-MM-DD) applied to the source date column in the marketplace local timezone. Required together with `to` when the selected source has `requiresDatePeriod=true`. Do not put the date range in filters; a filter on the date column does not replace `from`/`to`.' as const;
export const PUBLIC_EXPORT_DATE_PERIOD_TO_DESCRIPTION =
    'Inclusive end calendar date (YYYY-MM-DD) applied to the source date column in the marketplace local timezone. Required together with `from` when the selected source has `requiresDatePeriod=true`. Do not put the date range in filters; a filter on the date column does not replace `from`/`to`.' as const;
const EXPORT_SHORT_SOURCE_ID_REGEX = /^[a-f0-9]{10}$/;

export const ExportsGetSourcesInputSchema = z
    .object({
        sellerOrVendorIds: z.array(ZodUUID).min(1).max(32),
        query: z.string().trim().min(1).max(256).describe(EXPORT_SOURCE_SEARCH_QUERY_DESCRIPTION),
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

export const ExportsGetSourceInputSchema = z
    .object({
        sellerOrVendorIds: z.array(ZodUUID).min(1).max(32),
        sourceId: z
            .string()
            .regex(EXPORT_SHORT_SOURCE_ID_REGEX)
            .describe('Source id copied from exports_sources_get.'),
        page: z.coerce
            .number()
            .int()
            .min(1)
            .default(1)
            .optional()
            .describe('Column page to return. Defaults to 1.'),
        pageSize: z.coerce
            .number()
            .int()
            .min(1)
            .max(MCP_EXPORT_SOURCE_COLUMNS_MAX_PAGE_SIZE)
            .default(MCP_EXPORT_SOURCE_COLUMNS_DEFAULT_PAGE_SIZE)
            .optional()
            .describe(
                `Number of columns to return. Default and maximum are ${String(MCP_EXPORT_SOURCE_COLUMNS_MAX_PAGE_SIZE)}. When columnsMeta.hasNextPage is true, later columns are missing from this response and the schema is incomplete until those pages are loaded.`
            )
    })
    .strict();
export type ExportsGetSourceToolInput = z.infer<typeof ExportsGetSourceInputSchema>;

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
export const MCP_MAX_SQP_ASIN_ITEMS = 25 as const;
export const SQP_ASINS_LIMIT = 216 as const;
export const SQP_ASIN_INPUT_PATTERN = '^[A-Za-z0-9]{10}$' as const;
export const SQP_ASIN_INPUT_INVALID_MESSAGE =
    'Each ASIN must be 10 characters long and contain only letters and numbers.' as const;
export const MCP_MAX_ACTION_HISTORY_PAGE_SIZE = 5 as const;
export const MCP_DEFAULT_ACTION_HISTORY_PAGE_SIZE = 5 as const;
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

const PLUGINS_NOTICE =
    'The user enabled DataDoe Plugins to provide saved preferences and context for their conversations.' as const;
const VENDOR_ACTIONS_NOTICE =
    'For accountType VENDOR (Vendor Central), non-Ads actions are limited to AMAZON_LISTINGS_UPDATE, AMAZON_LISTINGS_DETAILS_UPDATE, AMAZON_LISTINGS_CREATE, AMAZON_LISTINGS_FIND, AMAZON_LISTINGS_PRODUCT_TYPES_FIND, AMAZON_LISTINGS_PRODUCT_TYPE_SUGGEST, AMAZON_LISTINGS_PRODUCT_TYPE_DEFINITION_FIND, and AMAZON_APLUS_CONTENT_* actions. Vendor Central rejects order, FBA, MCF, AMAZON_LISTINGS_PRICING_UPDATE, AMAZON_LISTINGS_FEES_ESTIMATE, AMAZON_LISTINGS_FEATURED_PRICE_ESTIMATE, AMAZON_LISTINGS_COMPETITIVE_SUMMARY_FIND, and any other unlisted non-Ads action type.' as const;

export const ExportsCreateInputSchema = z
    .object({
        sellerOrVendorIds: z.array(ZodUUID).min(1).max(5),
        sourceId: z.string().regex(EXPORT_SHORT_SOURCE_ID_REGEX),
        columns: z
            .array(ZodExportColumn)
            .min(1)
            .max(PUBLIC_EXPORT_MAX_COLUMN_COUNT)
            .describe(
                `Selected output fields. Can include source columns and aggregation aliases. ${PUBLIC_EXPORT_UTILITY_COLUMNS_NOTICE}`
            ),
        from: z.iso.date().optional().describe(PUBLIC_EXPORT_DATE_PERIOD_FROM_DESCRIPTION),
        to: z.iso.date().optional().describe(PUBLIC_EXPORT_DATE_PERIOD_TO_DESCRIPTION),
        filters: ExportFilterGroupSchema.optional().describe(
            'Additional row filters applied before aggregation, like a SQL WHERE clause. Do not use this for the source date period; send top-level from and to when the source has requiresDatePeriod=true.'
        ),
        having: ExportFilterGroupSchema.optional().describe(
            'Post-aggregation filters, like a SQL HAVING clause. Each field must be a groupBy field or an aggregation alias. Requires at least one groupBy field or aggregation. Use filters instead for row-level conditions before aggregation.'
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
                `Sets the maximum number of rows to return. ${MCP_EXPORT_ROW_LIMIT_DESCRIPTION}`
            ),
        skip: z
            .number()
            .int()
            .min(0)
            .optional()
            .describe('Optional zero-based row offset to use together with limit for pagination.'),
        dateInterval: z
            .enum(['DAY', 'WEEK', 'MONTH'] as const)
            .optional()
            .describe(
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
        sourceId: z.string().regex(EXPORT_SHORT_SOURCE_ID_REGEX),
        sellerOrVendorIds: z.array(ZodUUID).readonly(),
        status: z.enum(ReportStatusValues),
        rowCount: z.number().int().min(0).nullable().optional(),
        limit: z.number().int().min(0).nullable().optional(),
        skip: z.number().int().min(0).nullable().optional(),
        having: ExportFilterGroupSchema.nullable().optional(),
        historicalDataStillLoadingNotice: z.string().nullable().optional()
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

const PluginScopeSchema = z
    .enum(PLUGIN_MEMORY_TYPES)
    .describe('ORGANIZATION for shared org plugins, PERSONAL for the authenticated user.');

const MemoryKindSchema = z
    .enum(MEMORY_TYPES)
    .describe('Category of user-provided Memory content, including saved agent preferences.');

export const PluginsMemoriesCreateInputSchema = z
    .object({
        memoryType: PluginScopeSchema,
        type: MemoryKindSchema,
        name: z.string().trim().min(1).max(MEMORY_NAME_MAX_LENGTH),
        content: z.string().min(1).max(MEMORY_CONTENT_MAX_LENGTH)
    })
    .strict();

export const PluginsMemoriesEditInputSchema = z
    .object({
        memoryType: PluginScopeSchema,
        memoryId: ZodUUID,
        content: z.string().min(1).max(MEMORY_CONTENT_MAX_LENGTH)
    })
    .strict();

export const PluginsMemoriesDeleteInputSchema = z
    .object({
        memoryType: PluginScopeSchema,
        memoryId: ZodUUID
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

const SqpAsinSchema = z
    .string()
    .trim()
    .regex(new RegExp(SQP_ASIN_INPUT_PATTERN), { message: SQP_ASIN_INPUT_INVALID_MESSAGE });

export const SqpAsinsGetToolInputSchema = z
    .object({
        sellerOrVendorId: ZodUUID
    })
    .strict();

export const SqpAsinsMutateToolInputSchema = z
    .object({
        sellerOrVendorId: ZodUUID,
        asins: z.array(SqpAsinSchema).min(1).max(MCP_MAX_SQP_ASIN_ITEMS)
    })
    .strict();

export const ActionTypes = [
    'AMAZON_LISTINGS_UPDATE',
    'AMAZON_LISTINGS_PRICING_UPDATE',
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
    'AMAZON_ORDERS_GET_SHIPPING_RATES',
    'AMAZON_ORDERS_CREATE_SHIPMENT',
    'AMAZON_ORDERS_GET_SHIPMENT_DOCS',
    'AMAZON_ORDERS_CANCEL_SHIPMENT',
    'AMAZON_FBA_REMOVAL_ORDERS_ADD',
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
    'AMAZON_ADS_PORTFOLIOS_FIND',
    'AMAZON_ADS_BRANDS_FIND',
    'AMAZON_ADS_SP_BID_RECOMMENDATIONS_FIND',
    'AMAZON_ADS_SP_TARGET_RECOMMENDATIONS_FIND',
    'AMAZON_ADS_SP_BUDGET_RULES_ADD',
    'AMAZON_ADS_SP_BUDGET_RULES_UPDATE',
    'AMAZON_ADS_SB_BUDGET_RULES_ADD',
    'AMAZON_ADS_SB_BUDGET_RULES_UPDATE',
    'AMAZON_ADS_SD_BUDGET_RULES_ADD',
    'AMAZON_ADS_SD_BUDGET_RULES_UPDATE',
    'AMAZON_ADS_SP_BUDGET_RULES_ASSOCIATE',
    'AMAZON_ADS_SB_BUDGET_RULES_ASSOCIATE',
    'AMAZON_ADS_SD_BUDGET_RULES_ASSOCIATE',
    'AMAZON_ADS_SP_BUDGET_RULES_REMOVE',
    'AMAZON_ADS_SB_BUDGET_RULES_REMOVE',
    'AMAZON_ADS_SD_BUDGET_RULES_REMOVE',
    'AMAZON_MCF_ORDERS_ADD',
    'AMAZON_MCF_ORDERS_UPDATE',
    'AMAZON_MCF_ORDERS_FIND',
    'AMAZON_MCF_ORDERS_CANCEL',
    'AMAZON_MCF_ORDERS_PREVIEW',
    'AMAZON_MCF_DELIVERY_OFFERS_PREVIEW',
    'AMAZON_MCF_FEATURES_MARKETPLACE_FIND',
    'AMAZON_MCF_FEATURES_SKU_FIND',
    'AMAZON_MCF_RETURNS_REASON_CODES_FIND',
    'AMAZON_MCF_RETURNS_ADD',
    'AMAZON_SHIPMENT_TRACKING_SUBSCRIBE'
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
        type: z.enum(ActionTypes)
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
                'Action request details for the selected type. The exact JSON Schema is available from actions_details_schema_get.'
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
        pageSize: z.coerce
            .number()
            .int()
            .min(1)
            .max(MCP_MAX_ACTION_HISTORY_PAGE_SIZE)
            .default(MCP_DEFAULT_ACTION_HISTORY_PAGE_SIZE)
            .optional(),
        statuses: z.array(z.enum(ActionStatuses)).min(1).optional(),
        types: z.array(z.enum(ActionTypes)).min(1).optional(),
        creators: z.array(z.enum(ActionCreators)).min(1).optional(),
        createdAtFrom: z.iso.datetime().optional(),
        createdAtTo: z.iso.datetime().optional(),
        updatedAtFrom: z.iso.datetime().optional(),
        updatedAtTo: z.iso.datetime().optional()
    })
    .strict();

// AMC (Amazon Marketing Cloud) tools. Available by request only.
export const AMC_QUERY_TOKEN_LIST_COST = 5 as const;
export const AMC_QUERY_TOKEN_COST = 0 as const;
export const AMC_PUBLIC_POLL_MIN_SECONDS = 5 as const;
export const AMC_PAGE_DEFAULT = 1 as const;
export const AMC_PAGE_SIZE_DEFAULT = 25 as const;
export const AMC_PAGE_SIZE_MAX = 100 as const;
export const AMC_PAGE_MAX = 10_000 as const;
export const AMC_SCHEMA_FIELDS_DEFAULT_PAGE_SIZE = 50 as const;
export const AMC_SCHEMA_FIELDS_MAX_PAGE_SIZE = 100 as const;
export const AMC_SLUG_MIN_LENGTH = 1 as const;
export const AMC_SLUG_MAX_LENGTH = 64 as const;
export const AMC_SLUG_PATTERN = '^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$' as const;
export const AMC_AMAZON_ID_MIN_LENGTH = 1 as const;
export const AMC_AMAZON_ID_MAX_LENGTH = 128 as const;
export const AMC_AMAZON_ID_PATTERN = '^[A-Za-z0-9._-]+$' as const;
export const AMC_STATE_HASH_PATTERN = '^v1:[A-Za-z0-9_-]{43}$' as const;
export const AMC_SQL_MIN_LENGTH = 1 as const;
export const AMC_SQL_MAX_LENGTH = 65_536 as const;
export const AMC_SCHEDULES_MAX_COUNT = 32 as const;
export const AMC_AMAZON_EXECUTION_ID_MAX_LENGTH = 128 as const;
export const AMC_TIME_ZONE_MAX_LENGTH = 64 as const;
export const AMC_HOUR_UTC_MAX = 23 as const;
export const AmcTimeWindowTypes = [
    'MOST_RECENT_DAY',
    'MOST_RECENT_WEEK',
    'CURRENT_MONTH',
    'PREVIOUS_MONTH',
    'ALL',
    'EXPLICIT'
] as const;
export const AmcWeekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
] as const;
export const AmcExecutionStatuses = [
    'PENDING',
    'RUNNING',
    'SUCCEEDED',
    'FAILED',
    'CANCELLED'
] as const;
export const AmcDeliveryStatuses = [
    'WAITING',
    'AVAILABLE',
    'FAILED',
    'EXPIRED',
    'CANCELLED'
] as const;
export const AmcOrigins = ['AD_HOC', 'SCHEDULED'] as const;

const AmcUuidSchema = z.uuid();
const AmcSlugSchema = z
    .string()
    .min(AMC_SLUG_MIN_LENGTH)
    .max(AMC_SLUG_MAX_LENGTH)
    .regex(new RegExp(AMC_SLUG_PATTERN));
const AmcAmazonWorkflowIdSchema = z
    .string()
    .min(AMC_AMAZON_ID_MIN_LENGTH)
    .max(AMC_AMAZON_ID_MAX_LENGTH)
    .regex(new RegExp(AMC_AMAZON_ID_PATTERN));
const AmcAmazonScheduleIdSchema = AmcAmazonWorkflowIdSchema;
const AmcDateTimeSchema = z.iso
    .datetime({ offset: true })
    .refine(
        (value): boolean => value.endsWith('Z') || value.endsWith('+00:00'),
        'Date-time must use a UTC offset.'
    );
const AmcStateHashSchema = z.string().regex(new RegExp(AMC_STATE_HASH_PATTERN));
const AmcSqlSchema = z.string().min(AMC_SQL_MIN_LENGTH).max(AMC_SQL_MAX_LENGTH);
const AmcHourUtcSchema = z.number().int().min(0).max(AMC_HOUR_UTC_MAX);

function buildAmcScheduleSchema(scheduleIdSchema: z.ZodString) {
    return z.discriminatedUnion('cadence', [
        z.strictObject({
            scheduleId: scheduleIdSchema,
            cadence: z.literal('Daily'),
            hourUtc: AmcHourUtcSchema,
            enabled: z.boolean()
        }),
        z.strictObject({
            scheduleId: scheduleIdSchema,
            cadence: z.literal('Weekly'),
            hourUtc: AmcHourUtcSchema,
            weekday: z.enum(AmcWeekdays),
            enabled: z.boolean()
        })
    ]);
}

// Schedules DataDoe creates use slug ids; existing Amazon schedules use the Amazon id format.
const AmcNewScheduleSchema = buildAmcScheduleSchema(AmcSlugSchema);
const AmcScheduleSchema = buildAmcScheduleSchema(AmcAmazonScheduleIdSchema);

const AmcPageRequestShape = {
    page: z.number().int().min(1).max(AMC_PAGE_MAX).default(AMC_PAGE_DEFAULT),
    pageSize: z.number().int().min(1).max(AMC_PAGE_SIZE_MAX).default(AMC_PAGE_SIZE_DEFAULT)
} as const;

export const AmcWorkflowsFindInputSchema = z.strictObject({
    sellerOrVendorId: AmcUuidSchema,
    ...AmcPageRequestShape
});

export const AmcWorkflowsCreateInputSchema = z.strictObject({
    requestId: AmcUuidSchema,
    sellerOrVendorId: AmcUuidSchema,
    workflowId: AmcSlugSchema,
    sql: AmcSqlSchema,
    schedules: z.array(AmcNewScheduleSchema).max(AMC_SCHEDULES_MAX_COUNT).optional().default([])
});

export const AmcWorkflowsUpdateInputSchema = z
    .strictObject({
        requestId: AmcUuidSchema,
        sellerOrVendorId: AmcUuidSchema,
        workflowId: AmcAmazonWorkflowIdSchema,
        expectedStateHash: AmcStateHashSchema,
        sql: AmcSqlSchema.optional(),
        schedules: z.array(AmcScheduleSchema).max(AMC_SCHEDULES_MAX_COUNT).optional()
    })
    .refine((value): boolean => value.sql !== undefined || value.schedules !== undefined, {
        message: 'Workflow update requires sql or schedules.',
        path: ['sql']
    });

export const AmcWorkflowsDeleteInputSchema = z.strictObject({
    requestId: AmcUuidSchema,
    sellerOrVendorId: AmcUuidSchema,
    workflowId: AmcAmazonWorkflowIdSchema,
    expectedStateHash: AmcStateHashSchema
});

export const AmcQueryInputSchema = z
    .strictObject({
        requestId: AmcUuidSchema,
        sellerOrVendorId: AmcUuidSchema,
        workflowId: AmcAmazonWorkflowIdSchema.optional(),
        sql: AmcSqlSchema.optional(),
        timeWindowType: z.enum(AmcTimeWindowTypes).optional(),
        timeWindowStart: AmcDateTimeSchema.optional(),
        timeWindowEnd: AmcDateTimeSchema.optional(),
        timeWindowTimeZone: z.string().min(1).max(AMC_TIME_ZONE_MAX_LENGTH).optional()
    })
    .superRefine((value, context): void => {
        if ((value.workflowId === undefined) === (value.sql === undefined)) {
            context.addIssue({
                code: 'custom',
                path: ['workflowId'],
                message: 'Provide workflowId or sql, never both.'
            });
        }
        const isExplicit = value.timeWindowType === 'EXPLICIT';
        const hasExplicitFields =
            value.timeWindowStart !== undefined ||
            value.timeWindowEnd !== undefined ||
            value.timeWindowTimeZone !== undefined;
        const isTimeWindowValid = isExplicit
            ? value.timeWindowStart !== undefined && value.timeWindowEnd !== undefined
            : !hasExplicitFields;
        if (!isTimeWindowValid) {
            context.addIssue({
                code: 'custom',
                path: ['timeWindowType'],
                message: 'Time window fields are invalid.'
            });
        }
    });

export const AmcQueryCancelInputSchema = z.strictObject({
    requestId: AmcUuidSchema,
    sellerOrVendorId: AmcUuidSchema,
    resultId: AmcUuidSchema
});

export const AmcQueryResultsFindInputSchema = z.strictObject({
    sellerOrVendorId: AmcUuidSchema.optional(),
    ...AmcPageRequestShape,
    workflowId: AmcAmazonWorkflowIdSchema.optional(),
    executionStatus: z.enum(AmcExecutionStatuses).optional(),
    deliveryStatus: z.enum(AmcDeliveryStatuses).optional(),
    origin: z.enum(AmcOrigins).optional(),
    createdAtFrom: AmcDateTimeSchema.optional(),
    createdAtTo: AmcDateTimeSchema.optional(),
    amazonExecutionId: z.string().min(1).max(AMC_AMAZON_EXECUTION_ID_MAX_LENGTH).optional()
});

export const AmcQueryResultGetInputSchema = z.strictObject({
    sellerOrVendorId: AmcUuidSchema,
    resultId: AmcUuidSchema
});

export const AmcSchemaFindInputSchema = z
    .strictObject({
        sellerOrVendorId: AmcUuidSchema,
        dataSourceId: z.string().trim().min(1).optional(),
        page: z.number().int().min(1).max(AMC_PAGE_MAX).optional(),
        pageSize: z.number().int().min(1).max(AMC_SCHEMA_FIELDS_MAX_PAGE_SIZE).optional()
    })
    .superRefine((request, context): void => {
        if (
            request.dataSourceId === undefined &&
            (request.page !== undefined || request.pageSize !== undefined)
        ) {
            context.addIssue({
                code: 'custom',
                path: ['dataSourceId'],
                message: 'Provide dataSourceId when paginating schema fields.'
            });
        }
    });

export const AmcOperationGetInputSchema = z.strictObject({
    sellerOrVendorId: AmcUuidSchema,
    operationId: AmcUuidSchema
});

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

const LOCAL_DESTRUCTIVE_ANNOTATIONS = {
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: false,
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
    skip: null,
    having: null,
    historicalDataStillLoadingNotice: null
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
            description: `Lists Amazon sellers and vendors connected to the user's DataDoe organization. Returns a paginated list of objects, each with: a unique ID (UUID; required input for exports_sources_get and exports_create), a user-chosen display name, accountType (SELLER, VENDOR, ADS_ONLY for Ads or DSP only, or UNCONNECTED when no connections are attached — use this field to distinguish accounts; do not infer type from null connection objects), the Amazon marketplace ID plus its country code and country name, Seller Central / Vendor Central / Amazon Ads / Amazon Ads DSP connection objects when attached, and rowCount across the three primary connections (DSP does not contribute to rowCount). ${PLUGINS_NOTICE}`,
            inputSchema: SellersAndVendorsListInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'organization_and_subscription_details_get',
            title: 'Get organization and subscription details',
            description:
                'Returns organization profile, plan details, billing health, and AI token pools: plan remaining/max (aiTokens.current/max), extra used/limit, bundle remaining/total, and combined available tokens. Billing state is returned in billing.health.state. After access is suspended this tool is unavailable.',
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
            title: 'Search export sources for sellers and vendors',
            description: `Searches compact export source candidates for the selected seller or vendor. Requires sellerOrVendorIds from sellers_and_vendors_list and a keyword query. When multiple accounts are selected, only sources available to every account appear; search accounts separately if an expected source is missing. ${EXPORT_SOURCE_SEARCH_QUERY_DESCRIPTION} Inspect whyMatched to confirm the hit, then call exports_source_get before exports_create — this tool does not return columns. When the data scheme records issues for a table, the candidate includes them; treat deprecation and coverage warnings before creating an export. When a source lists relatedActions, load that type with actions_details_schema_get before actions_start. Rejects the request when any selected seller or vendor is still in FIRST_STAGE of initial load; wait until initialLoadStage is SECOND_STAGE or COMPLETE. When initialLoadStage is SECOND_STAGE, the summary includes a notice that historical data is still loading. Supports pagination via page and pageSize (default ${String(MCP_EXPORT_SOURCES_DEFAULT_PAGE_SIZE)}, max ${String(MCP_EXPORT_SOURCES_MAX_PAGE_SIZE)}). Ranked hits are the starting points; an empty page does not mean DataDoe lacks the data — retry with a short term or a table name, or page+1 when meta.hasNextPage is true. Each source includes enabled: false when a user disabled the table; exports cannot be created from disabled sources.`,
            inputSchema: ExportsGetSourcesInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'exports_source_get',
            title: 'Get one export source schema',
            description: `Returns one page of columns for one export source, plus requiresDatePeriod and the rest of the source metadata. Columns are paginated with page (default 1) and pageSize (default ${String(MCP_EXPORT_SOURCE_COLUMNS_DEFAULT_PAGE_SIZE)}, max ${String(MCP_EXPORT_SOURCE_COLUMNS_MAX_PAGE_SIZE)}). When columnsMeta.hasNextPage is true, more columns exist and this response is not the complete column set — call again with the next page until hasNextPage is false. A column absent from the current page may still exist on another page. Required inputs: sellerOrVendorIds from sellers_and_vendors_list and sourceId copied from exports_sources_get. Call this after search and before exports_create. Rejects the request when any selected seller or vendor is still in FIRST_STAGE of initial load. When initialLoadStage is SECOND_STAGE, the summary includes a notice that historical data is still loading. enabled: false means a user disabled the table and exports_create will fail until it is re-enabled. When relatedActions is present, load that type with actions_details_schema_get before actions_start. requiresDatePeriod: true means exports_create must send top-level from and to (YYYY-MM-DD); filters on the date column do not satisfy that requirement.`,
            inputSchema: ExportsGetSourceInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'exports_create',
            title: 'Create a new export',
            description: `Creates an export job that runs a structured query against DataDoe's Amazon dataset for one or more sellers/vendors and produces a downloadable file (CSV or JSON). Required inputs: sellerOrVendorIds (from sellers_and_vendors_list), sourceId and columns (from exports_source_get after exports_sources_get — each source exposes its own column set; exports_source_get returns at most ${String(MCP_EXPORT_SOURCE_COLUMNS_MAX_PAGE_SIZE)} columns per page, and the column set is incomplete until columnsMeta.hasNextPage is false), and outputType (CSV or JSON). When the selected source has requiresDatePeriod=true, from and to (inclusive YYYY-MM-DD on the source date column) are also required; filters on the date column do not replace them. Omit from/to when requiresDatePeriod=false and filter a time column instead. Optional inputs shape the query like SQL: filters applies row conditions before aggregation (WHERE); groupBy and aggregations create grouped results; having applies conditions after aggregation and accepts only groupBy fields or aggregation aliases; dateInterval (DAY/WEEK/MONTH) collapses a date group into that bucket; orderByColumn and orderByDirection sort results; and limit/skip paginate results (row limits depend on outputType and source). ${MCP_EXPORT_ROW_LIMIT_DESCRIPTION} HAVING requires at least one groupBy field or aggregation. Use filters for source rows and having for aggregate results. Both support and/or combinators and operators such as =, >, in, between, contains, and null. Returns an export id and a status. When a selected seller or vendor is still loading historical data (initialLoadStage SECOND_STAGE), the response includes historicalDataStillLoadingNotice because results may change as more data becomes available. Exports run asynchronously; status transitions from PENDING/PROCESSING to COMPLETED or FAILED. Completed exports expire 24 hours after generation. Poll exports_get to track status, then read the result with exports_raw_download (inline content) or exports_raw_url_get (download URL). If a query would exceed the row limit for its outputType and source, narrow it via higher-level aggregation, filters, having, or top-N ordering, or paginate with skip. Column names and source schemas are defined per source — use exports_sources_get and exports_source_get. For an offline overview of all tables, read the public Markdown data scheme at https://api.datadoe.com/api/v1/spec/data-scheme.md. ${PUBLIC_EXPORT_UTILITY_COLUMNS_NOTICE}`,
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
                'Returns status and details for one export job. Use this to check if your export is still processing or ready for download. Completed exports expire 24 hours after generation. When a selected seller or vendor is still loading historical data (initialLoadStage SECOND_STAGE), the response includes historicalDataStillLoadingNotice because results may change as more data becomes available.',
            inputSchema: ExportsGetInputSchema,
            outputSchema: EXPORT_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS,
            data: NOOP_EXPORT_RESULT
        }),
        createNoOpTool({
            name: 'exports_list',
            title: 'List export jobs',
            description: `Lists export jobs for the organization, ordered by most recently created first. Supports pagination via page and pageSize (max ${String(MCP_EXPORT_LIST_MAX_PAGE_SIZE)}). Optionally filter by up to 10 exportIds. Use exports_get for a single export and exports_create to start a new one.`,
            inputSchema: ExportsListInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'exports_raw_url_get',
            title: 'Get raw export download URL (advanced)',
            description: `Returns a download URL served by the DataDoe MCP server for a completed export. Send a GET request to the URL to receive the file content. The URL requires no authentication headers and can be used repeatedly until ${String(MCP_PUBLIC_RESOURCE_ACCESS_TTL_MINUTES)} minutes after the export was created, not after this call, so little time may remain for slow exports. Anyone with the URL can download the file during that window.`,
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
            description: `Returns only the raw export content (UTF-8) for a completed export. ${MCP_EXPORT_ROW_LIMIT_DESCRIPTION} For existing files above these limits, call exports_raw_url_get to download by URL. If processing is not finished, it explains that no file is available yet. ${PLUGINS_NOTICE}`,
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
            annotations: LOCAL_DESTRUCTIVE_ANNOTATIONS
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
            description: `Returns a download URL that redirects to the file when it is uploaded. The URL requires no authentication headers and can be used repeatedly until ${String(MCP_PUBLIC_RESOURCE_ACCESS_TTL_MINUTES)} minutes after the file was created, not after this call. Anyone with the URL can download the file during that window.`,
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
            description: `Returns the JSON Schema for the \`details\` object of a given action type required to start an Action, plus its access mode (READ or WRITE) and start tool (actions_start). Seller Central accounts support non-Ads listing, order, FBA, A+, and MCF action types. ${VENDOR_ACTIONS_NOTICE} Amazon Ads action types apply to any Seller or Vendor with amazonAdsConnection, including accountType ADS_ONLY.`,
            inputSchema: ActionsDetailsSchemaGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'actions_start',
            title: 'Start an Action',
            description: `Starts a READ or WRITE Action for a selected Seller or Vendor. Live Actions create tracked jobs and incur usage charges. Seller Central accounts support non-Ads listing, order, FBA, A+, and MCF action types. ${VENDOR_ACTIONS_NOTICE} Amazon Ads actions require amazonAdsConnection (accountType SELLER, VENDOR, or ADS_ONLY with Ads attached). Each action type has a specific details schema, which you can retrieve with the actions_details_schema_get tool. You can validate the request without creating or queuing the action by setting dryRun=true. For campaign, ad group, target, and ad FIND actions, adProductFilter.include must contain exactly one ad product type; use separate requests to query multiple product types. One ID filter (for example campaignIdFilter) in these FIND actions can have more than 100 IDs; DataDoe queries them in groups of 100, and you page with the returned nextToken and the same query. Details, flows, and best practices for Actions are available in the Actions documentation.`,
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
            description: `Returns paginated action history for the current organization. Supports filtering by status, type, createdAt, and updatedAt ranges. Max page size is ${String(MCP_MAX_ACTION_HISTORY_PAGE_SIZE)} due to memory usage. Details, flows, and best practices for Actions are available in the Actions documentation.`,
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
                'Creates or updates cost-of-goods-sold (COGS) rows for a Seller or Vendor with accountType SELLER (Seller Central). VENDOR and ADS_ONLY accounts cannot use this tool. Each row is keyed by asin, sku, costCurrency, and fromDate - upserting a row with a matching key updates its values.',
            inputSchema: CogsUpsertToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'cogs_delete',
            title: 'Delete COGS',
            description:
                'Deletes COGS rows for a Seller or Vendor with accountType SELLER (Seller Central). VENDOR and ADS_ONLY accounts cannot use this tool. sellerOrVendorId is required; from, to, sku, and asin are optional filters that narrow the rows deleted within that seller or vendor.',
            inputSchema: CogsDeleteToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: LOCAL_DESTRUCTIVE_ANNOTATIONS
        })
    ] as const;
}

function createVendorCodesMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'vendor_code_upsert',
            title: 'Upsert Vendor Codes',
            description:
                'Creates or updates vendor code rows for a Seller or Vendor with a Vendor Central connection. This includes dual Seller Central + Vendor Central accounts even when accountType is SELLER; accounts without vendorCentralConnection, including ADS_ONLY accounts, cannot use this tool. Each row must contain exactly one of asin or sku - upserting a row with a matching key updates its value.',
            inputSchema: VendorCodeUpsertToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'vendor_code_delete',
            title: 'Delete Vendor Codes',
            description:
                'Deletes vendor code rows for a Seller or Vendor with a Vendor Central connection. This includes dual Seller Central + Vendor Central accounts even when accountType is SELLER; accounts without vendorCentralConnection, including ADS_ONLY accounts, cannot use this tool. sellerOrVendorId is required; sku and asin are optional filters that narrow the rows deleted within that seller or vendor.',
            inputSchema: VendorCodeDeleteToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: LOCAL_DESTRUCTIVE_ANNOTATIONS
        })
    ] as const;
}

function createSqpAsinsMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'sqp_asins_get',
            title: 'Get SQP ASINs',
            description: `Returns the Search Query Performance (SQP) ASIN list for a Seller Central account. Vendor Central and ads-only accounts cannot use this tool. Amazon limits the stored list to ${String(SQP_ASINS_LIMIT)} ASINs per Seller. An empty list means DataDoe does not download SQP data. After a change that updates the list, the list is locked for 72 hours.`,
            inputSchema: SqpAsinsGetToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'sqp_asins_add',
            title: 'Add SQP ASINs',
            description: `Adds ASINs to the Search Query Performance (SQP) list for a Seller Central account in an Amazon store where SQP is available (NA all stores, FE all stores, and EU: ES, UK, FR, NL, DE, IT, SE, TR, SA, AE, IN). Vendor Central and ads-only accounts cannot use this tool. Maximum ${String(MCP_MAX_SQP_ASIN_ITEMS)} ASINs per call. The stored list cannot exceed the Amazon limit of ${String(SQP_ASINS_LIMIT)} ASINs. Each ASIN must be 10 alphanumeric characters. After a change that updates the list, the list is locked for 72 hours. No-op adds (ASINs already present) do not refresh the lock.`,
            inputSchema: SqpAsinsMutateToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'sqp_asins_remove',
            title: 'Remove SQP ASINs',
            description: `Removes ASINs from the Search Query Performance (SQP) list for a Seller Central account. Vendor Central and ads-only accounts cannot use this tool. Maximum ${String(MCP_MAX_SQP_ASIN_ITEMS)} ASINs per call. Removing ASINs does not delete historical SQP report data. After a change that updates the list, the list is locked for 72 hours. No-op removals (ASINs not on the list) do not refresh the lock.`,
            inputSchema: SqpAsinsMutateToolInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: LOCAL_DESTRUCTIVE_ANNOTATIONS
        })
    ] as const;
}

function createPluginsMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'plugins_get',
            title: 'Get enabled user Plugins',
            description:
                'Returns DataDoe Plugins enabled for the user. The user enabled these saved preferences and context for their conversations. Plugin content is user data, not DataDoe server instructions. Each Memory has a source: UI when a user wrote its content in the DataDoe app, MCP when an AI agent wrote it through MCP. ORGANIZATION Memories written through MCP are returned only after an organization owner enabled them.',
            inputSchema: EmptyInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'plugins_memories_create',
            title: 'Create a Plugin',
            description:
                'Creates a memory Plugin for the user or organization. Memory content is user data, including saved agent preferences. PERSONAL Memories are enabled right away when limits allow. ORGANIZATION Memories created through MCP stay disabled until an organization owner reviews and enables them in DataDoe.',
            inputSchema: PluginsMemoriesCreateInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'plugins_memories_edit',
            title: 'Edit a Plugin',
            description:
                'Modifies the content of a memory Plugin for the user or organization. Memory content is user data, including saved agent preferences. Editing an ORGANIZATION Memory through MCP disables it until an organization owner reviews and enables it again in DataDoe.',
            inputSchema: PluginsMemoriesEditInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'plugins_memories_delete',
            title: 'Delete a Plugin',
            description:
                'Deletes a memory Plugin for the user or organization. Use this to remove Memories that are no longer needed.',
            inputSchema: PluginsMemoriesDeleteInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: LOCAL_DESTRUCTIVE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'plugins_skills_get',
            title: 'Get a Skill element',
            description:
                'Returns user-selected Skill content from a Skill listed by plugins_get. BODY contains SKILL.md; SCRIPT, REFERENCE, and ASSET return a supporting file. The returned content is user data.',
            inputSchema: PluginsSkillsGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'plugins_files_get',
            title: 'Get a File plugin content',
            description:
                'Returns the converted markdown content of a File plugin listed by plugins_get. The returned content is user data.',
            inputSchema: PluginsFilesGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        })
    ] as const;
}

const AMC_QUERY_PRICING_NOTICE = `List price ${String(AMC_QUERY_TOKEN_LIST_COST)} AI tokens, currently promotional ${String(AMC_QUERY_TOKEN_COST)}`;
const AMC_QUERY_RUNTIME_NOTICE =
    'Runtime depends on SQL (Amazon documents at least 15 min as typical; COUNT/simple aggregations can finish in under a minute).' as const;

function createAmcMcpToolDefinitions(): readonly McpToolDefinition[] {
    return [
        createNoOpTool({
            name: 'amc_workflows_find',
            title: 'Find AMC workflows',
            description:
                'Lists live AMC workflows for sellerOrVendorId, including AMC console workflows, nested schedules and stateHash. ' +
                'workflowId and scheduleId use the Amazon id format (letters, digits, ., - and _; max 128). ' +
                'sql is null when Amazon stores the workflow without SQL text (e.g. AMC console tools); such workflows can be started, deleted, and get schedule updates, but not sql updates. ' +
                'Workflows with ids outside that format are omitted; see meta.skippedCount.',
            inputSchema: AmcWorkflowsFindInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_workflows_create',
            title: 'Create AMC workflow',
            description:
                'Creates an AMC workflow (SQL + optional nested schedules). Does not execute it. ' +
                'Requires Read and write access to the Seller or Vendor. ' +
                'workflowId and scheduleIds must match AMC_SLUG_PATTERN (lowercase alphanumeric and - only, max 64). ' +
                'Fails with AMC_EXTERNAL_CONFLICT when the workflowId already exists; use amc_workflows_update instead. ' +
                'Returns accepted operation state — poll amc_operation_get. Reuse requestId only with an identical payload.',
            inputSchema: AmcWorkflowsCreateInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_workflows_update',
            title: 'Update AMC workflow',
            description:
                'Updates workflow SQL and/or nested schedules. Omitted fields stay unchanged; empty schedules removes all. ' +
                'Existing scheduleIds (including AMC console ids) can be kept; new schedules need AMC_SLUG_PATTERN scheduleIds. sql cannot be set on a workflow whose sql is null. ' +
                'Requires the latest expectedStateHash from amc_workflows_find and Read and write access. Returns accepted operation state.',
            inputSchema: AmcWorkflowsUpdateInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_workflows_delete',
            title: 'Delete AMC workflow',
            description:
                'Deletes a workflow and its nested schedules. Requires the latest expectedStateHash from amc_workflows_find and Read and write access. ' +
                'Returns accepted operation state.',
            inputSchema: AmcWorkflowsDeleteInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_query_validate',
            title: 'Validate AMC query',
            description:
                'Dry-runs a workflow or raw SQL against Amazon (provide one, never both). Synchronous, 0 tokens, no result indexed, does not count toward the Amazon daily limit. ' +
                'Requires Read and write access to the Seller or Vendor. ' +
                "When valid is false, diagnostics carry Amazon's error (line/column and the missing column or table). " +
                'Waits up to 15 s for Amazon; AMC_UPSTREAM_UNAVAILABLE is retryable with the same requestId. ' +
                'Raw SQL is never persisted. Newlines/tabs in sql collapse to spaces.',
            inputSchema: AmcQueryInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_query_start',
            title: 'Start AMC query',
            description:
                'Starts an on-demand AMC query (workflowId or sql, never both). ' +
                'Requires Read and write access to the Seller or Vendor. ' +
                'Amazon limits: 30 ad-hoc executions/day per instance, counting every on-demand start (sql and workflowId; only schedule runs are exempt; reset time undocumented), and 10 executions running in parallel per instance (further executions queue). ' +
                'Over the daily limit the start fails with AMC_AD_HOC_LIMIT_REACHED (retryable later). Use on-demand runs for testing and one-off reports; recurring reports belong in workflow schedules. ' +
                `Starting is free and never checks the AI token balance; the first amc_query_result_get that returns download URLs is charged once per execution (${AMC_QUERY_PRICING_NOTICE}). Failed and cancelled executions are free. ` +
                'outcome RESULT = known result; OPERATION = poll amc_operation_get until terminal. ' +
                'If recoveryStatus is AWAITING_CLIENT_PAYLOAD, resubmit the identical payload and requestId — do not start a second execution. ' +
                `${AMC_QUERY_RUNTIME_NOTICE} ` +
                'EXPLICIT timeWindowStart/timeWindowEnd are UTC instants regardless of timeWindowTimeZone. ' +
                'Cancel while delivery is WAITING if you do not want to wait. Raw SQL is never persisted.',
            inputSchema: AmcQueryInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_query_cancel',
            title: 'Cancel AMC query',
            description:
                'Cancels a pending or running query result. Idempotent after cancel. ' +
                'Requires Read and write access to the Seller or Vendor. ' +
                'WAITING delivery becomes CANCELLED; AVAILABLE (files already present) is left unchanged. ' +
                'Already-terminal results return AMC_INVALID_REQUEST. Returns accepted operation state.',
            inputSchema: AmcQueryCancelInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: WRITABLE_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_query_results_find',
            title: 'Find AMC query results',
            description:
                'Lists AMC query result history. sellerOrVendorId is optional; omit it to list every readable binding in the org. ' +
                'Filter by workflowId, executionStatus, deliveryStatus (WAITING, AVAILABLE, FAILED, EXPIRED, CANCELLED), origin, createdAt range, or amazonExecutionId. ' +
                "Runs of schedules and AMC console runs appear within about an hour; pass sellerOrVendorId to get the freshest results (DataDoe first imports that seller or vendor's recent Amazon runs, at most every 5 minutes). " +
                'rowCount may be null. failureReason explains FAILED executions (e.g. the SQL error). Does not include file URLs.',
            inputSchema: AmcQueryResultsFindInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_query_result_get',
            title: 'Get AMC query result',
            description:
                'Gets one AMC query result, including short-lived Amazon download URLs when delivery is AVAILABLE. ' +
                'Requires a working Amazon Ads OAuth session for the binding. URLs expire in about 10 minutes — download immediately. ' +
                `The first retrieval that returns download URLs is charged once per execution (${AMC_QUERY_PRICING_NOTICE}); repeat retrievals are free. ` +
                'When the balance cannot cover that charge, no URLs are returned and the call fails with the same no-tokens error as other tools; the result stays available until expiresAt. ' +
                `Poll no faster than ${String(AMC_PUBLIC_POLL_MIN_SECONDS)}s. ` +
                `${AMC_QUERY_RUNTIME_NOTICE} ` +
                'rowCount may be null. failureReason explains FAILED executions (e.g. the SQL error). ' +
                'Empty privacy-threshold results are ordinary RESULT files and may include filtered_metrics_discriminator and filtered_reason columns.',
            inputSchema: AmcQueryResultGetInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_schema_find',
            title: 'Find AMC schema',
            description:
                'Reads the live AMC schema for the bound AMC instance. Default: compact table index with fieldCount and no fields. ' +
                `Pass dataSourceId for paginated fields (pageSize default ${String(AMC_SCHEMA_FIELDS_DEFAULT_PAGE_SIZE)}, max ${String(AMC_SCHEMA_FIELDS_MAX_PAGE_SIZE)}). Some sources require Amazon Ads Console Paid Features.`,
            inputSchema: AmcSchemaFindInputSchema,
            outputSchema: GENERIC_MCP_TOOL_RESPONSE_SCHEMA,
            annotations: READONLY_ANNOTATIONS
        }),
        createNoOpTool({
            name: 'amc_operation_get',
            title: 'Get AMC operation',
            description:
                'Reads AMC operation status, recoveryStatus, and sanitized errors. Use after workflow mutations, cancel, and uncertain query start (outcome OPERATION). ' +
                'When a query start operation SUCCEEDED, resourceId is the resultId for amc_query_result_get.',
            inputSchema: AmcOperationGetInputSchema,
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
        ...createSqpAsinsMcpToolDefinitions(),
        ...createPluginsMcpToolDefinitions(),
        ...createAmcMcpToolDefinitions()
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
