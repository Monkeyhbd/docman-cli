/** Unregister a registered DocMan instance. */

const UtilsRegister = require('../../utils/register')
const { prettyTable } = require('../utils')


var HELP_MESSAGE = `
Unregister a registered DocMan instance.
USAGE:
  > docman unregister [ID|NAME]
EXAMPLE:
  > docman unregister doc-1
`


function showHelp() {
	console.log(HELP_MESSAGE)
}


function execute(argv=['unregister', '1']) {
	if (argv.length <= 1 || argv[1] == '--help' || argv[1] == '-h') {
		showHelp()
		return 0
	}
	var alias = argv[1]
	var rtn = UtilsRegister.unregister(alias)
	if (rtn.code == 0) {
		console.log()
		prettyTable([{name: 'ID', key: 'id'}, {name: 'Name', key: 'name'}, {name: 'Path', key: 'path'}],
		            [rtn.record])
		console.log()
	}
	else if (rtn.code == -1) {
		console.log()
		console.log(rtn.message)
		console.log()
	}
}


module.exports = {
	execute: execute
}
