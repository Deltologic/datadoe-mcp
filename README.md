# Amazon Seller MCP Server - DataDoe

> **Hosted Amazon Seller Central & Vendor Central MCP server.** Connect Claude, ChatGPT, Cursor, Codex, Gemini, and GitHub Copilot to live Amazon SP-API and Amazon Ads API data. DataDoe handles the SP-API developer approval, OAuth, and rate limits so your AI agent starts querying in under a minute.

[![Amazon Seller & Vendor](https://img.shields.io/badge/Amazon-Seller%20%26%20Vendor-FF9900?style=flat-square)](https://www.datadoe.com/)
[![SP-API Selling Partner API](https://img.shields.io/badge/SP--API-Selling%20Partner-FF6F00?style=flat-square)](https://developer-docs.amazon.com/sp-api/)
[![Amazon Ads API](https://img.shields.io/badge/Amazon-Ads%20API-232F3E?style=flat-square)](https://advertising.amazon.com/API/docs)
[![MCP Server](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-8A2BE2?style=flat-square)](https://modelcontextprotocol.io/)
[![AI clients supported](https://img.shields.io/badge/AI%20clients-6%2B%20supported-D97757?style=flat-square)](#quick-setup-per-ai-client)
[![smithery badge](https://smithery.ai/badge/jakopv007/datadoe-mcp)](https://smithery.ai/servers/jakopv007/datadoe-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

🔗 [Start a free trial](https://www.datadoe.com/connect/amazon/mcp) · 📘 [Documentation](https://app.datadoe.com/hub/docs) · 📊 [Amazon data schema](https://app.datadoe.com/hub/data-scheme) · 🎥 [Video demo](https://www.youtube.com/watch?v=9YQd7M2dMyY)

---

## 🚀 Quick start

1. Sign up at [DataDoe](https://www.datadoe.com/connect/amazon/mcp) and connect your Amazon Seller Central or Vendor Central account.
2. Create a DataDoe MCP API key in [DataDoe MCP Integrations](https://app.datadoe.com/integrations/mcp).
3. Paste the config below into your AI client (Claude, Cursor, Codex, Gemini, GitHub Copilot, ChatGPT, or any MCP-capable tool):

   ```json
   {
     "mcpServers": {
       "datadoe": {
         "url": "https://mcp.datadoe.com/mcp/v1",
         "headers": {
           "datadoe-mcp-key": "<YOUR_DATADOE_MCP_KEY>"
         }
       }
     }
   }
   ```

4. Ask your AI agent: *"Show my top 10 ASINs by revenue last month across all Amazon marketplaces."*

That's it. DataDoe runs the MCP server on hosted infrastructure, so your team doesn't need to deploy anything locally or wait for Amazon SP-API developer approval.

---

## What is DataDoe MCP?

**DataDoe MCP** is a hosted [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for **Amazon sellers, vendors, and agencies**. It exposes your live Amazon Selling Partner API (SP-API) and Amazon Ads API data through MCP tools that work with Claude, ChatGPT, Cursor, Codex CLI, Gemini CLI, GitHub Copilot, Claude Desktop, n8n, NanoClaw, and any other MCP-capable client.

Building your own Amazon SP-API integration typically requires SP-API developer registration, OAuth refresh-token flow, marketplace-specific endpoints, throttling logic, and 2-4 weeks of Amazon approval. DataDoe takes care of all of that. You get a single authenticated MCP URL, and SKU-level Amazon data - orders, sales, ads spend, traffic, inventory, listings, returns, settlements, brand analytics, catalog - comes back as structured tool responses or downloadable CSV and JSON exports.

![DataDoe MCP Banner](/assets/datadoe-mcp-banner.png)

## Who is DataDoe MCP for?

- **Amazon sellers (FBA, FBM, multi-marketplace)** - get instant answers from your own seller data without context-switching to Seller Central.
- **Amazon agencies** managing multiple client accounts - query across every connected Seller Central / Vendor Central account from one MCP server.
- **Vendors with Vendor Central** - read 1P data alongside 3P data with the same tools.
- **AI builders and developers** - ship Amazon-aware AI agents, dashboards, and internal tools without writing your own SP-API integration.
- **Operations teams** - automate recurring reports via Claude Code, Cursor, n8n, or any MCP-capable workflow tool.

## Why use DataDoe MCP?

- ✅ **No SP-API approval needed** - DataDoe handles SP-API developer registration, OAuth, refresh tokens, and rate limits on your behalf.
- ✅ **30-second setup** - paste the MCP URL and your API key into your AI client config. DataDoe runs the server on hosted infrastructure.
- ✅ **6+ AI clients supported** out of the box: Claude, ChatGPT, Cursor, Codex CLI, Gemini CLI, GitHub Copilot, plus any MCP-capable client.
- ✅ **SKU-level resolution** - drill into individual ASINs, parent listings, marketplaces, time periods, ad campaigns, keyword reports, settlements, returns.
- ✅ **Multi-marketplace, multi-account** - one MCP server covers every Amazon marketplace (US, UK, DE, FR, IT, ES, CA, AU, JP, MX, and more) across Seller Central and Vendor Central.
- ✅ **AI-native by design** - `exports_create` accepts SQL-like filter groups, GROUP BY, aggregations, and date intervals, so your AI agent can build complex reports from one tool call.
- ✅ **Always-on hosted infrastructure** - DataDoe manages SP-API rate limits, token rotation, and ongoing maintenance.

## What can you ask DataDoe MCP?

Example questions your AI agent can answer with DataDoe MCP connected:

- *"What were my top 20 ASINs by revenue last month across all Amazon marketplaces?"*
- *"Reconcile my Amazon settlements against orders for Q1, and show any discrepancies."*
- *"Which Amazon Ads campaigns had ACoS over 40% last week, and what was their total spend?"*
- *"Show inventory units at risk of stocking out in the next 14 days."*
- *"Build me a daily KPI dashboard with sales, traffic, and ad spend for the last 90 days."*
- *"Which search terms in my PPC reports drove the most clicks but zero conversions?"*
- *"Pull every Amazon return for SKU ABC-123 in the last 60 days and summarize the return reasons."*
- *"Compare my brand analytics search term share-of-voice month over month."*

## Available MCP tools

DataDoe MCP exposes the following tools to your AI client:

| Tool | Category | What it does |
|---|---|---|
| `sellers_and_vendors_list` | Account | Lists every Amazon Seller Central and Vendor Central account connected to your DataDoe organization, with marketplace, region, and Amazon Ads account info. |
| `organization_and_subscription_details_get` | Account | Returns your DataDoe organization profile and active subscription plan. |
| `exports_sources_get` | Data | Searches DataDoe's catalog of pre-built Amazon data export templates (orders, sales and traffic, ads performance, inventory, listings, settlements, returns, brand analytics, and more). |
| `exports_create` | Data | Creates an Amazon data export from any source. Supports SQL-like filters, GROUP BY, aggregations (sum / avg / count / countDistinct / min / max), date intervals (DAY / WEEK / MONTH), pagination, and CSV or JSON output. |
| `exports_get` | Data | Returns status and metadata for an in-flight or completed export job. |
| `exports_raw_url_get` | Data | Returns a one-time presigned download URL for a completed export. |
| `exports_raw_download` | Data | Returns the raw export content (CSV or JSON) inline in the tool response. |
| `datadoe_user_docs_table_of_contents_get` | Docs | Returns the table of contents of the DataDoe user documentation, useful when an agent needs to look up features or capabilities on demand. |
| `datadoe_user_docs_page_get` | Docs | Returns the full content of a named DataDoe documentation page. |

---

## Quick setup per AI client

The snippets below are the minimum config you need. For step-by-step guides per AI client, see the [Per-client setup guides](#per-client-setup-guides) list at the end of this section.

### Claude Desktop · Claude.ai

```json
{
  "mcpServers": {
    "datadoe": {
      "url": "https://mcp.datadoe.com/mcp/v1",
      "headers": {
        "datadoe-mcp-key": "<YOUR_DATADOE_MCP_KEY>"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add datadoe \
  --transport http \
  --url https://mcp.datadoe.com/mcp/v1 \
  --header "datadoe-mcp-key: <YOUR_DATADOE_MCP_KEY>"
```

### Cursor

Add to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (per project):

```json
{
  "mcpServers": {
    "datadoe": {
      "url": "https://mcp.datadoe.com/mcp/v1",
      "headers": {
        "datadoe-mcp-key": "<YOUR_DATADOE_MCP_KEY>"
      }
    }
  }
}
```

### GitHub Copilot (VS Code)

Add to your VS Code `mcp.json`:

```json
{
  "mcpServers": {
    "datadoe": {
      "url": "https://mcp.datadoe.com/mcp/v1",
      "headers": {
        "datadoe-mcp-key": "<YOUR_DATADOE_MCP_KEY>"
      }
    }
  }
}
```

### Codex CLI · Gemini CLI · ChatGPT · n8n · NanoClaw · any other MCP client

DataDoe MCP works as a **generic remote MCP server**. Configure your client with:

- **URL**: `https://mcp.datadoe.com/mcp/v1`
- **Transport**: HTTP Streamable
- **Auth header**: `datadoe-mcp-key: <YOUR_DATADOE_MCP_KEY>` (create a key in [DataDoe MCP Integrations](https://app.datadoe.com/integrations/mcp))

### Per-client setup guides

For step-by-step setup guides per AI client, see the dedicated DataDoe documentation pages:

- [Using Claude](https://app.datadoe.com/hub/docs/data-doe-mcp/claude)
- [Using ChatGPT](https://app.datadoe.com/hub/docs/data-doe-mcp/chatgpt)
- [Using Claude Code](https://app.datadoe.com/hub/docs/data-doe-mcp/claude-code)
- [Using Codex](https://app.datadoe.com/hub/docs/data-doe-mcp/codex)
- [Using Cursor](https://app.datadoe.com/hub/docs/data-doe-mcp/cursor)
- [Using Gemini CLI](https://app.datadoe.com/hub/docs/data-doe-mcp/gemini-cli)
- [Using VS Code](https://app.datadoe.com/hub/docs/data-doe-mcp/vs-code)
- [Using n8n](https://app.datadoe.com/hub/docs/data-doe-mcp/n8n)
- [Using NanoClaw](https://app.datadoe.com/hub/docs/data-doe-mcp/nanoclaw)

Full documentation root: [app.datadoe.com/hub/docs](https://app.datadoe.com/hub/docs)

---

## What Amazon data is available?

DataDoe MCP exposes every Amazon data table available in DataDoe, including:

- **Orders & sales**: order line items, order performance, sales and traffic, refunds
- **Amazon Ads**: campaigns, ad groups, keywords, search terms, sponsored products / brands / display, ACoS / ROAS / impression-share metrics
- **Inventory**: FBA inventory, restock recommendations, stranded inventory, age, units at risk
- **Listings & catalog**: ASIN catalog, product attributes, buy box ownership, variations
- **Finance**: settlements, fees, reserves, reimbursements, deposits
- **Returns**: customer returns, return reasons, FBA returns
- **Brand analytics**: search query performance, market basket, repeat purchase, demographics
- **Traffic**: sessions, page views, conversion rate, by ASIN, by marketplace

Full schema: [app.datadoe.com/hub/data-scheme](https://app.datadoe.com/hub/data-scheme)

---

## What DataDoe MCP is NOT

To avoid confusion when evaluating Amazon MCP servers:

- ❌ **Not a self-hosted MCP server.** DataDoe MCP is hosted at `mcp.datadoe.com`. This GitHub repository is the schema facade used to publish DataDoe MCP to public MCP registries (Official MCP Registry, mcpservers.org, glama.ai, mcpmarket.com, Cline, smithery.ai, and others).
- ❌ **Not an SP-API wrapper you operate yourself.** DataDoe owns the SP-API developer registration, OAuth flow, refresh-token rotation, marketplace endpoints, and rate-limit handling. You bring your Amazon account; we handle the rest.
- ❌ **Not a free open-source server.** DataDoe MCP requires a DataDoe subscription. For a free self-hosted alternative, see the community Amazon MCP servers indexed at [mcpservers.org](https://mcpservers.org/).

---

## Documentation & resources

- [DataDoe homepage](https://www.datadoe.com/)
- [DataDoe documentation](https://app.datadoe.com/hub/docs)
- [Amazon data schema reference](https://app.datadoe.com/hub/data-scheme)
- [DataDoe MCP product page](https://www.datadoe.com/connect/amazon/mcp)
- [DataDoe vs Amazon MCP comparison](https://datadoe.com/compare/datadoe-vs-amazon-mcp)
- [DataDoe MCP video demo](https://www.youtube.com/watch?v=9YQd7M2dMyY)
- [DataDoe blog: Amazon SP-API, Ads API, and MCP explainers](https://datadoe.com/blog)
- [Create a DataDoe MCP API key](https://app.datadoe.com/integrations/mcp)

---

## License

[MIT](LICENSE). The DataDoe MCP schema facade in this repository is open-source. The hosted MCP server, DataDoe application, and DataDoe infrastructure are proprietary and operated by Deltologic.

---

### How to start and connect locally (for indexing and listing)

> This server is just a schema facade of the actual DataDoe MCP server, made for exposing DataDoe MCP to various MCP registries.
> It is a no-op server: it does not do anything beyond exposing the schema of DataDoe MCP.
> If you want to actually use DataDoe MCP, see the [DataDoe MCP documentation](https://app.datadoe.com/hub/docs).

#### 1. Install dependencies

```bash
yarn install
```

#### 2. Build the local server

```bash
yarn build
```

This compiles the TypeScript source into `dist/index.js`.

#### 3. Start the server

```bash
yarn start
```

The server communicates over stdio, so the process is intended to be launched by your MCP client rather than opened in a browser.

#### 4. Connect from an MCP client

For a local setup, point your client at the built entrypoint. A typical `mcp.json` looks like this:

```json
{
  "mcpServers": {
    "datadoe": {
      "command": "node",
      "args": ["/absolute/path/to/datadoe-mcp/dist/index.js"]
    }
  }
}
```

If your client supports environment-based workspace paths, you can usually swap the absolute path for the actual clone location on your machine.

---

DataDoe is operated by [Deltologic](https://github.com/Deltologic) · [datadoe.com](https://www.datadoe.com/)
