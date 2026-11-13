# Listings

- BigQuery table name: `amazon_listings_with_cogs`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Current listing snapshot per SKU, including price, FBA inventory, and Amazon Warehousing and Distribution (AWD) inventory. FBA available, reserved, inbound, and pending-removal quantities are separate buckets; fba_inventory_supply_at_fba is the FBA total when Amazon sends it, so do not add the buckets to it. AWD quantities are not FBA. item_name, product_description, and bullet points use the listing when Amazon returns them, then the catalog.

- Source type: `SELLER_CENTRAL`
- Source ID: `ba689c05d7f7cee1a1690990c28995680a0654b7ed258230f4173d61bbcd1ab3`
- Requires a date period: no
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=ba689c05d7f7cee1a1690990c28995680a0654b7ed258230f4173d61bbcd1ab3

## Fetch periods

- `CONTINUOUS`

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 10am, 1pm, 4pm.

## Related actions

- `AMAZON_LISTINGS_CREATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_DELETE` — writes: writes rows to this table
- `AMAZON_LISTINGS_UPDATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_PRICING_UPDATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_DETAILS_UPDATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_CREATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_UPDATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_PRICING_UPDATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_DETAILS_UPDATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (50)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `listing_id` (`TEXT`, required) — Unique identifier for the listing, not the SKU.
- `sku` (`TEXT`, required)
- `fnsku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `title_differentiation` (`TEXT`, nullable) — Item highlight shown in search results, extracted from the listing title_differentiation attribute.
- `item_name` (`TEXT`, nullable) — Listing title. Uses the listing item_name attribute, then the listing summary title, then the catalog product name.
- `product_description` (`TEXT`, nullable) — Listing description. Uses the listing product_description attribute, then the merchant listings report description when that report is joined, then the catalog product description. A+ content is not included.
- `generic_keyword` (`TEXT`, nullable) — Backend search terms from the listing generic_keyword attribute. The product catalog does not include this field. Null when Amazon omits it from the listing.
- `bullet_point_1` (`TEXT`, nullable) — First listing bullet. Uses the listing bullet_point attribute, then the catalog bullet. Only the first five bullets are stored.
- `bullet_point_2` (`TEXT`, nullable) — Second listing bullet. Uses the same sources as bullet_point_1.
- `bullet_point_3` (`TEXT`, nullable) — Third listing bullet. Uses the same sources as bullet_point_1.
- `bullet_point_4` (`TEXT`, nullable) — Fourth listing bullet. Uses the same sources as bullet_point_1.
- `bullet_point_5` (`TEXT`, nullable) — Fifth listing bullet. Uses the same sources as bullet_point_1.
- `listing_condition` (`TEXT`, required) — Condition enum values.
- `listing_name` (`TEXT`, required) — Item name from the merchant listings report.
- `listing_price_value` (`NUMBER`, required)
- `listing_estimated_per_item_referral_fee` (`NUMBER`, nullable) — Estimated referral fee per item.
- `listing_price_currency` (`TEXT`, required) — Currency code.
- `listing_current_quantity` (`NUMBER`, required)
- `listing_pending_quantity` (`NUMBER`, required)
- `fba_quantity_available` (`NUMBER`, required) — Fulfillable units at Amazon now. Already inside fba_inventory_supply_at_fba when that column is set.
- `fba_quantity_pending_removal` (`NUMBER`, required) — Units pending removal. Not available to sell.
- `fba_quantity_inbound` (`NUMBER`, required) — Units inbound to FBA. Not yet available to sell.
- `fba_quantity_reserved` (`NUMBER`, required) — Units reserved for orders, transfers, or processing. Not available to sell.
- `fba_quantity_fc_transfer` (`NUMBER`, nullable) — Units in transfer between fulfillment centers.
- `fba_inventory_supply_at_fba` (`NUMBER`, nullable) — Total FBA supply quantity for the listing.
- `fba_has_stranded_inventory` (`LOGIC`, required) — True when at least one FBA stranded inventory row exists for this SKU.
- `awd_total_inbound_quantity` (`NUMBER`, nullable) — Units inbound to AWD. Not FBA inbound.
- `awd_total_onhand_quantity` (`NUMBER`, nullable) — Units on hand in AWD. Not FBA available.
- `awd_available_distributable_quantity` (`NUMBER`, nullable) — AWD units Amazon can distribute to FBA. Not FBA available.
- `awd_replenishment_quantity` (`NUMBER`, nullable)
- `awd_reserved_distributable_quantity` (`NUMBER`, nullable)
- `awd_next_expiration_at` (`DATE`, nullable) — Earliest known expiration timestamp for this SKU in AWD. Additional expirations can exist.
- `awd_next_expiration_quantity` (`NUMBER`, nullable) — On-hand quantity associated with the earliest known expiration in AWD. Additional expirations can exist.
- `awd_expirations` (`JSON`, nullable, BigQuery only) — All expiration buckets for this SKU in AWD. Available only in direct BigQuery integration. — available in BigQuery only — cannot be requested in exports / MCP `exports_create`
- `listing_fulfillment_channel` (`TEXT`, required) — Enum of: DEFAULT / AMAZON_NA / AMAZON_EU / (null). DEFAULT means FBM, other means FBA.
- `listing_open_date` (`DATE`, required)
- `listing_status` (`TEXT`, required) — Active / Inactive / Incomplete
- `cogs_item_value` (`NUMBER`, nullable) — Current unit item cost from amazon_cogs.
- `cogs_shipping_value` (`NUMBER`, nullable) — Current unit shipping cost from amazon_cogs.
- `cogs_total_value` (`NUMBER`, nullable) — Per-unit snapshot: current unit item cost plus current unit shipping cost. — definition: `(amazon_cogs.cost_item_value ?? 0) + (amazon_cogs.cost_item_shipping_value ?? 0)`
- `cogs_present` (`LOGIC`, required) — True when an uploaded COGS record applies to this row. Zero cost can still be valid. To list SKUs sold in the last 30 days without COGS, use GET /api/v1/cogs/missing or the MCP tool cogs_missing_list.
- `cogs_currency` (`TEXT`, nullable) — Currency code for COGS.
- `item_current_supplier_name` (`TEXT`, nullable) — Current supplier name for the item COGS, if provided in COGS upload. Reflects the latest COGS row for the listing, not a date-effective value.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
