# DataDoe Actions

Actions let AI agents and integrations read and change Amazon data through DataDoe. This page lists 223 Action types by group, with their limits, results, and group guides.

- How to enable and run Actions: https://www.datadoe.com/hub/docs/datadoe-features/actions.md
- Full JSON, including the JSON Schema of each Action's `details` (`detailsJsonSchema`): https://api.datadoe.com/api/v1/spec/action-scheme
- Have a DataDoe account? Use the MCP tool `actions_details_schema_get` for the schema, then `actions_start`, or `POST /api/v1/actions`.
- Interactive explorer: https://www.datadoe.com/hub/actions

## Test before you run

- Every Action type supports a dry run. Send the start request with `"dryRun": true`. DataDoe checks the `details` schema, item limit, permissions, Seller or Vendor, and PII access. A dry run does not send the Action to Amazon, create an Action, or spend AI Tokens, and it works while the Action type is disabled.
- `dryRun` is optional and defaults to `false`, so existing integrations keep working. Run a dry run before every live write.
- Listing, A+ Content, and Multi-Channel Fulfillment changes also have preview Actions that Amazon validates without applying the change: the `AMAZON_LISTINGS_*_VERIFY` Actions (Amazon `VALIDATION_PREVIEW`), `AMAZON_APLUS_CONTENT_VALIDATE`, `AMAZON_MCF_ORDERS_PREVIEW`, and `AMAZON_MCF_DELIVERY_OFFERS_PREVIEW`.
- Add an optional `idempotencyKey` to a live Action. Sending the same request again with the same key returns the original Action instead of running or charging again. A different request with the same key returns HTTP 409.
- Every Action type is disabled until the Organization enables it. Write Actions also need Read and write access for the Seller or Vendor.

## Seller Central & Vendor Central

### Listings

