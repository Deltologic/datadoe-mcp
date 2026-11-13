# AMS SB Clickstream

- BigQuery table name: `amazon_ads_ams_sb_clickstream`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Marketing Stream Sponsored Brands clickstream engagement metrics from dataset sb-clickstream.

- Source type: `AMAZON_ADS`
- Source ID: `547098798e923c01c4b06496c991f088a274a04bbf46f07f83e8d8301128c972`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=547098798e923c01c4b06496c991f088a274a04bbf46f07f83e8d8301128c972

## Fetch periods

- `CONTINUOUS`

## Columns (22)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `amazon_ads_advertiser_id` (`TEXT`, nullable) — Amazon Ads advertiser identifier from Amazon Marketing Stream.
- `received_at` (`DATE`, required) — Timestamp when the Amazon Marketing Stream event was received by DataDoe.
- `idempotency_id` (`TEXT`, required) — Amazon Marketing Stream event idempotency identifier.
- `time_window_starts_at` (`DATE`, nullable) — Start of the Amazon Marketing Stream metric time window (UTC).
- `ad_campaign_id` (`TEXT`, required)
- `ad_group_id` (`TEXT`, nullable)
- `ad_id` (`TEXT`, nullable)
- `ad_keyword_id` (`TEXT`, nullable)
- `ad_keyword` (`TEXT`, nullable)
- `ad_keyword_type` (`TEXT`, nullable)
- `ad_placement_type` (`TEXT`, nullable)
- `ad_view_attributed_branded_searches_14d` (`NUMBER`, nullable)
- `ad_attributed_branded_searches_14d` (`NUMBER`, nullable)
- `ad_view_attributed_detail_page_views_14d` (`NUMBER`, nullable)
- `ad_attributed_detail_page_views_14d` (`NUMBER`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
