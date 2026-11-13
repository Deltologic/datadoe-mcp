# Vendor Direct Fulfillment Shipping Labels

- BigQuery table name: `amazon_vendor_df_shipping_labels`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Vendor Direct Fulfillment shipping label metadata. One row per package. No label file and no customer address. The label file is available from AMAZON_VENDOR_DF_SHIPPING_LABEL_GET.

- Source type: `VENDOR_CENTRAL`
- Source ID: `bcafbe27c337d3772b8c71895ffda6d99b66dbcebf3ee93aa144987653e5a2f3`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=bcafbe27c337d3772b8c71895ffda6d99b66dbcebf3ee93aa144987653e5a2f3

## Fetch periods

- `INITIAL` (30 days)
- `CONTINUOUS`

## Data availability

- `REAL_TIME` — Orders are available up to 1 hour after being placed. Refresh: 10am, 1pm, 4pm, 7pm.

## Search aliases

- direct fulfillment labels
- df shipping labels

## Columns (16)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, nullable) — UTC day of the label creation window start (createdAfter).
- `purchase_order_number` (`TEXT`, required) — Amazon Direct Fulfillment purchase order number.
- `selling_party_id` (`TEXT`, nullable) — Vendor party id on the label.
- `ship_from_party_id` (`TEXT`, nullable) — Warehouse party id the label ships from.
- `label_format` (`TEXT`, nullable) — Label file format, PNG or ZPL. The file itself is not stored.
- `package_identifier` (`TEXT`, required) — Package id on the label. The first package is 001. Grain key with purchase_order_number.
- `tracking_number` (`TEXT`, nullable) — Carrier tracking number for this package.
- `ship_method` (`TEXT`, nullable) — Amazon ship method code for this package.
- `ship_method_name` (`TEXT`, nullable) — Ship method name for this package.
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the Vendor API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
