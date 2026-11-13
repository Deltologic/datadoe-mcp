# DSP Brand Suitability

- BigQuery table name: `amazon_ads_dsp_brand_suitability`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP brand suitability: impressions per advertiser, order, line item, and report period, broken down by inventory tier, content category, or supply source. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Rows are rolling 7-day summaries starting every day: never sum across different periods (summing all dates overcounts about 7 times); pick one period and one dsp_brand_suitability_dimension.

- Source type: `AMAZON_ADS`
- Source ID: `a03385aa42d3fd21789cdb562ad070e5562f54c7a08fed28721e26493e56f5c6`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=a03385aa42d3fd21789cdb562ad070e5562f54c7a08fed28721e26493e56f5c6

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (28 days)
- `RECURRING_MONTHLY` (56 days)

## Search aliases

- dsp
- amazon dsp
- brand suitability
- brand safety

## Columns (25)

- `marketplace_id` (`TEXT`, required) — Amazon marketplace of the DataDoe DSP slot the advertiser is fetched for.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier the DSP advertiser is mapped to, used by MCP/API calls (sellers_and_vendors_list, exports). Null when the advertiser is not mapped to a seller or vendor.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name of the mapped seller or vendor. Null when the advertiser is not mapped.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon selling partner id of the mapped seller. Null for vendors, unmapped advertisers, and contexts without a seller id.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `dsp_advertiser_id` (`TEXT`, required) — Amazon DSP advertiser identifier. Join amazon_sellers_and_vendors_context on organization_id, store_id, ads_dsp_connection_id = ads_connection_id, and dsp_advertiser_id.
- `dsp_advertiser_name` (`TEXT`, nullable) — Amazon DSP advertiser name.
- `date` (`DATE`, required) — Start of the requested report period. Same value as period_start_date. Not a daily date: rows are summaries of the whole period.
- `dt_created` (`DATE`, required) — Timestamp when DataDoe first stored this row.
- `dt_updated` (`DATE`, required) — Timestamp when DataDoe last updated this row.
- `period_start_date` (`DATE`, required) — First day of the requested report period. Same value as date.
- `period_end_date` (`DATE`, nullable) — Last day of the requested report period. May be null for rows fetched before DataDoe stored the period end.
- `period_days` (`NUMBER`, nullable) — Number of days in the requested report period, including both ends. Null when period_end_date is null.
- `dsp_order_id` (`TEXT`, required) — Amazon DSP order identifier. An order is a campaign in the new Amazon DSP naming.
- `dsp_order_name` (`TEXT`, nullable) — Amazon DSP order (campaign) name.
- `dsp_line_item_id` (`TEXT`, required) — Amazon DSP line item identifier. A line item is an ad group in the new Amazon DSP naming.
- `dsp_line_item_name` (`TEXT`, nullable) — Amazon DSP line item (ad group) name.
- `dsp_brand_suitability_dimension` (`TEXT`, required) — Breakdown of the row: INVENTORY_TIER, CONTENT_CATEGORY, or SUPPLY_SOURCE. Filter to one dimension; each dimension splits the same impressions.
- `dsp_brand_suitability_value` (`TEXT`, nullable) — Inventory tier, content category, or supply source name, depending on dsp_brand_suitability_dimension.
- `dsp_supply_source_id` (`TEXT`, nullable) — Supply source identifier. Only for SUPPLY_SOURCE rows, null otherwise.
- `dsp_line_item_active_start_date` (`TEXT`, nullable) — Start of the line item delivery within the period, as delivered by Amazon DSP. Not the requested period start.
- `dsp_line_item_active_end_date` (`TEXT`, nullable) — End of the line item delivery within the period, as delivered by Amazon DSP. Not the requested period end.
- `ad_impressions` (`NUMBER`, required) — Amazon DSP impressions in the period for this dimension value. Not additive across periods.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