#### `AMAZON_LISTINGS_CREATE`: Create listing

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5000 (API) / 20 (MCP)
- Description: Create Amazon listings or offers on existing ASINs, including [images](https://www.datadoe.com/hub/docs/datadoe-features/actions-manage-images).
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_LISTINGS_DELETE`: Delete listing

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5000 (API) / 50 (MCP)
- Description: Delete Amazon listings by SKU, including a parent SKU.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_LISTINGS_UPDATE`: Update listing

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5000 (API) / 50 (MCP)
- Description: Easy way to update basic Amazon listing parameters, like name, bullet points, keywords, and [images](https://www.datadoe.com/hub/docs/datadoe-features/actions-manage-images).
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_LISTINGS_PRICING_UPDATE`: Update listing price

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 5000 (API) / 50 (MCP)
- Description: Set the single-unit price for one audience. Audience defaults to ALL. You can set Amazon Business quantity-discount tiers. A merge update changes only that audience.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_LISTINGS_DETAILS_UPDATE`: Update listing details

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5000 (API) / 50 (MCP)
- Description: Advanced way to update arbitrary Amazon listing attributes.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_LISTINGS_CREATE_VERIFY`: Preview listing create

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5 (API) / 5 (MCP)
- Description: Preview `AMAZON_LISTINGS_CREATE` with Amazon `VALIDATION_PREVIEW`. Does not create the listing. Returns Amazon status, submission ID, and issues.
- Result: Amazon status, submission ID, and issues.

#### `AMAZON_LISTINGS_UPDATE_VERIFY`: Preview listing update

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5 (API) / 5 (MCP)
- Description: Preview `AMAZON_LISTINGS_UPDATE` with Amazon `VALIDATION_PREVIEW`. Does not change the listing. Returns Amazon status, submission ID, and issues.
- Result: Amazon status, submission ID, and issues.

#### `AMAZON_LISTINGS_PRICING_UPDATE_VERIFY`: Preview listing price update

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 5 (API) / 5 (MCP)
- Description: Preview `AMAZON_LISTINGS_PRICING_UPDATE` with Amazon `VALIDATION_PREVIEW`. Does not change the price. Returns Amazon status, submission ID, and issues.
- Result: Amazon status, submission ID, and issues.

#### `AMAZON_LISTINGS_DETAILS_UPDATE_VERIFY`: Preview listing details update

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5 (API) / 5 (MCP)
- Description: Preview `AMAZON_LISTINGS_DETAILS_UPDATE` with Amazon `VALIDATION_PREVIEW`. Does not change the listing. Returns Amazon status, submission ID, and issues.
- Result: Amazon status, submission ID, and issues.

#### `AMAZON_LISTINGS_FIND`: Find listings

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5000 (API) / 300 (MCP)
- Description: Find Amazon listings by given identifier (like SKU, ASIN, or UPC).
- Result: Full models of found listings. Each item includes `content` with the title, description, keywords, highlight and up to five bullets.

#### `AMAZON_LISTINGS_FEES_ESTIMATE`: Estimate listing fees

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 2500 (API) / 300 (MCP)
- Description: Estimate Amazon listing fees for ASINs or SKUs at a given listing and shipping price.
- Result: Estimated fee breakdown per item.

#### `AMAZON_LISTINGS_FEATURED_PRICE_ESTIMATE`: Estimate featured price

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 120 (API) / 40 (MCP)
- Description: Estimate the featured offer expected price (FOEP) for seller SKUs. Supports an optional location segment (`countryCode` + `postalCode`). Does not guarantee Featured Offer placement.
- Result: Full Amazon FOEP response body per SKU.

#### `AMAZON_LISTINGS_COMPETITIVE_SUMMARY_FIND`: Find competitive summary

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 60 (API) / 20 (MCP)
- Description: Find the current competitive summary for ASINs, including featured buying options, reference prices, lowest-priced offers, and similar items. Promotions are inside the offer arrays. Supports optional per-ASIN lowest-priced-offer filters.
- Result: Full Amazon competitive summary body per ASIN, including nested promotions.

#### `AMAZON_LISTINGS_PRODUCT_TYPES_FIND`: Find product types

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: List available Amazon product types for the Seller or Vendor.
- Result: Available product types.

#### `AMAZON_LISTINGS_PRODUCT_TYPE_SUGGEST`: Suggest product type

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1000 (API) / 100 (MCP)
- Description: Suggest Amazon product types for given product names.
- Result: Suggested product types per name.

#### `AMAZON_LISTINGS_PRODUCT_TYPE_DEFINITION_FIND`: Find product type definition

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5 (API) / 1 (MCP)
- Description: Retrieve Amazon product type definition schemas for SKUs or product types. Required to use `AMAZON_LISTINGS_DETAILS_UPDATE` and `AMAZON_LISTINGS_CREATE`.
- Result: Product type definition and JSON schema.

#### `AMAZON_LISTINGS_RESTRICTIONS_FIND`: Check listing restrictions

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 100 (API) / 20 (MCP)
- Description: Check listing restrictions for one ASIN per query. Omit the condition to ask Amazon about every applicable condition. Call this before a listing change. An empty result means Amazon returned no restrictions for that query. It does not mean the listing would be accepted or that the ASIN is eligible for FBA. A failed check has no restriction flag.
- Result: Restrictions Amazon returned for that query, including reason messages and approval links. The links are data. DataDoe does not open them.

#### Guide: Listing validation preview

`AMAZON_LISTINGS_CREATE_VERIFY`, `AMAZON_LISTINGS_UPDATE_VERIFY`, `AMAZON_LISTINGS_DETAILS_UPDATE_VERIFY`, and `AMAZON_LISTINGS_PRICING_UPDATE_VERIFY` call Amazon Listings Items with `mode=VALIDATION_PREVIEW`. Each call checks one SKU and returns Amazon status, submission ID, and issues. The preview does not create or change the listing. Amazon validation preview does not accept a merge. DataDoe previews a merge with replace and the same values. The write still sends merge.

VERIFY Actions accept up to five distinct SKUs through the API or MCP. All changes for each SKU are sent together in one Amazon request. Update previews also keep the matching write Action’s total change limit: 5,000 through the API or 50 through MCP.

`dryRun` is a different check. It validates the DataDoe request and does not submit the change. For create and details updates, `dryRun` also checks the product-type schema. A pricing dry run checks that schema when the change includes `productType`. A basic listing update dry run does not fetch it. A delete dry run checks the SKU list and does not call Amazon.

To check a listing before a write, run `dryRun`, then the matching VERIFY Action, then the write Action. Pricing preview is Seller Central only, matching `AMAZON_LISTINGS_PRICING_UPDATE`.

#### Guide: Delete a listing

`AMAZON_LISTINGS_DELETE` deletes listings by SKU for Seller Central and Vendor Central. Send `skus`. DataDoe submits a JSON listings feed. Each message uses `operationType` DELETE and does not include a product type or attributes.

`dryRun` checks the SKU list and does not call Amazon. Amazon's delete operation has no validation preview, so there is no verify Action.

Deleting a parent SKU removes that parent listing and its relationships to child listings. The child listings remain. Amazon does not change whether buyers can purchase them.

Vendor Central requests require `vendorCode`. Seller Central requests must not include `vendorCode`. DataDoe rejects duplicate SKUs in one request.

#### Guide: Listing requirements

Each change in `AMAZON_LISTINGS_CREATE` can include `requirements`. When you omit it, DataDoe uses `LISTING`.

Choose one value:

- `LISTING` creates a full listing, with product data and your offer
- `LISTING_OFFER_ONLY` adds your offer on an ASIN that already exists in the Amazon catalog
- `LISTING_PRODUCT_ONLY` sends product data without an offer

A dry run checks attributes against the product type schema for that value. Load the same value with `AMAZON_LISTINGS_PRODUCT_TYPE_DEFINITION_FIND` and `productTypeRequirementsSet`.

For `LISTING_OFFER_ONLY`, send the SKU, condition, price, and fulfillment attributes required by that schema.

#### Guide: FBA eligibility and listing restrictions

Call `AMAZON_FBA_ELIGIBILITY_FIND` and `AMAZON_LISTINGS_RESTRICTIONS_FIND` yourself before you plan an inbound shipment or a listing change. A listing write does not run them. These checks read Seller Central at that moment. They do not enroll products, create offers, approve products, or create shipments. Listing VERIFY Actions check a proposed listing separately.

See [FBA eligibility and listing restrictions](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-eligibility).

#### Guide: Listing images

To set listing images on create or update, upload files to the `LISTING_IMAGES` group first, then reference file UUIDs in `AMAZON_LISTINGS_CREATE` or `AMAZON_LISTINGS_UPDATE`. See [Files](https://www.datadoe.com/hub/docs/datadoe-features/files) for upload details and [Actions: Amazon Images](https://www.datadoe.com/hub/docs/datadoe-features/actions-manage-images) for the full workflow, slot mapping, and MCP and API examples.

### A+ Content

#### `AMAZON_APLUS_CONTENT_ADD`: Add A+ content

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Create Amazon A+ Content documents (Standard, Premium, or Brand Story) and optionally associate ASINs.
- Result: Created content document reference keys.

#### `AMAZON_APLUS_CONTENT_UPDATE`: Update A+ content

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Update an existing Amazon A+ Content document.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_APLUS_CONTENT_FIND`: Find A+ content

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 20 (MCP)
- Description: Search or retrieve Amazon A+ Content documents by content reference key.
- Result: Content documents and metadata.

#### `AMAZON_APLUS_CONTENT_ASINS_UPDATE`: Update A+ content ASINs

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Associate or update ASIN relations for an A+ Content document.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_APLUS_CONTENT_ASINS_FIND`: Find A+ content ASINs

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 25 (MCP)
- Description: List ASIN relations for A+ Content documents.
- Result: ASIN relations per document.

#### `AMAZON_APLUS_CONTENT_VALIDATE`: Validate A+ content

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Validate A+ Content documents and ASIN relations before publishing.
- Result: Validation results per document.

#### `AMAZON_APLUS_CONTENT_PUBLISH`: Publish A+ content

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 25 (MCP)
- Description: Submit an A+ Content document for Amazon approval.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_APLUS_CONTENT_SUSPEND`: Suspend A+ content

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 25 (MCP)
- Description: Suspend a published A+ Content document.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_APLUS_CONTENT_PUBLISH_RECORDS_FIND`: Find A+ publish records

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 100 (API) / 50 (MCP)
- Description: Search A+ Content publish records by ASIN.
- Result: Publish records per ASIN.

#### `AMAZON_APLUS_MEDIA_ADD`: Add A+ media

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Register A+ media assets: images, and video thumbnail pairings for Premium video modules.
- Result: Media IDs, status, and related media per asset.

#### `AMAZON_APLUS_MEDIA_FIND`: Find A+ media

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 25 (MCP)
- Description: Retrieve A+ media assets by media ID, including processing status and video pairings.
- Result: Media metadata, status, and issues per asset.

#### `AMAZON_APLUS_MEDIA_UPDATE`: Update A+ media

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Update the title or the accessibility descriptions of A+ media assets.
- Result: Updated media metadata per asset.

#### Guide: A+ Content images

To include images in A+ Content documents, upload files to the `APLUS_IMAGES` group first, then reference file UUIDs in image components inside `AMAZON_APLUS_CONTENT_ADD`, `AMAZON_APLUS_CONTENT_UPDATE`, or `AMAZON_APLUS_CONTENT_VALIDATE`.

#### Guide: Premium A+ and Brand Story

A+ Content Actions accept Standard (`STANDARD_*`), Premium (`PREMIUM_*`), and Brand Story (`BRAND_STORY_*`) modules. Keep one module family per document:

- Standard and Premium documents use `contentType` `EBC` (sellers) or `EMC` (vendors) and take up to seven modules. Standard documents of vendors take up to five.
- Brand Story documents use `contentType` `BrandStory`: exactly one `BRAND_STORY_IMAGE_WITH_LOGO` background module plus up to 19 cards, for sellers and vendors.

Premium video modules (`PREMIUM_VIDEO_TEXT`, `PREMIUM_HERO_VIDEO`, `PREMIUM_VIDEO_IMAGE_CAROUSEL`) reference a video and its thumbnail by `videoMediaId` and `imageMediaId`. Register the pairing with `AMAZON_APLUS_MEDIA_ADD`: pass the existing video `mediaId`, its `descriptions` (one per locale), and a thumbnail image as an `APLUS_IMAGES` file, an existing media library path, or a `mediaId`. DataDoe does not upload video files. Amazon can take up to 48 hours to process a video; check its status with `AMAZON_APLUS_MEDIA_FIND`.

You can send `AMAZON_APLUS_CONTENT_FIND` output back to `AMAZON_APLUS_CONTENT_UPDATE` after your changes. Every image needs `imageCropSpecification`, except catalog images (`/images/I/…`) that Amazon fills in for ASIN cards.

`AMAZON_APLUS_CONTENT_FIND` skips documents with premium modules that Amazon SP-API does not expose. Those documents are listed under `skipped` and do not fail the Action.

### Orders

`AMAZON_ORDERS_FIND` and `AMAZON_ORDERS_GET_METRICS` are a live preview of current Amazon data. For large volumes and long-term analysis, use an Export or a BigQuery query. Those also refresh during the day. Repeated FIND Actions cost more than one Export or one query.

#### `AMAZON_ORDERS_CANCEL`: Cancel order

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 5000 (API) / 50 (MCP)
- Description: Cancel an Amazon order item with a given cancellation reason.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_ORDERS_CONFIRM_SHIPMENT`: Confirm shipment

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 5000 (API) / 50 (MCP)
- Description: Confirm shipment for an Amazon order item and upload tracking information.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_ORDERS_FIND`: Find orders

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Live preview of current orders through Amazon `searchOrders`. One search per Action. Pass `paginationToken` to read the next page. Amazon allows about one search every 3 minutes. `marketplaceIds` can include only marketplaces connected as Sellers in this Organization for the same selling partner. Omit `marketplaceIds` to use the connected marketplace. `BUYER`, `RECIPIENT`, and `TAX` require Organization PII access.
- Result: The Amazon `searchOrders` payload, including `nextToken` when another page exists.

#### `AMAZON_ORDERS_GET_METRICS`: Get order metrics

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 200 (API) / 100 (MCP)
- Description: Live preview of aggregated order metrics. DataDoe fills `marketplaceIds` from the Seller Central connection. Use `from` (inclusive) and `to` (exclusive). Amazon allows about one request every 2 seconds. The API limit fits one 15-minute Action run at that pace.
- Result: Aggregated metrics for the connection marketplace.

### Buyer messaging

Order messages send one message about one order. Messaging automations are separate. They list, read, create, and update automatic replies to buyer questions.

A seller can have up to 10 automations, including deactivated ones. Creating one turns it on immediately. An update replaces the whole configuration, and any store you leave out is removed. When the Action runs, DataDoe does not send the update unless you can use this Action on every store the automation already covers. Include a store only when it is connected as a Seller for this selling partner in the Organization and your access allows this Action on that account. DataDoe waits one second between items in one Action. A dry run checks the request and does not call Amazon. Do not retry a create or update that may have succeeded.

Each list query returns one page. Pass `paginationToken` with the same other fields to read the next page. The next page token is `pagination.nextToken`. Set `includeMarketplaceAutomations` to true to include each store reply and trigger conditions.

#### `AMAZON_ORDERS_SOLICITATION_FEEDBACK_SEND`: Send review solicitation

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 300 (API) / 300 (MCP)
- Description: Send a product review and seller feedback solicitation for an Amazon order.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_ORDERS_MESSAGING_ACTIONS_FIND`: Find order message actions

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 60 (API) / 20 (MCP)
- Description: List Amazon Messaging actions available for an order, including the schema Amazon returns for each action. Review solicitations stay on `AMAZON_ORDERS_SOLICITATION_FEEDBACK_SEND`.
- Result: Available action names and schemas.

#### `AMAZON_ORDERS_MESSAGING_ATTRIBUTES_GET`: Get order message attributes

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 60 (API) / 20 (MCP)
- Description: Read the buyer locale to use for outbound message text.
- Result: Buyer locale.

#### `AMAZON_ORDERS_MESSAGES_CUSTOMIZATION_DETAILS_SEND`: Send customization details message

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Ask the buyer to provide or verify customization details. Text is optional when at least one `ORDER_MESSAGE_FILES` attachment is included.
- Result: Confirmation that Amazon accepted the message.

#### `AMAZON_ORDERS_MESSAGES_DELIVERY_DETAILS_SEND`: Send delivery details message

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 30 (API) / 10 (MCP)
- Description: Ask the buyer to arrange delivery or confirm delivery contact information.
- Result: Confirmation that Amazon accepted the message.

#### `AMAZON_ORDERS_MESSAGES_ORDER_DETAILS_SEND`: Send order details message

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 30 (API) / 10 (MCP)
- Description: Ask an order-related question before shipment.
- Result: Confirmation that Amazon accepted the message.

#### `AMAZON_ORDERS_MESSAGES_SERVICE_DETAILS_SEND`: Send service details message

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 30 (API) / 10 (MCP)
- Description: Arrange a Home Service call or gather information before it.
- Result: Confirmation that Amazon accepted the message.

#### `AMAZON_ORDERS_MESSAGES_LEGAL_DISCLOSURE_SEND`: Send legal disclosure

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Deliver documents a seller is legally required to provide. Attach `ORDER_MESSAGE_FILES` (PDF, PNG, or JPG).
- Result: Confirmation that Amazon accepted the message.

#### `AMAZON_ORDERS_MESSAGES_WARRANTY_SEND`: Send warranty

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Send warranty documents. Optional coverage dates must be ISO-8601, and the end date must be on or after the start date.
- Result: Confirmation that Amazon accepted the message.

#### `AMAZON_ORDERS_MESSAGES_DIGITAL_ACCESS_KEY_SEND`: Send digital access key

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Send an access key required for purchased digital content. Provide text, an `ORDER_MESSAGE_FILES` attachment, or both.
- Result: Confirmation that Amazon accepted the message.

#### `AMAZON_ORDERS_MESSAGES_UNEXPECTED_PROBLEM_SEND`: Send unexpected problem message

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 30 (API) / 10 (MCP)
- Description: Send a critical notice about a problem affecting order completion.
- Result: Confirmation that Amazon accepted the message.

#### `AMAZON_ORDERS_MESSAGES_INVOICE_SEND`: Send invoice

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Send the buyer an invoice. Each file must be a PDF in `ORDER_MESSAGE_FILES`.
- Result: Confirmation that Amazon accepted the message.

#### `AMAZON_MESSAGING_AUTOMATIONS_FIND`: Find messaging automations

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: List messaging automations that include this store. A configuration can also apply to other stores. Filter by automation type or sub-type. Set `includeMarketplaceAutomations` to true to include each store reply and trigger conditions. Each query returns one page of up to 50 configurations. Pass `paginationToken` with the same other fields to read the next page.
- Result: Configurations in `automationConfigurations`, with `pagination.nextToken` when another page is available.

#### `AMAZON_MESSAGING_AUTOMATIONS_GET`: Get messaging automation

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Read one messaging automation by its id. The response includes each store reply text and trigger conditions.
- Result: The automation configuration.

#### `AMAZON_MESSAGING_AUTOMATIONS_ADD`: Create messaging automation

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Create a messaging automation. Amazon turns it on immediately and can send replies to buyers. A seller can have up to 10 automations, including deactivated ones. The display name must be unique for this seller, ignoring letter case. Trigger conditions cannot overlap another active automation in the same store. Include a store only when it is connected as a Seller for this selling partner in the Organization and your access allows this Action on that account. A dry run checks the request and does not call Amazon. Do not retry a create that may have succeeded.
- Result: The created automation configuration.

#### `AMAZON_MESSAGING_AUTOMATIONS_UPDATE`: Update messaging automation

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Replace a messaging automation. Send the complete name, status, and store entries. Any store you leave out is removed. When the Action runs, DataDoe does not send the update unless you can use this Action on every store the automation already covers. Set status to `DEACTIVATED` to stop replies without deleting it, or `ACTIVE` to turn it back on. Include a store only when it is connected as a Seller for this selling partner in the Organization and your access allows this Action on that account. A dry run checks the request and does not call Amazon. Do not retry an update that may have succeeded.
- Result: The updated automation configuration.

### FBM shipping and tracking

#### `AMAZON_ORDERS_GET_SHIPPING_RATES`: Get FBM shipping rates

- Access: Read
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 10 (API) / 5 (MCP)
- Description: Get Amazon Buy Shipping rates for an FBM order. Optional `shipDate` is an ISO 8601 date-time with `Z` or an offset for the requested pickup; omit it to rate for now. A rate with `requiresAdditionalInputs` true stays in `rates`. Call Get FBM shipping additional inputs with that `requestToken` and `rateId` before you buy it. Copy `format`, `size`, and any `dpi` / `pageLayout` from one print option in `supportedDocumentSpecifications` onto CREATE. Choose `needFileJoining` from its `supportedFileJoiningOptions` and include every mandatory document name from `supportedDocumentDetails` in `requestedDocumentTypes`. `shipFrom.countryCode` is ISO 3166-1 alpha-2 (`GB`, not marketplace `UK`).
- Result: Slim rates, including rates that need additional inputs, ineligible rates, and a requestToken that expires in about 10 minutes.

#### `AMAZON_ORDERS_GET_SHIPPING_ADDITIONAL_INPUTS`: Get FBM shipping additional inputs

- Access: Read
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 10 (API) / 5 (MCP)
- Description: Load the additional-input schema for one quoted rate. Use the `requestToken` and `rateId` from Get FBM shipping rates when `requiresAdditionalInputs` is true. DataDoe calls Amazon getAdditionalInputs with the same shipping business id as the quote. Copy matching values into Create FBM shipment `additionalInputs`. Do not invent identifiers or placeholders. The requestToken expires in about 10 minutes.
- Result: The requestToken, rateId, and the schema Amazon returned. Nothing is bought.

#### `AMAZON_ORDERS_CREATE_SHIPMENT`: Create FBM shipment

- Access: Write
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 10 (API) / 5 (MCP)
- Description: Purchase an Amazon Buy Shipping label for an FBM order. The label uses the pickup time from the quoted rate, including `shipDate` when the quote set one. Pass that rate's `requestToken` and `rateId` before the token expires (~10 minutes). Requires `documentSize` copied from the chosen rate. When the rate has `requiresAdditionalInputs` true, set `requiresAdditionalInputs` true and send `additionalInputs` that match Get FBM shipping additional inputs, including plain text when that schema asks for text. DataDoe checks those values against a fresh Amazon schema and does not buy the label if they are missing or do not match. Omit both fields when the rate does not require additional inputs. `needFileJoining` defaults to `true`; `requestedDocumentTypes` defaults to `["LABEL"]`. Include mandatory `PACKSLIP`, `RECEIPT`, or `CUSTOM_FORM` documents when the chosen print option requires them. A missing `pageLayout` stays omitted; copy it when the rate specifies one. If purchase times out, do not buy again; `GET_SHIPMENT_DOCS` only works with a known `shipmentId`. If additional inputs fail before purchase, the label was not bought.
- Result: Shipment and tracking ids, a signed `labelDownloadUrl` valid until `expiresAt` (~15 min). Reprint via `AMAZON_ORDERS_GET_SHIPMENT_DOCS`. Amazon still has the document after the S3 object is gone (7 days).

#### `AMAZON_ORDERS_GET_SHIPMENT_DOCS`: Get FBM shipment documents

- Access: Read
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 20 (API) / 10 (MCP)
- Description: Re-fetch Amazon Buy Shipping documents when reprinting or when a signed URL expired. Requires a known `shipmentId` and `packageClientReferenceId`.
- Result: Document metadata and a fresh signed `labelDownloadUrl` valid until `expiresAt` (~15 min).

#### `AMAZON_ORDERS_CANCEL_SHIPMENT`: Cancel FBM shipment

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Void a paid Amazon Buy Shipping label before carrier scan.
- Result: `{ shipmentId, canceled: true }`. Requires `confirm: true`.

#### `AMAZON_SHIPMENT_TRACKING_SUBSCRIBE`: Subscribe shipment tracking

- Access: Write
- Accounts: Sellers and Vendors
- Marketplaces: US marketplace only.
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Subscribe to shipment milestone notifications for one tracking identifier, such as a carrier tracking number or a freight PRO number.
- Result: Subscription details for each tracking identifier.

#### Guide: Buy Shipping labels

From 1 November 2026, a business-to-consumer item shipped from outside the European Union into the European Union needs product identifiers. The United Kingdom counts as outside the European Union. A shipment that starts and ends inside the European Union does not use this step.

Amazon adds the ASIN. You supply a manufacturer part number or a model number for each item. If the item has neither, use its barcode. Add an EAN, GTIN, UPC, ISBN, or ISSN when you have one. Do not invent identifiers or placeholders. Amazon does not fill these values from the listing, and it does not check their format. The fields you send are the ones in the schema for that rate.

1. Call `AMAZON_ORDERS_GET_SHIPPING_RATES`. A rate with `requiresAdditionalInputs` true stays in `rates`.
2. Call `AMAZON_ORDERS_GET_SHIPPING_ADDITIONAL_INPUTS` with that rate's `requestToken` and `rateId`. The result is the schema Amazon returned. The token expires in about 10 minutes.
3. Call `AMAZON_ORDERS_CREATE_SHIPMENT`. Set `requiresAdditionalInputs` to true and send `additionalInputs` in the form the schema describes, including plain text when the schema asks for text. DataDoe checks the values against a fresh schema and does not buy the label if they are missing or do not match.
4. Omit both fields when the rate does not require additional inputs.

If the schema check fails, the label was not bought. Correct the values, or request rates again. Do not buy the same label again after a purchase timeout. A timeout can mean Amazon already bought the label. An expired token or a mismatched rate fails before purchase.

### FBA and MCF

MCF order lifecycle uses Fulfillment Outbound **v2026-07-04**. Return actions use **v2020-07-01** because Amazon has not ported returns to v2026.

#### `AMAZON_FBA_ELIGIBILITY_FIND`: Check FBA eligibility

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 100 (API) / 20 (MCP)
- Description: Check one ASIN and one program, `INBOUND` or `COMMINGLING`, per query. Call this before you plan an inbound shipment. `INBOUND` uses the connected marketplace. `COMMINGLING` does not send a marketplace. The check does not enroll the product or create a shipment. A failed check has no eligibility value.
- Result: Whether the ASIN is eligible for that program, and any ineligibility reason codes Amazon returned.

#### `AMAZON_FBA_REMOVAL_ORDERS_ADD`: Add FBA removal order

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 5000 (API) / 50 (MCP)
- Description: Create an FBA removal order to return, dispose of, or liquidate inventory held in an Amazon fulfillment center.
- Result: Confirmation that Amazon accepted the Action.

#### `AMAZON_MCF_ORDERS_ADD`: Add MCF order

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Create an MCF order so Amazon can pick, pack, and ship FBA inventory to a non-Amazon customer.
- Result: Confirmation that Amazon accepted the order.

#### `AMAZON_MCF_ORDERS_UPDATE`: Update MCF order

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Hold or ship an existing MCF order.
- Result: Confirmation that Amazon accepted the update.

#### `AMAZON_MCF_ORDERS_FIND`: Find MCF orders

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 100 (API) / 25 (MCP)
- Description: Operational lookup of recent MCF orders. **Not for analytics** — warehouse reporting stays in data tables / BigQuery (same rule as listings find). Returns one page per call and does not auto-paginate.
- Result: MCF order list or a single order.

#### `AMAZON_MCF_ORDERS_CANCEL`: Cancel MCF order

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 50 (API) / 20 (MCP)
- Description: Cancel an MCF order.
- Result: Confirmation that Amazon accepted the cancellation.

#### `AMAZON_MCF_ORDERS_PREVIEW`: Preview MCF order

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Draft a full MCF order preview (`getOrderPreview`) including line items and destination.
- Result: Amazon order preview, including estimated fees.

#### `AMAZON_MCF_DELIVERY_OFFERS_PREVIEW`: Preview MCF delivery offers

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Retrieve MCF delivery offers (`getOffers`) for one or more SKUs. Origin is taken from the connection marketplace.
- Result: Amazon delivery offers.

#### `AMAZON_MCF_RETURNS_REASON_CODES_FIND`: Find MCF return reason codes

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Look up MCF return reason codes via Fulfillment Outbound **v2020-07-01** (`listReturnReasonCodes`). Marketplace comes from the connection.
- Result: Return reason codes per SKU.

#### `AMAZON_MCF_RETURNS_ADD`: Add MCF return

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Create an MCF fulfillment return via Fulfillment Outbound **v2020-07-01** (`createFulfillmentReturn`).
- Result: Confirmation that Amazon accepted the return.

#### `AMAZON_MCF_FEATURES_MARKETPLACE_FIND`: Find MCF marketplace features

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Return the static catalog of v2026 MCF `fulfillmentConfiguration.services` options. Does not call Amazon.
- Result: Static services catalog.

#### `AMAZON_MCF_FEATURES_SKU_FIND`: Find MCF SKU features

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Check whether a SKU is sellable and what quantity Amazon can fulfill, using `getOrderPreview` as a proxy. Not a full MCF order draft — use `AMAZON_MCF_ORDERS_PREVIEW` for that.
- Result: Preview-backed sellability and quantity per SKU.

#### Guide: India payment on delivery

Payment on delivery is available only for a connected India Seller account shipping to an address in India. Prepaid Multi-Channel Fulfillment (MCF) orders stay the default. Omit `paymentOnDelivery`, or set it to `false`, and do not send a line-item service price.

Preview the option with `AMAZON_MCF_ORDERS_PREVIEW` before you create an order. Set `includePaymentOnDelivery` to `true`. Amazon reports `delivery.paymentOnDelivery` as `ENABLED` or `DISABLED` on each offer, and includes any constraints. The preview does not create an order, collect payment, or complete delivery. DataDoe rejects a destination outside India. It also rejects a Seller connection that is not the India marketplace.

Create the order with `AMAZON_MCF_ORDERS_ADD`. Set `paymentOnDelivery` to `true` and send a price in Indian rupees (INR) on every line item, in `perUnitServicePrice`. Each line keeps its own amount. The amount must be greater than zero. DataDoe rejects a missing price and a price sent without `paymentOnDelivery` set to `true`. It also rejects a currency other than INR and a destination whose `countryCode` is not `IN`. It does not fill in a missing price or currency. A Seller connection that is not the India marketplace is rejected as well.

Amazon accepting the order means Amazon accepted the fulfillment request. Acceptance does not mean the customer paid, or that delivery is complete.

`AMAZON_MCF_FEATURES_MARKETPLACE_FIND` returns these same rules and does not call Amazon. REST `POST /api/v1/actions` and MCP `actions_start` use the same fields.

For example, preview payment on delivery:

```json
{
    "type": "AMAZON_MCF_ORDERS_PREVIEW",
    "sellerOrVendorId": "your-seller-id",
    "dryRun": true,
    "details": {
        "includePaymentOnDelivery": true,
        "destination": {
            "deliveryAddress": {
                "name": "Mary Major",
                "addressLine1": "Connaught Place",
                "city": "New Delhi",
                "postalCode": "110001",
                "countryCode": "IN"
            }
        },
        "lineItems": [
            {
                "product": { "productIdentifier": { "amazonSku": "SKU-1" } },
                "amount": { "unit": "EACHES", "value": "1" }
            }
        ]
    }
}
```

Create the order with `AMAZON_MCF_ORDERS_ADD` and these details. Send a separate INR price for each line:

```json
{
    "orders": [
        {
            "orderId": "india-order-1",
            "paymentOnDelivery": true,
            "fulfillmentConfiguration": {
                "serviceLevel": { "serviceTiers": ["STANDARD"] }
            },
            "destination": {
                "deliveryAddress": {
                    "name": "Mary Major",
                    "addressLine1": "Connaught Place",
                    "city": "New Delhi",
                    "postalCode": "110001",
                    "countryCode": "IN"
                }
            },
            "lineItems": [
                {
                    "lineItemId": "item-1",
                    "product": { "productIdentifier": { "amazonSku": "SKU-1" } },
                    "amount": { "unit": "EACHES", "value": "1" },
                    "fulfillmentConfiguration": {
                        "services": {
                            "delivery": {
                                "paymentOnDelivery": {
                                    "perUnitServicePrice": {
                                        "currencyCode": "INR",
                                        "amount": "14.99"
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    "lineItemId": "item-2",
                    "product": { "productIdentifier": { "amazonSku": "SKU-2" } },
                    "amount": { "unit": "EACHES", "value": "2" },
                    "fulfillmentConfiguration": {
                        "services": {
                            "delivery": {
                                "paymentOnDelivery": {
                                    "perUnitServicePrice": {
                                        "currencyCode": "INR",
                                        "amount": "20.00"
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }
    ]
}
```

### FBA inbound shipments

Create and manage FBA inbound plans, packing, placement, transportation and receiving reads on a Seller Central account. Each Action runs one live Amazon operation. Enable the required types in Settings > Actions. WRITE Actions require Read and write account access. Actions marked PII also require PII permission. Validate with `dryRun` before execution and review fees and shipment choices before confirming them. [Read Actions: FBA inbound](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound).

#### `AMAZON_FBA_INBOUND_PLANS_FIND`: Find FBA plans

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provides a list of inbound plans with minimal information. Amazon listInboundPlans, Fulfillment Inbound 2024-03-20. READ access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: inboundPlans, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-plans-find).
- Result: Amazon response fields: `inboundPlans`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLANS_ADD`: Create FBA plan

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Creates an inbound plan. An inbound plan contains all the necessary information to send shipments into Amazon's fufillment network. Amazon createInboundPlan, Fulfillment Inbound 2024-03-20. WRITE access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: inboundPlanId, operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-plans-add).
- Result: Amazon response fields: `inboundPlanId`, `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLANS_GET`: Get FBA plan

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Fetches the top level information about an inbound plan. Amazon getInboundPlan, Fulfillment Inbound 2024-03-20. READ access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. No pagination input. Output: createdAt, inboundPlanId, lastUpdatedAt, marketplaceIds, name, packingOptions, placementOptions, shipments, sourceAddress, status. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-plans-get).
- Result: Amazon response fields: `createdAt`, `inboundPlanId`, `lastUpdatedAt`, `marketplaceIds`, `name`, `packingOptions`, `placementOptions`, `shipments`, `sourceAddress`, `status`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLAN_BOXES_FIND`: Find FBA plan boxes

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provides a paginated list of box packages in an inbound plan. Amazon listInboundPlanBoxes, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: boxes, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-plan-boxes-find).
- Result: Amazon response fields: `boxes`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLANS_CANCEL`: Cancel FBA plan

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Cancels an Inbound Plan. Charges may apply if the cancellation is performed outside of a void window. The window for Amazon Partnered Carriers is 24 hours for Small Parcel Delivery (SPD) and one hour for Less-Than-Truckload (LTL) carrier shipments. Amazon cancelInboundPlan, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-plans-cancel).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLAN_ITEMS_FIND`: Find FBA plan items

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provides a paginated list of item packages in an inbound plan. Amazon listInboundPlanItems, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: items, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-plan-items-find).
- Result: Amazon response fields: `items`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLAN_NAME_UPDATE`: Update FBA plan name

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Updates the name of an existing inbound plan. Amazon updateInboundPlanName, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: no response body, HTTP 204. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-plan-name-update).
- Result: Amazon returns no response body on success. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PACKING_GROUP_BOXES_FIND`: Find FBA packing group boxes

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Retrieves a page of boxes from a given packing group. These boxes were previously provided through the `setPackingInformation` operation. This API is used for workflows where boxes are packed before Amazon determines shipment splits. Amazon listPackingGroupBoxes, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: boxes, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-packing-group-boxes-find).
- Result: Amazon response fields: `boxes`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PACKING_GROUP_ITEMS_FIND`: Find FBA packing group items

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Retrieves a page of items in a given packing group. Packing options must first be generated by the corresponding operation before packing group items can be listed. Amazon listPackingGroupItems, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: items, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-packing-group-items-find).
- Result: Amazon response fields: `items`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PACKING_INFORMATION_SET`: Set FBA packing information

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Sets packing information for an inbound plan. This should be called after an inbound plan is created to populate the box level information required for planning and transportation estimates. Amazon setPackingInformation, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-packing-information-set).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PACKING_OPTIONS_FIND`: Find FBA packing options

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Retrieves a list of all packing options for an inbound plan. Packing options must first be generated by the corresponding operation before becoming available. Amazon listPackingOptions, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: packingOptions, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-packing-options-find).
- Result: Amazon response fields: `packingOptions`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PACKING_OPTIONS_GENERATE`: Generate FBA packing options

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Generates available packing options for the inbound plan. Amazon generatePackingOptions, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET, AMAZON_FBA_INBOUND_PACKING_OPTIONS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-packing-options-generate).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PACKING_OPTIONS_CONFIRM`: Confirm FBA packing options

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Confirms the packing option for an inbound plan. Amazon confirmPackingOption, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-packing-options-confirm).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLAN_PALLETS_FIND`: Find FBA plan pallets

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provides a paginated list of pallet packages in an inbound plan. An inbound plan will have pallets when the related details are provided after generating Less-Than-Truckload (LTL) carrier shipments. Amazon listInboundPlanPallets, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: pagination, pallets. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-plan-pallets-find).
- Result: Amazon response fields: `pagination`, `pallets`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLACEMENT_OPTIONS_FIND`: Find FBA placement options

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provides a list of all placement options for an inbound plan. Placement options must first be generated by the corresponding operation before becoming available. Amazon listPlacementOptions, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: pagination, placementOptions. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-placement-options-find).
- Result: Amazon response fields: `pagination`, `placementOptions`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLACEMENT_OPTIONS_GENERATE`: Generate FBA placement options

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Generates placement options for the inbound plan. Amazon generatePlacementOptions, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET, AMAZON_FBA_INBOUND_PLACEMENT_OPTIONS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-placement-options-generate).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PLACEMENT_OPTIONS_CONFIRM`: Confirm FBA placement options

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Confirms the placement option for an inbound plan. Once confirmed, it cannot be changed for the Inbound Plan. Amazon confirmPlacementOption, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-placement-options-confirm).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENTS_GET`: Get FBA shipment

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provides the full details for a specific shipment within an inbound plan. The `transportationOptionId` inside `acceptedTransportationSelection` can be used to retrieve the transportation details for the shipment. Amazon getShipment, Fulfillment Inbound 2024-03-20. READ access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. No pagination input. Output: amazonReferenceId, contactInformation, dates, destination, freightInformation, name, placementOptionId, selectedDeliveryWindow, selectedTransportationOptionId, selfShipAppointmentDetails, shipmentConfirmationId, shipmentId, source, status, trackingDetails. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipments-get).
- Result: Amazon response fields: `amazonReferenceId`, `contactInformation`, `dates`, `destination`, `freightInformation`, `name`, `placementOptionId`, `selectedDeliveryWindow`, `selectedTransportationOptionId`, `selfShipAppointmentDetails`, `shipmentConfirmationId`, `shipmentId`, `source`, `status`, `trackingDetails`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_BOXES_FIND`: Find FBA shipment boxes

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provides a paginated list of box packages in a shipment. Amazon listShipmentBoxes, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: boxes, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-boxes-find).
- Result: Amazon response fields: `boxes`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_CONTENT_UPDATE_PREVIEWS_FIND`: Find FBA shipment content update previews

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Retrieve a paginated list of shipment content update previews for a given shipment. The shipment content update preview is a summary of the requested shipment content changes along with the transportation cost implications of the change that can only be confirmed prior to the expiry date specified. Amazon listShipmentContentUpdatePreviews, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: contentUpdatePreviews, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-content-update-previews-find).
- Result: Amazon response fields: `contentUpdatePreviews`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_CONTENT_UPDATE_PREVIEWS_GENERATE`: Generate FBA shipment content update previews

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Generate a shipment content update preview given a set of intended boxes and/or items for a shipment with a confirmed carrier. The shipment content update preview will be viewable with the updated costs and contents prior to confirmation. Amazon generateShipmentContentUpdatePreviews, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET, AMAZON_FBA_INBOUND_SHIPMENT_CONTENT_UPDATE_PREVIEWS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-content-update-previews-generate).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_CONTENT_UPDATE_PREVIEWS_GET`: Get FBA shipment content update preview

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Retrieve a shipment content update preview which provides a summary of the requested shipment content changes along with the transportation cost implications of the change that can only be confirmed prior to the expiry date specified. Amazon getShipmentContentUpdatePreview, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. No pagination input. Output: contentUpdatePreviewId, expiration, requestedUpdates, transportationOption. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-content-update-previews-get).
- Result: Amazon response fields: `contentUpdatePreviewId`, `expiration`, `requestedUpdates`, `transportationOption`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_CONTENT_UPDATE_PREVIEWS_CONFIRM`: Confirm FBA shipment content update previews

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Confirm a shipment content update preview and accept the changes in transportation cost. Amazon confirmShipmentContentUpdatePreview, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-content-update-previews-confirm).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_DELIVERY_CHALLAN_GET`: Get FBA delivery challan

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provide delivery challan document for PCP transportation in IN marketplace. Amazon getDeliveryChallanDocument, Fulfillment Inbound 2024-03-20. READ access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. No pagination input. Output: documentDownload. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-delivery-challan-get).
- Result: Amazon response fields: `documentDownload`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_DELIVERY_WINDOWS_FIND`: Find FBA delivery windows

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Retrieves all delivery window options for a shipment. Delivery window options must first be generated by the `generateDeliveryWindowOptions` operation before becoming available. Amazon listDeliveryWindowOptions, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: deliveryWindowOptions, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-delivery-windows-find).
- Result: Amazon response fields: `deliveryWindowOptions`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_DELIVERY_WINDOWS_GENERATE`: Generate FBA delivery windows

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Generates available delivery window options for a given shipment. Amazon generateDeliveryWindowOptions, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET, AMAZON_FBA_INBOUND_DELIVERY_WINDOWS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-delivery-windows-generate).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_DELIVERY_WINDOWS_CONFIRM`: Confirm FBA delivery windows

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Confirms the delivery window option for chosen shipment within an inbound plan. A placement option must be confirmed prior to use of this API. Once confirmed, new delivery window options cannot be generated, but the chosen delivery window option can be updated before shipment closure. The window is used to provide the expected time when a shipment will arrive at the warehouse. All transportation options which have the program `CONFIRMED_DELIVERY_WINDOW` require a delivery window to be confirmed prior to transportation option confirmation. Amazon confirmDeliveryWindowOptions, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-delivery-windows-confirm).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_ITEMS_FIND`: Find FBA shipment items

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provides a paginated list of item packages in a shipment. Amazon listShipmentItems, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: items, pagination. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-items-find).
- Result: Amazon response fields: `items`, `pagination`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_NAME_UPDATE`: Update FBA shipment name

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Updates the name of an existing shipment. Amazon updateShipmentName, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: no response body, HTTP 204. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-name-update).
- Result: Amazon returns no response body on success. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_PALLETS_FIND`: Find FBA shipment pallets

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Provides a paginated list of pallet packages in a shipment. A palletized shipment will have pallets when the related details are provided after generating Less-Than-Truckload (LTL) carrier shipments. Amazon listShipmentPallets, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: pagination, pallets. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-pallets-find).
- Result: Amazon response fields: `pagination`, `pallets`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SELF_SHIP_APPOINTMENTS_CANCEL`: Cancel FBA self-ship appointments

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Cancels a self-ship appointment slot against a shipment. Only available in the following [marketplaces](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids): MX, BR, EG, SA, AE, IN. Amazon cancelSelfShipAppointment, Fulfillment Inbound 2024-03-20. WRITE access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-self-ship-appointments-cancel).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SELF_SHIP_APPOINTMENT_SLOTS_GET`: Get FBA self-ship appointment slots

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Retrieves a list of available self-ship appointment slots used to drop off a shipment at a warehouse. Only available in the following [marketplaces](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids): MX, BR, EG, SA, AE, IN. Amazon getSelfShipAppointmentSlots, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: pagination, selfShipAppointmentSlotsAvailability. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-self-ship-appointment-slots-get).
- Result: Amazon response fields: `pagination`, `selfShipAppointmentSlotsAvailability`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SELF_SHIP_APPOINTMENT_SLOTS_GENERATE`: Generate FBA self-ship appointment slots

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Initiates the process of generating the appointment slots list. Only available in the following [marketplaces](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids): MX, BR, EG, SA, AE, IN. Amazon generateSelfShipAppointmentSlots, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET, AMAZON_FBA_INBOUND_SELF_SHIP_APPOINTMENT_SLOTS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-self-ship-appointment-slots-generate).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SELF_SHIP_APPOINTMENTS_SCHEDULE`: Schedule FBA self-ship appointments

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Confirms or reschedules a self-ship appointment slot against a shipment. Only available in the following [marketplaces](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids): MX, BR, EG, SA, AE, IN. Amazon scheduleSelfShipAppointment, Fulfillment Inbound 2024-03-20. WRITE access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: selfShipAppointmentDetails. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-self-ship-appointments-schedule).
- Result: Amazon response fields: `selfShipAppointmentDetails`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_SOURCE_ADDRESS_UPDATE`: Update FBA shipment source address

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Updates the source address of an existing shipment. The shipment source address can only be updated prior to the confirmation of the shipment carriers. As a result of the updated source address, existing transportation options will be invalidated and will need to be regenerated to capture the potential difference in transportation options and quotes due to the new source address. Amazon updateShipmentSourceAddress, Fulfillment Inbound 2024-03-20. WRITE access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-source-address-update).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_TRACKING_UPDATE`: Update FBA shipment tracking

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Updates a shipment's tracking details. Amazon updateShipmentTrackingDetails, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-tracking-update).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_TRANSPORTATION_OPTIONS_FIND`: Find FBA transportation options

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Retrieves all transportation options for a shipment. Transportation options must first be generated by the `generateTransportationOptions` operation before becoming available. Amazon listTransportationOptions, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: pagination, transportationOptions. Next Actions: AMAZON_FBA_INBOUND_PLANS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-transportation-options-find).
- Result: Amazon response fields: `pagination`, `transportationOptions`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_TRANSPORTATION_OPTIONS_GENERATE`: Generate FBA transportation options

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Generates available transportation options for a given placement option. Amazon generateTransportationOptions, Fulfillment Inbound 2024-03-20. WRITE access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET, AMAZON_FBA_INBOUND_TRANSPORTATION_OPTIONS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-transportation-options-generate).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_TRANSPORTATION_OPTIONS_CONFIRM`: Confirm FBA transportation options

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Confirms all the transportation options for an inbound plan. A placement option must be confirmed prior to use of this API. Once confirmed, new transportation options can not be generated or confirmed for the Inbound Plan. Amazon confirmTransportationOptions, Fulfillment Inbound 2024-03-20. WRITE access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use inboundPlanId returned by PLANS_ADD or PLANS_FIND; shipmentId comes from PLANS_GET and is distinct from the FBA shipmentConfirmationId. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-transportation-options-confirm).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_ITEM_COMPLIANCE_DETAILS_FIND`: Find FBA item compliance details

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: List the inbound compliance details for MSKUs in a given marketplace. Supply raw MSKUs. DataDoe applies the required URL encoding. Amazon listItemComplianceDetails, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Reads live Amazon state. No pagination input. Output: complianceDetails. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-item-compliance-details-find).
- Result: Amazon response fields: `complianceDetails`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_ITEM_COMPLIANCE_DETAILS_UPDATE`: Update FBA item compliance details

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Update compliance details for a list of MSKUs. The details provided here are only used for the India (IN - A21TJRUUN4KGV) marketplace compliance validation. Amazon updateItemComplianceDetails, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-item-compliance-details-update).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_ITEM_LABELS_CREATE`: Create FBA item labels

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: For a given marketplace - creates labels for a list of MSKUs. Amazon createMarketplaceItemLabels, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Reads live Amazon state. No pagination input. Output: documentDownloads. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-item-labels-create).
- Result: Amazon response fields: `documentDownloads`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PREP_DETAILS_FIND`: Find FBA prep details

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Get preparation details for a list of MSKUs in a specified marketplace. Supply raw MSKUs. DataDoe applies the required URL encoding. Amazon listPrepDetails, Fulfillment Inbound 2024-03-20. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Reads live Amazon state. No pagination input. Output: mskuPrepDetails. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-prep-details-find).
- Result: Amazon response fields: `mskuPrepDetails`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_PREP_DETAILS_SET`: Set FBA prep details

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Set the preparation details for a list of MSKUs in a specified marketplace. Amazon setPrepDetails, Fulfillment Inbound 2024-03-20. WRITE access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: operationId. Next Actions: AMAZON_FBA_INBOUND_OPERATIONS_GET. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-prep-details-set).
- Result: Amazon response fields: `operationId`. Returns an operation ID. Pending work uses WAITING_EXTERNAL_PROCESSING while DataDoe observes the same operation. Wait for SUCCESS before the next workflow step. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_OPERATIONS_GET`: Get FBA operations

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Gets the status of the processing of an asynchronous API call. Amazon getInboundOperationStatus, Fulfillment Inbound 2024-03-20. READ access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Reads live Amazon state. No pagination input. Output: operation, operationId, operationProblems, operationStatus. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-operations-get).
- Result: Amazon response fields: `operation`, `operationId`, `operationProblems`, `operationStatus`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_SHIPMENT_LABELS_GET`: Get FBA shipment labels

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Returns package/pallet labels for faster and more accurate shipment processing at the Amazon fulfillment center. Amazon getLabels, Fulfillment Inbound v0. WRITE access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use the FBA shipmentConfirmationId for legacy shipment paths. Query names retain Amazon capitalization. Changes Amazon workflow state; fees or irreversible choices may apply. Follow the seller's approval instructions. No pagination input. Output: payload, errors. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-shipment-labels-get).
- Result: Amazon response fields: `payload`, `errors`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_BILL_OF_LADING_GET`: Get FBA bill of lading

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Returns a bill of lading for a Less Than Truckload/Full Truckload (LTL/FTL) shipment. The getBillOfLading operation returns PDF document data for printing a bill of lading for an Amazon-partnered Less Than Truckload/Full Truckload (LTL/FTL) inbound shipment. Amazon getBillOfLading, Fulfillment Inbound v0. READ access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use the FBA shipmentConfirmationId for legacy shipment paths. Query names retain Amazon capitalization. Reads live Amazon state. No pagination input. Output: payload, errors. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-bill-of-lading-get).
- Result: Amazon response fields: `payload`, `errors`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_LEGACY_SHIPMENTS_FIND`: Find FBA legacy shipments

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Returns a list of inbound shipments based on criteria that you specify. Amazon getShipments, Fulfillment Inbound v0. READ access. No PII permission required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use the FBA shipmentConfirmationId for legacy shipment paths. Query names retain Amazon capitalization. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: payload, errors. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-legacy-shipments-find).
- Result: Amazon response fields: `payload`, `errors`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_LEGACY_SHIPMENT_ITEMS_GET`: Get FBA legacy shipment items

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Returns a list of items in a specified inbound shipment. Amazon getShipmentItemsByShipmentId, Fulfillment Inbound v0. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use the FBA shipmentConfirmationId for legacy shipment paths. Query names retain Amazon capitalization. Reads live Amazon state. No pagination input. Output: payload, errors. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-legacy-shipment-items-get).
- Result: Amazon response fields: `payload`, `errors`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### `AMAZON_FBA_INBOUND_LEGACY_SHIPMENT_ITEMS_FIND`: Find FBA legacy shipment items

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Returns a list of items in a specified inbound shipment, or a list of items that were updated within a specified time frame. Amazon getShipmentItems, Fulfillment Inbound v0. READ access. No personal data required. Use an authorized Seller Central connection with the Amazon Fulfillment role. Use the FBA shipmentConfirmationId for legacy shipment paths. Query names retain Amazon capitalization. Reads live Amazon state. Returns one page; repeat filters with the unchanged returned continuation token. Output: payload, errors. Next Actions: AMAZON_FBA_INBOUND_PLANS_FIND. [Request example and workflow](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound#request-legacy-shipment-items-find).
- Result: Amazon response fields: `payload`, `errors`. Returns the direct Amazon response. Includes observation time, warnings and error details when applicable. Document operations include stored File IDs, download links and expiry times.

#### Guide: Plan, ship and recover

Follow [Actions: FBA inbound](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-fba-inbound) for Pack First, Pack Later, India, carrier choices, documents and request examples.

Each Action submits one Amazon operation. Native arrays stay in that request and the Action counts as one execution item. List operations return one page. Repeat the original filters and returned token for the next page.

After an asynchronous write, keep the returned operation ID and wait for completion before continuing. DataDoe observes the same operation without submitting it again. If the outcome is unknown, reconcile live state before another write. The guide explains recovery with an operation ID and acknowledgment when no ID was saved.

Generated documents are retained for one week. Download links last at most 5 minutes. Read the original Action again to renew an accessible retained document's link without another Amazon request or Action charge.

### External Fulfillment shipping

Ship Seller Flex, Easy Ship and Self Delivery orders through External Fulfillment Shipping v2024-09-11. This is not Buy Shipping, FBA inbound, MCF or Vendor Direct Fulfillment. Each Action runs one live Amazon operation. Enable the required types in Settings > Actions. WRITE Actions require Read and write account access. Actions marked PII also require PII permission. Validate with `dryRun` before execution. [Read External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).

#### `AMAZON_EXTERNAL_FULFILLMENT_SHIPMENTS_FIND`: Find External Fulfillment shipments

- Access: Read
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. Requires PII access because a shipment can include a recipient. Use status ACCEPTED for new merchant-fulfilled shipments. CREATED means Amazon could not auto-accept the order. Optional filters are location, marketplace, channel name, last-updated range, page size and pagination token. Repeat the same filters when a page is empty but a next token is present. Amazon operation getShipments. Next, read one shipment. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_SHIPMENTS_GET`: Get External Fulfillment shipment

- Access: Read
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. Requires PII access. Returns line items, package IDs, shipment status, substatus and reason, channel and shipping type, and optional package tracking. Missing tracking is valid. Tracking details are returned by Amazon and cannot be sent on a write. Amazon operation getShipment. Next, confirm or reject the shipment. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_SHIPMENTS_CONFIRM`: Confirm External Fulfillment shipment

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. An optional acknowledgement can name the accepted line items. This does not buy a shipping label. Amazon operation processShipment with operation CONFIRM. A timeout or server error is ambiguous: read the shipment before confirming again. Next, create packages. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_SHIPMENTS_REJECT`: Reject External Fulfillment shipment

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. This rejects the fulfillment shipment. It does not cancel an order and it does not cancel a Buy Shipping label. Amazon operation processShipment with operation REJECT. A timeout or server error is ambiguous: read the shipment before rejecting again. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_PACKAGES_ADD`: Add External Fulfillment packages

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. Send at least one full package, including dimensions, weight and line-item quantities. Add serial numbers, hazmat labels, country of origin and item value when the program requires them. Easy Ship cross-border packages need country of origin and item value. Do not send tracking details. Amazon operation createPackages. Next, read shipping options or replace a package. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_PACKAGES_UPDATE`: Update External Fulfillment package

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. Send the full package. This is not a partial update. Do not send tracking details. Amazon operation updatePackage. Next, read shipping options. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_PACKAGES_STATUS_UPDATE`: Update External Fulfillment package status

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. Seller Flex uses status SHIPPED and is required only in the UK, Spain, France, Germany and Italy. Self Delivery and MFN Self Delivery require one allowed status, substatus and reason. Mark out for delivery and delivered on the same calendar day. If the attempt is on another day, send out for delivery again. Send updates only between 6 AM and 11:59 PM local time. Easy Ship updates status automatically, so this Action rejects Easy Ship. Amazon operation updatePackageStatus. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_SHIPPING_OPTIONS_FIND`: Find External Fulfillment shipping options

- Access: Read
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. Requires PII access because an option can include a handover address. An empty or null option list is valid when Amazon has no option yet. Amazon operation retrieveShippingOptions. Next, generate an invoice when the program requires one, or generate labels. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_INVOICES_GENERATE`: Generate External Fulfillment invoice

- Access: Write
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. Requires PII access because the invoice can contain a recipient. Easy Ship invoices are supported only for the India store. The invoice file is stored as a DataDoe File with an authenticated, expiring download. Amazon operation generateInvoice. Next, retrieve the invoice or generate labels. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_INVOICES_GET`: Get External Fulfillment invoice

- Access: Read
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. Requires PII access. Easy Ship invoices are supported only for the India store. The invoice file is stored as a DataDoe File with an authenticated, expiring download. Amazon operation retrieveInvoice. Next, generate labels. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### `AMAZON_EXTERNAL_FULFILLMENT_SHIPPING_LABELS_GENERATE`: Generate External Fulfillment shipping labels

- Access: Write
- Accounts: Sellers only
- Requires PII access: yes
- Max items: 1 (API) / 1 (MCP)
- Description: Seller Central only. One Action handles one shipment operation. Requires the Amazon role Direct-to-Consumer Shipping (Restricted) on a Seller Central account. Requires PII access because a label can contain an address. operation GENERATE also retrieves labels that already exist. operation REGENERATE replaces them. Send at most 50 package IDs. Send the shipping option ID when Amazon requires one, and courier tracking only for a supported self-delivery label. A failure for one package is a partial result, not a full success. Label files are stored as DataDoe Files. Amazon operation generateShipLabels. Next, update package status only when the program requires it. See [External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment).
- Result: Returns the Amazon response with document content and temporary download URLs removed, plus stored File IDs and authenticated download links. Includes observation time, warnings and Amazon error details. An HTTP 204 response has no body. Label results include each package status. A mixed label result is partial, not a full success.

#### Guide: Confirm, pack, invoice and label

Follow [Actions: External Fulfillment shipping](https://www.datadoe.com/hub/docs/datadoe-features/actions-amazon-external-fulfillment) for Seller Flex, Easy Ship, Self Delivery and an Easy Ship cross-border example.

Each Action submits one Amazon operation. List operations return one page. Repeat the original filters with the returned token. An empty page can still include a next token.

GENERATE retrieves labels that already exist. REGENERATE replaces them. A failure for one package is not a full success. Generated documents are retained for one week. Download links last at most 5 minutes. Read the original Action again to renew an accessible retained document's link without another Amazon request or Action charge.

If a write times out or Amazon returns a server error, read the shipment before sending that write again.

### Vendor purchase orders

Vendor accounts only. Purchase order lists, purchase order status, and shipment details stay in the warehouse tables. These Actions submit and retrieve live Retail Procurement and Direct Fulfillment operations, including invoice submission.

#### `AMAZON_VENDOR_PURCHASE_ORDERS_ACKNOWLEDGE`: Acknowledge vendor purchase order

- Access: Write
- Accounts: Vendors only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Acknowledge Retail Procurement purchase orders. A rejected line requires a rejection reason.
- Result: Amazon transaction id.

#### `AMAZON_VENDOR_SHIPMENTS_SUBMIT`: Submit vendor shipment request

- Access: Write
- Accounts: Vendors only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Submit a Retail Procurement shipment request. Transaction type is New or Cancel.
- Result: Amazon transaction id.

#### `AMAZON_VENDOR_SHIPMENT_CONFIRMATIONS_SUBMIT`: Submit vendor shipment confirmation

- Access: Write
- Accounts: Vendors only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Submit a Retail Procurement shipment confirmation (ASN).
- Result: Amazon transaction id.

#### `AMAZON_VENDOR_SHIPMENT_LABELS_GET`: Get vendor shipment labels

- Access: Read
- Accounts: Vendors only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Download Retail Procurement shipping labels. Each query needs a date window, buyer reference, shipment id, or warehouse.
- Result: Label documents.

#### `AMAZON_VENDOR_TRANSACTIONS_GET`: Get vendor transaction status

- Access: Read
- Accounts: Vendors only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Read the status of a Retail Procurement submit transaction.
- Result: Transaction status.

#### `AMAZON_VENDOR_INVOICES_SUBMIT`: Submit vendor invoice

- Access: Write
- Accounts: Vendors only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Submit a Retail Procurement invoice or credit note. Amazon returns a transaction id.
- Result: Amazon transaction id.

### Vendor Direct Fulfillment

Vendor accounts only. Direct Fulfillment container labels are not an Action. Creating or retrieving Direct Fulfillment shipping labels, retrieving packing slips, and retrieving an India customer invoice return customer information. Those Actions require PII access, the same entitlement as Vendor Direct Fulfillment Orders PII.

#### `AMAZON_VENDOR_DF_ORDERS_ACKNOWLEDGE`: Acknowledge direct fulfillment order

- Access: Write
- Accounts: Vendors only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Acknowledge Direct Fulfillment orders. Status code is two digits, such as 00 (accept) or 03 (out of stock).
- Result: Amazon transaction id.

#### `AMAZON_VENDOR_DF_SHIPPING_LABELS_CREATE`: Create direct fulfillment shipping label

- Access: Write
- Accounts: Vendors only
- Requires PII access: yes
- Max items: 10 (API) / 5 (MCP)
- Description: Create Direct Fulfillment shipping labels and receive them in the response.
- Result: Shipping label content.

#### `AMAZON_VENDOR_DF_SHIPPING_LABEL_REQUESTS_SUBMIT`: Request direct fulfillment shipping label

- Access: Write
- Accounts: Vendors only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Request Direct Fulfillment shipping labels. Amazon returns a transaction id.
- Result: Amazon transaction id.

#### `AMAZON_VENDOR_DF_SHIPPING_LABEL_GET`: Get direct fulfillment shipping label

- Access: Read
- Accounts: Vendors only
- Requires PII access: yes
- Max items: 20 (API) / 10 (MCP)
- Description: Retrieve a Direct Fulfillment shipping label by purchase order number.
- Result: Shipping label content.

#### `AMAZON_VENDOR_DF_SHIPMENT_CONFIRMATIONS_SUBMIT`: Confirm direct fulfillment shipment

- Access: Write
- Accounts: Vendors only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Confirm a Direct Fulfillment shipment.
- Result: Amazon transaction id.

#### `AMAZON_VENDOR_DF_SHIPMENT_STATUS_UPDATES_SUBMIT`: Update direct fulfillment shipment status

- Access: Write
- Accounts: Vendors only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Send a Direct Fulfillment shipment status update for Vendor Own Carrier.
- Result: Amazon transaction id.

#### `AMAZON_VENDOR_DF_PACKING_SLIP_GET`: Get direct fulfillment packing slip

- Access: Read
- Accounts: Vendors only
- Requires PII access: yes
- Max items: 20 (API) / 10 (MCP)
- Description: Retrieve a Direct Fulfillment packing slip by purchase order number.
- Result: Packing slip content.

#### `AMAZON_VENDOR_DF_TRANSACTIONS_GET`: Get direct fulfillment transaction status

- Access: Read
- Accounts: Vendors only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Read the status of a Direct Fulfillment submit transaction.
- Result: Transaction status.

#### `AMAZON_VENDOR_DF_INVOICES_SUBMIT`: Submit direct fulfillment invoice

- Access: Write
- Accounts: Vendors only
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Submit a Direct Fulfillment invoice. Amazon returns a transaction id.
- Result: Amazon transaction id.

#### `AMAZON_VENDOR_DF_CUSTOMER_INVOICE_GET`: Get direct fulfillment customer invoice

- Access: Read
- Accounts: Vendors only
- Marketplaces: India only.
- Requires PII access: yes
- Max items: 20 (API) / 10 (MCP)
- Description: Retrieve an India Direct Fulfillment customer invoice by purchase order number.
- Result: Customer invoice file.

### Balances and payouts

Sellers only. These Actions read Seller Central balances and payouts. They do not change the Amazon account. A read Action can run when the account access level is **Read only**.

Amazon allows 0.5 requests per second, so each extra query adds about two seconds. Each query returns one page. Pass `nextToken` with the same other fields to get the next page. Omit store ids to include every store Amazon returns for the connection region.

A balance amount uses `currencyCode` and `currencyAmount`. A payout amount uses `unit` and `value`, and can be null when the payout status is `NO_PAYOUT`. A current balance includes `lastUpdatedTime`. A past balance includes `asOfDate`, such as `2026-10-01` for 1 October 2026. Payout history needs `createdAfter` unless you set `payoutId`.

#### `AMAZON_FINANCES_BALANCES_FIND`: Find Seller Central balances

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: List Seller Central balances. Filter by store, balance type, account type, and a past date. Omit the filters for the current balances. Each query returns one page of up to 500 balances.
- Result: Balances with currency, amount, nested available and reserved amounts, and `lastUpdatedTime` or `asOfDate`.

#### `AMAZON_FINANCES_PAYOUTS_FIND`: Find Seller Central payouts

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: List Seller Central payouts by payout id, or by the time they were created. Set `createdAfter`, and set `createdBefore` only when it is later than `createdAfter`. Each query returns one page.
- Result: Payouts with status, type, amount, payment method, and account tail.

#### `AMAZON_FINANCES_EXPECTED_PAYOUTS_FIND`: Find expected Seller Central payouts

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: List upcoming Seller Central payouts. Filter by store and account type, or omit both filters. Each query returns one page.
- Result: Expected payouts with status, amount, payment method, and `nextToken` when another page is available.

### Action items and plans

Sellers only. These Actions list, read, and dismiss Amazon action items, and list, read, preview, and create action plans. Action items are available in North America, Europe, and the Far East. Action plans are available in North America and Europe.

A list query returns one page of up to 20 results. Pass `pageToken` from `pagination.nextToken` with the same other fields to get the next page. Plan lists do not support `previousToken`.

Dismiss marks an item `DISMISSED`. It does not delete the item. Snooze is not available. Preview returns a plan and does not create or run it. Create runs the plan, and these APIs cannot cancel it. Do not send plan inputs. Amazon derives them. Store ids as the opaque strings Amazon returns.

#### `AMAZON_ACTION_ITEMS_FIND`: Find action items

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: List Amazon action items. Filter by status, classification, type, store, and last updated time. Each query returns one page of up to 20 items. Pass pageToken with the same other fields for the next page.
- Result: Action items and a page token when another page is available.

#### `AMAZON_ACTION_ITEMS_GET`: Get action item

- Access: Read
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Read action items by id. Store each id as Amazon returned it. Do not parse or construct it.
- Result: The action item, including any extra datasets you requested.

#### `AMAZON_ACTION_ITEMS_DISMISS`: Dismiss action item

- Access: Write
- Accounts: Sellers only
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Dismiss action items. You can include a reason of not applicable or not interested. The item stays in Amazon with status dismissed. Snooze is not available.
- Result: The action item id and its status after dismissal.

#### `AMAZON_ACTION_PLANS_FIND`: Find action plans

- Access: Read
- Accounts: Sellers only
- Marketplaces: North America and Europe only.
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: List action plans, newest first. Filter by status, plan template, associated action item, and created time. Each query returns one page of up to 20 plans. Pass pageToken with the same other fields for the next page.
- Result: Action plans and a page token when another page is available.

#### `AMAZON_ACTION_PLANS_GET`: Get action plan

- Access: Read
- Accounts: Sellers only
- Marketplaces: North America and Europe only.
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Read an action plan by its id. Include steps to return each step with its inputs and outputs.
- Result: The action plan, and its steps when you ask for them.

#### `AMAZON_ACTION_PLANS_PREVIEW`: Preview action plan

- Access: Read
- Accounts: Sellers only
- Marketplaces: North America and Europe only.
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Preview an action plan from a plan template. Amazon returns the plan and does not create or run it. Do not send plan inputs. Amazon derives them. Set the action item and its resolution together when the plan comes from an action item.
- Result: The plan Amazon would create, without creating it.

#### `AMAZON_ACTION_PLANS_ADD`: Create action plan

- Access: Write
- Accounts: Sellers only
- Marketplaces: North America and Europe only.
- Requires PII access: no
- Max items: 20 (API) / 10 (MCP)
- Description: Create an action plan from a plan template and run it. Preview it first. Do not send plan inputs. Amazon derives them. These APIs cannot cancel the plan. Set the action item and its resolution together when the plan comes from an action item.
- Result: The created plan.

## Amazon Ads

Amazon Ads Action models and flows follow the structure shown in the [Amazon Ads API documentation](https://advertising.amazon.com/API/docs/en-us/guides/campaign-management/entities/overview#entity-relationships).

### Campaign management

#### `AMAZON_ADS_CAMPAIGNS_ADD`: Add campaign

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Add Amazon Ads campaigns
- Result: Created campaign entities.

#### `AMAZON_ADS_CAMPAIGNS_UPDATE`: Update campaign

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Update Amazon Ads campaigns
- Result: Full model of updated campaigns.

#### `AMAZON_ADS_CAMPAIGNS_REMOVE`: Remove campaign

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Remove Amazon Ads campaigns
- Result: Empty response.

#### `AMAZON_ADS_CAMPAIGNS_FIND`: Find campaigns

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads campaigns
- Result: Full model of found campaigns.

#### `AMAZON_ADS_AD_GROUPS_ADD`: Add ad group

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Add Amazon Ads ad groups
- Result: Created ad group entities.

#### `AMAZON_ADS_AD_GROUPS_UPDATE`: Update ad group

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Update Amazon Ads ad groups
- Result: Full model of updated ad groups.

#### `AMAZON_ADS_AD_GROUPS_REMOVE`: Remove ad group

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Remove Amazon Ads ad groups
- Result: Empty response.

#### `AMAZON_ADS_AD_GROUPS_FIND`: Find ad groups

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads ad groups
- Result: Full model of found ad groups.

#### `AMAZON_ADS_TARGETS_ADD`: Add target

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Add Amazon Ads targets
- Result: Created target entities.

#### `AMAZON_ADS_TARGETS_UPDATE`: Update target

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Update Amazon Ads targets
- Result: Full model of updated targets.

#### `AMAZON_ADS_TARGETS_REMOVE`: Remove target

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Remove Amazon Ads targets
- Result: Empty response.

#### `AMAZON_ADS_TARGETS_FIND`: Find targets

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads targets
- Result: Full model of found targets.

#### `AMAZON_ADS_ADS_ADD`: Add ad

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Add Amazon Ads ads. Sponsored Products feature videos attach to an existing product ad. Use AMAZON_ADS_AD_EXTENSIONS_ADD.
- Result: Created ad entities.

#### `AMAZON_ADS_ADS_UPDATE`: Update ad

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Update Amazon Ads ads
- Result: Full model of updated ads.

#### `AMAZON_ADS_ADS_REMOVE`: Remove ad

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Remove Amazon Ads ads
- Result: Empty response.

#### `AMAZON_ADS_ADS_FIND`: Find ads

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads ads
- Result: Full model of found ads.

#### `AMAZON_ADS_AD_ASSOCIATIONS_ADD`: Add ad association

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Add Amazon Ads ad associations
- Result: Created ad association entities.

#### `AMAZON_ADS_AD_ASSOCIATIONS_UPDATE`: Update ad association

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Update Amazon Ads ad associations
- Result: Full model of updated ad associations.

#### `AMAZON_ADS_AD_ASSOCIATIONS_REMOVE`: Remove ad association

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Remove Amazon Ads ad associations
- Result: Empty response.

#### `AMAZON_ADS_AD_ASSOCIATIONS_FIND`: Find ad associations

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads ad associations
- Result: Full model of found ad associations.

#### `AMAZON_ADS_AD_EXTENSIONS_ADD`: Add ad extension

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 25 (MCP)
- Description: Add one Sponsored Products VIDEO ad extension to an existing product ad. Send one item per video. Finding no extension does not mean video creation is unavailable.
- Result: Created ad extension IDs and any item errors.

#### `AMAZON_ADS_AD_EXTENSIONS_UPDATE`: Update ad extension

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 25 (MCP)
- Description: Enable or pause an existing ad extension by adExtensionId. This does not change the video, title, or description, and it does not create a replacement.
- Result: Updated ad extension IDs and any item errors.

#### `AMAZON_ADS_AD_EXTENSIONS_FIND`: Find ad extensions

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads ad extensions. An empty list is a successful read. It is not an authorization failure, and it does not prove that a later create will be unique.
- Result: Matching ad extensions, with nextToken when more remain.

#### `AMAZON_ADS_PORTFOLIOS_ADD`: Add portfolio

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Add Amazon Ads portfolios
- Result: Created portfolio entities.

#### `AMAZON_ADS_PORTFOLIOS_UPDATE`: Update portfolio

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 250 (API) / 25 (MCP)
- Description: Update Amazon Ads portfolios
- Result: Full model of updated portfolios.

#### `AMAZON_ADS_PORTFOLIOS_FIND`: Find portfolios

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads portfolios
- Result: Full model of found portfolios.

#### Guide: Find with many IDs

Amazon accepts up to 100 IDs in one ID filter (`campaignIdFilter`, `adGroupIdFilter`, `adIdFilter`, `targetIdFilter`, `portfolioIdFilter`, `adAssociationIdFilter`, `adExtensionIdFilter`). In `AMAZON_ADS_CAMPAIGNS_FIND`, `AMAZON_ADS_AD_GROUPS_FIND`, `AMAZON_ADS_TARGETS_FIND`, `AMAZON_ADS_ADS_FIND`, `AMAZON_ADS_AD_ASSOCIATIONS_FIND`, and `AMAZON_ADS_AD_EXTENSIONS_FIND`, one ID filter can have more IDs. DataDoe queries the IDs in groups of 100 and returns up to `maxResults` results (100 by default, 1000 for ad extensions). If there are more results, the response has a `nextToken`. Send it with the same query to get the next page. Only one ID filter per request can have more than 100 IDs. Split other large ID filters into several Actions. These FIND Actions count as 1 item per call, so a longer ID list in that one filter does not add AI Tokens. Reads that count each identifier, such as listing lookups, cost less when the identifiers are in one Action.

#### Guide: Sponsored Products feature videos

Sponsored Products feature videos are ad extensions on an existing product ad. Use `AMAZON_ADS_AD_EXTENSIONS_ADD`, not `AMAZON_ADS_ADS_ADD`.

Send one extension per video. Three videos on one product ad are three items. Each item needs the existing `adId` and `adGroupId`, `adProduct: "SPONSORED_PRODUCTS"`, `adExtensionType: "VIDEO"`, `state` `ENABLED` or `PAUSED`, `marketplaceScope: "SINGLE_MARKETPLACE"`, and `marketplaces: ["US"]`.

`adExtensionSettings.videoExtension` takes `videoType: "SPOTLIGHT"`, the registered `assetId` and `assetVersion`, and an optional feature title (`headline`, at most 3 words and 15 characters) and `description`. Amazon's create schema does not publish these video fields. DataDoe forwards them. A successful asset registration does not prove the video is approved for Sponsored Products. A read of existing extensions does not guarantee the next create is unique.

`AMAZON_ADS_AD_EXTENSIONS_UPDATE` enables or pauses an extension by `adExtensionId`. It does not change the video, title, or description, and it does not create a replacement. There is no remove Action. `AMAZON_ADS_AD_EXTENSIONS_FIND` returns the extensions that match the query, including `nextToken` when more remain. An empty list is a successful read.

```json
{
  "adExtensions": [
    {
      "adProduct": "SPONSORED_PRODUCTS",
      "adExtensionType": "VIDEO",
      "adGroupId": "ad-group-id",
      "adId": "ad-id",
      "state": "ENABLED",
      "marketplaceScope": "SINGLE_MARKETPLACE",
      "marketplaces": ["US"],
      "adExtensionSettings": {
        "videoExtension": {
          "videoType": "SPOTLIGHT",
          "assetId": "amzn1.assetlibrary.asset1.example",
          "assetVersion": "version_v1",
          "headline": "Soft texture",
          "description": "Close-up of the product texture."
        }
      }
    }
  ]
}
```

#### Guide: Sponsored Brands campaigns

`AMAZON_ADS_CAMPAIGNS_ADD` for `SPONSORED_BRANDS` uses the brand entity ID (`ENTITY…`) as `brandId`: `AMAZON_ADS_BRANDS_FIND.brandEntityId`, the same value as `AMAZON_ADS_CAMPAIGNS_FIND.brandId`. Do not send the `A…` `brandId` from brands FIND. `brandId` is required for sellers and optional for Vendor Central accounts. Use `kpi: "CLICKS"`, `bidStrategy: "MANUAL"` (or omit it), and exactly one `DAILY` or `LIFETIME` budget. Placement adjustments support `HOME_PAGE`, `PRODUCT_PAGE`, and `REST_OF_SEARCH` only.

Manual vs theme targeting is locked when the campaign is created. On `AMAZON_ADS_CAMPAIGNS_ADD`, omit `smartDefault` or set it to `"MANUAL"`. DataDoe sends manual targeting, so the campaign can take product and keyword targets. Set `smartDefault` to `"TARGETING"` to use theme targets. Theme targeting blocks product targets. Send one value, not a list.

Do not set `smartDefault` on `AMAZON_ADS_CAMPAIGNS_UPDATE`. Campaigns that already exist keep their targeting. To change manual vs theme targeting, create a new campaign.

#### Guide: Sponsored Brands ads

`AMAZON_ADS_ADS_ADD` for `SPONSORED_BRANDS` (`adType: "COMPONENT"`) supports two formats: product collection (`creative.componentCreative.productCollectionSettings`) and video (`creative.componentCreative.productVideoSettings`). Other Sponsored Brands formats are not supported. Every ad needs `adGroupId`, `name`, and `state`.

- Product collection: created as an Amazon Manual Collection ad. `brand` (at most 30 characters), at most one `brandLogos` entry, at most one headline of at most 32 characters (sent as the ad title; Amazon generates one when omitted), and 3–10 product ASINs. `landingPage` can be `STORE` (with a Store `landingPageUrl`) or `ASIN_LIST` (a Store URL is used as the Store page; otherwise the page lists the product ASINs, and `landingPageAsins`, if sent, must match them). `customImages`, `CUSTOM_URL` landing pages, and `creativePropertiesToOptimize` are not supported.
- Video: exactly one `videos` entry and one product ASIN. The ad lands on the product detail page.

`AMAZON_ADS_ADS_UPDATE` for Sponsored Brands ads changes only `name` and `state`; creative changes are not supported. Targets can be added to a Sponsored Brands ad group only after it has at least one ad.

#### Guide: Sponsored Display ad groups

Set the bid optimization of a Sponsored Display ad group with `optimization.goalSettings.kpi` on `AMAZON_ADS_AD_GROUPS_ADD`:

| `kpi`       | Optimization                            |
| ----------- | --------------------------------------- |
| `PURCHASES` | Conversions                             |
| `CLICKS`    | Page visits (Amazon default if omitted) |
| `REACH`     | Viewable impressions                    |

`optimization` accepts only `bidStrategy`, `budgetSettings`, and `goalSettings.kpi`; other keys (for example `bidOptimization`) are rejected. Amazon may ignore a changed KPI on `AMAZON_ADS_AD_GROUPS_UPDATE`, so check it with `AMAZON_ADS_AD_GROUPS_FIND`. If it did not change, create a new ad group with the right KPI. Optimization cannot be set on Sponsored Display campaigns.

#### Guide: Sponsored Display ads

`AMAZON_ADS_ADS_ADD` for `SPONSORED_DISPLAY` (`adType: "COMPONENT"`) creates product ads. Each ad advertises exactly one product: `creative.sku`, `creative.asin`, or `creative.componentCreative.responsiveEcommerceSettings.products[0]` with `productId` and `productIdType`. Send one ad item per product. Amazon builds the creative from the product detail page, so custom creative settings (logos, headlines, images, `assetBasedCreativeSettings`) are not supported. Sellers advertise SKUs; for Seller Central accounts an ASIN is resolved to a SKU from synced listings data. Vendors advertise ASINs. Do not send `marketplaces`, `marketplaceScope`, `marketplaceConfigurations`, or product `marketplaceSettings`; the marketplace comes from the Ads profile.

#### Guide: Mixed ad products in add, update, and remove actions

Amazon does not accept campaigns, ad groups, ads, or targets from different ad products in one write request. Add, update, and remove actions can still mix them: DataDoe splits the items by `adProduct` and sends one request per product. If one of these requests fails, only its items fail. Add items always carry `adProduct`. On update and remove, if an item has no `adProduct`, DataDoe looks it up by ID; an ID that is not found for the Ads profile fails only that item.

#### Guide: Review Requests campaigns

Review Requests are paid Sponsored Products campaigns with `goal: "ENGAGEMENT"`. They are separate from order review requests (`AMAZON_ORDERS_SOLICITATION_FEEDBACK_SEND`). Amazon decides which products can run and pauses a campaign at Amazon's review limit. DataDoe does not read or check review counts.

Use a US Ads profile (marketplace `ATVPDKIKX0DER`). Canada, Mexico, and other marketplaces are rejected. Sending `marketplaces: ["US"]` does not change a connection in another country.

Create the campaign in this order. Each step is its own Action. If a later Action fails, the earlier creates stay in Amazon.

1. `AMAZON_ADS_CAMPAIGNS_ADD` with `adProduct: "SPONSORED_PRODUCTS"`, `goal: "ENGAGEMENT"`, `marketplaceScope: "SINGLE_MARKETPLACE"`, `marketplaces: ["US"]`, manual bidding, and one daily budget. Also send `name`, `state`, and `startDateTime`. Leave `autoCreateTargets` unset or set it to `false`.
2. `AMAZON_ADS_AD_GROUPS_ADD` with that `campaignId` and `defaultBid`. The Action maps `defaultBid` to Amazon's bid.
3. `AMAZON_ADS_TARGETS_ADD` with one positive theme target for that ad group: `targetDetails.themeTarget.matchType: "INTERESTED_AUDIENCE"`. The ad group needs this target to serve. It is not one of the four Sponsored Products automatic theme targets.
4. `AMAZON_ADS_ADS_ADD` with `adType: "COMPONENT"` and one ASIN in `creative.componentCreative.customerActionSettings`. `customerActionType` is `REVIEW_REQUEST` and `productIdType` is `ASIN`. Sellers and vendors both send an ASIN. Add one ad per ASIN.

`AMAZON_ADS_CAMPAIGNS_FIND` can send `goalFilter.include: ["ENGAGEMENT"]`. The response keeps the fields Amazon returns, including goal, state, and delivery status. Leave `goalFilter` unset to keep the usual Sponsored Products search.

You can change `state` and the daily budget. You cannot change the goal, the target match type, or the ad's customer action and ASIN. To advertise another ASIN, add a new ad. Removing the required target stops the ad group from serving.

Amazon enables Review Requests per advertiser. If the account or product is not enabled, the Action returns Amazon's error. Review performance stays in the Amazon Ads console until Amazon includes it in the reporting API.

#### Guide: Sponsored Products Auto campaigns

Automatic vs manual targeting is locked when the campaign is created. Use `AMAZON_ADS_CAMPAIGNS_ADD` with `targetingType: "AUTO"` (preferred) or `autoCreationSettings.autoCreateTargets: true`. Then create an ad group and at least one product ad. Amazon creates the four Auto theme targets (Close Match, Loose Match, Substitutes, Complements). List them with `AMAZON_ADS_TARGETS_FIND` and optionally set bids with `AMAZON_ADS_TARGETS_UPDATE` or `AMAZON_ADS_SP_BID_RECOMMENDATIONS_FIND`. Amazon does not allow creating these targets, so `AMAZON_ADS_TARGETS_ADD` rejects positive `THEME` targets with these match types. `INTERESTED_AUDIENCE` is a separate Review Requests target. See Review Requests campaigns.

Do not set `targetingType` or `autoCreationSettings` on `AMAZON_ADS_CAMPAIGNS_UPDATE`. To change Auto vs Manual, create a new campaign.

#### Guide: Sponsored Products ROAS targets

Use `roasTarget` on `AMAZON_ADS_CAMPAIGNS_UPDATE` to set the return on ad spend target for a Sponsored Products campaign. The value is a ratio, so `2.2` stays `2.2`. Do not put this target in `kpi` or `kpiValue`.

Leave `roasTarget` out to keep the current target. DataDoe rejects null, zero, negative, and non-numeric values. You cannot clear a target.

Send `bidStrategy: "RULE_BASED"` with the target, or leave `bidStrategy` out when the campaign already uses rule-based bidding. DataDoe rejects a target sent with a different bid strategy. `roasTarget` applies to Sponsored Products only. Send `adProduct: "SPONSORED_PRODUCTS"` only together with `roasTarget`. An update without `roasTarget` still rejects `adProduct`.

If Amazon reports that the campaign is not eligible, the Action returns Amazon's reason and leaves the bid strategy unchanged. `dryRun: true` does not call Amazon.

`AMAZON_ADS_CAMPAIGNS_FIND` adds `ruleBasedBidding` to Sponsored Products campaigns that use rule-based bidding. The object has `roasTarget`, `campaignOptimizationId`, `ruleState`, and `ruleStatus`. `ruleBasedBidding: null` means Amazon has no optimization rule for that campaign. If the lookup fails, the campaign leaves out `ruleBasedBidding` and includes `ruleBasedBiddingLookup` with `status: "FAILED"`. The observed return on ad spend in performance metrics is not this target.

When a rule-based Sponsored Products campaign has no optimization rule, `AMAZON_ADS_CAMPAIGNS_FIND` returns `ruleBasedBidding: null` and no custom target. Scheduled bid increases use `AMAZON_ADS_SP_BID_RULES`.

```json
{
    "type": "AMAZON_ADS_CAMPAIGNS_UPDATE",
    "sellerOrVendorId": "11111111-1111-4111-8111-111111111111",
    "details": {
        "campaigns": [
            {
                "campaignId": "123456789012345",
                "adProduct": "SPONSORED_PRODUCTS",
                "bidStrategy": "RULE_BASED",
                "roasTarget": 2.2
            }
        ]
    }
}
```

#### Guide: Negative targeting

Negatives use `AMAZON_ADS_TARGETS_ADD` with `negative: true`. Ad-group level uses `adGroupId`. Campaign level uses `campaignId`. Do not send a bid on negatives.

Negative keyword:

```json
{
    "adProduct": "SPONSORED_PRODUCTS",
    "state": "ENABLED",
    "negative": true,
    "targetType": "KEYWORD",
    "adGroupId": "217994746792262",
    "targetDetails": {
        "keywordTarget": {
            "keyword": "cheap",
            "matchType": "EXACT"
        }
    }
}
```

Negative ASIN:

```json
{
    "adProduct": "SPONSORED_PRODUCTS",
    "state": "ENABLED",
    "negative": true,
    "targetType": "PRODUCT",
    "adGroupId": "217994746792262",
    "targetDetails": {
        "productTarget": {
            "matchType": "PRODUCT_EXACT",
            "productIdType": "ASIN",
            "product": { "productId": "B0895LY6F1" }
        }
    }
}
```

Sponsored Products v3 expression types map to DataDoe as follows:

| Amazon SP v3 expression                        | DataDoe `targetType` | DataDoe `targetDetails`                                                                                          |
| ---------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `ASIN_SAME_AS`                                 | `PRODUCT`            | `productTarget.matchType: PRODUCT_EXACT`                                                                         |
| `ASIN_EXPANDED_FROM`                           | `PRODUCT`            | `productTarget.matchType: PRODUCT_SIMILAR`                                                                       |
| `ASIN_BRAND_SAME_AS` / `ASIN_CATEGORY_SAME_AS` | `PRODUCT_CATEGORY`   | `productCategoryTarget.productCategoryRefinement.productCategoryRefinement.productBrandId` / `productCategoryId` |

Amazon's public Sponsored Products v3 `expression` format is not the DataDoe contract; DataDoe follows Amazon Ads API v1.

### Budget and bid rules

#### `AMAZON_ADS_SP_BUDGET_RULES_ADD`: Create SP budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Create Sponsored Products budget rules
- Result: Rule IDs and the outcome for each rule.

#### `AMAZON_ADS_SP_BUDGET_RULES_UPDATE`: Update SP budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Update Sponsored Products budget rules
- Result: Rule IDs and the outcome for each rule.

#### `AMAZON_ADS_SP_BUDGET_RULES_ASSOCIATE`: Attach SP budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Associate Sponsored Products budget rules with campaigns
- Result: Outcome for each rule and Campaign.

#### `AMAZON_ADS_SP_BUDGET_RULES_REMOVE`: Detach SP budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Remove Sponsored Products budget rules from campaigns
- Result: Outcome for each rule and Campaign.

#### `AMAZON_ADS_SB_BUDGET_RULES_ADD`: Create SB budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Create Sponsored Brands budget rules
- Result: Rule IDs and the outcome for each rule.

#### `AMAZON_ADS_SB_BUDGET_RULES_UPDATE`: Update SB budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Update Sponsored Brands budget rules
- Result: Rule IDs and the outcome for each rule.

#### `AMAZON_ADS_SB_BUDGET_RULES_ASSOCIATE`: Attach SB budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Associate Sponsored Brands budget rules with campaigns
- Result: Outcome for each rule and Campaign.

#### `AMAZON_ADS_SB_BUDGET_RULES_REMOVE`: Detach SB budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Remove Sponsored Brands budget rules from campaigns
- Result: Outcome for each rule and Campaign.

#### `AMAZON_ADS_SD_BUDGET_RULES_ADD`: Create SD budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Create Sponsored Display budget rules
- Result: Rule IDs and the outcome for each rule.

#### `AMAZON_ADS_SD_BUDGET_RULES_UPDATE`: Update SD budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Update Sponsored Display budget rules
- Result: Rule IDs and the outcome for each rule.

#### `AMAZON_ADS_SD_BUDGET_RULES_ASSOCIATE`: Attach SD budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Associate Sponsored Display budget rules with campaigns
- Result: Outcome for each rule and Campaign.

#### `AMAZON_ADS_SD_BUDGET_RULES_REMOVE`: Detach SD budget rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Remove Sponsored Display budget rules from campaigns
- Result: Outcome for each rule and Campaign.

#### `AMAZON_ADS_SP_BID_RULES_ADD`: Create SP bid rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Create Sponsored Products scheduled bid increases. Useful for dayparting.
- Result: Rule IDs and the outcome for each rule.

#### `AMAZON_ADS_SP_BID_RULES_UPDATE`: Update SP bid rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Update Sponsored Products scheduled bid increases. Useful for dayparting.
- Result: Rule IDs and the outcome for each rule.

#### `AMAZON_ADS_SP_BID_RULES_FIND`: Find SP bid rules

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Find Sponsored Products scheduled bid increases. Useful for dayparting.
- Result: Matching rules and a pagination token.

#### `AMAZON_ADS_SP_BID_RULES_ASSOCIATE`: Attach SP bid rules

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 10 (MCP)
- Description: Associate Sponsored Products scheduled bid increases with campaigns. Useful for dayparting.
- Result: Outcome for each rule and Campaign.

#### Guide: Manage budget rules

Budget rule Actions use separate types for Sponsored Products (`SP`), Sponsored Brands (`SB`), and Sponsored Display (`SD`). A `SCHEDULE` rule increases a Campaign's daily budget during a date range or an Amazon event. A `PERFORMANCE` rule increases it when the Campaign meets a metric threshold. Create a rule, then associate its returned `ruleId` with one or more Campaigns of the same ad product.

DataDoe stores existing budget rules, including rules created in the Amazon Ads console, in `amazon_ads_budget_rules`. Campaign attachments for Sponsored Products, Sponsored Brands, and Sponsored Display are in `amazon_ads_budget_rule_campaigns`. On the daily campaign and placement tables, join `ad_campaign_applicable_budget_rule_id` to `budget_rule_id`. `ad_campaign_applicable_budget_rule_name` matches `budget_rule_name`.

Send rule definitions in `details.budgetRules` when creating rules. To update a rule, send its `ruleId` and either `ruleState`, `ruleDetails`, or both. Include only the fields you want to change in `ruleDetails`. Use `ruleState: "PAUSED"` to stop a rule from being evaluated, or `"ACTIVE"` to enable it again.

Each rule definition needs `name`, `ruleType`, `budgetIncreaseBy`, and `duration`. Use `budgetIncreaseBy.type: "PERCENT"` with a positive `value`. Provide exactly one of `duration.dateRangeTypeRuleDuration` and `duration.eventTypeRuleDuration`. Dates use `YYYYMMDD`; the end date is inclusive and must be on or after the start date. An event duration uses an Amazon `eventId`. Unknown fields and read-only fields are rejected.

Optional `recurrence.type` is `DAILY` or `WEEKLY` for Sponsored Products, Sponsored Brands and Sponsored Display. A weekly schedule needs `daysOfWeek`, such as `["SATURDAY", "SUNDAY"]`. A daily schedule does not accept `daysOfWeek`. To pause or resume a rule and leave its schedule unchanged, send `ruleId` and `ruleState` only. An optional `intraDaySchedule` contains one time window with `startTime` and `endTime` in `HH:mm:ss` format; the end time must be later than the start time.

Performance rules also need `performanceMeasureCondition` with `metricName`, `comparisonOperator`, and `threshold`. Sponsored Products and Sponsored Display accept `ACOS`, `CTR`, `CVR`, and `ROAS`; Sponsored Brands accepts `IS`, `NTB`, and `ROAS`. Schedule rules omit `performanceMeasureCondition`.

For example, create a Sponsored Products schedule rule through `POST /api/v1/actions`:

```json
{
    "type": "AMAZON_ADS_SP_BUDGET_RULES_ADD",
    "sellerOrVendorId": "your-seller-or-vendor-id",
    "dryRun": true,
    "details": {
        "budgetRules": [
            {
                "name": "Holiday budget increase",
                "ruleType": "SCHEDULE",
                "budgetIncreaseBy": { "type": "PERCENT", "value": 20 },
                "duration": {
                    "dateRangeTypeRuleDuration": {
                        "startDate": "20261201",
                        "endDate": "20261231"
                    }
                },
                "recurrence": { "type": "DAILY" }
            }
        ]
    }
}
```

After creating the rule in live mode, associate the returned ID using `AMAZON_ADS_SP_BUDGET_RULES_ASSOCIATE` and these details:

```json
{
    "associations": [
        {
            "campaignId": "123456789012345",
            "budgetRuleIds": ["your-budget-rule-id"]
        }
    ]
}
```

To pause the rule, use the matching `BUDGET_RULES_UPDATE` Action with these details:

```json
{
    "budgetRules": [{ "ruleId": "your-budget-rule-id", "ruleState": "PAUSED" }]
}
```

Association limits count the total rule IDs across all Campaigns in the Action: 25 through the API or 10 through MCP. A batch may have both successful and failed items; inspect the outcome for each item in the Action result.

Use `AMAZON_ADS_SP_BUDGET_RULES_REMOVE`, `AMAZON_ADS_SB_BUDGET_RULES_REMOVE`, or `AMAZON_ADS_SD_BUDGET_RULES_REMOVE` to remove a rule from a Campaign. This removes that association and keeps the rule available for other Campaigns. For example, send these details:

```json
{
    "removals": [
        {
            "campaignId": "123456789012345",
            "budgetRuleId": "your-budget-rule-id"
        }
    ]
}
```

DataDoe spaces requests to each budget rule endpoint at one request per second for each Ads profile. Amazon applies dynamic limits. For a throttled request, DataDoe honors Amazon's `Retry-After` header when present and retries up to twice within the 30-second request deadline. If the request still fails, the Action result message includes Amazon's message for each failed item.

#### Guide: Audit budget rule executions

Amazon retired the `budgetRules/budgetHistory` endpoints for all three ad products on 31 August 2023 and lists no replacement in its [API deprecations notice](https://advertising.amazon.com/API/docs/en-us/release-notes/deprecations). Budget rule execution history is unavailable through Actions. The Action history records DataDoe requests to create, update, associate, or remove rules from Campaigns; it does not record Amazon's daily rule evaluations.

#### Guide: Manage scheduled bid increases

Sponsored Products scheduled bid rules increase bids during a clock-time window. Dayparting means raising bids during set hours, and these Actions are useful for that. Amazon applies the schedule. DataDoe does not send a bid update each time the window starts or ends.

Create a rule with `AMAZON_ADS_SP_BID_RULES_ADD`, then attach the returned optimization rule ID with `AMAZON_ADS_SP_BID_RULES_ASSOCIATE`. Creating a rule does not attach it to a Campaign. These Actions are separate from budget rules and from Sponsored Products ROAS optimization rules.

Each created rule needs `ruleName`, `bidIncreasePercent`, `duration`, and `recurrence`. `bidIncreasePercent` is a whole number from 1 to 100. DataDoe sends Amazon an increase of that percentage. Optional `status` is `ENABLED` or `PAUSED`. When `status` is omitted, DataDoe sends `ENABLED`.

`recurrence.type` is `DAILY` or `WEEKLY`. A weekly schedule needs `daysOfWeek`. A daily schedule does not accept `daysOfWeek`. Optional `timesOfDay` is one window. `startTime` and `endTime` are hours in `HH:00` in the Amazon Ads profile timezone. `endTime` may be `24:00` and must be later than `startTime`. `duration.startTime` and optional `duration.endTime` are absolute ISO-8601 timestamps with a timezone, such as `2026-12-01T00:00:00Z`. When you change a schedule, send `duration` and `recurrence` together. An update loads the current rule and sends Amazon the complete rule, including the name, percentage, and schedule you did not change.

There is no Action to unlink a rule from one Campaign or to delete a rule. Pause or resume a rule with `AMAZON_ADS_SP_BID_RULES_UPDATE` and `status`. Pausing stops that rule for every Campaign that uses it. It does not remove the association.

Search with `AMAZON_ADS_SP_BID_RULES_FIND`. Send either `optimizationRuleIds` or one `campaignId`, not both. A Campaign search returns only scheduled bid rules for that Campaign. There is no search that lists every rule. `pageSize` is from 1 to 100, and DataDoe sends it to Amazon as `maxResults`. When the result includes `nextToken`, send it again with the same filters.

For example, increase bids by 20 percent on Saturday and Sunday from 17:00 to 21:00 through `POST /api/v1/actions`:

```json
{
    "type": "AMAZON_ADS_SP_BID_RULES_ADD",
    "sellerOrVendorId": "your-seller-or-vendor-id",
    "dryRun": true,
    "details": {
        "bidRules": [
            {
                "ruleName": "Weekend evening increase",
                "bidIncreasePercent": 20,
                "duration": {
                    "startTime": "2026-12-01T00:00:00Z",
                    "endTime": "2026-12-31T23:59:59Z"
                },
                "recurrence": {
                    "type": "WEEKLY",
                    "daysOfWeek": ["SATURDAY", "SUNDAY"],
                    "timesOfDay": [{ "startTime": "17:00", "endTime": "21:00" }]
                }
            }
        ]
    }
}
```

After creating the rule in live mode, associate the returned ID:

```json
{
    "associations": [
        {
            "campaignId": "123456789012345",
            "optimizationRuleIds": ["your-optimization-rule-id"]
        }
    ]
}
```

To pause the rule for every associated Campaign:

```json
{
    "bidRules": [{ "optimizationRuleId": "your-optimization-rule-id", "status": "PAUSED" }]
}
```

Create and update batches allow 25 rules through the API or 10 through MCP. Association limits count the campaign-rule pairs in the Action. A batch may contain both successful and failed items. Amazon can reject a rule when the profile or Campaign is not eligible; the Action result includes Amazon's message. DataDoe spaces scheduled bid rule requests at one request per second for each Ads profile, separately from budget rule requests.

### Recommendations and insights

#### `AMAZON_ADS_SP_BID_RECOMMENDATIONS_FIND`: Find SP bid recommendations

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 20 (MCP)
- Description: Find Sponsored Products bid recommendations for existing or new ad groups
- Result: Bid recommendations per targeting.

#### `AMAZON_ADS_SP_TARGET_RECOMMENDATIONS_FIND`: Find SP target recommendations

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 20 (MCP)
- Description: Find Sponsored Products keyword recommendations for an ad group or ASINs
- Result: Ranked keyword target recommendations.

#### `AMAZON_ADS_PROGRAM_ELIGIBILITY_FIND`: Check advertising eligibility

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Check which ad programs the Ads profile and, optionally, books can use
- Result: Eligibility and reasons per program.

#### `AMAZON_ADS_SB_HEADLINE_RECOMMENDATIONS_FIND`: Find SB headline recommendations

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 50 (API) / 20 (MCP)
- Description: Find Sponsored Brands headline suggestions for products
- Result: Suggested headlines per item.

#### `AMAZON_ADS_SB_INSIGHTS_FIND`: Find SB keyword insights

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Find keyword insights for planned Sponsored Brands ad groups
- Result: Impression share, rank and alerts.

#### Guide: Bids before launching a campaign

**Eligibility: Sponsored Products advertisers (sellers and vendors). Requires Ads permission `advertiser_campaign_edit` or `advertiser_campaign_view`. Source: [Sponsored Products API reference](https://advertising.amazon.com/API/docs/en-us/sponsored-products/3-0/openapi/prod).** `POST /sp/targets/bid/recommendations` is available in marketplaces where Sponsored Products is available. Amazon returns HTTP 422 for an unsupported marketplace or an ineligible product. DataDoe reports that error on the item and does not invent a bid.

`AMAZON_ADS_SP_BID_RECOMMENDATIONS_FIND` accepts two item modes in `details.bidRecommendations`. An existing ad group sends `adGroupId` and `targetings`. A new ad group sends `asins`, `targetings`, and `bidding`, with no `adGroupId`. Supply exactly one mode. `bidding` is rejected on an existing ad group because that ad group uses its campaign's strategy.

`asins` is 1 to 50 unique uppercase 10-character ASINs. `targetings` reuses the existing expression list, including `KEYWORD_EXACT_MATCH`, `KEYWORD_PHRASE_MATCH`, and `KEYWORD_BROAD_MATCH`. Keyword expressions need a nonempty value. `bidding.strategy` is `LEGACY_FOR_SALES` (dynamic bids, down only), `AUTO_FOR_SALES` (dynamic bids, up and down), `MANUAL` (fixed bids), or `RULE_BASED`. Optional `bidding.adjustments` uses `PLACEMENT_TOP`, `PLACEMENT_REST_OF_SEARCH`, and `PLACEMENT_PRODUCT_PAGE`, at most one of each, with an integer `percentage` from 0 to 900.

```json
{
    "type": "AMAZON_ADS_SP_BID_RECOMMENDATIONS_FIND",
    "sellerOrVendorId": "your-seller-or-vendor-id",
    "dryRun": true,
    "details": {
        "bidRecommendations": [
            {
                "asins": ["B012345678"],
                "targetings": [
                    { "type": "KEYWORD_EXACT_MATCH", "value": "stainless steel bottle" },
                    { "type": "KEYWORD_PHRASE_MATCH", "value": "water bottle" }
                ],
                "bidding": { "strategy": "AUTO_FOR_SALES" }
            }
        ]
    }
}
```

The ASIN above is illustrative. Use an eligible product from an authorized Ads account. A multi-ASIN item is one recommendation group. Results and errors keep the original index and the input ASINs. DataDoe does not add campaign or ad group ids for this mode. Suggested bids can differ from the Ads console because strategy, placement settings, timing, and product eligibility all affect them.

`AMAZON_ADS_SP_TARGET_RECOMMENDATIONS_FIND` ASIN items accept optional `biddingStrategy` with the same four values. Omit it to keep Amazon's default, `LEGACY_FOR_SALES`. Ad group items reject `biddingStrategy`. An explicit strategy is sent only on keyword recommendation version 5. That version is available in US, CA, BR, MX, UK, DE, FR, ES, IN, IT, NL, AE, SA, TR, EG, BE, SE, PL, JP, AU, and SG. Elsewhere the item fails with an unsupported-version error. DataDoe does not drop the strategy and retry an older version.

Currency units are not the same on every response. On keyword recommendation version 5, `bidInfo[].bid` is in minor currency units, such as cents. The spec does not state a unit for keyword `bidInfo[].suggestedBid` or for bid-recommendation `suggestedBid`. DataDoe returns Amazon's numbers unchanged and does not convert them. Compare a live response with the console before treating those fields as cents.

### Audiences

#### `AMAZON_ADS_AMC_AUDIENCES_ADD`: Create AMC audiences

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Create rule-based AMC audiences for Sponsored Ads from SQL
- Result: audienceExecutionId and status for each audience.

#### `AMAZON_ADS_AMC_LOOKALIKE_AUDIENCES_ADD`: Create AMC lookalike audiences

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Create AMC lookalike audiences for Sponsored Ads from a seed query
- Result: audienceExecutionId and status for each audience.

#### `AMAZON_ADS_AMC_AUDIENCES_UPDATE`: Update AMC audiences

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Update FAILED AMC audiences, for example to fix their SQL
- Result: Outcome for each audience.

#### `AMAZON_ADS_AMC_AUDIENCES_REMOVE`: Delete AMC audiences

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Delete AMC audiences
- Result: Outcome for each audience.

#### `AMAZON_ADS_AMC_AUDIENCES_FIND`: Find AMC audiences

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 25 (API) / 25 (MCP)
- Description: Find AMC audiences with their status and size
- Result: Audiences and a pagination token.

#### `AMAZON_ADS_TARGETABLE_AUDIENCES_FIND`: Find AMC audiences in Sponsored Ads

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find the Sponsored Ads audience ID of AMC audiences
- Result: Audience IDs, names, and a pagination token.

#### Guide: Create AMC audiences for Sponsored Ads

AMC audiences are groups of shoppers that you select with SQL in [Amazon Marketing Cloud](https://www.datadoe.com/hub/docs/datadoe-features/amc), for example shoppers who added a product to the cart but did not buy it. You can use them in Sponsored Products and Sponsored Brands to increase bids for these shoppers, and in Sponsored Display to target them. DSP audiences are not supported.

AMC audience Actions run in the AMC instance of the Seller or Vendor, so [enable AMC](https://www.datadoe.com/hub/docs/datadoe-features/amc) for it first. Without AMC, the Actions return HTTP 412 with a message that explains what is missing.

- `AMAZON_ADS_AMC_AUDIENCES_ADD` creates a rule-based audience from SQL. The final `SELECT` must return only `user_id`, and the tables must be AMC audience tables, whose names end in `_for_audiences` (for example `conversions_for_audiences` or `sponsored_ads_traffic_for_audiences`). Amazon fails an audience with fewer than 2,000 shoppers, so check the size first with an AMC query on the matching table without `_for_audiences`.
- `AMAZON_ADS_AMC_LOOKALIKE_AUDIENCES_ADD` creates a lookalike audience from a seed query of 500 to 500,000 shoppers. `lookalikeAudienceExpectedReach` sets how broad it is, from `MOST_SIMILAR` (about 0.5 to 1 million shoppers) to `MOST_BROAD` (about 3 to 10 million).
- `timeWindowStart` and `timeWindowEnd` are UTC date and times ending in `Z`. With `timeWindowRelative: true`, Amazon moves the window forward on each refresh.

Amazon builds an audience in the background, and DataDoe does not attach it to campaigns later on its own. Your AI agent or integration takes these steps:

1. Create the audience. The result includes its `audienceExecutionId`.
2. Check it with `AMAZON_ADS_AMC_AUDIENCES_FIND` every 15 to 30 minutes until `status` is `SUCCEEDED`. When it is `FAILED`, `statusReason` explains why. Fix the audience with `AMAZON_ADS_AMC_AUDIENCES_UPDATE`.
3. Amazon lists a `SUCCEEDED` audience in Sponsored Ads after about 24 to 48 hours. Get its Sponsored Ads `audienceId` with `AMAZON_ADS_TARGETABLE_AUDIENCES_FIND`, using the ad product and the audience name. When the audience is not listed yet, try again later.
4. Attach the `audienceId`: in Sponsored Products and Sponsored Brands with `audienceBidAdjustments` in `AMAZON_ADS_CAMPAIGNS_UPDATE`, or in Sponsored Display with an `AUDIENCE` target in `AMAZON_ADS_TARGETS_ADD` (`audienceTarget.audienceId.defaultValue`).

`AMAZON_ADS_AMC_AUDIENCES_UPDATE` works only for `FAILED` audiences. It can change the SQL and the time window; the name, description, and lookalike reach stay as they are. `AMAZON_ADS_AMC_AUDIENCES_REMOVE` deletes `FAILED` or `SUCCEEDED` audiences, and Amazon also removes them from Sponsored Ads.

For example, create an audience of shoppers who added a product to the cart but did not buy it after that (the query from Amazon's AMC instructional queries), through `POST /api/v1/actions`:

```json
{
    "type": "AMAZON_ADS_AMC_AUDIENCES_ADD",
    "sellerOrVendorId": "your-seller-or-vendor-id",
    "dryRun": true,
    "details": {
        "audiences": [
            {
                "audienceName": "Cart abandoners 30 days",
                "sql": "WITH purchase AS (SELECT user_id, MAX(event_dt_utc) AS purchase_dt_max FROM conversions_for_audiences WHERE event_subtype = 'order' GROUP BY 1), atc AS (SELECT user_id, MAX(event_dt_utc) AS atc_dt_max FROM conversions_for_audiences WHERE event_subtype = 'shoppingCart' GROUP BY 1) SELECT atc.user_id FROM atc LEFT JOIN purchase ON atc.user_id = purchase.user_id WHERE atc_dt_max > purchase_dt_max OR purchase_dt_max IS NULL",
                "timeWindowStart": "2026-09-20T00:00:00Z",
                "timeWindowEnd": "2026-10-19T00:00:00Z",
                "timeWindowRelative": true
            }
        ]
    }
}
```

When the audience is listed in Sponsored Ads, find its `audienceId` with `AMAZON_ADS_TARGETABLE_AUDIENCES_FIND`:

```json
{
    "adProduct": "SPONSORED_PRODUCTS",
    "audienceName": "Cart abandoners 30 days"
}
```

Then increase bids for it by 30 percent in a Sponsored Products campaign with `AMAZON_ADS_CAMPAIGNS_UPDATE`:

```json
{
    "campaigns": [
        {
            "campaignId": "123456789012345",
            "adProduct": "SPONSORED_PRODUCTS",
            "audienceBidAdjustments": [{ "audienceId": "your-audience-id", "percentage": 30 }]
        }
    ]
}
```

One Action creates, updates, or deletes up to 10 audiences through the API and 5 through MCP. Creating or updating an audience costs 5 AI Tokens per audience (currently promotional 0). Finding and deleting audiences is free. See [Subscription and pricing](https://www.datadoe.com/hub/docs/basics/subscription-pricing).

#### Guide: Audience prices

`AMAZON_LISTINGS_PRICING_UPDATE` sets the single-unit price for one audience on a Seller Central listing. Omit `audience`, or set it to `ALL`, to set the price every buyer pays.

Use `B2B` for Amazon Business buyers. Use an industry audience, such as `B2B_EDUCATION`, for business industry pricing (IVP). Amazon documents these audiences for the United States, and from 29 October 2026 also for Canada, the UK, Germany, France, Italy, Spain, and Japan. `ALL` works in every marketplace.

Industry audiences are available when the seller is enrolled in Amazon Business. Amazon calls this subscription SellingToBusinesses. The audiences a seller can use are on the product-type schema for that seller and marketplace. Load it with `AMAZON_LISTINGS_PRODUCT_TYPE_DEFINITION_FIND`. Send that product type on the price change. DataDoe checks the audience, price, and quantity discounts against that schema.

A price change merges the selected audience, currency, and marketplace. Other audiences stay as they are. Quantity discounts, price limits, and automated pricing rules stay as they are unless you send a new quantity-discount plan. If Seller Central has an automated pricing rule for that audience, Amazon applies the rule instead of the price you send.

`quantityDiscount` is for an Amazon Business or industry audience. `discountType` is `percent` or `fixed`. When `discountType` is `percent`, 5 means 5% off the single-unit price. When `discountType` is `fixed`, `value` is the unit price buyers pay in the marketplace currency once the order reaches `lowerBound`. `lowerBound` is the minimum quantity for that tier. Omit `quantityDiscount` to leave the current tiers in place.

You can send more than one audience for the same SKU. DataDoe sends them in one price update. Do not repeat the same audience for a SKU.

Read current audience prices from `amazon_listings_audience_pricing`. One row is one connection, marketplace, SKU, and audience. `unit_price` is the single-unit price. `quantity_discount_tiers` lists those tiers. When `discount_type` is `percent`, `value` is the percent off the single-unit price. When `discount_type` is `fixed`, `value` is the unit price.

To check a price before you send it, run `dryRun`, then `AMAZON_LISTINGS_PRICING_UPDATE_VERIFY`, then `AMAZON_LISTINGS_PRICING_UPDATE`. When the change includes `productType`, `dryRun` checks the product-type schema. The verify Action asks Amazon to preview the price with replace, because validation preview does not accept merge. It does not change the price. The price update still merges that audience only.

### Brands and creative assets

#### `AMAZON_ADS_BRANDS_FIND`: Find ads brands

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads brands for Sponsored Brands campaigns
- Result: Brand details, including brand entity IDs.

#### `AMAZON_ADS_ASSETS_ADD`: Upload creative assets

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 10 (API) / 5 (MCP)
- Description: Upload creative assets to the Creative Asset Library
- Result: Per-file asset id, version, and status.

#### `AMAZON_ADS_ASSETS_FIND`: Find creative assets

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find creative assets
- Result: Asset records and a nextToken for search.

#### Guide: Upload and find creative assets

Creative assets are images and videos in Amazon's Creative Asset Library. Upload a file first, then start `AMAZON_ADS_ASSETS_ADD`. The action stays in processing until Amazon finishes spec checks.

Eligibility follows Amazon's published coverage:

- Console launch on 2021-07-15: vendors, sellers, and KDP authors in the US, CA, and MX. [Creative assets](https://advertising.amazon.com/resources/whats-new/creative-assets)
- Sponsored Display and Ads API expansion on 2022-04-19: vendors and registered sellers in the US, CA, MX, BR, DE, ES, FR, IT, NL, UK, AE, AU, IN, and JP. [Sponsored Display creative assets](https://advertising.amazon.com/resources/whats-new/sponsored-display-creative-assets)

Create the file with `POST /files` in group `AD_ASSETS` (`PNG`, `JPG`, `MP4`, or `MOV`, up to 500MB), then `PUT` the bytes to the returned `uploadUrl` within 30 minutes. DataDoe then handles Amazon's own upload URL, which expires after 15 minutes, while the action runs. For video, MCP `files_create` should use `uploadMode: UPLOAD_URL`, which returns `{ file, uploadUrl }` and does not require `contentBase64`. Inline MCP upload stays limited to the smaller image size.

`AMAZON_ADS_ASSETS_ADD` uploads each file and registers it. Images can take up to 1 hour and videos up to 6 hours before the action completes. The result lists each file in `items` with its `assetId`, `assetVersion`, status, and spec-check `issues`. A failed action keeps `items` too, so assets Amazon already registered stay usable. Sellers must set `brandEntityId` (look it up with `AMAZON_ADS_BRANDS_FIND`). Vendors may omit it. `AMAZON_ADS_ASSETS_FIND` looks up assets by id or returns one search page plus `nextToken`.

DSP creative-asset upload is not available until DSP actions ship. Do not send `adProduct: AMAZON_DSP`.

### Attribution

#### `AMAZON_ADS_ATTRIBUTION_PUBLISHERS_FIND`: Find Attribution publishers

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Find Amazon Attribution publishers
- Result: Publisher IDs and names.

#### `AMAZON_ADS_ATTRIBUTION_ADVERTISERS_FIND`: Find Attribution advertisers

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Find Amazon Attribution advertisers
- Result: Advertiser IDs and names.

#### `AMAZON_ADS_ATTRIBUTION_MACRO_TAGS_FIND`: Find Attribution macro tags

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Find Amazon Attribution macro tags
- Result: Tags by advertiser and publisher.

#### `AMAZON_ADS_ATTRIBUTION_NON_MACRO_TAG_TEMPLATES_FIND`: Find Attribution tag templates

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Find Amazon Attribution tag templates
- Result: Templates with ID placeholders.

#### `AMAZON_ADS_ATTRIBUTION_REPORTS_FIND`: Find Attribution reports

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Read a live Amazon Attribution report
- Result: Report rows, size, and cursor.

#### `AMAZON_ADS_ATTRIBUTION_TAGS_GENERATE`: Generate Attribution links

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 1 (API) / 1 (MCP)
- Description: Build an Amazon Attribution tracking link
- Result: Tracking URL and tag parameters.

### Account communication

#### `AMAZON_ADS_COMMUNICATION_CONTACTS_ADD`: Add ads communication contacts

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5 (API) / 5 (MCP)
- Description: Add account support contacts to the Amazon Ads account (Amazon open beta)
- Result: Created or already existing contacts.

#### `AMAZON_ADS_COMMUNICATION_CONTACTS_FIND`: Find ads communication contacts

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads account support contacts (Amazon open beta)
- Result: Contacts and a pagination token.

#### `AMAZON_ADS_COMMUNICATION_PREFERENCES_FIND`: Find ads communication preferences

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: not limited, every call counts as 1 item
- Description: Find Amazon Ads communication preferences and their categories (Amazon open beta)
- Result: Preferences, categories, and a pagination token.

#### `AMAZON_ADS_COMMUNICATION_PREFERENCES_UPDATE`: Update ads communication preferences

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 2 (API) / 2 (MCP)
- Description: Update Amazon Ads communication preferences (Amazon open beta)
- Result: Updated and previous preference for each item.

#### Guide: Manage communication contacts and preferences (Amazon open beta)

These four Actions use Amazon's [Communications Preferences API](https://advertising.amazon.com/API/docs/en-us/guides/communications-preferences/get-started), which Amazon released as an open beta on 1 October 2026. Amazon may change it before general availability. The connected Amazon Ads user needs the account view permission for FIND and the account edit permission for ADD and UPDATE. These differ from the campaign permissions other Ads Actions use. Without them, the Action fails with a permission message. Communication preferences belong to the Amazon Ads profile of the Seller or Vendor: in DataDoe's tests, two marketplaces on the same Amazon Ads account had separate preferences with different IDs. Run FIND and UPDATE for each Seller or Vendor whose preferences you want to change. Amazon does not document whether contacts apply to one profile or to the whole Amazon Ads account.

`AMAZON_ADS_COMMUNICATION_CONTACTS_ADD` registers account support contacts. Amazon cannot edit or delete a contact through the API, so run the Action with `dryRun` first. Each contact has a `channel` (`EMAIL` or `PHONE`) and a `contactAddress` with exactly one of `emailAddress` or `phoneNumber`. Phone numbers use E.164, such as `+442071234567`. `contactPurpose` defaults to `ACCOUNT_SUPPORT`, the only purpose Amazon accepts. Optional `timeZone` accepts only Amazon's list of 44 IANA zones; zones such as `Europe/Warsaw` or `Europe/Berlin` are rejected. DataDoe first lists the existing contacts and skips an address that already exists, returning it with `alreadyExists: true`. Other contacts are sent one per Amazon request. If Amazon lists more than 500 contacts on a channel, DataDoe cannot check them all, so the Action fails before adding any contact.

`AMAZON_ADS_COMMUNICATION_CONTACTS_FIND` and `AMAZON_ADS_COMMUNICATION_PREFERENCES_FIND` take one `channel`, plus optional `maxResults` (1 to 100) and `nextToken`. Contacts use `EMAIL` or `PHONE`. Preferences use `EMAIL` or `UI` (in-app messages).

Category IDs are not fixed values. Get `communicationPreferenceId` and `categoryId` from `AMAZON_ADS_COMMUNICATION_PREFERENCES_FIND`, then update with `AMAZON_ADS_COMMUNICATION_PREFERENCES_UPDATE`. `communicationsEnabled` is required. When it is `true`, send at least one `categoryPreferences` entry; Amazon would otherwise subscribe the account to every category. Send `communicationsEnabled: false` to stop every communication on that channel. DataDoe checks the IDs against the current preferences and sends Amazon the full category list: the current subscriptions with your changes applied. Categories you omit keep their current state. Each result item contains Amazon's updated `communicationPreference` and the `previousCommunicationPreference`.

For example, list email preferences:

```json
{
    "type": "AMAZON_ADS_COMMUNICATION_PREFERENCES_FIND",
    "sellerOrVendorId": "your-seller-or-vendor-id",
    "details": { "channel": "EMAIL" }
}
```

Then unsubscribe from one category and keep the channel enabled:

```json
{
    "type": "AMAZON_ADS_COMMUNICATION_PREFERENCES_UPDATE",
    "sellerOrVendorId": "your-seller-or-vendor-id",
    "dryRun": true,
    "details": {
        "communicationPreferences": [
            {
                "communicationPreferenceId": "your-communication-preference-id",
                "communicationsEnabled": true,
                "categoryPreferences": [
                    { "categoryId": "your-category-id", "isCategorySubscribed": false }
                ]
            }
        ]
    }
}
```

Add an email contact for account support:

```json
{
    "type": "AMAZON_ADS_COMMUNICATION_CONTACTS_ADD",
    "sellerOrVendorId": "your-seller-or-vendor-id",
    "dryRun": true,
    "details": {
        "communicationContacts": [
            {
                "channel": "EMAIL",
                "contactAddress": { "emailAddress": "ads-team@example.com" },
                "preferredContact": true,
                "timeZone": "Europe/London"
            }
        ]
    }
}
```

ADD accepts 5 contacts and UPDATE 2 preferences, through the API and MCP. DataDoe masks email addresses and phone numbers in its internal Amazon Ads call logs. The Action details and result keep the full values.

### Partner opportunities

Partner Network opportunities and Amazon account team recommendations. See [Amazon Ads Partner Opportunities](https://www.datadoe.com/hub/docs/datadoe-data/amazon-ads-partner-opportunities) for the Partner Network setup.

#### `AMAZON_ADS_PARTNER_OPPORTUNITIES_FIND`: Find partner opportunities

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 5000 (API) / 10 (MCP)
- Description: Read one page of the Amazon Ads Partner Network catalog
- Result: Catalog metadata and a nextToken.

#### `AMAZON_ADS_PARTNER_RECOMMENDATIONS_APPLY`: Apply partner recommendations

- Access: Write
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 100 (API) / 100 (MCP)
- Description: Apply Amazon account team recommendations that share one Partner Network opportunity
- Result: Accepted and rejected recommendation IDs.

#### `AMAZON_ADS_PARTNER_RECOMMENDATION_STATUS_FIND`: Find partner recommendation status

- Access: Read
- Accounts: Sellers and Vendors
- Requires PII access: no
- Max items: 500 (API) / 500 (MCP)
- Description: Read the status of applied Partner Network recommendations
- Result: Campaign ID, recommendation ID, and Amazon status.

#### Guide: Partner Network recommendations

These are Amazon recommendations. Find, apply, and status Actions use a Partner Network account ID saved on the Amazon Ads connection.

- `AMAZON_ADS_PARTNER_OPPORTUNITIES_FIND` returns one catalog page, not the recommendation rows
- read recommendation rows from `amazon_ads_partner_opportunities` after the daily sync
- `AMAZON_ADS_PARTNER_RECOMMENDATIONS_APPLY` sends 1 to 100 recommendation IDs from one account-team opportunity
- dry run does not call Amazon, and HTTP 202 means Amazon accepted the request
- HTTP 202 does not mean the change is complete
- `AMAZON_ADS_PARTNER_RECOMMENDATION_STATUS_FIND` reads status for 1 to 500 IDs and does not apply them again

See [Amazon Ads Partner Opportunities](https://www.datadoe.com/hub/docs/datadoe-data/amazon-ads-partner-opportunities) for setup, the nine families, and why a table can be empty.
