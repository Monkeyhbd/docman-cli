/** Empty interface to test Logical Plane. */

const child_process = require('child_process')
const file = require('../../utils/common/file')


function execute(argv=['empty']) {
	console.log(child_process.execSync('git status', {encoding: 'utf8'}))
}


module.exports = {
	execute: execute
}
