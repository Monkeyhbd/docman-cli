/** Interface Plane to provide user interface. */

const router = require('./router')


help_message = `
Help message of DocMan CLI.
USAGE:
  > docman [SUBCOMMAND] [TARGET] [OPTIONS]
  > docman [SUBCOMMAND] --help
  > docman --help
SUBCOMMAND:
  create     : Create an DocMan instance.
  list       : List all registered DocMan instance.
  register   : Register a unregistered DocMan instance.
  show       : Show informations of a DocMan instance.
  unregister : Unregister a registered DocMan instance.
`


function show_help() {
	console.log(help_message)
}


function execute(argv) {
	// console.log(argv)
	// console.log(__dirname)
	// Show help message.
	if (argv.length <= 2 || argv[2] == '--help' || argv[2] == '-h') {
		show_help()
		return 0
	}
	// Match subcommand.
	var subExecuteFactory = router.getExecuteFactory(argv[2])
	// No matched subcommand.
	if (subExecuteFactory == undefined) {
		console.log(`Command ${argv[2]} is invalid.`)
		return -1
	}
	// Get subcommand's execute function.
	var sub_execute = subExecuteFactory()
	return sub_execute(argv.slice(2))
}


module.exports = {
	execute: execute
}
