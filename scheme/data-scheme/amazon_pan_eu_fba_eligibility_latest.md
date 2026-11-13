# Pan-European FBA eligibility latest

- BigQuery table name: `amazon_pan_eu_fba_eligibility_latest`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Every product row from the newest complete Pan-European report whose rows have already been exported for the source marketplace. A product absent from that report is absent here. Older reports remain in the history table.

- Source type: `SELLER_CENTRAL`
- Source ID: `ab2fda00c7e681429fdece6530e3e1a1dff79d0f680739a918585f3eef789b65`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=ab2fda00c7e681429fdece6530e3e1a1dff79d0f680739a918585f3eef789b65

## Fetch periods

- `INITIAL` (1 days)
- `RECURRING_DAILY` (1 days)

## Data availability

- `INTRADAY` — DataDoe requests one report a day at 2am in the source marketplace time zone. A request after 2am still covers that local day, and later days return to 2am. Amazon can take up to 24 hours to generate the file. Rows appear after Amazon generates the file and after DataDoe imports and exports it. History starts with the first collected report. A day with no report stays empty. Refresh: 2am.

## Search aliases

- pan-eu current
- latest fba eligibility

## Columns (47)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `snapshot_date` (`DATE`, required) — Snapshot date in the source marketplace time zone, from the time Amazon created the report.
- `checked_at` (`DATE`, required) — Time Amazon created the report. When Amazon omits that time, this is the time DataDoe requested it.
- `imported_at` (`DATE`, required) — Time DataDoe stored this report.
- `report_id` (`TEXT`, required)
- `report_type` (`TEXT`, required)
- `sku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `title` (`TEXT`, nullable)
- `pan_eu_status` (`TEXT`, nullable) — Pan-EU status as Amazon reported it. Unknown values stay as reported.
- `product_comments` (`TEXT`, nullable)
- `enrol` (`TEXT`, nullable) — Amazon Enrol cell. A blank cell is empty. DataDoe stores the text and does not send an enrolment change.
- `fnsku` (`TEXT`, nullable)
- `enrollment_date` (`DATE`, nullable)
- `last_active_on` (`DATE`, nullable)
- `pan_eu_expires_on` (`DATE`, nullable)
- `present_country_codes` (`TEXT`, required) — Destination country groups present in the file. A blank group is present. A missing header is absent.
- `uk_offer_status` (`TEXT`, nullable) — UK offer status as Amazon reported it. A blank cell is empty.
- `uk_paneu_benefits` (`TEXT`, nullable) — UK Pan-EU benefits as Amazon reported them. A blank cell is empty.
- `uk_snl_status` (`TEXT`, nullable) — UK SnL status as Amazon reported it. A blank cell is empty.
- `de_offer_status` (`TEXT`, nullable) — DE offer status as Amazon reported it. A blank cell is empty.
- `de_paneu_benefits` (`TEXT`, nullable) — DE Pan-EU benefits as Amazon reported them. A blank cell is empty.
- `de_snl_status` (`TEXT`, nullable) — DE SnL status as Amazon reported it. A blank cell is empty.
- `fr_offer_status` (`TEXT`, nullable) — FR offer status as Amazon reported it. A blank cell is empty.
- `fr_paneu_benefits` (`TEXT`, nullable) — FR Pan-EU benefits as Amazon reported them. A blank cell is empty.
- `fr_snl_status` (`TEXT`, nullable) — FR SnL status as Amazon reported it. A blank cell is empty.
- `it_offer_status` (`TEXT`, nullable) — IT offer status as Amazon reported it. A blank cell is empty.
- `it_paneu_benefits` (`TEXT`, nullable) — IT Pan-EU benefits as Amazon reported them. A blank cell is empty.
- `it_snl_status` (`TEXT`, nullable) — IT SnL status as Amazon reported it. A blank cell is empty.
- `es_offer_status` (`TEXT`, nullable) — ES offer status as Amazon reported it. A blank cell is empty.
- `es_paneu_benefits` (`TEXT`, nullable) — ES Pan-EU benefits as Amazon reported them. A blank cell is empty.
- `es_snl_status` (`TEXT`, nullable) — ES SnL status as Amazon reported it. A blank cell is empty.
- `nl_offer_status` (`TEXT`, nullable) — NL offer status as Amazon reported it. A blank cell is empty.
- `nl_paneu_benefits` (`TEXT`, nullable) — NL Pan-EU benefits as Amazon reported them. A blank cell is empty.
- `se_offer_status` (`TEXT`, nullable) — SE offer status as Amazon reported it. A blank cell is empty.
- `se_paneu_benefits` (`TEXT`, nullable) — SE Pan-EU benefits as Amazon reported them. A blank cell is empty.
- `pl_offer_status` (`TEXT`, nullable) — PL offer status as Amazon reported it. A blank cell is empty.
- `pl_paneu_benefits` (`TEXT`, nullable) — PL Pan-EU benefits as Amazon reported them. A blank cell is empty.
- `be_offer_status` (`TEXT`, nullable) — BE offer status as Amazon reported it. A blank cell is empty.
- `be_paneu_benefits` (`TEXT`, nullable) — BE Pan-EU benefits as Amazon reported them. A blank cell is empty.
- `ie_offer_status` (`TEXT`, nullable) — IE offer status as Amazon reported it. A blank cell is empty.
- `ie_paneu_benefits` (`TEXT`, nullable) — IE Pan-EU benefits as Amazon reported them. A blank cell is empty.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
