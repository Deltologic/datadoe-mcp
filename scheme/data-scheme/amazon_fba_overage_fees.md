# FBA Overage Fee Charges

- BigQuery table name: `amazon_fba_overage_fees`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Daily overage fee charges based on FBA storage usage limits.

- Source type: `SELLER_CENTRAL`
- Source ID: `d7716dee8fd10ff00f94a9d7fd4a0b0f74d6b6759e29a4ffca6ef4a0cb4816d9`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=d7716dee8fd10ff00f94a9d7fd4a0b0f74d6b6759e29a4ffca6ef4a0cb4816d9

## Fetch periods

- `INITIAL` (1 days)
- `RECURRING_DAILY` (1 days)

## Columns (16)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `charged_date` (`DATE`, required)
- `country_code` (`TEXT`, required)
- `storage_type` (`TEXT`, required) — Storage type enum values.
- `charge_rate` (`TEXT`, required) — Charge rate enum values.
- `storage_usage_volume` (`NUMBER`, required)
- `storage_limit_volume` (`NUMBER`, required)
- `overage_volume` (`NUMBER`, required)
- `volume_unit` (`TEXT`, required) — Volume unit enum values.
- `charged_fee_amount` (`NUMBER`, required)
- `currency` (`TEXT`, required) — Currency code.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
