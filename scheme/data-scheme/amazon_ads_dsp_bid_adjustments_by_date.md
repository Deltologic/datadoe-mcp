# DSP Bid Adjustments by Date

- BigQuery table name: `amazon_ads_dsp_bid_adjustments_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP bid adjustment rule activity per advertiser, date, line item, bid adjustment rule, and matched terms. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Only line items that use bid adjustment rules have rows; the table is empty for advertisers without bid adjustments. ad_win_rate and ad_match_rate are rates: never sum them across rows.

- Source type: `AMAZON_ADS`
- Source ID: `60db932e1e7da5b17a2a0c7449493ab48ca4806fe8e5f2fddad31e9c93d77e83`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=60db932e1e7da5b17a2a0c7449493ab48ca4806fe8e5f2fddad31e9c93d77e83

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (28 days)
- `RECURRING_MONTHLY` (56 days)

## Search aliases

- dsp
- amazon dsp
- bid adjustment
- bid multiplier

## Columns (25)

- `marketplace_id` (`TEXT`, required) — Amazon marketplace of the DataDoe DSP slot the advertiser is fetched for.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier the DSP advertiser is mapped to, used by MCP/API calls (sellers_and_vendors_list, exports). Null when the advertiser is not mapped to a seller or vendor.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name of the mapped seller or vendor. Null when the advertiser is not mapped.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon selling partner id of the mapped seller. Null for vendors, unmapped advertisers, and contexts without a seller id.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `dsp_advertiser_id` (`TEXT`, required) — Amazon DSP advertiser identifier. Join amazon_sellers_and_vendors_context on organization_id, store_id, ads_dsp_connection_id = ads_connection_id, and dsp_advertiser_id.
- `dsp_advertiser_name` (`TEXT`, nullable) — Amazon DSP advertiser name.
- `date` (`DATE`, required) — Report date (Amazon DSP daily report).
- `dt_created` (`DATE`, required) — Timestamp when DataDoe first stored this row.
- `dt_updated` (`DATE`, required) — Timestamp when DataDoe last updated this row.
- `dsp_order_id` (`TEXT`, required) — Amazon DSP order identifier. An order is a campaign in the new Amazon DSP naming.
- `dsp_order_name` (`TEXT`, nullable) — Amazon DSP order (campaign) name.
- `dsp_line_item_id` (`TEXT`, required) — Amazon DSP line item identifier. A line item is an ad group in the new Amazon DSP naming.
- `dsp_line_item_name` (`TEXT`, nullable) — Amazon DSP line item (ad group) name.
- `dsp_bid_adjustment_rule_id` (`TEXT`, required) — Amazon DSP bid adjustment rule identifier.
- `dsp_bid_adjustment_rule_name` (`TEXT`, nullable) — Bid adjustment rule as reported by Amazon DSP.
- `dsp_bid_adjustment_rule_version_id` (`TEXT`, nullable) — Version of the bid adjustment rule that was applied.
- `dsp_bid_adjustment_matched_term_ids` (`TEXT`, nullable) — Identifiers of the rule terms the bids matched, as one value reported by Amazon DSP.
- `dsp_bid_adjustment_matched_terms` (`TEXT`, nullable) — Rule terms the bids matched, as reported by Amazon DSP.
- `dsp_bid_adjustment` (`NUMBER`, nullable) — Bid adjustment applied by the rule, as reported by Amazon DSP.
- `ad_bids` (`NUMBER`, nullable) — Number of bids placed with this rule and matched terms. A count.
- `ad_win_rate` (`NUMBER`, nullable) — Share of the bids that won the auction, as reported by Amazon DSP. A rate, not additive.
- `ad_match_rate` (`NUMBER`, nullable) — Match rate of the rule terms, as reported by Amazon DSP. A rate, not additive.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
