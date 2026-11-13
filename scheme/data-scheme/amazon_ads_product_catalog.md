# Ads Product Catalog

- BigQuery table name: `amazon_ads_product_catalog`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Products you can advertise in Amazon Ads, for sellers, vendors, and books, with Sponsored Products, Sponsored Brands, and Sponsored Display eligibility. One row per Organization, DataDoe Store, Ads connection, marketplace, ASIN, and SKU. A missing SKU is null. Eligibility belongs to that Ads account, not to the ASIN in every account. A missing program status is unknown, not a denial. Amazon DSP is not included. Each Ads connection refreshes every three days, with at most 10,000 products per program. Account permissions and Amazon API availability apply. observed_at_utc is the time of the latest product observation. Existing exports stay on amazon_ads_book_catalog until you select this table. Migration examples: https://app.datadoe.com/hub/docs/datadoe-data/ads-product-catalog.

- Source type: `AMAZON_ADS`
- Source ID: `fe20bbfb0d5095194762ed73a18e4581fee4040414b1cd67cabda390ad4edd37`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=fe20bbfb0d5095194762ed73a18e4581fee4040414b1cd67cabda390ad4edd37

## Fetch periods

- `CONTINUOUS`

## Search aliases

- ads product catalog
- product eligibility
- advertised products

## Columns (34)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `asin` (`TEXT`, required)
- `sku` (`TEXT`, nullable) — Seller SKU. Null when Amazon returned none, including for KDP authors.
- `product_title` (`TEXT`, nullable) — Product or book title.
- `product_brand` (`TEXT`, nullable) — Brand returned by Amazon.
- `product_category` (`TEXT`, nullable) — Product category returned by Amazon.
- `availability` (`TEXT`, nullable) — Availability returned by Amazon.
- `image_url` (`TEXT`, nullable) — Product image URL returned by Amazon.
- `price_to_pay_amount` (`NUMBER`, nullable) — Current buy price, in price_to_pay_currency. Null when Amazon omits it or the amount is not numeric.
- `price_to_pay_currency` (`TEXT`, nullable) — Currency of price_to_pay_amount. Not inferred when Amazon omits it.
- `basis_price_amount` (`NUMBER`, nullable) — List or strike-through price, in basis_price_currency. Null when Amazon omits it or the amount is not numeric.
- `basis_price_currency` (`TEXT`, nullable) — Currency of basis_price_amount. Not inferred when Amazon omits it.
- `best_seller_rank` (`TEXT`, nullable) — Best seller rank as returned by Amazon. Text, not a number.
- `first_available_date_raw` (`TEXT`, nullable) — Date the product was first available, unparsed as returned by Amazon.
- `global_store_catalog_source_country_code` (`TEXT`, nullable) — Catalog source country code from Amazon global store settings.
- `variation_asins` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `sp_eligibility_status` (`TEXT`, nullable) — Sponsored Products eligibility for this Ads connection, ASIN, and SKU. Null when that program returned no result. Null means unknown, not ineligible.
- `sp_ineligibility_codes` (`JSON`, nullable) — JSON array of Sponsored Products ineligibility codes for this Ads connection, ASIN, and SKU. Null when that program returned no result.
- `sp_ineligibility_reasons` (`JSON`, nullable) — JSON array of Sponsored Products ineligibility reasons for this Ads connection, ASIN, and SKU. Null when that program returned no result.
- `sb_eligibility_status` (`TEXT`, nullable) — Sponsored Brands eligibility for this Ads connection, ASIN, and SKU. Null when that program returned no result. Null means unknown, not ineligible.
- `sb_ineligibility_codes` (`JSON`, nullable) — JSON array of Sponsored Brands ineligibility codes for this Ads connection, ASIN, and SKU. Null when that program returned no result.
- `sb_ineligibility_reasons` (`JSON`, nullable) — JSON array of Sponsored Brands ineligibility reasons for this Ads connection, ASIN, and SKU. Null when that program returned no result.
- `sd_eligibility_status` (`TEXT`, nullable) — Sponsored Display eligibility for this Ads connection, ASIN, and SKU. Null when that program returned no result. Null means unknown, not ineligible.
- `sd_ineligibility_codes` (`JSON`, nullable) — JSON array of Sponsored Display ineligibility codes for this Ads connection, ASIN, and SKU. Null when that program returned no result.
- `sd_ineligibility_reasons` (`JSON`, nullable) — JSON array of Sponsored Display ineligibility reasons for this Ads connection, ASIN, and SKU. Null when that program returned no result.
- `observed_at_utc` (`DATE`, required) — Time of the latest product observation for this row. Use it to see how fresh the catalog row is.
- `dt_created` (`DATE`, required) — Time DataDoe first stored the raw product row. This is export metadata, not an Amazon business date.
- `dt_updated` (`DATE`, required) — Time DataDoe last updated the raw product row. This is export metadata, not an Amazon business date.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
