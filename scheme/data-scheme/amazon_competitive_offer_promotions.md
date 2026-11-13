# Competitive Offer Promotions

- BigQuery table name: `amazon_competitive_offer_promotions`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

One row for each promotion Amazon returned on a featured or lowest-priced offer in the current competitive summary snapshot. The same offer can appear in both sections, so rows are not unique promotion IDs. An empty result does not show that the ASIN has no promotions. last_seen_at is the observation time of the parent snapshot.

- Source type: `SELLER_CENTRAL`
- Source ID: `3cdbda5b23cf8918cc55466c30e3ff14c677c9a4a8d7cd8f971d01440fbb27c3`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=3cdbda5b23cf8918cc55466c30e3ff14c677c9a4a8d7cd8f971d01440fbb27c3

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_LISTINGS_COMPETITIVE_SUMMARY_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (30)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `asin` (`TEXT`, required)
- `offer_source` (`TEXT`, required) — featuredBuyingOptions or lowestPricedOffers.
- `offer_group_index` (`NUMBER`, required) — Zero-based position of the buying option or lowest-priced group.
- `offer_index` (`NUMBER`, required) — Zero-based position of the offer in that group.
- `promotion_index` (`NUMBER`, required) — Zero-based position of the promotion in that offer.
- `buying_option_type` (`TEXT`, nullable) — Featured group buyingOptionType. Empty for lowest-priced offers.
- `item_condition` (`TEXT`, nullable) — Offer condition. For a lowest-priced offer with no condition, this is lowestPricedOffersInput.itemCondition.
- `offer_type` (`TEXT`, nullable) — lowestPricedOffersInput.offerType. Empty for featured offers.
- `offer_seller_id` (`TEXT`, nullable)
- `fulfillment_type` (`TEXT`, nullable)
- `featured_offer_segments` (`JSON`, nullable) — Featured offer segments. Empty for lowest-priced offers.
- `promotion_type` (`TEXT`, required) — Amazon promotionType. Known values include COUPON, DEAL, and BASKET_BUILDING. Other values are kept.
- `discount_type` (`TEXT`, nullable)
- `discount_amount` (`NUMBER`, nullable)
- `discount_currency_code` (`TEXT`, nullable)
- `discount_percentage` (`NUMBER`, nullable) — Amazon percentOff on a 0 to 100 scale. 10 means 10%.
- `discounted_price` (`NUMBER`, nullable)
- `discounted_price_currency_code` (`TEXT`, nullable)
- `purchase_requirement_type` (`TEXT`, nullable) — Purchase requirement type. When Amazon sends both a quantity threshold and a spend threshold, this is the quantity threshold type.
- `minimum_quantity` (`NUMBER`, nullable)
- `minimum_spend_amount` (`NUMBER`, nullable)
- `minimum_spend_currency_code` (`TEXT`, nullable)
- `promotion_payload` (`JSON`, required) — Complete original promotion object returned by Amazon.
- `last_seen_at` (`DATE`, required) — Time of the successful competitive summary fetch that contained this promotion. This is the observation time. It is not a promotion start time or end time.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
