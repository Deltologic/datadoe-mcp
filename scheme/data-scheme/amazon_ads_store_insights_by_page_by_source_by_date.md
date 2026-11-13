# Ads Brand Store Insights by Page and Source

- BigQuery table name: `amazon_ads_store_insights_by_page_by_source_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Daily Brand Store traffic by page and the source category Amazon returned for that page. One row per store, date, page and source. Amazon returns these figures for that page only. They are separate from page totals and from source totals for the whole store. Visitor counts stay on the daily store total. Page name and URL come from the latest page list and are empty when the page is no longer listed. Sales stay in the Ads profile currency.

- Source type: `AMAZON_ADS`
- Source ID: `fe7d4cb4edc4344a5fc6a9e3edbdfb984517bb6d2d43c56c8d91df72cbc90fbf`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=fe7d4cb4edc4344a5fc6a9e3edbdfb984517bb6d2d43c56c8d91df72cbc90fbf

## Fetch periods

- `INITIAL` (418 days)
- `RECURRING_DAILY` (30 days)

## Columns (24)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `brand_entity_id` (`TEXT`, required) — Amazon brand entity id used to request Store Insights.
- `brand_store_id` (`TEXT`, required) — Amazon Brand Store id. The DataDoe store id is store_id.
- `brand_store_name` (`TEXT`, nullable) — Amazon Brand Store name from the latest store list. Empty when Amazon no longer lists the store.
- `date` (`DATE`, required) — Calendar date of the store insight, in the Ads profile timezone.
- `page_id` (`TEXT`, required) — Amazon Brand Store page id.
- `page_name` (`TEXT`, nullable) — Page name from the latest page list. Empty when the page is no longer listed.
- `page_status` (`TEXT`, nullable) — Page status from the latest page list. Empty when the page is no longer listed.
- `page_url` (`TEXT`, nullable) — Page URL from the latest page list. Empty when the page is no longer listed.
- `traffic_source` (`TEXT`, required) — Traffic source category Amazon returned for this page and day. Social traffic stays as the category Amazon sent.
- `views` (`NUMBER`, nullable) — Store page views. Product detail page glance views are a different measure.
- `visits` (`NUMBER`, nullable) — Visits counted within the day. One person can visit more than one page or come from more than one source.
- `orders` (`NUMBER`, nullable) — Estimated orders by store visitors within 14 days of their visit.
- `units` (`NUMBER`, nullable) — Estimated units bought within 14 days of the last store visit.
- `sales` (`NUMBER`, nullable) — Estimated sales within 14 days of the last store visit, in currency_code. DataDoe does not convert this amount.
- `currency_code` (`TEXT`, nullable) — Currency of the Amazon Ads profile. Empty when that currency is not known.
- `synced_at` (`DATE`, required) — When this fetch finished.
- `views_per_visit` (`NUMBER`, nullable) — Views divided by visits. Empty when visits are zero or missing. For more than one day, divide the summed views by the summed visits.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
