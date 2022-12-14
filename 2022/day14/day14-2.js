startPoint = {x:500,y:0}
minBox={x:startPoint.x,y:startPoint.y}
maxBox={x:startPoint.x,y:startPoint.y}

shapes=require('fs').readFileSync('input.txt').toString().split('\r').join('')
	.split('\n').map(shape=>shape.split(' -> ').map(points=>{
		[x,y]=points.split(',').map(Number)
		minBox.x=x<minBox.x?x:minBox.x
		maxBox.x=x>maxBox.x?x:maxBox.x
		minBox.y=y<minBox.y?y:minBox.y
		maxBox.y=y>maxBox.y?y:maxBox.y
		return {x:x,y:y}
	}))

maxBox.y+=2 //+2 for bedrock line
minBox.x-=maxBox.y+10	// add some offset for the sand to fall right and left
maxBox.x+=maxBox.y+10
console.log("boundaries",minBox,maxBox)

// console.log(shapes)

// fill empty cave + bedrock
cave = new Array(maxBox.y-minBox.y+1).fill('')
	.map((line,i)=>{
		if(i==maxBox.y-minBox.y)
			return new Array(maxBox.x-minBox.x+1).fill("#")
		else
			return new Array(maxBox.x-minBox.x+1).fill(".")
	})

//getter/setter utils
function setCave(p,v){
	if(Array.isArray(p)) p={x:p[0],y:p[1]}
	cave[p.y-minBox.y][p.x-minBox.x]=v
}
function getCave(p){
	if(Array.isArray(p)) p={x:p[0],y:p[1]}
	return cave[p.y-minBox.y][p.x-minBox.x]
}

// draw shapes and startpoint in cave
function drawCave(){
	setCave(startPoint,'+')
	shapes.forEach(shape=>{
		prev = shape[0]
		setCave(prev,'#')
		for (var i = 1; i < shape.length; i++) {// for each point
			next = shape[i]
			while(prev.x!=next.x || prev.y!=next.y){ //draw point to fill the line
				diff={
					x:next.x-prev.x,
					y:next.y-prev.y,
				}
				if(diff.x) prev.x+=(diff.x/Math.abs(diff.x))
				if(diff.y) prev.y+=(diff.y/Math.abs(diff.y))
				setCave(prev,'#')
			}
		}
	})
}

function tryFall(x,y){
	if(getCave([x,y+1]) == '.') return tryFall(x,y+1) //bot
	if(getCave([x-1,y+1]) == '.') return tryFall(x-1,y+1) //leftbot
	if(getCave([x+1,y+1]) == '.') return tryFall(x+1,y+1) //rightbot
	// cannot fall further
	setCave([x,y],'o') //draw in place
	dropletCount++
	return 1
}

function part2(){
	console.log("PART 2 : ")
	dropletCount=0
	while(tryFall(startPoint.x,startPoint.y)){
		if(getCave(startPoint) == 'o') break;
	}
	console.log(dropletCount,"sand fell")
}


// console.table(cave)
drawCave()
part2()