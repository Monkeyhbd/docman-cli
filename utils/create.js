const ChildProcess = require('child_process')
const Process = require('process')
const Path = require('path')
const UtilsFile = require('./common/file')


function cloneDocman(path) {
	console.log(path)
	UtilsFile.mkdir(Path.dirname(path))
	console.log('[DocMan CLI] Start to clone DocMan.')
	var res = ChildProcess.spawnSync('git', ['clone', 'https://gitee.com/monkeyhbd/docman', Path.basename(path)],
	                                 {cwd: Path.dirname(path), stdio: 'inherit'})
	if (res.status != 0) {
		console.log(res)
	}
}


function npmInstall(path) {
	console.log('[DocMan CLI] Install npm dependencies.')
	var res = ChildProcess.spawnSync(Process.platform === "win32" ? "npm.cmd" : 'npm', ['install'],
	                                 {cwd: path, stdio: 'inherit'})
	if (res.status != 0) {
		console.log(res)
	}
}


function create(path, name='docman-instance') {
	// Convert to absolute path.
	if (UtilsFile.pathType(path) == 'relative') {
		path = Path.join(Process.cwd(), path)
	}
	cloneDocman(path)
	npmInstall(path)
}


module.exports = {
	create: create
}
