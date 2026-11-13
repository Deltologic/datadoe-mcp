# Ads Brand Store Insights by Date

- BigQuery table name: `amazon_ads_store_insights_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Daily Brand Store totals: page views, visits, unique visitors, and estimated orders, units and sales within 14 days of a store visit. Visitors are unique for that day only. A total across days counts the same person again on each day they visit. views_per_visit is views divided by visits. Sales stay in the Ads profile currency. The first load covers 418 days. Later loads refresh the latest 30 days. Collection runs daily. Amazon decides how fresh the figures are.

- Source type: `AMAZON_ADS`
- Source ID: `b67372355ea0e0ca413b82544fc89495646ec996212959d236bd6896ef5698d6`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=b67372355ea0e0ca413b82544fc89495646ec996212959d236bd6896ef5698d6

## Fetch periods

- `INITIAL` (418 days)
- `RECURRING_DAILY` (30 days)

## Columns (20)

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
- `views` (`NUMBER`, nullable) — Store page views. Product detail page glance views are a different measure.
- `visits` (`NUMBER`, nullable) — Visits counted within the day. One person can visit more than one page or come from more than one source.
- `visitors` (`NUMBER`, nullable) — Unique visitors to the store on that day. A total across days is a sum of daily counts, so the same person can be counted on more than one day.
- `orders` (`NUMBER`, nullable) — Estimated orders by store visitors within 14 days of their visit.
- `units` (`NUMBER`, nullable) — Estimated units bought within 14 days of the last store visit.
- `sales` (`NUMBER`, nullable) — Estimated sales within 14 days of the last store visit, in currency_code. DataDoe does not convert this amount.
- `currency_code` (`TEXT`, nullable) — Currency of the Amazon Ads profile. Empty when that currency is not known.
- `synced_at` (`DATE`, required) — When this fetch finished.
- `views_per_visit` (`NUMBER`, nullable) — Views divided by visits. Empty when visits are zero or missing. For more than one day, divide the summed views by the summed visits.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
