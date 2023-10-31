/** Show a registered DocMan instance's informations. */

const NodePath = require('node:path')
const InterfaceUtils = require('../utils')
const UtilsFile = require('../../utils/common/file')
const UtilsRegister = require('../../utils/register')


var HELP_MESSAGE = `
Show informations of a DocMan instance.
USAGE:
  > docman show
  > docman show [ID|NAME|PATH]
EXAMPLE:
  > docman show mydoc-1
`


function showHelp() {
	console.log(HELP_MESSAGE)
}


function execute(argv=['show', '--help']) {
	if (argv.length <= 1 || argv[1] == '--help' || argv[1] == '-h') {
		showHelp()
		return 0
	}
	// Name or ID.
	var alias = argv[1]
	var reg = UtilsRegister.readReg()
	var id = UtilsRegister.getIdByAlias(reg, alias)
	// Gather register informations.
	if (id != undefined) {
		var register_object = reg[id]
		console.log()
		InterfaceUtils.prettyInfo([
			{
				key: 'Register informations',
				list: [
					{
						key: 'ID',
						value: id
					},
					{
						key: 'Name',
						value: register_object.name
					},
					{
						key: 'Path',
						value: register_object.path
					},
					{
						key: 'Register time',
						value: (new Date(register_object.registerTime)).toLocaleString()
					}
				]
			}
		])
	}
	else if (UtilsRegister.validateDocmanPath(alias)) {  // alias maybe a path.
		register_object = {
			path: alias
		}
	}
	else {
		console.log(`Alias '${alias}' either id, name nor a docman instance path.`)
		return 1
	}
	// Gather instance information.
	try {
		var docman_object = UtilsFile.readJsonAsObject(NodePath.join(register_object.path, 'docman.config.json'))
	}
	catch {
		console.log(`docman.config.json doesn't find in register path. Please check!\n`)
		return 0
	}
	try {  // v0.2+
		var package_object = UtilsFile.readJsonAsObject(NodePath.join(register_object.path, 'node_modules/docman-core/package.json'))
	}
	catch {  // v0.1
		var package_object = UtilsFile.readJsonAsObject(NodePath.join(register_object.path, 'package.json'))
	}
	InterfaceUtils.prettyInfo([
		{
			key: 'Instance informations',
			list: [
				{
					key: 'DocMan core version',
					value: package_object.version
				}
			]
		}
	])
	// Gather document information.
	try {
		if (UtilsFile.pathType(docman_object.inputDir) == 'relative') {
			index_json_path = NodePath.join(register_object.path, docman_object.inputDir, 'index.json')
		}
		else {  // Absolute path.
			index_json_path = NodePath.join(docman_object.inputDir, 'index.json')
		}
		var document_object = UtilsFile.readJsonAsObject(index_json_path)
	}
	catch {
		console.log(`index.json doesn't find in document directory. Please check!\n`)
		return 0
	}
	InterfaceUtils.prettyInfo([
		{
			key: 'Document informations',
			list: [
				{
					key: 'Title',
					value: document_object.title
				},
				{
					key: 'Author',
					value: document_object.author
				},
			]
		}
	])
	return 0
}


module.exports = {
	execute: execute
}
