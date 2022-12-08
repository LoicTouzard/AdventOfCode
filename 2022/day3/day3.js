var input =	require('fs').readFileSync('./input.txt',"utf8").toString().split('\r').join('') // reading windows file..

var alpha = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"


var lines = input.split('\n')
var sum = 0
// Version 1
/*
lines.forEach(line=>{
	console.log(line)
	var half = line.length / 2
	var one = line.substr(0,half)
	var two = line.substr(half,half)
	console.log("one ",one)
	console.log("two ",two)
	var found = false
	var i = 0;
	while(!found && i<half){
		if(two.indexOf(one[i]) != -1){
			found = true;
			console.log("found :",one[i])
			sum+=alpha.indexOf(one[i])
			console.log("adding :",alpha.indexOf(one[i]))
		}
		i++
	}
})*/

// Version 2
for (var i = 0; i < lines.length; i+=3) {
	var one = lines[i]
	var two = lines[i+1]
	var three = lines[i+2]

	var found = false
	var j = 0
	while(!found && j<one.length){
		var c = one[j]
		if(two.indexOf(c) != -1 && three.indexOf(c) != -1){
			found = true;
			console.log("found :",c)
			sum+=alpha.indexOf(c)
			console.log("adding :",alpha.indexOf(c))
		}
		j++
	}

}


console.log("RESULT : ",sum)