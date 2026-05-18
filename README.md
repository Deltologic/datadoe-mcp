# DataDoe MCP

## What is DataDoe MCP?

DataDoe MCP is a tool that allows you to use DataDoe features in your AI agents, assistants, and applications.
It supports all major MCP clients and servers, including popular chat apps like ChatGPT or Claude, and development tools like Claude Code, Cursor, or Codex.

## Why would I use DataDoe MCP?

DataDoe MCP turns your Amazon Seller and Vendor data into a live, AI-ready data source.
Instead of exporting CSVs or maintaining your own SP-API and Ads API pipelines, connect once and let your AI agent pull SKU-level sales, ads, inventory, and traffic data on demand, in natural language. Connect your Amazon accounts, plug DataDoe MCP into your AI client, and ship insights and apps in minutes instead of weeks.

Claude with DataDoe

## What can I do with DataDoe MCP?

Once DataDoe MCP is connected, it becomes a live data layer for your AI agent. Here's what you can do with it:

- **Explore your Amazon data in plain English**: ask questions about sales, ads, traffic, inventory, and listings without writing SQL or pulling exports.
- **Generate reports and reconciliations on demand**: let your AI agent build sales summaries, ad performance reviews, or settlement-vs-order reconciliations whenever you need them.
- **Vibe-code custom dashboards and tools**: scaffold KPI dashboards, internal apps, or one-off analyses directly inside your IDE, with live Amazon data wired in from the start.
- **Automate recurring workflows**: use n8n (or any MCP-capable automation tool) to schedule AI-generated briefings, alerts, and exports straight to Slack, email, or your file system.
- **Build custom AI agents on top of Amazon data**: ship client-facing assistants, internal copilots, or agency-grade reporting bots without writing your own SP-API and Ads API integration.
- **Bring Amazon into the AI tools you already use**: work with your data inside the same agent you use for code, docs, or operations, instead of context-switching between platforms.

Learn more in our video demo:

[DataDoe MCP video demo](https://www.youtube.com/watch?v=9YQd7M2dMyY)

## What data can I use with DataDoe MCP?

DataDoe MCP supports all data available in DataDoe. You can review all tables and columns in our [interactive Data Scheme](https://app.datadoe.com/hub/docs/data-scheme).

## How do I use DataDoe MCP with ChatGPT or Claude?

If you're using **ChatGPT** or **Claude**, you can connect DataDoe MCP directly inside your assistant. For details, see the [ChatGPT](https://app.datadoe.com/hub/docs/data-doe-mcp/chatgpt) and [Claude](https://app.datadoe.com/hub/docs/data-doe-mcp/claude) pages.

## How do I connect DataDoe MCP using other MCP clients?

For other MCP clients, follow the dedicated guides:

- [Using Claude Code](https://app.datadoe.com/hub/docs/data-doe-mcp/claude-code)
- [Using Codex](https://app.datadoe.com/hub/docs/data-doe-mcp/codex)
- [Using Cursor](https://app.datadoe.com/hub/docs/data-doe-mcp/cursor)
- [Using Gemini CLI](https://app.datadoe.com/hub/docs/data-doe-mcp/gemini-cli)
- [Using VS Code](https://app.datadoe.com/hub/docs/data-doe-mcp/vs-code)
- [Using n8n](https://app.datadoe.com/hub/docs/data-doe-mcp/n8n)
- [Using NanoClaw](https://app.datadoe.com/hub/docs/data-doe-mcp/nanoclaw)

If your MCP client isn't listed, add DataDoe MCP as a generic remote server using:

- **URL**: `https://mcp.datadoe.com/mcp/v1`
- **Transport**: HTTP Streamable
- **Auth header**: `datadoe-mcp-key: <YOUR_MCP_KEY>` (create a key in [DataDoe MCP Integrations](https://app.datadoe.com/integrations/mcp))

```json
{
    "mcpServers": {
        "datadoe": {
            "url": "https://mcp.datadoe.com/mcp/v1",
            "headers": {
                "datadoe-mcp-key": "<YOUR_MCP_KEY>"
            }
        }
    }
}
```

---

### How to start and connect locally (for indexing and listing)

> This server is just a scheme of the actual DataDoe MCP server made for exposing DataDoe MCP to various MCP registries.
> It is a No-Op server, it does not do anything beside exposing the schema of DataDoe MCP.
> If you want to use DataDoe MCP, learn how to set it up here: [https://app.datadoe.com/hub/docs/data-doe-mcp/overview](https://app.datadoe.com/hub/docs/data-doe-mcp/overview).

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