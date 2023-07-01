const ChildProcess = require('child_process')
const Process = require('process')
const Path = require('path')
const UtilsFile = require('./common/file')
const UtilsRegister = require('./register')
const { prettyTable } = require('../interface/utils')


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


/** Clone user's document from a git repository. */
function cloneDoc(path, repo) {
	console.log('[DocMan CLI] Clone your document to the `docs` sub-directory.')
	var res = ChildProcess.spawnSync('git', ['clone', repo, 'docs'], {cwd: path, stdio: 'inherit'})
	if (res.status != 0) {
		console.log(res)
	}
}


/** Create a DocMan instance.
 *  - `path` : Relative or absolute path of the DocMan instance to be created.
 */
function create(path, name='docman-instance', options={docRepo: undefined}) {
	// Make sure path is absolute path.
	if (UtilsFile.pathType(path) == 'relative') {
		path = Path.join(Process.cwd(), path)
	}
	// Clone DocMan instance.
	cloneDocman(path)
	// Install npm dependencies.
	npmInstall(path)
	// Register DocMan instance.
	var ans = UtilsRegister.register(path, name)
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
	// Clone document project.
	if (options.docRepo != undefined) {
		cloneDoc(path, options.docRepo)
	}
}


module.exports = {
	create: create
}
