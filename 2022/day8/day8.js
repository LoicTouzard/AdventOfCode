console.log(require('fs').readFileSync('./demo.txt',"utf8").toString().split('\r').join('').split('\n')
	.reduce((sum,line,i,forest)=>sum+
		line.split('').reduce((sum,treeHeight,j,line)=>sum+
			(line.slice(0,j).every(height=>height<treeHeight) ||//left
			line.slice(j+1).every(height=>height<treeHeight) || //right
			forest.map(col=>col[j]).slice(0,i).every(height=>height<treeHeight) || // up
			forest.map(col=>col[j]).slice(i+1).every(height=>height<treeHeight)) // down
		,0)
	,0)
)