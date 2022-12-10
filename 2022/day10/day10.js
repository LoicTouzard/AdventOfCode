let x = 1
let cycle = 1
let sum = 0
let CRT = ''

let instrDuration = {
	'addx':2,
	'noop':1
}
let instrFunction = {
	'addx': (...args)=>x+=(+args[0]),
	'noop': (...args)=>undefined
}


require('fs').readFileSync('./input.txt').toString().split('\r').join('').split('\n').forEach(line=>{ //read input
	[instr,value]=line.split(' ')						//get line command
	// pass execution time
	for (var i = 0; i < instrDuration[instr]; i++) {
		CRT+=(Math.abs(CRT.length-x)>1)?'.':'#' // if CRT position is in-betxeen x-1 x+1
		if(cycle%40==0){
			console.log(CRT)
			CRT=''
		}
		cycle++
	}
	//get result of instruction
	instrFunction[instr](value)
})
