/** Register a unregistered DocMan instance. */

const UtilsRegister = require('../../utils/register')
const { prettyTable, matchArg } = require('../utils')


var help_message = `
Register a unregistered DocMan instance.
USAGE:
  > docman register [PATH] [OPTIONS]
PATH:
  Path direct to a directory witch contains docman.config.json .
EXAMPLE:
  > docman register /var/www/html/docman-mydoc --name my-doc
  > docman register .
OPTIONS:
  --name | -n : Name to indentify a DocMan instance.
`


function show_help() {
	console.log(help_message)
}


function execute(argv=['register', '--help']) {
	// Show help message.
	if (argv.length <= 1 || argv[1] == '--help' || argv[1] == '-h') {
		show_help()
		return 0
	}
	var instance_path = argv[1]
	var argDict = {
		'--name': undefined,
		'-n': undefined
	}
	matchArg(argv, argDict)
	var ans = UtilsRegister.register(instance_path, argDict['--name'] || argDict['-n'])
	if (ans.code == 0) {
		console.log()
		prettyTable([{name: 'ID', key: 'id'}, {name: 'Name', key: 'name'}, {name: 'Path', key: 'path'}],
                    [ans.record])
		console.log()
	}
	else if (ans.code == -1) {
		console.log()
		console.log(ans.message)
		console.log()
	}
}


module.exports = {
	execute: execute
}
