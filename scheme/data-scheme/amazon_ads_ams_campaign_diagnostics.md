# AMS Campaign Diagnostics

- BigQuery table name: `amazon_ads_ams_campaign_diagnostics`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Marketing Stream campaign diagnostics recommendations from dataset sponsored-ads-campaign-diagnostics-recommendations.

- Source type: `AMAZON_ADS`
- Source ID: `87c4febc07c447d311997432fa15a10ddce581e17b0085553934bdde9ad7f328`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=87c4febc07c447d311997432fa15a10ddce581e17b0085553934bdde9ad7f328

## Fetch periods

- `CONTINUOUS`

## Columns (26)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `amazon_ads_advertiser_id` (`TEXT`, nullable) — Amazon Ads advertiser identifier from Amazon Marketing Stream.
- `received_at` (`DATE`, required) — Timestamp when the Amazon Marketing Stream event was received by DataDoe.
- `recommendation_id` (`TEXT`, required)
- `entity_id` (`TEXT`, nullable) — Entity ID from the diagnostics message, when Amazon sends one.
- `advertiser_type` (`TEXT`, nullable) — Advertiser type from the diagnostics message, when Amazon sends one.
- `marketplace` (`TEXT`, nullable) — Marketplace from the diagnostics message. This is not a Partner Opportunity ID.
- `source_recommendation_status` (`TEXT`, nullable) — Recommendation status from the diagnostics message.
- `recommendation_group` (`TEXT`, nullable) — Recommendation group from the diagnostics message.
- `ad_group_id` (`TEXT`, nullable)
- `recommendation_apply_endpoint` (`TEXT`, nullable)
- `recommendation_type` (`TEXT`, nullable)
- `recommendation_explanation` (`JSON`, nullable) — Recommendation explanation payload from Amazon Marketing Stream.
- `recommendation_published_at` (`DATE`, nullable)
- `recommendation_expires_at` (`DATE`, nullable)
- `ad_campaign_id` (`TEXT`, nullable)
- `ad_campaign_name` (`TEXT`, nullable)
- `ad_campaign_type` (`TEXT`, nullable) — Advertising product type from Amazon Marketing Stream. Common values: SPONSORED_PRODUCTS / SPONSORED_BRANDS / AMAZON_DSP. Budget usage may use lowercase product codes such as sp / sb / sd.
- `ad_campaign_current_settings` (`JSON`, nullable) — Current campaign settings snapshot from the recommendation.
- `ad_campaign_recommended_settings` (`JSON`, nullable) — Recommended campaign settings snapshot from the recommendation.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
