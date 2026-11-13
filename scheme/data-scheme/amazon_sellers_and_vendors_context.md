# Sellers & Vendors Context

- BigQuery table name: `amazon_sellers_and_vendors_context`
- Available in: Seller Central, Vendor Central, Amazon Ads
- Data scheme index: ../data-scheme.md

This table exists in 3 source types. Each section below describes one of them.

## Seller Central

Lookup of DataDoe Amazon accounts for Seller Central, Vendor Central, Amazon Ads, and Amazon DSP. One row per connection, plus one row per Amazon DSP advertiser mapped to a seller or vendor on a shared agency Ads account. A DSP-only agency seat is not its own seller. seller_or_vendor_id equals connection_context_id and is not unique: one context can have a Seller Central row, an Amazon Ads row, and one row per DSP advertiser. Join Seller Central and Vendor Central facts on sp_connection_id or vendor_connection_id. Attribute DSP facts on organization_id, store_id, ads_dsp_connection_id, and dsp_advertiser_id.

- Source type: `SELLER_CENTRAL`
- Source ID: `6cdde992a36bdedb6fbd17bbcd294941dbf55ac504302db9b232dc0887f1598a`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: no
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=6cdde992a36bdedb6fbd17bbcd294941dbf55ac504302db9b232dc0887f1598a

### Search aliases

- connection mapping
- selling partner id
- dsp advertiser
- ads profile
- billing permission

### Columns (18)

- `connection_context_id` (`TEXT`, required) — DataDoe connection context id, or the connection id when no context is set. Same value as seller_or_vendor_id. Not a unique row key when one context has several connections or DSP advertisers.
- `connection_context_name` (`TEXT`, required) — Context display name. Same value as seller_or_vendor_name. Falls back to the connection name, then the connection id. DSP rows use the mapped context name.
- `seller_or_vendor_id` (`TEXT`, required) — Same value as connection_context_id. DataDoe account id used by MCP and API calls (sellers_and_vendors_list, exports). Not unique on this table: repeated for each connection and each DSP advertiser in the context. Fact tables copy this value into their seller_or_vendor_id.
- `seller_or_vendor_name` (`TEXT`, required) — Same value as connection_context_name. DataDoe display name for the seller or vendor context.
- `ads_dsp_connection_id` (`TEXT`, nullable) — DataDoe Amazon Ads connection id of the account Amazon DSP is run from. One agency connection can be shared by several sellers or vendors. Null on non-DSP rows. Join DSP facts on organization_id, store_id, ads_dsp_connection_id, and dsp_advertiser_id.
- `dsp_advertiser_id` (`TEXT`, nullable) — Amazon DSP advertiser identifier mapped to this seller or vendor. One advertiser maps to one context. If an advertiser is reassigned, only the latest mapping is kept. Null on non-DSP rows.
- `selling_partner_id` (`TEXT`, nullable) — Amazon selling partner id from the connection (connection_seller_id). Same value as marketplace_seller_id. This is the Amazon id, not seller_or_vendor_id. Null on DSP advertiser rows and when the connection has no seller id.
- `marketplace_seller_id` (`TEXT`, nullable) — Same value as selling_partner_id: Amazon connection_seller_id. Null on DSP advertiser rows and when the connection has no seller id.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile id. Set on Amazon Ads connections and on DSP advertiser rows. Null on Seller Central and Vendor Central rows.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `ads_account_type` (`TEXT`, nullable) — Amazon Ads profile account type: seller / vendor / agency. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `ads_account_subtype` (`TEXT`, nullable) — Amazon Ads special account subtype, such as KDP_AUTHOR or AMAZON_ATTRIBUTION. Null for regular accounts and until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `is_kdp_author` (`LOGIC`, nullable) — True for a Kindle Direct Publishing author account (ads_account_subtype KDP_AUTHOR), false for other captured profiles. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `ads_profile_currency_code` (`TEXT`, nullable) — Currency of the Amazon Ads profile. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `ads_profile_timezone` (`TEXT`, nullable) — IANA timezone of the Amazon Ads profile. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `amazon_ads_reporting_timezone` (`TEXT`, nullable) — IANA timezone from the Amazon Ads profile, such as Europe/London. Null when it is not verified. Seller Central and Vendor Central rows are null. DSP rows use the agency Ads connection timezone, not a DSP advertiser timezone. There is no country or UTC fallback.
- `amazon_ads_reporting_timezone_source` (`TEXT`, required) — ADS_PROFILE when amazon_ads_reporting_timezone is verified. UNKNOWN when it is not.
- `ads_billing_permission_missing_at` (`DATE`, nullable) — When the last Ads Billing check for this connection was denied. Null when the last check succeeded, the connection is not Amazon Ads, or billing has not been checked. DSP advertiser rows are null.

