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
  --empty         : Do not create defalut document project.
  --git-repo | -g : Git repository of your document project.
  --name | -n     : Name to indentify a DocMan instance in register table.
                    If not specified, the instance will not be register.
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
			'--empty': undefined,
			'--git-repo': undefined,
			'-g': undefined,
			'--name': undefined,
			'-n': undefined
		}
		matchArg(argv, argDict)
		UtilsCreate.create(path, {
			empty: argDict['--empty'],
			gitRepo: argDict['--git-repo'] || argDict['-g'] || undefined,
			name: argDict['--name'] || argDict['-n'] || undefined
		})
	}
}


module.exports = {
	execute: execute
}
