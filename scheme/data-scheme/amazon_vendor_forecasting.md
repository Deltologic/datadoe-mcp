# Weekly Customer Demand

- BigQuery table name: `amazon_vendor_forecasting`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Weekly forward customer-demand forecast per child ASIN from the Amazon Vendor Forecasting report. Each request returns only the latest forecast. DataDoe stores each weekly fetch as a snapshot keyed by date (forecast generation date). Amazon forecasts week 0 through week 47 from that date, so each snapshot has 48 forward weeks (start_forecasting_date and end_forecasting_date). The same week can appear on later snapshots. Filter to MAX(date) per child_asin and week for the current forecast. Rows are not additive across date snapshots.

- Source type: `VENDOR_CENTRAL`
- Source ID: `38bf00dd3a174c214a8450350ce9ec8cc27e612b2f699575787106f6a21db5b2`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=38bf00dd3a174c214a8450350ce9ec8cc27e612b2f699575787106f6a21db5b2

## Fetch periods

- `CONTINUOUS`

## Search aliases

- customer demand
- p70
- weekly forecast

## Columns (16)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `vendor_code` (`TEXT`, nullable) — Vendor code uploaded for this Vendor connection. ASIN-based tables prefer an ASIN upload. A SKU-only upload can match through Vendor Listings when the SKU maps to one ASIN and the inferred codes for that ASIN agree. Ambiguous matches stay null. Uploads label existing rows and do not identify stock location. To list ASINs sold in the last 30 days without a vendor code, use GET /api/v1/vendor-codes/missing or the MCP tool vendor_codes_missing_list.
- `start_forecasting_date` (`TEXT`, required) — Start of the forecast week, stored as STRING YYYY-MM-DD, not DATE.
- `end_forecasting_date` (`TEXT`, required) — End of the forecast week, stored as STRING YYYY-MM-DD, not DATE.
- `selling_program` (`TEXT`, required) — The selling program associated with the ASIN. Available values: RETAIL
- `weekly_forecast_mean_expected_customer_demand_units` (`NUMBER`, nullable) — Mean forecasted customer-demand units for the week. Does not include safety stock.
- `weekly_forecast_70_confidence_level_customer_demand_units` (`NUMBER`, nullable) — P70 customer-demand units: Amazon estimates demand will be at or below this value 70% of the time. Not a 0–1 probability.
- `weekly_forecast_80_confidence_level_customer_demand_units` (`NUMBER`, nullable) — P80 customer-demand units: Amazon estimates demand will be at or below this value 80% of the time. Not a 0–1 probability.
- `weekly_forecast_90_confidence_level_customer_demand_units` (`NUMBER`, nullable) — P90 customer-demand units: Amazon estimates demand will be at or below this value 90% of the time. Not a 0–1 probability.
- `date` (`DATE`, required) — Forecast-generation snapshot date (when DataDoe fetched the report). Filter to MAX(date) per child_asin and forecast week for the latest Amazon forecast.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
