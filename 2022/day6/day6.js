var input =	require('fs').readFileSync('./input.txt',"utf8").toString().split('\r').join('') // reading windows file..


// console.log(input)

// replace 14 to 4 for part 1 or 2
console.log(input.split('')
	.reduce((duplicate,e,i)=>
		(duplicate==0&&(input.slice(i,i+14)
				.split('').sort().join('')
				.match(/(.)\1+/)===null))
			?i+14:
			duplicate
	,0))