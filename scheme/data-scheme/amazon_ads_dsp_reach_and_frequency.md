# DSP Reach & Frequency

- BigQuery table name: `amazon_ads_dsp_reach_and_frequency`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP reach and average frequency per advertiser and report period. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. Each row summarizes one period (period_start_date to period_end_date): a 30-day window on the first fetch, then 1-day windows. Periods can overlap. Reach and frequency are not additive: never sum or average them across rows or periods; pick one period.

- Source type: `AMAZON_ADS`
- Source ID: `e12169f83e0710ddfe562e55ea62c32e0aa83f1accfc31eae1ee1e84befb8747`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=e12169f83e0710ddfe562e55ea62c32e0aa83f1accfc31eae1ee1e84befb8747

## Fetch periods

- `INITIAL` (30 days)
- `RECURRING_DAILY` (4 days)

## Search aliases

- dsp
- amazon dsp
- reach
- frequency

## Columns (17)

- `marketplace_id` (`TEXT`, required) — Amazon marketplace of the DataDoe DSP slot the advertiser is fetched for.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier the DSP advertiser is mapped to, used by MCP/API calls (sellers_and_vendors_list, exports). Null when the advertiser is not mapped to a seller or vendor.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name of the mapped seller or vendor. Null when the advertiser is not mapped.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon selling partner id of the mapped seller. Null for vendors, unmapped advertisers, and contexts without a seller id.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `dsp_advertiser_id` (`TEXT`, required) — Amazon DSP advertiser identifier. Join amazon_sellers_and_vendors_context on organization_id, store_id, ads_dsp_connection_id = ads_connection_id, and dsp_advertiser_id.
- `dsp_advertiser_name` (`TEXT`, nullable) — Amazon DSP advertiser name.
- `date` (`DATE`, required) — Start of the requested report period. Same value as period_start_date. Not a daily date: rows are summaries of the whole period.
- `dt_created` (`DATE`, required) — Timestamp when DataDoe first stored this row.
- `dt_updated` (`DATE`, required) — Timestamp when DataDoe last updated this row.
- `period_start_date` (`DATE`, required) — First day of the requested report period. Same value as date.
- `period_end_date` (`DATE`, nullable) — Last day of the requested report period. May be null for rows fetched before DataDoe stored the period end.
- `period_days` (`NUMBER`, nullable) — Number of days in the requested report period, including both ends. Null when period_end_date is null.
- `ad_reach` (`NUMBER`, required) — Unique users reached by the advertiser in the period. Not additive across rows or periods.
- `ad_frequency_average` (`NUMBER`, required) — Average number of impressions per reached user in the period. Not additive across rows or periods.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
