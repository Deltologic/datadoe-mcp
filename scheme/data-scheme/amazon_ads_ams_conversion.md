# AMS Conversion

- BigQuery table name: `amazon_ads_ams_conversion`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Marketing Stream near real-time conversion metrics for Sponsored Products, Sponsored Brands, and Sponsored Display. Click-attributed columns are named ad_attributed_*; view-through columns start with ad_view_attributed_. Same-SKU columns exclude brand halo. Windows are 1, 7, 14, and 30 days. The daily campaign table uses 7 days for Sponsored Products and 14 days for Sponsored Brands and Sponsored Display — do not add these hourly rows to that table.

- Source type: `AMAZON_ADS`
- Source ID: `cd12665f74972995b0c6f8bc32388b4034090d5ea560732399151f3a18b814a7`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=cd12665f74972995b0c6f8bc32388b4034090d5ea560732399151f3a18b814a7

## Fetch periods

- `CONTINUOUS`

## Columns (55)

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
- `ad_keyword_type` (`TEXT`, nullable)
- `ad_placement` (`TEXT`, nullable)
- `ad_placement_type` (`TEXT`, nullable)
- `ad_target_id` (`TEXT`, nullable)
- `currency` (`TEXT`, nullable) — Currency code for attributed sales.
- `ad_attributed_conversions_1d` (`NUMBER`, nullable)
- `ad_attributed_conversions_7d` (`NUMBER`, nullable)
- `ad_attributed_conversions_14d` (`NUMBER`, nullable)
- `ad_attributed_conversions_30d` (`NUMBER`, nullable)
- `ad_attributed_conversions_1d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_conversions_7d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_conversions_14d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_conversions_30d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_sales_1d` (`NUMBER`, nullable)
- `ad_attributed_sales_7d` (`NUMBER`, nullable)
- `ad_attributed_sales_14d` (`NUMBER`, nullable)
- `ad_attributed_sales_30d` (`NUMBER`, nullable)
- `ad_attributed_sales_1d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_sales_7d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_sales_14d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_sales_30d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_units_ordered_1d` (`NUMBER`, nullable)
- `ad_attributed_units_ordered_7d` (`NUMBER`, nullable)
- `ad_attributed_units_ordered_14d` (`NUMBER`, nullable)
- `ad_attributed_units_ordered_30d` (`NUMBER`, nullable)
- `ad_attributed_units_ordered_1d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_units_ordered_7d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_units_ordered_14d_same_sku` (`NUMBER`, nullable)
- `ad_attributed_units_ordered_30d_same_sku` (`NUMBER`, nullable)
- `ad_view_attributed_conversions_14d` (`NUMBER`, nullable)
- `ad_view_attributed_sales_14d` (`NUMBER`, nullable)
- `ad_view_attributed_units_ordered_14d` (`NUMBER`, nullable)
- `ad_attributed_orders_new_to_brand_14d` (`NUMBER`, nullable)
- `ad_attributed_sales_new_to_brand_14d` (`NUMBER`, nullable)
- `ad_attributed_units_ordered_new_to_brand_14d` (`NUMBER`, nullable)
- `ad_view_attributed_orders_new_to_brand_14d` (`NUMBER`, nullable)
- `ad_view_attributed_sales_new_to_brand_14d` (`NUMBER`, nullable)
- `ad_view_attributed_units_ordered_new_to_brand_14d` (`NUMBER`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
