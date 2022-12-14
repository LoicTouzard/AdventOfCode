startPoint = {x:500,y:0}
minBox={x:startPoint.x,y:startPoint.y}
maxBox={x:startPoint.x,y:startPoint.y}

shapes=require('fs').readFileSync('demo.txt').toString().split('\r').join('')
	.split('\n').map(shape=>shape.split(' -> ').map(points=>{
		[x,y]=points.split(',').map(Number)
		minBox.x=x<minBox.x?x:minBox.x
		maxBox.x=x>maxBox.x?x:maxBox.x
		minBox.y=y<minBox.y?y:minBox.y
		maxBox.y=y>maxBox.y?y:maxBox.y
		return {x:x,y:y}
	}))

//let left and right space for sand to fall
minBox.x--
maxBox.x++
console.log("boundaries",minBox,maxBox)

// fill empty cave
cave = new Array(maxBox.y-minBox.y+1).fill('')
	.map((line,i)=>new Array(maxBox.x-minBox.x+1).fill("."))

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
		for (var i = 1; i < shape.length; i++) {
			next = shape[i]
			// console.log("going from",prev,"to",next)
			while(prev.x!=next.x || prev.y!=next.y){
				diff={
					x:next.x-prev.x,
					y:next.y-prev.y,
				}
				// console.log("not same point, diff:",diff)
				if(diff.x) prev.x+=(diff.x/Math.abs(diff.x))
				if(diff.y) prev.y+=(diff.y/Math.abs(diff.y))
				setCave(prev,'#')
				// console.log("going from",prev,"to",next)
			}
		}
	})
}

function tryFall(x,y){
	if(y==maxBox.y) return 0 // fallin in the void
	if(getCave([x,y+1]) == '.') return tryFall(x,y+1) //bot
	if(getCave([x-1,y+1]) == '.') return tryFall(x-1,y+1) //leftbot
	if(getCave([x+1,y+1]) == '.') return tryFall(x+1,y+1) //rightbot
	// cannot fall further
	setCave([x,y],'o') //draw in place
	dropletCount++
	return 1
}

function part1(){
	dropletCount=0
	console.log("PART 1 : ")
	while(tryFall(startPoint.x,startPoint.y));
	console.log(dropletCount,"sand fell")	
}

// console.table(cave)
drawCave()
part1()