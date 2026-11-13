# Ads Book Catalog

- BigQuery table name: `amazon_ads_book_catalog`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Deprecated. Use amazon_ads_product_catalog (Ads Product Catalog). It covers the same seller, vendor and book products and eligibility data. Replace book_title with product_title when migrating. This view remains available for compatibility.

- Source type: `AMAZON_ADS`
- Source ID: `38861ef539bc54e8659217afcb3393140afbcf461724a8ca6801354b5deae55d`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=38861ef539bc54e8659217afcb3393140afbcf461724a8ca6801354b5deae55d

## Fetch periods

- `CONTINUOUS`

## Known issues

- **Deprecated** — Use Ads Product Catalog (amazon_ads_product_catalog). Read the [Ads Product Catalog guide](https://app.datadoe.com/hub/docs/datadoe-data/ads-product-catalog). This table remains available and has no removal date.

## Search aliases

- ads book catalog

## Columns (32)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `asin` (`TEXT`, required)
- `sku` (`TEXT`, nullable) — Seller SKU. Null when Amazon returned none, as for KDP authors.
- `book_title` (`TEXT`, nullable) — Product or book title.
- `product_brand` (`TEXT`, nullable)
- `product_category` (`TEXT`, nullable)
- `availability` (`TEXT`, nullable)
- `image_url` (`TEXT`, nullable)
- `price_to_pay_amount` (`NUMBER`, nullable) — Current buy price, in price_to_pay_currency.
- `price_to_pay_currency` (`TEXT`, nullable)
- `basis_price_amount` (`NUMBER`, nullable) — List or strike-through price, in basis_price_currency.
- `basis_price_currency` (`TEXT`, nullable)
- `best_seller_rank` (`TEXT`, nullable) — Best seller rank as returned by Amazon. Text, not a number.
- `first_available_date_raw` (`TEXT`, nullable) — Date the product was first available, unparsed as returned by Amazon.
- `global_store_catalog_source_country_code` (`TEXT`, nullable)
- `variation_asins` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `sp_eligibility_status` (`TEXT`, nullable) — SP advertising eligibility status of the product.
- `sp_ineligibility_codes` (`JSON`, nullable) — JSON array of SP ineligibility codes.
- `sp_ineligibility_reasons` (`JSON`, nullable) — JSON array of SP ineligibility reasons.
- `sb_eligibility_status` (`TEXT`, nullable) — SB advertising eligibility status of the product.
- `sb_ineligibility_codes` (`JSON`, nullable) — JSON array of SB ineligibility codes.
- `sb_ineligibility_reasons` (`JSON`, nullable) — JSON array of SB ineligibility reasons.
- `sd_eligibility_status` (`TEXT`, nullable) — SD advertising eligibility status of the product.
- `sd_ineligibility_codes` (`JSON`, nullable) — JSON array of SD ineligibility codes.
- `sd_ineligibility_reasons` (`JSON`, nullable) — JSON array of SD ineligibility reasons.
- `observed_at_utc` (`DATE`, required) — Time DataDoe last fetched this row from Amazon Ads.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
