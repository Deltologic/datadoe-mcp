# Seller Feedback

- BigQuery table name: `amazon_seller_feedback`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Negative and neutral feedback, with one to three stars, left for the seller by buyers. Buyer email, buyer comments, and seller responses become NULL after 30 days from the feedback date. Historical rows, order identifiers, dates, and ratings remain available.

- Source type: `SELLER_CENTRAL`
- Source ID: `2610a531e0170a7857c3edbc1d5b3dd5a7abf63ba7fbbb1997fce3e9a7421438`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=2610a531e0170a7857c3edbc1d5b3dd5a7abf63ba7fbbb1997fce3e9a7421438

## Fetch periods

- `INITIAL` (60 days)
- `RECURRING_DAILY` (60 days)

## Columns (12)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — Date the feedback was left.
- `amazon_order_id` (`TEXT`, required)
- `buyer_rating` (`NUMBER`, required) — Buyer star rating from 1 to 5.
- `buyer_comments` (`TEXT`, nullable)
- `buyer_email` (`TEXT`, nullable)
- `seller_response` (`TEXT`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
