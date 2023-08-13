const fs = require('fs')
const NodePath = require('path')
const process = require('process')


const USER_HOME = process.env.HOME || process.env.USERPROFILE
const DOCMAN_CLI = NodePath.join(USER_HOME, '.docman-cli')
const DOCMAN_CLI_PROGRAM = NodePath.join(__dirname, '../..')


function mkdir(path) {
	fs.mkdirSync(path, {recursive: true})
}


/** Write an object into a json file.
 * - `obj` : Object.
 * - `path` : Path to save file.
 * - `inner` : Write in `.docman-cli` directory or not.
 */
function writeObjectAsJson(obj, path, inner=false) {
	// Inner file.
	if (inner) {
		path = NodePath.join(DOCMAN_CLI, path)
	}
	// Convert into json.
	var json = JSON.stringify(obj)
	// Make sure parent directory exist.
	mkdir(NodePath.dirname(path))
	// Write.
	fs.writeFileSync(path, json, 'utf-8')
}


/** Read an object from a json file.
 * - `path` : Path of json file.
 * - `inner` : Write in `.docman-cli` directory or not.
 */
function readJsonAsObject(path, inner=false) {
	// Inner file.
	if (inner) {
		path = NodePath.join(DOCMAN_CLI, path)
	}
	// Read.
	var json = fs.readFileSync(path, 'utf-8')
	// Convert into object.
	var obj = JSON.parse(json)
	return obj
}


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


// srcPath is the path of asset, can be relative path or absolute path.
// desPath is the path that asset copy to.
function copyAsset(srcPath, desPath, options={silence: false}) {
	// Make sure desDir exist.
	var desDir = NodePath.dirname(desPath)
	try {
		fs.accessSync(desDir)
	}
	catch (err) {
		fs.mkdirSync(desDir, {recursive: true})
	}
	if (options.silence != true) {
		console.log(`Copy: ${srcPath}   -->   ${desPath}`)
	}
	fs.copyFileSync(srcPath, desPath)
	return desPath
}


/**
 * - `srcPath` : Path of folder.
 * - `desPath` : Path that folder copy to.
 */
function copyFolder(srcPath, desPath, options={silence: false}) {
	var tasks = [{from: srcPath, to: desPath}]
	// Level traversal.
	while (tasks.length > 0) {
		var task = tasks.shift()
		var targets = fs.readdirSync(task.from)
		for (var idx = 0; idx < targets.length; idx += 1) {
			var target = targets[idx]
			var from = NodePath.join(task.from, target)
			var to = NodePath.join(task.to, target)
			if (fs.statSync(from).isFile()) {
				copyAsset(from, to, options)
			}
			else {
				tasks.push({from: from, to: to})
			}
		}
	}
}


module.exports = {
	USER_HOME: USER_HOME,
	DOCMAN_CLI: DOCMAN_CLI,
	DOCMAN_CLI_PROGRAM: DOCMAN_CLI_PROGRAM,
	mkdir: mkdir,
	writeObjectAsJson: writeObjectAsJson,
	readJsonAsObject: readJsonAsObject,
	pathType: pathType,
	copyAsset: copyAsset,
	copyFolder: copyFolder
}
