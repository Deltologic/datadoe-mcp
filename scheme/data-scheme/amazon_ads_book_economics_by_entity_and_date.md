# KDP Book Economics

- BigQuery table name: `amazon_ads_book_economics_by_entity_and_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Estimated KDP author earnings and profit after ads for Sponsored Products ads, ad groups and campaigns by date, using 14-day attribution. Only Ads connections with KDP royalty parameters for the AMAZON channel. Units are costed per purchased edition with the parameters effective on the date; KENP royalties are Amazon estimates. Estimates are provisional until is_attribution_mature_14d. Do not sum AD, AD_GROUP and CAMPAIGN rows together; filter one entity_type.

- Source type: `AMAZON_ADS`
- Source ID: `5e10c29e1e570d4959aadfba5aa1a7dc3f2b303d793c51591090552cf3b578d2`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=5e10c29e1e570d4959aadfba5aa1a7dc3f2b303d793c51591090552cf3b578d2

## Fetch periods

- `INITIAL` (60 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 10am, 1pm, 4pm.

## Columns (45)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_campaign_type` (`TEXT`, required) — Always SPONSORED_PRODUCTS.
- `entity_type` (`TEXT`, required) — AD / AD_GROUP / CAMPAIGN. AD_GROUP and CAMPAIGN rows roll up AD rows.
- `entity_id` (`TEXT`, required) — ad_id, ad_group_id or ad_campaign_id, per entity_type.
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, nullable)
- `ad_group_id` (`TEXT`, nullable) — Null on CAMPAIGN rows.
- `ad_group_name` (`TEXT`, nullable) — Null on CAMPAIGN rows.
- `ad_id` (`TEXT`, nullable) — Null on AD_GROUP and CAMPAIGN rows.
- `advertised_asin` (`TEXT`, nullable) — Null on AD_GROUP and CAMPAIGN rows.
- `date` (`DATE`, required) — Ad click date.
- `currency_code` (`TEXT`, nullable) — Currency of all money values of the row.
- `ad_spend` (`NUMBER`, nullable)
- `ad_clicks` (`NUMBER`, nullable)
- `ad_impressions` (`NUMBER`, nullable)
- `ad_sales_14d` (`NUMBER`, nullable) — Retail sales attributed within 14 days of a click, all editions.
- `ad_orders_14d` (`NUMBER`, nullable)
- `ad_units_sold_14d` (`NUMBER`, nullable) — Units attributed within 14 days of a click, all editions.
- `ad_sales_same_product_14d` (`NUMBER`, nullable) — Retail sales of the advertised edition only.
- `ad_units_same_product_14d` (`NUMBER`, nullable) — Units of the advertised edition only.
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read by Kindle Unlimited readers within 14 days of an ad click. A page count, not money. Null for books outside Kindle Unlimited.
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable) — Amazon estimate of the royalties for kindle_edition_normalized_pages_read_14d, in the Ads profile currency. Money, not pages. Null for books outside Kindle Unlimited.
- `profit_model` (`TEXT`, required) — Always KDP_ROYALTIES.
- `product_assignment_method` (`TEXT`, required) — How purchased editions are assigned to the ad: REPORTED_SINGLE_EDITION / REPORTED_PURCHASED_ASIN / ESTIMATED_MIX (other-edition units split evenly across ads sharing the advertised ASIN in the ad group) / UNSUPPORTED.
- `royalty_costed_units_14d` (`NUMBER`, required) — Units with a royalty-per-unit assumption.
- `royalty_cost_coverage_rate` (`NUMBER`, nullable) — Share of attributed units with a royalty assumption. Ratio, not percent; null without units. — definition: `min(royalty_costed_units_14d / ad_units_sold_14d, 1)`
- `royalty_estimate_status` (`TEXT`, required) — COMPLETE (all units costed) / PARTIAL (some units costed) / MISSING_ASSUMPTIONS.
- `estimated_sale_royalties_14d` (`NUMBER`, nullable) — Estimated royalties from attributed sales: units times royalty per unit of the purchased edition. Null when MISSING_ASSUMPTIONS.
- `ku_royalty_method` (`TEXT`, required) — KENP_API when Amazon reports KENP royalties, otherwise UNAVAILABLE.
- `estimated_ku_royalties_selected_14d` (`NUMBER`, nullable) — Kindle Unlimited royalties used in author earnings. — definition: `kindle_edition_normalized_pages_royalties_14d`
- `estimated_author_earnings_14d` (`NUMBER`, nullable) — Estimated author royalties from sales and Kindle Unlimited reads. — definition: `estimated_sale_royalties_14d + estimated_ku_royalties_selected_14d`
- `estimated_author_profit_after_ads_14d` (`NUMBER`, nullable) — definition: `estimated_author_earnings_14d - ad_spend`
- `royalty_roas_14d` (`NUMBER`, nullable) — Author earnings per unit of ad spend. Ratio. — definition: `estimated_author_earnings_14d / ad_spend`
- `royalty_acos_14d` (`NUMBER`, nullable) — Ad spend divided by author earnings. Ratio, not percent. — definition: `ad_spend / estimated_author_earnings_14d`
- `estimated_break_even_retail_acos_14d` (`NUMBER`, nullable) — Retail ACoS at which ad spend equals author earnings. Ratio, not percent. — definition: `estimated_author_earnings_14d / ad_sales_14d`
- `is_attribution_mature_14d` (`LOGIC`, required) — True when the report was refreshed at least 17 days after the date (14-day window plus 3 days for restatements).
- `mature_spend_without_author_earnings` (`NUMBER`, nullable) — ad_spend of mature COMPLETE rows that earned nothing; 0 when earnings are positive; null otherwise.
- `royalty_parameter_version` (`TEXT`, nullable) — Hash of the royalty parameter rows used. Changes when the parameters change. Null when none were used.
- `estimated_at_utc` (`DATE`, required) — Query time. The table computes estimates on read.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
