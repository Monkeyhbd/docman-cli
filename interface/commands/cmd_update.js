const NodeChildProcess = require('node:child_process')
const NodeProcess = require('node:process')
const NodePath = require('node:path')
const NodeFs = require('node:fs')
const UtilsFile = require('../../utils/common/file')
const UtilsRegister = require('../../utils/register')


const HELP_MESSAGE = `
Pull document project's update then rebuild it.
USAGE:
  > docman update [ID|NAME|PATH]
  > docman update
ID|NAME:
  Id or name in register table.
`


function update(instance_path) {
	var update_script_path = NodePath.join(instance_path, '.docman/update.js')
	if (! NodeFs.existsSync(update_script_path)) {
		console.log('[DocMan CLI] Create defalut update script.')
		NodeFs.cpSync(NodePath.join(UtilsFile.DOCMAN_CLI_PROGRAM, 'static/scripts/update.js'), update_script_path)
	}
	NodeChildProcess.spawnSync('node', ['.docman/update.js'], {cwd: instance_path, stdio: 'inherit'})
}


function execute(argv=['update', '--help']) {
	if (argv.length <= 1) {  // docman update
		for (var path = NodeProcess.cwd(); path != NodePath.dirname(path); path = NodePath.dirname(path)) {
			if (UtilsRegister.validateDocmanPath(path)) {
				update(path)
			}
		}
	}
	else if (argv[1] =='--help' || argv[1] == '-h') {
		console.log(HELP_MESSAGE)
		return 0
	}
	else {  // docman update [ID|NAME|PATH]
		var reg = UtilsRegister.readReg()
		var id = UtilsRegister.getIdByAlias(reg, argv[1])
		var instance_path = reg[id].path
		update(instance_path)
		return 0
	}
}


module.exports = {
	execute: execute
}
