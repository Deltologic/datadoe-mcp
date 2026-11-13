# DSP Performance by Supply Source & Date

- BigQuery table name: `amazon_ads_dsp_performance_by_supply_source_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP performance per advertiser, date, and supply source (inventory exchange or publisher). Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. Advertiser level: there is no order or line item breakdown. ad_currency is null because Amazon does not return a currency in this report; monetary values are in the currency of the marketplace.

- Source type: `AMAZON_ADS`
- Source ID: `df5510ac92fcb5cea50d739af440a9cc98e3555d80806a4de67f21994a25652a`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=df5510ac92fcb5cea50d739af440a9cc98e3555d80806a4de67f21994a25652a

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_WEEKLY` (28 days)
- `RECURRING_MONTHLY` (56 days)

## Search aliases

- dsp
- amazon dsp
- dsp inventory
- supply source

## Columns (40)

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
- `dsp_supply_source` (`TEXT`, nullable) — Supply source (inventory exchange or publisher) as reported by Amazon DSP.
- `ad_currency` (`TEXT`, nullable) — Always null: Amazon does not return a currency in this report. Monetary values are in the currency of the marketplace.
- `ad_impressions` (`NUMBER`, required) — Amazon DSP impressions after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_viewable_impressions` (`NUMBER`, required) — Impressions that met the Amazon DSP viewability standard.
- `ad_clicks` (`NUMBER`, required) — Amazon DSP click-throughs after Amazon removed invalid traffic.
- `ad_spend` (`NUMBER`, required) — Amazon DSP totalCost: supply cost plus Amazon fees (ad_supply_cost + ad_fees_total), excluding third-party fees paid by the agency. In ad_currency.
- `ad_supply_cost` (`NUMBER`, required) — Amazon DSP media supply (inventory) cost, without fees. Included in ad_spend. In ad_currency.
- `ad_fees_total` (`NUMBER`, required) — Sum of all Amazon DSP fees. Included in ad_spend. In ad_currency.
- `ad_agency_fee` (`NUMBER`, required) — Agency fee reported by Amazon DSP. In ad_currency.
- `ad_sales` (`NUMBER`, required) — Attributed sales (DSP totalSales). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_sales_promoted` (`NUMBER`, required) — Attributed sales (DSP sales). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_orders` (`NUMBER`, required) — Attributed purchases (DSP totalPurchases). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_orders_promoted` (`NUMBER`, required) — Attributed purchases (DSP purchases). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_units_sold` (`NUMBER`, required) — Attributed units sold (DSP totalUnitsSold). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_units_sold_promoted` (`NUMBER`, required) — Attributed units sold (DSP unitsSold). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_sales_new_to_brand` (`NUMBER`, required) — New-to-brand sales (DSP totalNewToBrandSales): sales to customers who did not buy the brand in the past 12 months. Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_sales_new_to_brand_promoted` (`NUMBER`, required) — New-to-brand sales (DSP newToBrandProductSales). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_orders_new_to_brand` (`NUMBER`, required) — New-to-brand purchases (DSP totalNewToBrandPurchases). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_orders_new_to_brand_promoted` (`NUMBER`, required) — New-to-brand purchases (DSP newToBrandPurchases). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_detail_page_views` (`NUMBER`, required) — Attributed detail page views (DSP totalDetailPageView). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_detail_page_views_promoted` (`NUMBER`, required) — Attributed detail page views (DSP detailPageViews). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_add_to_cart` (`NUMBER`, required) — Attributed add-to-cart events (DSP totalAddToCart). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_add_to_cart_promoted` (`NUMBER`, required) — Attributed add-to-cart events (DSP addToCart). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_gross_impressions` (`NUMBER`, required) — Times the ad was displayed, including invalid traffic (fraudulent, non-human, and other illegitimate impressions). ad_impressions excludes that traffic.
- `ad_invalid_impressions` (`NUMBER`, required) — Impressions removed by the traffic quality filter. Not included in ad_impressions.
- `kindle_edition_normalized_pages_read` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read, attributed to the ad. A page count, not money. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.
- `kindle_edition_normalized_pages_read_from_clicks` (`NUMBER`, nullable) — Part of kindle_edition_normalized_pages_read attributed to ad clicks. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.
- `kindle_edition_normalized_pages_read_from_views` (`NUMBER`, nullable) — Part of kindle_edition_normalized_pages_read attributed to ad views. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
