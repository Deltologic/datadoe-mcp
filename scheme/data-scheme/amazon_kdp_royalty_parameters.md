# KDP Royalty Parameters

- BigQuery table name: `amazon_kdp_royalty_parameters`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

KDP royalty parameters per book edition, Ads connection and effective period, managed by the user in the DataDoe app, API or MCP. Used to estimate author royalties in amazon_ads_book_economics_by_entity_and_date.

- Source type: `AMAZON_ADS`
- Source ID: `10788355fc7e398b903cf1395b6b15e0f867ee9e707be9d46478dc5be906408b`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: yes
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=10788355fc7e398b903cf1395b6b15e0f867ee9e707be9d46478dc5be906408b

## Columns (29)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `asin` (`TEXT`, required) — ASIN of the book edition.
- `book_work_id` (`TEXT`, nullable) — User-defined ID that groups the editions of one book.
- `book_format` (`TEXT`, required) — EBOOK / PAPERBACK / HARDCOVER / AUDIOBOOK.
- `currency_code` (`TEXT`, required) — Currency of all money values of the row.
- `distribution_channel` (`TEXT`, required) — AMAZON / EXPANDED_DISTRIBUTION.
- `from` (`DATE`, required) — Same value as effective_from.
- `effective_from` (`DATE`, required) — First day the parameters apply.
- `effective_to` (`DATE`, nullable) — Last day the parameters apply: the day before the next effective_from of the same edition and channel. Null when open-ended.
- `list_price_ex_tax` (`NUMBER`, nullable) — List price excluding tax.
- `royalty_rate` (`NUMBER`, nullable) — Royalty rate as a fraction, not percent.
- `ebook_royalty_option` (`TEXT`, nullable) — SEVENTY_PERCENT / THIRTY_FIVE_PERCENT. Ebooks only.
- `delivery_cost_per_unit` (`NUMBER`, nullable) — Ebook delivery cost per unit.
- `printing_cost_per_unit` (`NUMBER`, nullable) — Print cost per unit for paperbacks and hardcovers.
- `estimated_royalty_per_unit` (`NUMBER`, nullable) — Royalty per unit sold, provided by the user or estimated with KDP rules (see calculation_method).
- `calculation_method` (`TEXT`, required) — PROVIDED_PER_UNIT / KDP_RULE_ESTIMATE.
- `ku_page_rate` (`NUMBER`, nullable) — Kindle Unlimited royalty per KENP page.
- `ku_rate_month` (`DATE`, nullable) — Month that ku_page_rate refers to.
- `audio_royalty_per_unit` (`NUMBER`, nullable) — Audiobook royalty per unit.
- `assumption_source` (`TEXT`, required) — KDP_EXPORT / USER_CONFIGURATION.
- `source_reference` (`TEXT`, nullable) — Free-text reference to the source of the parameters.
- `created_at` (`DATE`, required)
- `updated_at` (`DATE`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
