---
name: bambu-printer
description: >-
  Use when checking or controlling the home Bambu Lab A1 (status, camera,
  pause/resume/cancel, print_3mf). Requires the Mac on the printer LAN.
  Never invent printer state; call MCP tools.
---

# Bambu Lab A1

Mac-only. The Grok Bot box cannot reach the printer. Use MCP tools from this plugin.

## Prefer

- get_printer_status before any print or control action
- camera_snapshot when the user wants a visual check
- print_3mf only with an explicit path the user named
- pause / resume / cancel only when the user clearly asked

## Do not

- Shell npx for this package (stdio handshake breaks)
- Paste BAMBU_TOKEN or other secrets into chat
- Claim print progress without a fresh tool result
