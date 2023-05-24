var map = {
	'empty': function() { return require('./commands/cmd_empty').execute },
	'create': function() { return require('./commands/cmd_create').execute },
	'list': function() { return require('./commands/cmd_list').execute },
	'register': function() { return require('./commands/cmd_register').execute },
	'unregister': function() { return require('./commands/cmd_unregister').execute },
	'show': function() { return require('./commands/cmd_show').execute },
}


function getExecuteFactory(subcommand) {
	return map[subcommand]
}


module.exports = {
	getExecuteFactory: getExecuteFactory
}
