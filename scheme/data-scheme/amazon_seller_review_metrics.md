# Seller Product Ratings and Reviews

- BigQuery table name: `amazon_seller_review_metrics`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Product star ratings and review counts by child ASIN, marketplace, and period for a Seller Central account. This is not buyer feedback left for the seller, and it does not include review text. Review counts cover the returned period. Ratings are the product rating at the snapshot, not new reviews in that period. date is the start of the period Amazon returned. A week or month stays one row. An empty metric means Amazon did not return a value. It is not a confirmed zero. A stored review count of zero is a real zero. An empty total_rating_count with empty ratings means Amazon returned no rating snapshot for that ASIN and period, not that the product has no ratings. Initial collection covers 365 days of activity and 12 completed calendar months of rating snapshots. Activity refreshes cover seven days daily and 31 days every 30 days in batches of at most seven days with DAY output. Amazon returns the star rating for a completed calendar month. A single day does not include the star rating. Amazon returns rating snapshots for only some ASINs, and for some accounts a completed month has no products. Such a month adds no MONTH row. The latest completed month refreshes every day. Two completed months refresh every 30 days. Amazon does not return the calendar month that is still in progress.

- Source type: `SELLER_CENTRAL`
- Source ID: `cf005ac3eda90ca81af3080d6768a304e700badd171dda35c38a059a90b75bae`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=cf005ac3eda90ca81af3080d6768a304e700badd171dda35c38a059a90b75bae

## Fetch periods

- `INITIAL` (365 days, shifted by 2 days)
- `RECURRING_DAILY` (7 days, shifted by 2 days)
- `RECURRING_MONTHLY` (31 days, shifted by 2 days)

## Data availability

- `INTRADAY` — Review counts and rating snapshots are generally ready at 10am in the marketplace time zone, two days after the period. A later refresh can restate recent days. Refresh: 10am.

## Prerequisites

Requires a Seller Central connection. Vendor Central does not provide these product ratings and review counts.

## Search aliases

- product rating
- star rating
- review count
- critical reviews

## Columns (19)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required) — Child ASIN from Seller Analytics. Rows are not grouped by parent ASIN, SKU, brand, or fulfillment channel.
- `date` (`DATE`, required) — Start of the period Amazon returned. For a week or month, this is the period start, not one day inside that period.
- `period_start_date` (`DATE`, required) — Start of the period Amazon returned. Same value as date.
- `period_end_date` (`DATE`, required) — End of the period Amazon returned.
- `aggregation` (`TEXT`, required) — DAY, WEEK, or MONTH. Do not mix aggregations when you add review counts.
- `display_rating` (`NUMBER`, nullable) — Rounded product-page star rating, from 1 to 5. This is a snapshot, not reviews received in the period. Do not sum across periods.
- `raw_rating` (`NUMBER`, nullable) — Unrounded product star rating, from 1 to 5. This is a snapshot, not reviews received in the period. Do not sum across periods.
- `total_rating_count` (`NUMBER`, nullable) — Number of ratings included in the rating snapshot. Not the number of new reviews in the period. Do not sum across periods. Empty when Amazon returned no rating snapshot; Amazon sends a count of 0 without a star rating in that case, which is not a real zero.
- `total_review_count` (`NUMBER`, nullable) — Reviews received in the returned period. Add counts only for non-overlapping periods with the same aggregation.
- `low_rating_review_count` (`NUMBER`, nullable) — Critical reviews received in the returned period. This is a count, not the text of those reviews. Add counts only for non-overlapping periods with the same aggregation.
- `critical_review_rate` (`NUMBER`, nullable) — Fraction from 0 to 1 of period reviews that are critical. Do not average this rate across rows. For compatible periods, divide the summed low-rating review count by the summed review count.
- `activity_last_seen_at` (`DATE`, nullable) — Latest successful import of the review-count values for this row.
- `rating_last_seen_at` (`DATE`, nullable) — Latest successful import of the rating snapshot for this row. Set even when Amazon returned no rating, so it does not mean a rating is present.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
