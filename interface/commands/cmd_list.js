/** List registered DocMan instances. */

const UtilsRegister = require('../../utils/register')
const {prettyTable} = require('../utils')


var HELP_MESSAGE = `
List all registered DocMan instance.
USAGE:
  > docman list
`


function showHelp() {
	console.log(HELP_MESSAGE)
}


function execute(argv=['list', '--help']) {
	if (argv.length <= 1) {
		var records = UtilsRegister.list()
		console.log()
		prettyTable([{name: 'ID', key: 'id'},
		             {name: 'Name', key: 'name'},
		             {name: 'Path', key: 'path'}], records)
		console.log(`(${records.length} projects registered)\n`)
		return 0
	}
	// Show help message.
	else if (argv[1] == '--help' || argv[1] == '-h') {
		showHelp()
		return 0
	}
}


module.exports = {
	execute: execute
}
