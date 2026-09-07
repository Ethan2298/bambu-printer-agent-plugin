#!/usr/bin/env node
"use strict";

const path = require("path");

const pkgJson = require.resolve("@rowbotik/bambu-printer-mcp/package.json");
const pkgRoot = path.dirname(pkgJson);
const pkg = require(pkgJson);
const bin = pkg.bin;
const rel =
  typeof bin === "string"
    ? bin
    : bin["bambu-printer-mcp"] || Object.values(bin)[0];

require(path.join(pkgRoot, rel));
