# DSP Performance by Content

- BigQuery table name: `amazon_ads_dsp_performance_by_content`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP audio and video delivery (streaming TV, online video, audio) per advertiser, report period, order, line item, creative, supply source, and content (show title, rating, type, genre). Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Impressions and cost per thousand impressions only: Amazon does not report cost totals or conversions in this report. Rows are rolling 7-day summaries starting every day: never sum across different periods (summing all dates overcounts about 7 times); pick one period.

- Source type: `AMAZON_ADS`
- Source ID: `d2ebcf1754f977f0b40374d21137db21cb9c7771dbdd4b873f6c61420154e3a3`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=d2ebcf1754f977f0b40374d21137db21cb9c7771dbdd4b873f6c61420154e3a3

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (28 days)
- `RECURRING_MONTHLY` (56 days)

## Search aliases

- dsp
- amazon dsp
- streaming tv
- online video
- audio ads
- show title

## Columns (33)

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
- `dsp_order_id` (`TEXT`, required) — Amazon DSP order identifier. An order is a campaign in the new Amazon DSP naming.
- `dsp_order_name` (`TEXT`, nullable) — Amazon DSP order (campaign) name.
- `dsp_line_item_id` (`TEXT`, required) — Amazon DSP line item identifier. A line item is an ad group in the new Amazon DSP naming.
- `dsp_line_item_name` (`TEXT`, nullable) — Amazon DSP line item (ad group) name.
- `dsp_creative_id` (`TEXT`, required) — Amazon DSP creative identifier.
- `dsp_creative_name` (`TEXT`, nullable) — Amazon DSP creative name.
- `dsp_supply_source` (`TEXT`, nullable) — Supply source (inventory exchange or publisher) as reported by Amazon DSP.
- `dsp_supply_source_id` (`TEXT`, nullable) — Supply source identifier as reported by Amazon DSP.
- `dsp_content_show_title` (`TEXT`, nullable) — Title of the show or content the ad ran in, as reported by Amazon DSP.
- `dsp_content_rating` (`TEXT`, nullable) — Content rating of the show, as reported by Amazon DSP.
- `dsp_content_type` (`TEXT`, nullable) — Content type of the show, as reported by Amazon DSP.
- `dsp_content_genre` (`TEXT`, nullable) — Content genre of the show, as reported by Amazon DSP. Often null because Amazon does not report a genre for every content.
- `dsp_line_item_active_start_date` (`TEXT`, nullable) — First day this content row delivered within the period, as delivered by Amazon DSP. Not the requested period start.
- `dsp_line_item_active_end_date` (`TEXT`, nullable) — Last day this content row delivered within the period, as delivered by Amazon DSP. Not the requested period end.
- `ad_impressions` (`NUMBER`, required) — Amazon DSP impressions in the period for this content row, after Amazon removed invalid traffic. Not additive across periods.
- `ad_gross_impressions` (`NUMBER`, required) — Times the ad was displayed, including invalid traffic (fraudulent, non-human, and other illegitimate impressions). ad_impressions excludes that traffic.
- `ad_invalid_impressions` (`NUMBER`, required) — Impressions removed by the traffic quality filter. Not included in ad_impressions.
- `ad_cost_per_thousand_impressions` (`NUMBER`, nullable) — Cost per thousand impressions reported by Amazon DSP, in the order currency. A rate: weight by ad_impressions when combining rows, never sum it.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
