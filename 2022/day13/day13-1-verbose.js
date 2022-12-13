input=require('fs').readFileSync('./input.txt').toString().split('\r').join('').split('\n\n')
	.map(l=>{
		[a,b]=l.split('\n')
		return [JSON.parse(a),JSON.parse(b)]
	})


//positif if a > b // wrong order
//0 if a==b
//negatif if b > a // right order
function checkValue(a,b,d=1){
	ind = '  '.repeat(d)
	console.log(ind,"compare",a,"vs",b)
	if(!Array.isArray(a) && !Array.isArray(b)){ //both values
		console.log(ind,"both values, returning",a - b)
		return a - b
	}
	else{ //one at least is array
		if(!Array.isArray(a)){
			console.log(ind,"a wasn't array, comparing now [a]")
			return checkValue([a],b,d+1)
		}
		if(!Array.isArray(b)){
			console.log(ind,"b wasn't array, comparing now [b]")
			return checkValue(a,[b],d+1)
		}
		// Both array
		for (var i = 0; i < Math.min(a.length,b.length); i++) {
			res = checkValue(a[i],b[i],d+1)
			if (res!=0) //both equal, continue
				return res
			
		}
		// both sublist are equal, comparing length
		console.log(ind,"Both sublist equal, comparing length :",a.length,b.length)
		return a.length-b.length
	}
}
part2 = input.flat()
part2.push([[2]])
part2.push([[6]])
part2.sort((a,b)=>checkValue(a,b))
console.log(part2)
console.log(part2.filter(x=>x.toString()=="2"))
console.log(part2.filter(x=>x.toString()=="6"))
part2 = part2.map(x=>x.toString())
console.log(part2.indexOf('2'))
console.log(part2.indexOf('6'))


/*
result = input.map((l,i)=>{
	console.log("--------------",i+1,"--------------")
	res = checkValue(l[0],l[1])
	console.log("result =",res, "gives "+(res>0?"WRONG":"RIGHT"),"order\n\n")
	return {
		'index':i+1,
		'checkBool':(res>0?false:true),
		'check':res,
	}
})
console.log(result)

console.log(result.reduce((acc,e)=>{
	// console.log(acc,(e.checkBool?e.index:0))
	return acc + (e.checkBool?e.index:0)
},0))
// console.log(checkArray(input[0][0],input[0][1]),1)


*/