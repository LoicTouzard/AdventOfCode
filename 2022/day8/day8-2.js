// readable code
console.log(Math.max(...require('fs').readFileSync('./input.txt').toString().split('\r').join('').split('\n')
	.flatMap((line,i,forest)=>
		line.split('').map((treeHeight,j,line)=>
			(j-((((line.slice(0,j).findLastIndex(height=>height>=treeHeight)+1)||1)-1)))* //left // meci Chabance
			((line.slice(j+1).findIndex(height=>height>=treeHeight)+1)||line.length-j-1)* //right
			(i-((((forest.map(col=>col[j]).slice(0,i).findLastIndex(height=>height>=treeHeight)+1)||1)-1)))* //up
			((forest.map(col=>col[j]).slice(i+1).findIndex(height=>height>=treeHeight)+1)||forest.length-i-1) //down
		)
	)
))




// same with minified variable 
console.log(Math.max(...require('fs').readFileSync('./input.txt').toString().split('\r').join('').split('\n')
	.flatMap((l,i,f)=>
		l.split('').map((t,j,l)=>
			(j-((((l.slice(0,j).findLastIndex(h=>h>=t)+1)||1)-1)))* //left // meci Chabance
			((l.slice(j+1).findIndex(h=>h>=t)+1)||l.length-j-1)* //right
			(i-((((f.map(c=>c[j]).slice(0,i).findLastIndex(h=>h>=t)+1)||1)-1)))* //up
			((f.map(c=>c[j]).slice(i+1).findIndex(h=>h>=t)+1)||f.length-i-1) //down
		)
	)
))