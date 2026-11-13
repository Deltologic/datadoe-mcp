# AMS Campaign Ads

- BigQuery table name: `amazon_ads_ams_campaign_ads`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Marketing Stream ad configuration events from dataset ads-campaign-management-ads.

- Source type: `AMAZON_ADS`
- Source ID: `539df71b9e15c750803f325409e9f7a2439a0ff2d6168e0d09314070ac554f19`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=539df71b9e15c750803f325409e9f7a2439a0ff2d6168e0d09314070ac554f19

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_ADS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_ADS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (23)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `amazon_ads_advertiser_id` (`TEXT`, nullable) — Amazon Ads advertiser identifier from Amazon Marketing Stream.
- `received_at` (`DATE`, required) — Timestamp when the Amazon Marketing Stream event was received by DataDoe.
- `ad_id` (`TEXT`, required)
- `ad_name` (`TEXT`, nullable)
- `ad_state` (`TEXT`, nullable) — Ad state (for example ENABLED / PAUSED / ARCHIVED).
- `ad_custom_text` (`TEXT`, nullable)
- `ad_landing_page_url` (`TEXT`, nullable)
- `ad_group_id` (`TEXT`, nullable)
- `ad_campaign_id` (`TEXT`, nullable)
- `ad_campaign_type` (`TEXT`, nullable) — Advertising product type from Amazon Marketing Stream. Common values: SPONSORED_PRODUCTS / SPONSORED_BRANDS / AMAZON_DSP. Budget usage may use lowercase product codes such as sp / sb / sd.
- `child_asin` (`TEXT`, required)
- `sku` (`TEXT`, required)
- `book_title` (`TEXT`, nullable) — Latest book title from amazon_ads_book_catalog for this ASIN. Null when the catalog has no title.
- `book_format` (`TEXT`, nullable) — Edition format from the latest uploaded KDP royalty parameters of this ASIN: EBOOK / PAPERBACK / HARDCOVER / AUDIOBOOK. Latest upload, not effective for the row date. Null without royalty parameters.
- `book_work_id` (`TEXT`, nullable) — User-defined work ID that groups the editions of one book, from the latest uploaded KDP royalty parameters of this ASIN. Null without royalty parameters.
- `book_metadata_source` (`TEXT`, nullable) — USER when uploaded KDP royalty parameters supply book_format or book_work_id; API_METADATA when only the catalog title matched; null when neither matched.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
