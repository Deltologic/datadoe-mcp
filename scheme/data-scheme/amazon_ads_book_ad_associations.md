# Ads Book Associations

- BigQuery table name: `amazon_ads_book_ad_associations`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Products (books) associated with each ad: advertised products, Store Spotlight cards and Sponsored Brands landing-page products. One row per ad, product and association role.

- Source type: `AMAZON_ADS`
- Source ID: `32d706007ac49080b198d45f8a5f495f775e15836ce1394c8bb7e728fea2bb96`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=32d706007ac49080b198d45f8a5f495f775e15836ce1394c8bb7e728fea2bb96

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_ADS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (17)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_id` (`TEXT`, required)
- `ad_group_id` (`TEXT`, nullable)
- `ad_campaign_id` (`TEXT`, nullable)
- `ad_campaign_type` (`TEXT`, nullable) — SPONSORED_PRODUCTS / SPONSORED_BRANDS / SPONSORED_DISPLAY.
- `ad_type` (`TEXT`, nullable) — Ad or creative type. Values come from the source that reported the ad, such as PRODUCT_AD, VIDEO or PRODUCT_COLLECTION.
- `ad_state` (`TEXT`, nullable) — ENABLED / PAUSED / ARCHIVED.
- `product_id_type` (`TEXT`, nullable) — ASIN / SKU.
- `product_id` (`TEXT`, required) — ASIN or SKU, per product_id_type.
- `association_role` (`TEXT`, required) — ADVERTISED_PRODUCT / STORE_SPOTLIGHT_CARD / LANDING_PAGE_PRODUCT.
- `association_sources` (`JSON`, required) — JSON array of sources that reported the association: EXPORT_ADS / AD_CREATIVE / SB_CREATIVE_VERSION.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