## Vendor Central

Lookup of DataDoe Amazon accounts for Seller Central, Vendor Central, Amazon Ads, and Amazon DSP. One row per connection, plus one row per Amazon DSP advertiser mapped to a seller or vendor on a shared agency Ads account. A DSP-only agency seat is not its own seller. seller_or_vendor_id equals connection_context_id and is not unique: one context can have a Seller Central row, an Amazon Ads row, and one row per DSP advertiser. Join Seller Central and Vendor Central facts on sp_connection_id or vendor_connection_id. Attribute DSP facts on organization_id, store_id, ads_dsp_connection_id, and dsp_advertiser_id.

- Source type: `VENDOR_CENTRAL`
- Source ID: `6cdde992a36bdedb6fbd17bbcd294941dbf55ac504302db9b232dc0887f1598a`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: no
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=6cdde992a36bdedb6fbd17bbcd294941dbf55ac504302db9b232dc0887f1598a

### Search aliases

- connection mapping
- selling partner id
- dsp advertiser
- ads profile
- billing permission

### Columns (18)

- `connection_context_id` (`TEXT`, required) — DataDoe connection context id, or the connection id when no context is set. Same value as seller_or_vendor_id. Not a unique row key when one context has several connections or DSP advertisers.
- `connection_context_name` (`TEXT`, required) — Context display name. Same value as seller_or_vendor_name. Falls back to the connection name, then the connection id. DSP rows use the mapped context name.
- `seller_or_vendor_id` (`TEXT`, required) — Same value as connection_context_id. DataDoe account id used by MCP and API calls (sellers_and_vendors_list, exports). Not unique on this table: repeated for each connection and each DSP advertiser in the context. Fact tables copy this value into their seller_or_vendor_id.
- `seller_or_vendor_name` (`TEXT`, required) — Same value as connection_context_name. DataDoe display name for the seller or vendor context.
- `ads_dsp_connection_id` (`TEXT`, nullable) — DataDoe Amazon Ads connection id of the account Amazon DSP is run from. One agency connection can be shared by several sellers or vendors. Null on non-DSP rows. Join DSP facts on organization_id, store_id, ads_dsp_connection_id, and dsp_advertiser_id.
- `dsp_advertiser_id` (`TEXT`, nullable) — Amazon DSP advertiser identifier mapped to this seller or vendor. One advertiser maps to one context. If an advertiser is reassigned, only the latest mapping is kept. Null on non-DSP rows.
- `selling_partner_id` (`TEXT`, nullable) — Amazon selling partner id from the connection (connection_seller_id). Same value as marketplace_seller_id. This is the Amazon id, not seller_or_vendor_id. Null on DSP advertiser rows and when the connection has no seller id.
- `marketplace_seller_id` (`TEXT`, nullable) — Same value as selling_partner_id: Amazon connection_seller_id. Null on DSP advertiser rows and when the connection has no seller id.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile id. Set on Amazon Ads connections and on DSP advertiser rows. Null on Seller Central and Vendor Central rows.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `ads_account_type` (`TEXT`, nullable) — Amazon Ads profile account type: seller / vendor / agency. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `ads_account_subtype` (`TEXT`, nullable) — Amazon Ads special account subtype, such as KDP_AUTHOR or AMAZON_ATTRIBUTION. Null for regular accounts and until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `is_kdp_author` (`LOGIC`, nullable) — True for a Kindle Direct Publishing author account (ads_account_subtype KDP_AUTHOR), false for other captured profiles. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `ads_profile_currency_code` (`TEXT`, nullable) — Currency of the Amazon Ads profile. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `ads_profile_timezone` (`TEXT`, nullable) — IANA timezone of the Amazon Ads profile. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `amazon_ads_reporting_timezone` (`TEXT`, nullable) — IANA timezone from the Amazon Ads profile, such as Europe/London. Null when it is not verified. Seller Central and Vendor Central rows are null. DSP rows use the agency Ads connection timezone, not a DSP advertiser timezone. There is no country or UTC fallback.
- `amazon_ads_reporting_timezone_source` (`TEXT`, required) — ADS_PROFILE when amazon_ads_reporting_timezone is verified. UNKNOWN when it is not.
- `ads_billing_permission_missing_at` (`DATE`, nullable) — When the last Ads Billing check for this connection was denied. Null when the last check succeeded, the connection is not Amazon Ads, or billing has not been checked. DSP advertiser rows are null.

