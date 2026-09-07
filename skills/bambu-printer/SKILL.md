---
name: bambu-printer
description: >-
  Use when checking or controlling the home Bambu Lab A1 (status, camera,
  pause/resume/cancel, print_3mf). Requires the Mac on the printer LAN.
  Never invent printer state; call MCP tools.
---

# Bambu Lab A1

Mac-only wrap of `@rowbotik/bambu-printer-mcp`. The remote Grok Bot box cannot reach the printer. Use MCP tools from this plugin on the Mac that shares the printer LAN.

## Setup (for agents)

If the plugin is missing or tools do not appear:

1. Confirm you are on the user's Mac (same LAN as the A1). If you are remote, stop and tell the user a Mac-local agent must finish setup.
2. Collect `PRINTER_HOST`, `BAMBU_SERIAL`, and `BAMBU_TOKEN`. Never paste the token back into chat. Never write real IPs, serials, or tokens into the repo.
3. Install this plugin as a **real directory** at `~/.cursor/plugins/local/bambu-printer` (not a symlink). `plugin.json` must sit at that root.
4. Run `npm install` in that directory. Do not launch with `npx`.
5. Ask the user to set the three Cursor plugin variables, then reload the window.
6. Smoke: `tools/list`, then `get_printer_status`.

Upstream: https://github.com/rowbotik/bambu-printer-mcp

## Prefer

- `get_printer_status` before any print or control action
- `camera_snapshot` when the user wants a visual check
- `print_3mf` only with an explicit path the user named
- `pause` / `resume` / `cancel` only when the user clearly asked

## Do not

- Shell `npx` for this package (stdio handshake breaks)
- Paste `BAMBU_TOKEN` or other secrets into chat
- Claim print progress without a fresh tool result
- Invent printer IPs, serials, tokens, or live state
- Try printer tools from a remote Cloud Agent box
