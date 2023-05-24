/** Show a registered DocMan instance's informations. */

const UtilsInfo = require('../../utils/info')
const InterfaceUtils = require('../utils')


var HELP_MESSAGE = `
Show informations of a DocMan instance.
USAGE:
  > docman show [ID|NAME]
EXAMPLE:
  > docman show mydoc-1
`


function showHelp() {
	console.log(HELP_MESSAGE)
}


function execute(argv=['show', '--help']) {
	if (argv.length <= 1 || argv[1] == '--help' || argv[1] == '-h') {
		showHelp()
		return 0
	}
	// Name or ID.
	var alias = argv[1]
	var sum_info = UtilsInfo.sumInfo(alias)
	// console.log(JSON.stringify(sum_info))
	if (sum_info.reg.code == -1) {
		console.log(`
No DocMan instance match ${alias}.
`)
		return 0
	}
	else if (sum_info.reg.code == 0) {
		var info = [
			{
				key: 'Register informations',
				list: [
					{
						key: 'ID',
						value: sum_info.reg.info.id
					},
					{
						key: 'Name',
						value: sum_info.reg.info.name
					},
					{
						key: 'Path',
						value: sum_info.reg.info.path
					},
					{
						key: 'Register time',
						value: (new Date(sum_info.reg.info.registerTime)).toLocaleString()
					}
				]
			}
		]
		if (sum_info.ins.code == -1) {
			console.log()
			InterfaceUtils.prettyInfo(info)
			console.log(`docman.config.json doesn't find in register path. Please check!\n`)
		}
		else if (sum_info.ins.code == -2) {
			console.log()
			InterfaceUtils.prettyInfo(info)
			console.log(`index.json doesn't find in document directory. Please check!\n`)
		}
		else if (sum_info.ins.code == 0) {
			console.log()
			info.push({
				key: 'Instance informations',
				list: [
					{
						key: 'Title',
						value: sum_info.ins.info.title
					},
					{
						key: 'Author',
						value: sum_info.ins.info.author
					}
				]
			})
			InterfaceUtils.prettyInfo(info)
			console.log()
		}
	}
}


module.exports = {
	execute: execute
}
