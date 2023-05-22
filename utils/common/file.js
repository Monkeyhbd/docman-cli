const fs = require('fs')
const NodePath = require('path')
const process = require('process')


const USER_HOME = process.env.HOME || process.env.USERPROFILE
const DOCMAN_CLI = NodePath.join(USER_HOME, '.docman-cli')


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


module.exports = {
	DOCMAN_CLI: DOCMAN_CLI,
	mkdir: mkdir,
	writeObjectAsJson: writeObjectAsJson,
	readJsonAsObject: readJsonAsObject,
	pathType: pathType
}
