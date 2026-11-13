# Search Term Impression Share

- BigQuery table name: `amazon_ads_search_term_impression_share_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Daily account-wide search impression share and rank for Sponsored Products and Sponsored Brands. One row is one Ads connection, advertiser account, ad product, search term, date, and occurrence. A global advertiser account covers several marketplaces, and Amazon reports a search term once per marketplace without saying which one: a term with search_term_occurrences above 1 ran in several marketplaces of the account. Every Ads connection of the same advertiser account holds a copy of the account's rows; to count an account once across all sellers and vendors of the Organization, filter is_account_primary_copy = TRUE. Do not use that filter for one seller or vendor or a subset of them: the marked copy can belong to a connection outside the selection. marketplace_id is the marketplace of the connection that fetched the account's report, not of the row. impression_share is Amazon's percentage from 0% to 100%, not a ratio from 0 to 1. impression_share_rank is a positive whole number when Amazon sends it. Do not add shares or average ranks across dates, accounts, or search terms. This is not ad_top_of_search_impression_share on a keyword, and it is not amazon_ads_recommendation_snapshots. Sponsored Display, Sponsored Television, and Full-Funnel are not included. A product with no rows does not have 0% share. The first fetch covers the latest 30 completed days in the advertiser account's Ads reporting time zone. A refresh every two days covers the latest 21 completed days and replaces those days, including search terms that are no longer in the file and dates with no rows. Today is not included. The marketplace time zone is used only when the reporting time zone is not stored.

- Source type: `AMAZON_ADS`
- Source ID: `6d049f13217b7ccb19df053b6623f79e1b447b3a95ea13c35afb3725e40e6e9d`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=6d049f13217b7ccb19df053b6623f79e1b447b3a95ea13c35afb3725e40e6e9d

## Fetch periods

- `INITIAL` (30 days)
- `RECURRING_DAILY` (21 days)

## Search aliases

- impression share
- search term rank
- share of voice

## Columns (17)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — Amazon's reporting date in the advertiser account's Ads reporting time zone. Today is not included. The marketplace time zone is used only when the reporting time zone is not stored.
- `advertiser_account_id` (`TEXT`, required) — Amazon Ads advertiser account id (advertiserAccount.id). Not the numeric Ads profile id.
- `ad_product` (`TEXT`, required) — Sponsored Products or Sponsored Brands, using Amazon's report label. A missing product is not 0% share.
- `search_term` (`TEXT`, required) — Customer search term exactly as Amazon reported it. Not a keyword, target, or campaign.
- `search_term_occurrence` (`NUMBER`, required) — Number of this row among the rows Amazon returned for the same search term and date of the advertiser account, from 1. Rows are ordered by the best rank, then the higher share. The marketplace of each row is unknown.
- `search_term_occurrences` (`NUMBER`, required) — How many rows Amazon returned for this search term and date of the advertiser account. Above 1 means the term ran in several marketplaces of a global account.
- `is_account_primary_copy` (`LOGIC`, required) — TRUE for the copy of one Ads connection per advertiser account, ad product, and date, chosen across the whole Organization (the latest import, then the lowest connection ID). Every connection of the account holds the same rows. Filter TRUE only to count the account once across all sellers and vendors of the Organization. Do not filter on it for one seller or vendor or a subset of them: the TRUE copy can belong to a connection outside the selection, and the account would then have no rows.
- `impression_share` (`NUMBER`, nullable) — Search impression share for this account, ad product, search term, date, and occurrence. A percentage from 0% to 100%, not a ratio from 0 to 1. Null when Amazon omits it. Do not add shares across rows. Not ad_top_of_search_impression_share.
- `impression_share_rank` (`NUMBER`, nullable) — Search impression share rank for this account, ad product, search term, date, and occurrence. A positive whole number when Amazon sends it. Null when Amazon omits it. Do not average ranks across rows.
- `synced_at` (`DATE`, required) — When DataDoe stored this completed report slice.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
