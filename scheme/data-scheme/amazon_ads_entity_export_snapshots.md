# Ads Entity Export Snapshots

- BigQuery table name: `amazon_ads_entity_export_snapshots`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

One manifest per Ads family/profile export. Only COMPLETE, is_complete observations whose rows reached the warehouse appear in entity history. Empty complete files have zero rows. PARTIAL and FAILED files explain gaps.

- Source type: `AMAZON_ADS`
- Source ID: `046313e11ffd76422d4fbee10761c063e4ffaeb2d8e383f1b55428b8fc7e6b73`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=046313e11ffd76422d4fbee10761c063e4ffaeb2d8e383f1b55428b8fc7e6b73

## Fetch periods

- `CONTINUOUS`

## Columns (22)

- `marketplace_id` (`TEXT`, nullable)
- `snapshot_id` (`TEXT`, required)
- `source_export_id` (`TEXT`, nullable)
- `source_requested_at` (`DATE`, nullable) — Original export request time. Use this to order source observations.
- `checked_at` (`DATE`, nullable) — Export completion observation, not the exact time an entity changed.
- `checked_at_source` (`TEXT`, nullable)
- `snapshot_date` (`DATE`, nullable) — Completion observation date in the verified Amazon Ads reporting time zone. Null when that time zone is unavailable; checked_at still retains the actual observation time.
- `profile_id` (`TEXT`, nullable)
- `snapshot_kind` (`TEXT`, required) — OBSERVED. Only observations captured after enablement are retained.
- `imported_at` (`DATE`, nullable)
- `entity_type` (`TEXT`, required)
- `report_lifecycle_id` (`TEXT`, nullable)
- `reporting_timezone` (`TEXT`, nullable)
- `status` (`TEXT`, required)
- `is_complete` (`LOGIC`, required)
- `source_element_count` (`NUMBER`, nullable)
- `imported_row_count` (`NUMBER`, required)
- `rejected_row_count` (`NUMBER`, required)
- `completeness_reason` (`TEXT`, nullable)
- `published_at` (`DATE`, nullable)
- `dt_created` (`DATE`, nullable)
- `dt_updated` (`DATE`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
