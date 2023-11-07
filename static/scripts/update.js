#!/usr/bin/env node

const NodeChildProcess = require('node:child_process')
const NodePath = require('node:path')
const NodeFs = require('node:fs')
const NodeProcess = require('node:process')


const DOCMAN_INSTANCE = NodePath.dirname(__dirname)
var config = JSON.parse(NodeFs.readFileSync(NodePath.join(DOCMAN_INSTANCE, 'docman.config.json')))
const DOCS = NodePath.isAbsolute(config.inputDir) ? config.inputDir : NodePath.join(DOCMAN_INSTANCE, config.inputDir)


// Pull docs update.
NodeChildProcess.spawnSync('git', ['pull'], {cwd: DOCS, stdio: 'inherit'})
// Rebuild website files.
NodeChildProcess.spawnSync(NodeProcess.platform === "win32" ? "npx.cmd" : 'npx', ['doc', 'build'], {cwd: DOCMAN_INSTANCE, stdio: 'inherit'})
