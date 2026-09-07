# Prove bambu-printer 0.1.1

Short checklist for a Mac on the printer LAN. Do not record real IPs, serials, or tokens.

- [ ] Plugin is a real directory at `~/.cursor/plugins/local/bambu-printer` (`plugin.json` at that root)
- [ ] `npm install` completed (Node >= 18); `node_modules/@rowbotik/bambu-printer-mcp` exists
- [ ] Launcher is `node ./scripts/run-mcp.js`, not `npx`
- [ ] Cursor variables set: `PRINTER_HOST`, `BAMBU_SERIAL`, `BAMBU_TOKEN`
- [ ] Window reloaded; MCP server `bambu-printer` is listed
- [ ] `tools/list` returns printer tools (`get_printer_status` among them)
- [ ] `get_printer_status` returns live A1 state
- [ ] No secrets committed (`.env`, token, serial, LAN IP)
