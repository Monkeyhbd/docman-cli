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
function create(path, options={empty: false, gitRepo: undefined, name: undefined}) {
	var originPath = path
	// Make sure path is absolute path.
	if (UtilsFile.pathType(path) == 'relative') {
		path = Path.join(Process.cwd(), path)
	}
	// Clone DocMan instance.
	// cloneDocman(path)
	// Create DocMan instance.
	console.log('[DocMan CLI] Create DocMan instance.')
	UtilsFile.copyFolder(Path.join(UtilsFile.DOCMAN_CLI_PROGRAM, 'static/instance'), Path.join(path), {silence: true})
	// Install npm dependencies.
	// npmInstall(path)
	// Register DocMan instance.
	if (options.name != undefined) {
		console.log('[DocMan CLI] Register DocMan instance.')
		var ans = UtilsRegister.register(path, options.name)
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
	// Clone document project.
	if (options.gitRepo != undefined) {
		cloneDoc(path, options.gitRepo)
		console.log('[DocMan CLI] Run the following command to build your document.')
		console.log(`    > cd ${originPath}`)
		console.log('    > npm install')
		console.log('    > npm run build')
	}
	// Create defalut document project.
	else if (options.empty != true) {
		console.log('[DocMan CLI] Create default document project.')
		UtilsFile.copyFolder(Path.join(UtilsFile.DOCMAN_CLI_PROGRAM, 'static/default-docs'), Path.join(path, 'docs'), {silence: true})
		console.log('[DocMan CLI] Run the following command to build your document.')
		console.log(`    > cd ${originPath}`)
		console.log('    > npm install')
		console.log('    > npm run build')
	}
}


module.exports = {
	create: create
}
