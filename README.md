# bambu-printer Agent Plugin

Mac-local wrap of [`@rowbotik/bambu-printer-mcp`](https://github.com/rowbotik/bambu-printer-mcp) for a home Bambu Lab A1. Version **0.1.1**.

This plugin is for **other Grok Bots running on the Mac that sits on the same LAN as the printer**. A remote Cloud Agent box cannot reach the printer. Do not try to talk to the A1 from a remote VM.

Upstream MCP: https://github.com/rowbotik/bambu-printer-mcp

## What this is

- Agent Plugin (`plugin.json` at repo root) that starts a **stdio** MCP server named `bambu-printer`.
- Launcher is `node ./scripts/run-mcp.js` (not `npx`). `npx` breaks the stdio handshake.
- Cursor fills `PRINTER_HOST`, `BAMBU_SERIAL`, and `BAMBU_TOKEN` from plugin variables. Never commit those values.

## Limits (read this first)

| Machine | Can reach the printer? |
| --- | --- |
| User's Mac, same LAN as the A1 | Yes |
| Remote Grok Bot / Cloud Agent box | **No** |

If you are not on that Mac, stop. Tell the user to run setup locally. Do not invent printer state, IPs, serials, or tokens.

## Collect the three variables

Ask the user for these three values. **Never paste `BAMBU_TOKEN` back into chat.** Do not write real IPs, serials, or tokens into files in this repo.

| Variable | What it is | Where the user finds it |
| --- | --- | --- |
| `PRINTER_HOST` | Printer LAN IP | Printer screen / Bambu network settings |
| `BAMBU_SERIAL` | Printer serial | Printer settings / device info |
| `BAMBU_TOKEN` | LAN access code (secret) | Printer LAN / developer settings |

Store them only in Cursor plugin variables (Plugins → Configure), never in git, never in `.env` committed to the repo.

## Install on the Mac (real directory)

Install into a **real directory**, not a symlink:

```text
~/.cursor/plugins/local/bambu-printer
```

```bash
mkdir -p ~/.cursor/plugins/local
# Copy or clone this repo into that path. plugin.json must sit at:
#   ~/.cursor/plugins/local/bambu-printer/plugin.json
cd ~/.cursor/plugins/local/bambu-printer
npm install
```

Requirements:

- Node.js 18+
- The Mac must be on the printer LAN
- Optional for slicing: Bambu Studio at `/Applications/BambuStudio.app/Contents/MacOS/BambuStudio`

Do **not** launch the server with `npx @rowbotik/bambu-printer-mcp`. Always use the `node` launcher in `scripts/run-mcp.js`.

## Set Cursor variables and reload

1. Open Cursor → Customize / Plugins.
2. Confirm `bambu-printer` is loaded from `~/.cursor/plugins/local`.
3. Set the three plugin variables: `PRINTER_HOST`, `BAMBU_SERIAL`, `BAMBU_TOKEN`.
4. Reload the window (**Developer: Reload Window**) so the stdio server restarts with the new env.

`mcp.json` already wires the rest (`BAMBU_MODEL=a1`, Bambu Studio path, textured plate, 0.4 nozzle, flatten CLI, temp dir).

## Smoke test

After reload, the MCP server `bambu-printer` should appear. Prove it with:

1. `tools/list` — you should see printer tools from the upstream MCP (`get_printer_status`, `camera_snapshot`, `print_3mf`, pause/resume/cancel, and the rest).
2. `get_printer_status` — live status from the A1. If this fails, the Mac is off-LAN, Developer/LAN mode is off, or a variable is wrong. Do not guess.

If `tools/list` is empty, the plugin did not load or `npm install` was skipped. If status fails with auth/MQTT errors, re-check the three variables without printing the token.

## Agent rules

- Call MCP tools. Never invent temperatures, progress, AMS slots, or camera contents.
- Run `get_printer_status` before any print or control action.
- Use `camera_snapshot` when the user wants a visual check.
- Use `print_3mf` only with an explicit path the user named.
- Pause / resume / cancel only when the user clearly asked.
- Do not shell `npx` for this package.
- Do not paste `BAMBU_TOKEN` or other secrets into chat, commits, or screenshots.
- If you are a remote agent, you cannot reach the printer. Hand setup back to a Mac-local Grok Bot.

## Layout

```text
plugin.json                 # Agent Plugin manifest + variables
mcp.json                    # stdio server bambu-printer
package.json                # pins @rowbotik/bambu-printer-mcp@1.1.1
scripts/run-mcp.js          # node launcher (resolves package bin)
skills/bambu-printer/SKILL.md
LICENSE                     # GPL-2.0
PROVE.md                    # short checklist
```

## License

GPL-2.0. Copyright 2026 Ethan Figueroa. Upstream Rowbotik MCP is also GPL-2.0.
