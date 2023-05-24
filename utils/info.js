const UtilsFile = require('./common/file')
const UtilsRegister = require('./register')
const NodePath = require('node:path')


function registerInfo(alias) {
	var reg = UtilsRegister.readReg()
	var id = UtilsRegister.getIdByAlias(reg, alias)
	if (id == undefined) {
		return {
			code: -1,
			message: 'No registered DocMan instance match.'
		}
	}
	else {
		reg_info = reg[id]
		reg_info.id = id
		return {
			code: 0,
			info: reg_info
		}
	}
}


/** Read DocMan instance informations from docman.config.json
 *  and index.json.
 * - `path` : Absolute path of a DocMan instance.
 */
function instanceInfo(path) {
	try {
		// Read docman.config.json.
		var docman_config_path = NodePath.join(path, 'docman.config.json')
		var docman_config = UtilsFile.readJsonAsObject(docman_config_path)
	}
	catch (e) {
		// docman.conig.json not exist.
		return {
			code: -1,
			message: 'docman.conig.json not exist.'
		}
	}
	try {
		// Read document's index.json.
		var doc_path = docman_config.inputDir
		if (UtilsFile.pathType(doc_path) == 'relative') {
			doc_path = NodePath.join(path, doc_path)
		}
		var doc_index_path = NodePath.join(doc_path, 'index.json')
		var doc_index = UtilsFile.readJsonAsObject(doc_index_path)
	}
	catch (e) {
		// index.json not exist.
		return {
			code: -2,
			message: 'index.json not exist.'
		}
	}
	var info = {
		title: doc_index.title,
		author: doc_index.author
	}
	return {
		code: 0,
		info: info
	}
}


function sumInfo(alias) {
	var reg_info = registerInfo(alias)
	if (reg_info.code != 0) {
		return {
			reg: reg_info
		}
	}
	var ins_info = instanceInfo(reg_info.info.path)
	return {
		reg: reg_info,
		ins: ins_info
	}
}


module.exports = {
	sumInfo: sumInfo
}
