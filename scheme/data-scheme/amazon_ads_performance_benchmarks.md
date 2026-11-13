# Ads Performance Benchmarks

- BigQuery table name: `amazon_ads_performance_benchmarks`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Sponsored Ads category benchmarks. One row compares a brand in a browse category with peer percentiles for one ad product, ad format, campaign goal, currency, and Amazon period. This is not Brand Metrics and not Amazon DSP. Amazon updates the figures about every 48 hours. DataDoe refreshes the latest 30 completed days, 4 completed weeks, and 2 completed months every 2 days. That refresh is a DataDoe choice, not an Amazon guarantee. The earliest period is the earliest one Amazon returned for the account. The account must represent the brand. Rates and percentiles are not additive. Do not average daily percentiles into a week or month.

- Source type: `AMAZON_ADS`
- Source ID: `e6921915580ae22f578b770e3b237090e05bcc48f8ac40a347932634f76eff9b`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=e6921915580ae22f578b770e3b237090e05bcc48f8ac40a347932634f76eff9b

## Fetch periods

- `INITIAL` (456 days)
- `RECURRING_DAILY` (30 days)

## Search aliases

- category benchmark
- peer percentile
- cross program benchmarks
- sponsored ads benchmark

## Columns (52)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `period_type` (`TEXT`, required) — Amazon period grain: DAILY, WEEKLY, or MONTHLY. Weekly and monthly rows use Amazon's own period. Do not build them by averaging daily rows.
- `period_start` (`DATE`, required) — First day of the period Amazon returned. For a daily row this is that date.
- `period_end` (`DATE`, required) — Last day of the period Amazon returned. For a daily row this is the same date as period_start.
- `campaign_country` (`TEXT`, nullable) — Country of the campaign, as returned by Amazon.
- `brand` (`TEXT`, nullable) — Brand name, as returned by Amazon. There is no stable brand id.
- `browse_category` (`TEXT`, nullable) — Browse category, as returned by Amazon. There is no stable category id.
- `ad_product` (`TEXT`, nullable) — Ad product on this row, such as Sponsored Products. The report request asks for all Sponsored Ads products together. This is not Amazon DSP.
- `ad_format` (`TEXT`, nullable) — Ad format, as returned by Amazon.
- `campaign_goal` (`TEXT`, nullable) — Campaign goal, as returned by Amazon.
- `peer_set_size` (`TEXT`, nullable) — Amazon returns this as text, for example "5-10". DataDoe stores that text. Empty when Amazon omits it. Do not sum or average it.
- `currency_code` (`TEXT`, nullable) — Currency of the money measures, as returned by Amazon.
- `source_report_id` (`TEXT`, required) — DataDoe id of the completed report that stored this row.
- `synced_at` (`DATE`, required) — When DataDoe stored this row from a completed report.
- `percent_of_purchases_new_to_brand` (`NUMBER`, nullable) — This brand's percent of purchases new to brand for the period. This is the brand's own value, not a peer percentile. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `percent_of_purchases_new_to_brand_p25` (`NUMBER`, nullable) — 25th percentile of percent of purchases new to brand among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `percent_of_purchases_new_to_brand_p50` (`NUMBER`, nullable) — Median percent of purchases new to brand among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `percent_of_purchases_new_to_brand_p75` (`NUMBER`, nullable) — 75th percentile of percent of purchases new to brand among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `new_to_brand_purchase_rate` (`NUMBER`, nullable) — This brand's new-to-brand purchase rate for the period. This is the brand's own value, not a peer percentile. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `new_to_brand_purchase_rate_p25` (`NUMBER`, nullable) — 25th percentile of new-to-brand purchase rate among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `new_to_brand_purchase_rate_p50` (`NUMBER`, nullable) — Median new-to-brand purchase rate among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `new_to_brand_purchase_rate_p75` (`NUMBER`, nullable) — 75th percentile of new-to-brand purchase rate among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `ctr` (`NUMBER`, nullable) — This brand's click-through rate for the period. This is the brand's own value, not a peer percentile. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `ctr_p25` (`NUMBER`, nullable) — 25th percentile of click-through rate among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `ctr_p50` (`NUMBER`, nullable) — Median click-through rate among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `ctr_p75` (`NUMBER`, nullable) — 75th percentile of click-through rate among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `completion_rate_video_ad` (`NUMBER`, nullable) — This brand's video ad completion rate for the period. This is the brand's own value, not a peer percentile. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `completion_rate_video_ad_p25` (`NUMBER`, nullable) — 25th percentile of video ad completion rate among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `completion_rate_video_ad_p50` (`NUMBER`, nullable) — Median video ad completion rate among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `completion_rate_video_ad_p75` (`NUMBER`, nullable) — 75th percentile of video ad completion rate among the category peers. This is not the brand's own value. Amazon does not document whether this is a 0 to 1 ratio or a 0 to 100 percentage. DataDoe does not rescale it. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cost_per_new_to_brand_purchase` (`NUMBER`, nullable) — This brand's cost per new-to-brand purchase for the period. This is the brand's own value, not a peer percentile. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cost_per_new_to_brand_purchase_p25` (`NUMBER`, nullable) — 25th percentile of cost per new-to-brand purchase among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cost_per_new_to_brand_purchase_p50` (`NUMBER`, nullable) — Median cost per new-to-brand purchase among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cost_per_new_to_brand_purchase_p75` (`NUMBER`, nullable) — 75th percentile of cost per new-to-brand purchase among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cpc` (`NUMBER`, nullable) — This brand's cost per click for the period. This is the brand's own value, not a peer percentile. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cpc_p25` (`NUMBER`, nullable) — 25th percentile of cost per click among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cpc_p50` (`NUMBER`, nullable) — Median cost per click among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cpc_p75` (`NUMBER`, nullable) — 75th percentile of cost per click among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cpm` (`NUMBER`, nullable) — This brand's cost per thousand impressions for the period. This is the brand's own value, not a peer percentile. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cpm_p25` (`NUMBER`, nullable) — 25th percentile of cost per thousand impressions among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cpm_p50` (`NUMBER`, nullable) — Median cost per thousand impressions among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cpm_p75` (`NUMBER`, nullable) — 75th percentile of cost per thousand impressions among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cost_per_completed_view_video_ad` (`NUMBER`, nullable) — This brand's cost per completed video view for the period. This is the brand's own value, not a peer percentile. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cost_per_completed_view_video_ad_p25` (`NUMBER`, nullable) — 25th percentile of cost per completed video view among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cost_per_completed_view_video_ad_p50` (`NUMBER`, nullable) — Median cost per completed video view among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.
- `cost_per_completed_view_video_ad_p75` (`NUMBER`, nullable) — 75th percentile of cost per completed video view among the category peers. This is not the brand's own value. Amount in currency_code. DataDoe keeps Amazon's decimal and does not convert currency. Not additive. Empty when Amazon omits or suppresses the value. A missing value is not zero.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
