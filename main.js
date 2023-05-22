#!/usr/bin/env node

const process = require('process')
const interface = require('./interface/index')


interface.execute(process.argv)
