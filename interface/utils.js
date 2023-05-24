/** Common method in Interface Plane. */


/** Print a pretty table.
 * - `fields` : Sepecific column's informations.
 * - `rows` : List of row object.
 */
function prettyTable(fields=[{name: 'ID', key: 'id'}, {name: 'Document Name', key: 'name'}],
                     rows=[{id: '1', name: 'DocMan Doc'}, {id: '2', name: 'Data Structure and Algorithm'}]) {
	// Calculate column width.
	var widths = []
	for (var idx = 0; idx < fields.length; idx += 1) {
		var field = fields[idx]
		// Length of field name.
		widths.push(field.name.length)
		// Length of column content.
		for (var rowIdx = 0; rowIdx < rows.length; rowIdx += 1) {
			var row = rows[rowIdx]
			var content = `${row[field.key]}`
			if (content.length > widths[widths.length-1]) {
				widths[widths.length-1] = content.length
			}
		}
	}
	// console.log(widths)
	// Head.
	for (var idx = 0; idx < fields.length; idx += 1) {
		var field = fields[idx]
		process.stdout.write(`${field.name}`.padEnd(widths[idx], ' '))
		if (idx < fields.length - 1) {
			process.stdout.write(' | ')
		}
	}
	process.stdout.write('\n')
	// Separate.
	for (var idx = 0; idx < widths.length; idx += 1) {
		process.stdout.write(``.padEnd(widths[idx], '-'))
		if (idx < widths.length - 1) {
			process.stdout.write('-+-')
		}
	}
	process.stdout.write('\n')
	// Body.
	for (var rowIdx = 0; rowIdx < rows.length; rowIdx += 1) {
		var row = rows[rowIdx]
		for (var idx = 0; idx < fields.length; idx += 1) {
			var field = fields[idx]
			var content = `${row[field.key]}`
			process.stdout.write(content.padEnd(widths[idx], ' '))
			if (idx < fields.length - 1) {
				process.stdout.write(' | ')
			}
		}
		process.stdout.write('\n')
	}
}


function prettyInfo(objs=[
	{
		key: 'Caches (sum of all)',
		list: [
			{
				key: 'L1d',
				value: '64 KiB (2 instances)'
			},
			{
				key: 'L1i',
				value: '64 KiB (2 instances)'
			},
			{
				key: 'L2',
				value: '512 KiB (2 instances)'
			},
			{
				key: 'L3',
				value: '3 MiB (1 instances)'
			}
		]
	}
], indent=2, initIndent=0) {
	for (var idx = 0; idx < objs.length; idx += 1) {
		var obj = objs[idx]
		process.stdout.write(' '.repeat(initIndent))
		process.stdout.write(`${obj.key || ''}: ${obj.value || ''}\n`)
		// Recursive down.
		if (obj.list != undefined) {
			prettyInfo(obj.list, indent, initIndent + indent)
		}
	}
}


/** Determine the type of `arg` string. */
function argStrType(arg) {
	if (arg.length == 2 && arg[0] == '-') {
		return 'key'
	}
	if (arg.length > 2 && arg.slice(0, 2) == '--') {
		return 'key'
	}
	return 'value'
}


/** Match arguments decleared in `argDict` from the `argv` list . */
function matchArg(argv=['--name', 'DocMan Doc'], argDict={'--name': undefined, '-n': undefined}) {
	var idx = 0
	while (idx < argv.length) {
		var word = argv[idx]
		if (word in argDict) {
			// Bool arg.
			if (idx == argv.length - 1 || argStrType(argv[idx+1]) == 'key') {
				argDict[word] = true
			}
			else {
				argDict[word] = argv[idx+1]
			}
			idx += 1
		}
		else {
			idx += 1
		}
	}
}


module.exports = {
	prettyTable: prettyTable,
	prettyInfo: prettyInfo,
	matchArg: matchArg
}
