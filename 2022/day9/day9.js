const DIRS = {
	'U': new Point(0,1),
	'D': new Point(0,-1),
	'R': new Point(1,0),
	'L': new Point(-1,0)
}

//define a Point object
function Point(x=0,y=0){
	this.x = x
	this.y = y

	this.add = function(p2){
		this.x+=p2.x
		this.y+=p2.y
		return this
	}
	this.times = function(n){
		this.x*=n
		this.y*=n
		return this
	}
	this.approachFrom = p2=>{
		if(p2.x>this.x) this.add(DIRS['R'])
		else if(p2.x<this.x) this.add(DIRS['L'])
		if(p2.y>this.y) this.add(DIRS['U'])
		else if(p2.y<this.y) this.add(DIRS['D'])
		return this
	}
	
	this.dist = p2=>(Math.abs(this.x-p2.x)+Math.abs(this.y-p2.y)) 	// mannathan distance
	this.is_close = p2=>(this.dist(p2)<=1 || 			//close if manatthan dist <=1
		(this.dist(p2)==2 && p2.x!=this.x && p2.y!=this.y)) 	// or close points are in diag (dist 2 but differents axes)
	this.str = ()=>`(${this.x},${this.y})`
}

// cord = Array(2).fill().map(_=>new Point()) 	// initialize part 1 cord
cord = Array(10).fill().map(_=>new Point()) 	// initialize part 2 cord
passed = new Set([cord.at(-1).str()]) 			//set to store tail position

//let's go ! Starting here.
require('fs').readFileSync('./input.txt').toString().split('\r').join('').split('\n').forEach(line=>{ //read input
	[command,value]=line.split(' ') 				//get line command
	cord[0].add(new Point().add(DIRS[command]).times(value)) //move head directly to new position
	while(!cord[1].is_close(cord[0])){ 				//while 2nd knot didn't catch up head
		for (var i = 1; i < cord.length; i++) { 	//for each knot (except head)
			if(!cord[i].is_close(cord[i-1])){ 		// if knot isn't close to its predecessor
				cord[i].approachFrom(cord[i-1]) 	// make it closer
			}
		}
		passed.add(cord.at(-1).str())	 			// store tail position in set
	}	
})

console.log(passed.size)

