# Vendor Listings

- BigQuery table name: `amazon_vendor_listings`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Vendor Central listings from the Listings Items API, one row per connection, marketplace, vendor code, and SKU. Cost price is what Amazon pays the vendor. Offers and fulfillment availability are not published for vendors. item_name, product_description, and bullet points use the listing when Amazon returns them, then the catalog.

- Source type: `VENDOR_CENTRAL`
- Source ID: `e7d9ab8919024276fa7f14e706889a59126bff5c019e21d6ff9d645ccd566de4`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=e7d9ab8919024276fa7f14e706889a59126bff5c019e21d6ff9d645ccd566de4

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_LISTINGS_CREATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_DELETE` — writes: writes rows to this table
- `AMAZON_LISTINGS_UPDATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_DETAILS_UPDATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_CREATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_UPDATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_DETAILS_UPDATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (55)

- `uploaded_cogs_match_status` (`TEXT`, required) — ASIN default match status. Variant-only costs require transaction identifiers and leave daily estimates incomplete.
- `uploaded_cogs_unit_item_value` (`NUMBER`, nullable) — Your uploaded product cost. Customer-maintained standard or average cost per reported ASIN unit. ASIN-day analytics currently use only the explicit ASIN default; variant-only costs require transaction context and leave coverage incomplete. Separate from Amazon-reported costs, procurement prices, shipped COGS and Net PPM. No pack, tax or currency conversion. Latest effective date on or before the report date applies. Backdated corrections change historical estimates. Item cost per unit.
- `uploaded_cogs_unit_shipping_value` (`NUMBER`, nullable) — Your uploaded product cost. Shipping cost per unit. Defaults to zero when omitted from an applicable upload.
- `uploaded_cogs_unit_total_value` (`NUMBER`, nullable) — Your uploaded product cost. Item plus shipping cost per unit, not a period total.
- `uploaded_cogs_effective_from` (`DATE`, nullable) — Start date of the applicable uploaded ASIN cost. Future rows do not affect earlier dates.
- `uploaded_cogs_present` (`LOGIC`, required) — True when an applicable uploaded ASIN cost exists. Explicit zero is present. Missing or conflicting costs are not present.
- `uploaded_cogs_currency` (`TEXT`, nullable) — Currency of your uploaded product cost.
- `cogs_present` (`LOGIC`, required) — Compatibility alias of uploaded_cogs_present. New integrations use the explicit uploaded-cost fields.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `vendor_code` (`TEXT`, required) — Vendor code used to read this listing. A connection can have more than one vendor code.
- `sku` (`TEXT`, required)
- `child_asin` (`TEXT`, nullable) — Child ASIN from the listing summary. Null when Amazon has not assigned one.
- `parent_asin` (`TEXT`, nullable) — Parent ASIN from the product catalog, when the child ASIN is known.
- `listing_name` (`TEXT`, nullable) — Item name from the listing summary.
- `title_differentiation` (`TEXT`, nullable) — Item highlight shown in search results, extracted from the listing title_differentiation attribute.
- `item_name` (`TEXT`, nullable) — Listing title. Uses the listing item_name attribute, then the listing summary title, then the catalog product name.
- `product_description` (`TEXT`, nullable) — Listing description. Uses the listing product_description attribute, then the merchant listings report description when that report is joined, then the catalog product description. A+ content is not included.
- `generic_keyword` (`TEXT`, nullable) — Backend search terms from the listing generic_keyword attribute. The product catalog does not include this field. Null when Amazon omits it from the listing.
- `bullet_point_1` (`TEXT`, nullable) — First listing bullet. Uses the listing bullet_point attribute, then the catalog bullet. Only the first five bullets are stored.
- `bullet_point_2` (`TEXT`, nullable) — Second listing bullet. Uses the same sources as bullet_point_1.
- `bullet_point_3` (`TEXT`, nullable) — Third listing bullet. Uses the same sources as bullet_point_1.
- `bullet_point_4` (`TEXT`, nullable) — Fourth listing bullet. Uses the same sources as bullet_point_1.
- `bullet_point_5` (`TEXT`, nullable) — Fifth listing bullet. Uses the same sources as bullet_point_1.
- `amazon_product_type` (`TEXT`, nullable) — Amazon product type for the listing.
- `brand` (`TEXT`, nullable) — Brand from the listing attributes.
- `model_number` (`TEXT`, nullable) — Model number from the listing attributes.
- `external_product_id` (`TEXT`, nullable) — External product id from the listing attributes, such as a UPC or EAN. This is not the listing SKU.
- `external_product_id_type` (`TEXT`, nullable) — Type of external_product_id, such as upc or ean.
- `main_image_url` (`TEXT`, nullable) — Main image link from the listing summary.
- `listing_is_buyable` (`LOGIC`, nullable) — True when the listing summary status includes BUYABLE.
- `listing_is_discoverable` (`LOGIC`, nullable) — True when the listing summary status includes DISCOVERABLE.
- `listing_created_at` (`DATE`, nullable) — When Amazon created the listing.
- `listing_last_updated_at` (`DATE`, nullable) — When Amazon last updated the listing. Issue-only changes may not move this timestamp.
- `vendor_cost_price_value` (`NUMBER`, nullable) — Unit cost Amazon pays the vendor, from procurement cost price.
- `vendor_cost_price_currency` (`TEXT`, nullable) — Currency of vendor_cost_price_value.
- `list_price_value` (`NUMBER`, nullable) — List price from the listing attributes, excluding tax.
- `list_price_with_tax_value` (`NUMBER`, nullable) — List price from the listing attributes, including tax.
- `list_price_currency` (`TEXT`, nullable) — Currency of the list price.
- `issues_error_count` (`NUMBER`, nullable) — Number of listing issues with severity ERROR.
- `issues_warning_count` (`NUMBER`, nullable) — Number of listing issues with severity WARNING.
- `listing_is_suppressed` (`LOGIC`, nullable) — True when a listing issue enforcement action is LISTING_SUPPRESSED.
- `issues` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `relationships` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `attributes` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `cogs_item_value` (`NUMBER`, nullable) — Compatibility field for your current uploaded ASIN item cost. Use uploaded_cogs_unit_item_value. Zero when missing; check uploaded_cogs_present.
- `cogs_shipping_value` (`NUMBER`, nullable) — Compatibility field for your current uploaded ASIN shipping cost. Use uploaded_cogs_unit_shipping_value.
- `cogs_total_value` (`NUMBER`, nullable) — cogs_item_value plus cogs_shipping_value.
- `cogs_currency` (`TEXT`, nullable) — Compatibility alias of uploaded_cogs_currency.
- `item_current_supplier_name` (`TEXT`, nullable) — Current supplier name for the item COGS, if provided in COGS upload. Reflects the latest COGS row for the listing, not a date-effective value.
- `last_seen_at` (`DATE`, required) — When DataDoe last received this listing. Rows older than three days behind the latest sweep for the vendor code are omitted.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
