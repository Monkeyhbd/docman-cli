const fs = require('fs')
const NodePath = require('path')
const process = require('process')
const UtilsFile = require('./common/file')


/** Determine the type of path. Type can be `absolute`, `relative` or `web`. */
function pathType(pathString) {
	if (NodePath.isAbsolute(pathString)) {
		return 'absolute'
	}
	else {
		if (pathString.length >= 7 && pathString.slice(0, 7) == "http://" || pathString.length >= 8 && pathString.slice(0, 8) == "https://") {
			return 'web'
		}
		else {
			return 'relative'
		}
	}
}


/** Validate the path direct to a DocMan instance.
 * 
 *  If `docman.config.json` located in path, return `true`.
 */
function validateDocmanPath(path) {
	try {
		var docman_config = NodePath.join(path, './docman.config.json')
		fs.readFileSync(docman_config, 'utf-8')
		return true
	}
	catch(e) {
		return false
	}
}


/** Allocate a unused ID in `reg`. */
function allocateId(reg) {
	var i = 1
	for (; reg[`${i}`] != undefined; i += 1) {}
	return `${i}`
}


function match(dict, key, value) {
	for (var id in dict) {
		if (dict[id][key] == value) {
			return id
		}
	}
	return undefined
}


/** Allocate a unused name in `reg`. */
function allocateName(reg) {
	var i = 1
	for (; match(reg, 'name', `doc-${i}`) != undefined; i += 1) {}
	return `doc-${i}`
}


/** Register into table.
 * - `path` : Absolute path of a DocMan instance.
 * - `name` : Name to indentify a DocMan instance in register table.
 */
function registerLogic(path, name=undefined) {
	var REG_PATH = './register.json'
	var reg = {}
	// Read from register.json.
	try {
		reg = UtilsFile.readJsonAsObject(REG_PATH, true)
	}
	catch(e) {
		// register.json not exist.
	}
	// Allocate ID.
	var id = allocateId(reg)
	// Check the given name.
	if (name != undefined) {
		if (match(reg, 'name', name) != undefined) {
			return {
				code: -1,
				message: `Name ${name} already use.`
			}
		}
	}
	// Allocate name.
	else {
		name = allocateName(reg)
	}
	// Insert into table.
	reg[id] = {
		name: name,
		path: path,
		registerTime: (new Date()).getTime()
	}
	// Write into register.json.
	UtilsFile.writeObjectAsJson(reg, REG_PATH, true)
	reg[id].id = id
	return {
		code: 0,
		record: reg[id]
	}
}


/** Register a DocMan instance.
 * - `path` : Path to a DocMan instance.
 * - `name` : Name to indentify a DocMan instance in register table.
 */
function register(path, name=undefined) {
	// Convert to absolute path.
	if (pathType(path) == 'relative') {
		path = NodePath.join(process.cwd(), path)
	}
	// Is a DocMan instance path.
	if (validateDocmanPath(path)) {
		var ans = registerLogic(path, name)
		if (ans.code == 0) {
			return {
				code: 0,
				record: ans.record
			}
		}
		else if (ans.code == -1) {
			return {
				code: -1,
				message: ans.message
			}
		}
	}
	// Not a DocMan instance path.
	else {
		return {
			code: -1,
			message: `Invalid path ${path}
The path not exist or it's not a DocMan instance.`
		}
	}
}


/** Return a list of register record. */
function list() {
	// Read from register.json.
	try {
		var REG_PATH = './register.json'
		var reg = UtilsFile.readJsonAsObject(REG_PATH, true)
		var ls = []
		for (var id in reg) {
			var record = reg[id]
			record.id = id
			ls.push(record)
		}
		return ls
	}
	catch(e) {
		// register.json not exist.
		return []
	}
}


/** Read `.docman-cli/register.json` as object.
 *  Return `{}` if file not exist.
 */
function readReg() {
	// Read from register.json.
	try {
		var REG_PATH = './register.json'
		var reg = UtilsFile.readJsonAsObject(REG_PATH, true)
		return reg
	}
	catch(e) {
		// register.json not exist.
		return {}
	}
}


/** Write object into `.docman-cli/register.json`. */
function writeReg(reg) {
	var REG_PATH = './register.json'
	UtilsFile.writeObjectAsJson(reg, REG_PATH, true)
}


/** Unregister a registered DocMan instance.
 * - `alias` : Name or ID to match a registered DocMan instance.
 */
function unregister(alias) {
	var reg = readReg()
	var id = undefined
	// Alias is ID.
	if (reg[alias] != undefined) {
		id = alias
	}
	// Alias is name.
	else {
		var id = match(reg, 'name', alias)
	}
	// No record match alias.
	if (id == undefined) {
		return {
			code: -1,
			message: `No project match ID or name ${alias}`
		}
	}
	else {
		var d = reg[id]
		d['id'] = id
		Reflect.defineProperty(reg, id, {value: undefined})
		writeReg(reg)
		return {
			code: 0,
			record: d
		}
	}
}


/** Match a record in `reg` object with `alias`. 
 * - `reg`: Return of `readReg()`.
 * - `alias` : Name or ID to match a registered DocMan instance.
 * 
 *  Return: Register ID, `undefine` if nothing match `alias`.
 */
function getIdByAlias(reg, alias) {
	var id = undefined
	// Alias is ID.
	if (reg[alias] != undefined) {
		id = alias
	}
	// Alias is name.
	else {
		var id = match(reg, 'name', alias)
	}
	return id
}


module.exports = {
	list: list,
	register: register,
	unregister: unregister,
	readReg: readReg,
	writeReg: writeReg,
	getIdByAlias: getIdByAlias,
	validateDocmanPath: validateDocmanPath
}
