# Ads Billing Statements

- BigQuery table name: `amazon_ads_billing_statements`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Ads billing statement requests. One row per statement. Each statement covers the previous 30 complete UTC days, so the next statement repeats invoices. date is the day DataDoe requested the statement. Use the row where is_current is true. This is request metadata, not a list of charges. The download link from Amazon is not stored. is_provisional is false when the verified German statement columns were read.

- Source type: `AMAZON_ADS`
- Source ID: `47b90a1271283867ad3d1e87cf4aea5b80ec69c388d41b7647121c6128e640d4`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=47b90a1271283867ad3d1e87cf4aea5b80ec69c388d41b7647121c6128e640d4

## Fetch periods

- `CONTINUOUS`

## Search aliases

- billing statement
- ads statement

## Columns (26)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — Day DataDoe requested the statement.
- `statement_request_id` (`TEXT`, required)
- `amazon_ads_account_id` (`TEXT`, required) — Amazon Ads advertiser account id. This is not the profile id.
- `period_start_date` (`DATE`, required) — First day covered by the statement.
- `period_end_date` (`DATE`, required) — Last day covered by the statement.
- `locale` (`TEXT`, required)
- `format` (`TEXT`, required) — CSV.
- `country_codes` (`JSON`, nullable) — Country filter sent to Amazon. Null when DataDoe did not filter by country.
- `report_status` (`TEXT`, required) — IN_PROGRESS, SUCCESS or FAILED. SUCCESS means the file was downloaded and stored.
- `details` (`TEXT`, nullable) — Amazon or DataDoe note for this statement request. Null when there is none.
- `requested_at_utc` (`DATE`, required) — When DataDoe requested the statement.
- `last_checked_at_utc` (`DATE`, nullable) — When DataDoe last checked this statement request.
- `completed_at_utc` (`DATE`, nullable) — When DataDoe stored the statement file.
- `source_headers` (`JSON`, nullable) — Ordered CSV header from the statement. Null until the file is stored.
- `row_count` (`NUMBER`, nullable)
- `source_checksum_sha256` (`TEXT`, nullable)
- `is_provisional` (`LOGIC`, required) — True when the file is stored as source cells only. False when the verified German statement columns were read.
- `is_current` (`LOGIC`, required) — True for the latest stored SUCCESS statement on this Ads connection. Use this row when reading statement metadata. Older statements repeat the same invoices.
- `observed_at_utc` (`DATE`, required) — When DataDoe last stored this statement request.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
