sensors=require('fs').readFileSync('input.txt').toString().split('\r')
	.map(line=>{
		[sx,sy,bx,by]=line.match(/-?\d+/g).map(Number)
		manatthan = Math.abs(sx-bx)+Math.abs(sy-by)
		return { //sensor object
			sx:sx,
			sy:sy,
			m:manatthan
		}
	})

// merge ranges together [[1,3],[2,6],[10,12]...]=> [[1,6],[10,12]]
function mergeRanges(x){
	x.sort((a,b)=>a[0]-b[0]) // we need ranges to be in order
	return x.reduce((merged,range)=>{ //try to merge "merged", with current "range" element 
		lastMerge = merged.at(-1)
		
		if((lastMerge[0]<=range[0] && range[0]<=lastMerge[1]+1) ||
			(range[0]<=lastMerge[0] && lastMerge[0]<=range[1]+1)) // we can merge those 2 ranges
			merged[merged.length-1]=[Math.min(lastMerge[0],range[0]),Math.max(lastMerge[1],range[1])]
		else merged.push(range)
		
		return merged
	},[x[0]])
}

//returns the range image of the sensor on the line Y [x1,x2]
function getRangeOnLine(sensor,Y){
	return [
		(sensor.sx-sensor.m)+Math.abs(Y-sensor.sy),
		(sensor.sx+sensor.m)-Math.abs(Y-sensor.sy)
	]
}

function getRangeOnLineInBoundaries(sensor,Y){
	return [
		Math.max((sensor.sx-sensor.m)+Math.abs(Y-sensor.sy),0),
		Math.min((sensor.sx+sensor.m)-Math.abs(Y-sensor.sy),MAXBOUND)
	]
}


/* PART 1 */
Y=2000000
ranges = mergeRanges(
	sensors.filter(sensor=>(sensor.sy-sensor.m <= Y && sensor.sy+sensor.m >= Y)) //filter sensor present on the Y line
		.map(sensor=>getRangeOnLine(sensor,Y))) // get their range on that line

console.log("PART 1 : ",ranges.reduce((acc,r)=>acc+(r[1]-r[0]),0))


/* PART 2 */
MAXBOUND=4000000
for (var y = 0; y < MAXBOUND; y++) {
	// if(y%100000==0) console.log('\t... checking line',y)
	ranges = mergeRanges(
		sensors.filter(sensor=>(sensor.sy-sensor.m <= y && sensor.sy+sensor.m >= y))
			.map(sensor=>getRangeOnLineInBoundaries(sensor,y)))
	if(ranges.length > 1){ //we found 2 ranges on that line
		// console.log("\t",ranges)
		// console.log("\tFOUND FOR y:",y,"and x:",ranges[0][1]+1)
		console.log("PART 2 : ",(ranges[0][1]+1)*MAXBOUND+y)
		break
	}
}