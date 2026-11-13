# AMS Traffic

- BigQuery table name: `amazon_ads_ams_traffic`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Marketing Stream near real-time traffic metrics unified across Sponsored Products, Sponsored Brands, and Sponsored Display.

- Source type: `AMAZON_ADS`
- Source ID: `962eb4a222e8c922ece909931ec5912a2a8a74374c115e151ff89e80ec5164ab`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=962eb4a222e8c922ece909931ec5912a2a8a74374c115e151ff89e80ec5164ab

## Fetch periods

- `CONTINUOUS`

## Columns (29)

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
- `ad_campaign_type` (`TEXT`, nullable) — Advertising product type from Amazon Marketing Stream. Common values: SPONSORED_PRODUCTS / SPONSORED_BRANDS / AMAZON_DSP. Budget usage may use lowercase product codes such as sp / sb / sd.
- `ad_campaign_id` (`TEXT`, required)
- `ad_group_id` (`TEXT`, nullable)
- `ad_id` (`TEXT`, nullable)
- `ad_keyword_id` (`TEXT`, nullable)
- `ad_keyword` (`TEXT`, nullable)
- `ad_match_type` (`TEXT`, nullable) — Keyword match type BROAD, PHRASE, or EXACT. Product targets use TARGETING_EXPRESSION or TARGETING_EXPRESSION_PREDEFINED.
- `ad_keyword_type` (`TEXT`, nullable)
- `ad_placement` (`TEXT`, nullable)
- `ad_placement_type` (`TEXT`, nullable)
- `ad_target_id` (`TEXT`, nullable)
- `ad_targeting_text` (`TEXT`, nullable)
- `currency` (`TEXT`, nullable) — Currency code for ad spend.
- `ad_clicks` (`NUMBER`, nullable)
- `ad_impressions` (`NUMBER`, nullable)
- `ad_view_impressions` (`NUMBER`, nullable)
- `ad_viewable_impressions` (`NUMBER`, nullable)
- `ad_spend` (`NUMBER`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
