# FBA Stranded Inventory

- BigQuery table name: `amazon_fba_stranded_inventory`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

FBA stranded inventory that is in Amazon fulfillment centers but not available for sale, with recommended actions, status, and quantities. Updated daily by replacing the full snapshot.

- Source type: `SELLER_CENTRAL`
- Source ID: `a4d08771c8d67c28bcedd7cd3685ceb96a632b13b3e242a25312314a1062aede`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=a4d08771c8d67c28bcedd7cd3685ceb96a632b13b3e242a25312314a1062aede

## Fetch periods

- `INITIAL` (1 days)
- `RECURRING_DAILY` (1 days)

## Columns (24)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `sku` (`TEXT`, required)
- `fnsku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `primary_action` (`TEXT`, nullable) — Primary action Amazon recommends for this stranded inventory.
- `date_stranded` (`DATE`, nullable) — Date the inventory became stranded.
- `date_to_take_auto_removal` (`DATE`, nullable) — Date Amazon will automatically remove the inventory if no action is taken.
- `status_primary` (`TEXT`, nullable)
- `status_secondary` (`TEXT`, nullable)
- `error_message` (`TEXT`, nullable)
- `stranded_reason` (`TEXT`, nullable) — Reason the inventory is stranded.
- `product_name` (`TEXT`, required)
- `condition` (`TEXT`, nullable)
- `fulfilled_by` (`TEXT`, nullable)
- `fulfillable_qty` (`NUMBER`, nullable)
- `your_price` (`NUMBER`, nullable)
- `unfulfillable_qty` (`NUMBER`, nullable)
- `reserved_quantity` (`NUMBER`, nullable)
- `inbound_shipped_qty` (`NUMBER`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
