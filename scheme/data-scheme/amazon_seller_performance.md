# Seller Account Health Metrics

- BigQuery table name: `amazon_seller_performance`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Seller Central Account Health from GET_V2_SELLER_PERFORMANCE_REPORT. The latest date is the current snapshot; Amazon does not return history for older requested dates. Column windows are 7 days, 14 days, 30 days, 60 days, or 6 months. *_value and *_target_* columns are rates. *_count columns are counts. *_status is the health status. seller_account_health_rating_6m_score is the Account Health Rating score (0–1000), not a percentage. Amazon Account Health rate for the window in the column name. Same scale as the matching target column. A rate, not a count. Do not recompute it from the count columns.

- Source type: `SELLER_CENTRAL`
- Source ID: `57036be081231374d01a690532d8353061bcc494ec29bae1397d55678688ef81`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=57036be081231374d01a690532d8353061bcc494ec29bae1397d55678688ef81

## Fetch periods

- `RECURRING_DAILY` (1 days)

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 1pm.

## Search aliases

- account health
- order defect rate
- odr

## Columns (102)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `seller_account_status` (`TEXT`, nullable)
- `seller_late_shipping_rate_30d_status` (`TEXT`, required)
- `seller_late_shipping_rate_30d_value` (`NUMBER`, required) — Amazon Account Health rate for the window in the column name. Same scale as the matching target column. A rate, not a count. Do not recompute it from the count columns.
- `seller_late_shipping_rate_30d_target_less_than` (`NUMBER`, required)
- `seller_late_shipping_rate_30d_order_count` (`NUMBER`, required)
- `seller_invoice_defect_rate_7d_status` (`TEXT`, required)
- `seller_invoice_defect_rate_7d_value` (`NUMBER`, required)
- `seller_invoice_defect_rate_7d_target_less_than` (`NUMBER`, required)
- `seller_invoice_defect_rate_7d_invoice_defect_status` (`TEXT`, required)
- `seller_invoice_defect_rate_7d_invoice_defect_count` (`NUMBER`, required)
- `seller_invoice_defect_rate_7d_missing_invoice_status` (`TEXT`, required)
- `seller_invoice_defect_rate_7d_missing_invoice_count` (`NUMBER`, required)
- `seller_invoice_defect_rate_7d_late_invoice_status` (`TEXT`, required)
- `seller_invoice_defect_rate_7d_late_invoice_count` (`NUMBER`, required)
- `seller_invoice_defect_rate_7d_order_count` (`NUMBER`, required)
- `seller_order_defect_rate_fba_60d_status` (`TEXT`, required)
- `seller_order_defect_rate_fba_60d_value` (`NUMBER`, required) — FBA order defect rate (defects, claims, chargebacks, and negative feedback). Amazon Account Health rate for the window in the column name. Same scale as the matching target column. A rate, not a count. Do not recompute it from the count columns.
- `seller_order_defect_rate_fba_60d_target_less_than` (`NUMBER`, required)
- `seller_order_defect_rate_fba_60d_order_with_defects_status` (`TEXT`, required)
- `seller_order_defect_rate_fba_60d_order_with_defects_count` (`NUMBER`, required)
- `seller_order_defect_rate_fba_60d_claims_status` (`TEXT`, required)
- `seller_order_defect_rate_fba_60d_claims_count` (`NUMBER`, required)
- `seller_order_defect_rate_fba_60d_chargebacks_status` (`TEXT`, required)
- `seller_order_defect_rate_fba_60d_chargeback_count` (`NUMBER`, required)
- `seller_order_defect_rate_fba_60d_negative_feedback_status` (`TEXT`, required)
- `seller_order_defect_rate_fba_60d_negative_feedback_count` (`NUMBER`, required)
- `seller_order_defect_rate_fba_60d_order_count` (`NUMBER`, required)
- `seller_order_defect_rate_fbm_60d_status` (`TEXT`, required)
- `seller_order_defect_rate_fbm_60d_value` (`NUMBER`, required) — Merchant-fulfilled order defect rate. Amazon Account Health rate for the window in the column name. Same scale as the matching target column. A rate, not a count. Do not recompute it from the count columns.
- `seller_order_defect_rate_fbm_60d_target_less_than` (`NUMBER`, required)
- `seller_order_defect_rate_fbm_60d_order_with_defects_status` (`TEXT`, required)
- `seller_order_defect_rate_fbm_60d_order_with_defects_count` (`NUMBER`, required)
- `seller_order_defect_rate_fbm_60d_claims_status` (`TEXT`, required)
- `seller_order_defect_rate_fbm_60d_claims_count` (`NUMBER`, required)
- `seller_order_defect_rate_fbm_60d_chargebacks_status` (`TEXT`, required)
- `seller_order_defect_rate_fbm_60d_chargeback_count` (`NUMBER`, required)
- `seller_order_defect_rate_fbm_60d_negative_feedback_status` (`TEXT`, required)
- `seller_order_defect_rate_fbm_60d_negative_feedback_count` (`NUMBER`, required)
- `seller_order_defect_rate_fbm_60d_order_count` (`NUMBER`, required)
- `seller_on_time_delivery_rate_30d_status` (`TEXT`, required)
- `seller_on_time_delivery_rate_30d_value` (`NUMBER`, required)
- `seller_on_time_delivery_rate_30d_target_greater_than` (`NUMBER`, required)
- `seller_on_time_delivery_rate_30d_shipment_count_with_valid_tracking` (`NUMBER`, required)
- `seller_on_time_delivery_rate_30d_on_time_delivery_count` (`NUMBER`, required)
- `seller_valid_tracking_rate_30d_status` (`TEXT`, required)
- `seller_valid_tracking_rate_30d_value` (`NUMBER`, required)
- `seller_valid_tracking_rate_30d_target_greater_than` (`NUMBER`, required)
- `seller_valid_tracking_rate_30d_shipment_count` (`NUMBER`, required)
- `seller_valid_tracking_rate_30d_valid_tracking_count` (`NUMBER`, required)
- `seller_pre_fulfillment_cancellation_rate_7d_status` (`TEXT`, required)
- `seller_pre_fulfillment_cancellation_rate_7d_value` (`NUMBER`, required)
- `seller_pre_fulfillment_cancellation_rate_7d_target_less_than` (`NUMBER`, required)
- `seller_pre_fulfillment_cancellation_rate_7d_order_count` (`NUMBER`, required)
- `seller_pre_fulfillment_cancellation_rate_7d_cancellation_count` (`NUMBER`, required)
- `seller_account_health_rating_6m_status` (`TEXT`, required)
- `seller_account_health_rating_6m_score` (`NUMBER`, required) — Account Health Rating score from 0 to 1000. Not a percentage and not the status.
- `seller_listing_policy_violations_6m_status` (`TEXT`, required)
- `seller_listing_policy_violations_6m_target_equals` (`NUMBER`, required)
- `seller_listing_policy_violations_6m_count` (`NUMBER`, required)
- `seller_product_authenticity_customer_complaints_6m_status` (`TEXT`, required)
- `seller_product_authenticity_customer_complaints_6m_target_equals` (`NUMBER`, required)
- `seller_product_authenticity_customer_complaints_6m_count` (`NUMBER`, required)
- `seller_product_condition_customer_complaints_6m_status` (`TEXT`, required)
- `seller_product_condition_customer_complaints_6m_target_equals` (`NUMBER`, required)
- `seller_product_condition_customer_complaints_6m_count` (`NUMBER`, required)
- `seller_product_safety_customer_complaints_6m_status` (`TEXT`, required)
- `seller_product_safety_customer_complaints_6m_target_equals` (`NUMBER`, required)
- `seller_product_safety_customer_complaints_6m_count` (`NUMBER`, required)
- `seller_received_intellectual_property_complaints_6m_status` (`TEXT`, required)
- `seller_received_intellectual_property_complaints_6m_target_equals` (`NUMBER`, required)
- `seller_received_intellectual_property_complaints_6m_count` (`NUMBER`, required)
- `seller_restricted_product_policy_violations_6m_status` (`TEXT`, required)
- `seller_restricted_product_policy_violations_6m_target_equals` (`NUMBER`, required)
- `seller_restricted_product_policy_violations_6m_count` (`NUMBER`, required)
- `seller_suspected_intellectual_property_policy_violations_6m_status` (`TEXT`, required)
- `seller_suspected_intellectual_property_policy_violations_6m_target_equals` (`NUMBER`, required)
- `seller_suspected_intellectual_property_policy_violations_6m_count` (`NUMBER`, required)
- `seller_food_and_product_safety_issues_6m_status` (`TEXT`, required)
- `seller_food_and_product_safety_issues_6m_target_equals` (`NUMBER`, required)
- `seller_food_and_product_safety_issues_6m_count` (`NUMBER`, required)
- `seller_customer_product_reviews_policy_violations_6m_status` (`TEXT`, required)
- `seller_customer_product_reviews_policy_violations_6m_target_equals` (`NUMBER`, required)
- `seller_customer_product_reviews_policy_violations_6m_count` (`NUMBER`, required)
- `seller_other_policy_violations_6m_status` (`TEXT`, required)
- `seller_other_policy_violations_6m_target_equals` (`NUMBER`, required)
- `seller_other_policy_violations_6m_count` (`NUMBER`, required)
- `seller_documents_requests_6m_status` (`TEXT`, required)
- `seller_documents_requests_6m_target_equals` (`NUMBER`, required)
- `seller_documents_requests_6m_count` (`NUMBER`, required)
- `seller_policy_violations_6m_warning_count` (`NUMBER`, required)
- `seller_unit_on_time_delivery_rate_14d_status` (`TEXT`, required)
- `seller_unit_on_time_delivery_rate_14d_value` (`NUMBER`, required)
- `seller_unit_on_time_delivery_rate_14d_target_greater_than` (`NUMBER`, required)
- `seller_unit_on_time_delivery_rate_14d_on_time_delivery_count` (`NUMBER`, required)
- `seller_unit_on_time_delivery_rate_14d_total_unit_count` (`NUMBER`, required)
- `date` (`DATE`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
