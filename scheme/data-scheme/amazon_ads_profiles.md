# Ads Profiles

- BigQuery table name: `amazon_ads_profiles`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

One row per Amazon Ads connection with its Amazon Ads profile: account type and subtype (for example KDP_AUTHOR), country, currency, timezone and payment status. Profile columns are null until DataDoe captured the profile.

- Source type: `AMAZON_ADS`
- Source ID: `2cb8447d6f8a87eec209d1f9fc797f608b53f4d262d662c2098cda8409129b44`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=2cb8447d6f8a87eec209d1f9fc797f608b53f4d262d662c2098cda8409129b44

## Fetch periods

- `CONTINUOUS`

## Columns (17)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ads_account_id` (`TEXT`, nullable) — Amazon Ads account identifier.
- `ads_account_name` (`TEXT`, nullable) — Amazon Ads account name.
- `ads_account_type` (`TEXT`, nullable) — Amazon Ads profile account type: seller / vendor / agency. Null until DataDoe captured the profile.
- `ads_account_subtype` (`TEXT`, nullable) — Amazon Ads special account subtype, such as KDP_AUTHOR or AMAZON_ATTRIBUTION. Null for regular accounts and until DataDoe captured the profile.
- `is_kdp_author` (`LOGIC`, nullable) — True for a Kindle Direct Publishing author account (ads_account_subtype KDP_AUTHOR), false for other captured profiles. Null until DataDoe captured the profile.
- `ads_profile_country_code` (`TEXT`, nullable) — Country code of the Amazon Ads profile.
- `ads_profile_currency_code` (`TEXT`, nullable) — Currency of the Amazon Ads profile. Null until DataDoe captured the profile.
- `ads_profile_timezone` (`TEXT`, nullable) — IANA timezone of the Amazon Ads profile. Null until DataDoe captured the profile.
- `valid_payment_method` (`LOGIC`, nullable) — Whether the Amazon Ads account has a valid payment method.
- `observed_at_utc` (`DATE`, nullable) — Time DataDoe read the Amazon Ads profile.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