## Amazon Ads

Lookup of DataDoe Amazon accounts for Seller Central, Vendor Central, Amazon Ads, and Amazon DSP. One row per connection, plus one row per Amazon DSP advertiser mapped to a seller or vendor on a shared agency Ads account. A DSP-only agency seat is not its own seller. seller_or_vendor_id equals connection_context_id and is not unique: one context can have a Seller Central row, an Amazon Ads row, and one row per DSP advertiser. Join Seller Central and Vendor Central facts on sp_connection_id or vendor_connection_id. Attribute DSP facts on organization_id, store_id, ads_dsp_connection_id, and dsp_advertiser_id.

- Source type: `AMAZON_ADS`
- Source ID: `6cdde992a36bdedb6fbd17bbcd294941dbf55ac504302db9b232dc0887f1598a`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: no
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=6cdde992a36bdedb6fbd17bbcd294941dbf55ac504302db9b232dc0887f1598a

### Search aliases

- connection mapping
- selling partner id
- dsp advertiser
- ads profile
- billing permission

### Columns (18)

- `connection_context_id` (`TEXT`, required) — DataDoe connection context id, or the connection id when no context is set. Same value as seller_or_vendor_id. Not a unique row key when one context has several connections or DSP advertisers.
- `connection_context_name` (`TEXT`, required) — Context display name. Same value as seller_or_vendor_name. Falls back to the connection name, then the connection id. DSP rows use the mapped context name.
- `seller_or_vendor_id` (`TEXT`, required) — Same value as connection_context_id. DataDoe account id used by MCP and API calls (sellers_and_vendors_list, exports). Not unique on this table: repeated for each connection and each DSP advertiser in the context. Fact tables copy this value into their seller_or_vendor_id.
- `seller_or_vendor_name` (`TEXT`, required) — Same value as connection_context_name. DataDoe display name for the seller or vendor context.
- `ads_dsp_connection_id` (`TEXT`, nullable) — DataDoe Amazon Ads connection id of the account Amazon DSP is run from. One agency connection can be shared by several sellers or vendors. Null on non-DSP rows. Join DSP facts on organization_id, store_id, ads_dsp_connection_id, and dsp_advertiser_id.
- `dsp_advertiser_id` (`TEXT`, nullable) — Amazon DSP advertiser identifier mapped to this seller or vendor. One advertiser maps to one context. If an advertiser is reassigned, only the latest mapping is kept. Null on non-DSP rows.
- `selling_partner_id` (`TEXT`, nullable) — Amazon selling partner id from the connection (connection_seller_id). Same value as marketplace_seller_id. This is the Amazon id, not seller_or_vendor_id. Null on DSP advertiser rows and when the connection has no seller id.
- `marketplace_seller_id` (`TEXT`, nullable) — Same value as selling_partner_id: Amazon connection_seller_id. Null on DSP advertiser rows and when the connection has no seller id.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile id. Set on Amazon Ads connections and on DSP advertiser rows. Null on Seller Central and Vendor Central rows.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `ads_account_type` (`TEXT`, nullable) — Amazon Ads profile account type: seller / vendor / agency. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `ads_account_subtype` (`TEXT`, nullable) — Amazon Ads special account subtype, such as KDP_AUTHOR or AMAZON_ATTRIBUTION. Null for regular accounts and until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `is_kdp_author` (`LOGIC`, nullable) — True for a Kindle Direct Publishing author account (ads_account_subtype KDP_AUTHOR), false for other captured profiles. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `ads_profile_currency_code` (`TEXT`, nullable) — Currency of the Amazon Ads profile. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `ads_profile_timezone` (`TEXT`, nullable) — IANA timezone of the Amazon Ads profile. Null until DataDoe captured the profile. Null on Seller Central, Vendor Central and DSP advertiser rows.
- `amazon_ads_reporting_timezone` (`TEXT`, nullable) — IANA timezone from the Amazon Ads profile, such as Europe/London. Null when it is not verified. Seller Central and Vendor Central rows are null. DSP rows use the agency Ads connection timezone, not a DSP advertiser timezone. There is no country or UTC fallback.
- `amazon_ads_reporting_timezone_source` (`TEXT`, required) — ADS_PROFILE when amazon_ads_reporting_timezone is verified. UNKNOWN when it is not.
- `ads_billing_permission_missing_at` (`DATE`, nullable) — When the last Ads Billing check for this connection was denied. Null when the last check succeeded, the connection is not Amazon Ads, or billing has not been checked. DSP advertiser rows are null.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
