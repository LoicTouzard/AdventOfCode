var input =	require('fs').readFileSync('./input.txt',"utf8").toString().split('\r').join('') // reading windows file..

// DATA

var stacks, commands
var stacksStr='', commandsStr=''



function main(){
	[stacksStr,commandsStr] = input.split('\n\n')
	commands=commandsStr.trim('\n').split('\n')

	stacksSplit = stacksStr.split('\n')
	stacksAmount = Number(stacksSplit.pop().trim().split('   ').slice(-1)[0])
	//init empty stacks
	stacks = new Array(stacksAmount)
	for (var i = 0; i < stacks.length; i++) { stacks[i] = [] }

	// Parse each stacks line
	stacksSplit.forEach((stackLine) =>{
		for (var j = 0; j < stackLine.length; j+=4) {
			if(stackLine.substr(j,3).trim() != '') stacks[j/4].unshift(stackLine.substr(j,3).trim())
		}
	})

	commands.forEach(command=>{
		com=command.split(' ')
		// Version 1 
		/*
		for (var i = 0; i < com[1]; i++) {
			stacks[com[5]-1].push(stacks[com[3]-1].pop())
		}
		*/

		// Version 2
		var lift = []
		for (var i = 0; i < com[1]; i++) {
			// console.log("poping",crate)
			lift.push(stacks[com[3]-1].pop())
		}
		for (var i = 0; i < com[1]; i++) {
			// console.log("poping",crate)
			stacks[com[5]-1].push(lift.pop())
		}
	})

	//print
	for (var i = 0; i < stacks.length; i++) {
			console.log(stacks[i].slice(-1))
	}
}

main()

