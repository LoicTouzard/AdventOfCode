input=require('fs').readFileSync('./input.txt').toString().split('\r').join('').split('\n\n')
	.map(l=>l.split('\n').map(x=>JSON.parse(x))) // parsing lines as JSON arrays

//positive if a > b // wrong order
//0 if a==b
//negative if b > a // right order
/*
*	compares a and b
*	returns integer, representing a-b
*		positive : wrong order
*		0 : equal
*		negative : right order
*/
function checkValue(a,b){
	if(!Array.isArray(a) && !Array.isArray(b))	return a - b // both int values, return diff
	else{ //one at least is array
		if(!Array.isArray(a)) a = [a] // a wasn't array, now it is
		if(!Array.isArray(b)) b = [b] // b wasn't array, now it is
		for (var i = 0; i < Math.min(a.length,b.length); i++) { // Both array, iterates it
			if ((res=checkValue(a[i],b[i]))!=0) return res //a and b not equal, stop there	
		}
		return a.length - b.length // both sublist are equal, comparing length
	}
}


console.log("PART 1:",input.reduce((sum,l,i)=>sum+(checkValue(l[0],l[1])>0?0:(i+1)),0)) // sum "right order" indexes

input.push([[[2]],[[6]]]) //add the diviser elements
part2 = input.flat().sort((a,b)=>checkValue(a,b)).map(x=>x.toString()) //sort according to checkValue rules
console.log("PART 2:",(part2.indexOf('2')+1)*(part2.indexOf('6')+1))
