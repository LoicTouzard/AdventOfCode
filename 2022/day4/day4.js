var input =	require('fs').readFileSync('./input.txt',"utf8").toString().split('\r').join('') // reading windows file..

var result = 0
var pairs = input.split('\n')
console.log("pairs",pairs)
for (var i = 0; i < pairs.length; i++) {
	var pair = pairs[i].split(',')
	console.log("pair",pair)
	//for each pair
	p1=pair[0].split("-")
	p2=pair[1].split("-")
	var oneMin=+p1[0]
	var oneMax=+p1[1]
	var twoMin=+p2[0]
	var twoMax=+p2[1]
	// Version 1
	/*
	if((oneMin<=twoMin && oneMax>=twoMax) ||
		(twoMin<=oneMin && twoMax>=oneMax)){
			result++
			console.log("included")
	}
	*/

	// Version 2
	if((oneMin<=twoMin && twoMin<=oneMax) ||
		(twoMin<=oneMin && twoMax>=oneMin)){
			result++
			console.log("overlap")
	}
}
console.log("result :",result)
console.log("over :", input.split('\n').length)

