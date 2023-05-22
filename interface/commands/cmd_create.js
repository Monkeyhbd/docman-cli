/** Create a DocMan project instance. */

const Process = require('process')
const UtilsCreate = require('../../utils/create')
const { matchArg } = require('../utils')


var HELP_MESSAGE = `
Create an DocMan instance.
USAGE:
  > docman create [PATH] [OPTIONS]
EXAMPLE:
  > docman create mydoc -g https://gitee.com/monkeyhbd/docman-document.git
PATH:
  The path to create a DocMan instance.
OPTIONS:
  --docman-repo   : Clone from a specific DocMan repository.
  --git-repo | -g : Git repository's URL of document project.
  --name | -n     : Name to indentify a DocMan instance.
  --no-register   : Do not register this instance.
`


function showHelp() {
	console.log(HELP_MESSAGE)
}


function execute(argv=['create', '--help']) {
	if (argv.length <= 1 || argv[1] == '--help' || argv[1] == '-h') {
		showHelp()
		return 0
	}
	else {
		var path = argv[1]
		var argDict = {
			'--docman-repo': undefined,
			'--git-repo': undefined,
			'-g': undefined,
			'--name': undefined,
			'-n': undefined,
			'--no-register': undefined
		}
		matchArg(argv, argDict)
		UtilsCreate.create(path, argDict['--name'] || argDict['-n'] || 'docman-instance')
	}
}


module.exports = {
	execute: execute
}
