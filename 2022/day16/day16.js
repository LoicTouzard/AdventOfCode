
let G=undefined
let A=[]
let P=new Set()
let start,end=undefined

function Node(name, pressure, to=[]){
	this.name=name
	this.pressure=pressure
	this.to=to
	this.prev={}
	this.d={}
}


G=require('fs').readFileSync('./demo.txt').toString().split('\r').join('')
	.split('\n').map((l=>{
		names = l.match(/[A-Z]{2}/g)
		pressure = l.match(/\d+/g)
		node = new Node(names[0],Number(pressure),names.slice(1))
		return node	
	}))
/*
	.reduce((dict,n)=>{
		dict[n.name]=n
		return dict
	},{})
*/

G.forEach(x=>x.to=x.to.map(link=>G.find(y=>y.name==link)))


cares = G.filter(x=>x.pressure)

cares.forEach(start=>{
	// dijkstra
	start.d[start.name]=0
	priority = [start]

	while(priority.length != 0){
		n = priority.pop()

		//for every neighbor
		neighbors = n.to
		neighbors.forEach(neighbor =>{
			if(neighbor.d[start.name]==undefined) neighbor.d[start.name]=Number.MAX_SAFE_INTEGER
			d = n.d[start.name] + 1
			if(d<neighbor.d[start.name]){
				neighbor.d[start.name]=d
				neighbor.prev[start.name] = n
				priority.push(neighbor)
				priority.sort((a,b)=>b.d[start.name]-a.d[start.name])
			}
		})
	}
})

GObj=G.reduce((dict,n)=>{
		dict[n.name]=n
		return dict
	},{})
//console.log(GObj)

minutesMax=30
pos=GObj["AA"]
dest=undefined
opened = []
releasing = 0
released = 0

function H(valve,from,time){
	return (time//remaining time
	-from.d[valve.name]) //distance to the valve
	*valve.pressure
}
maxPath = []
max = 0
function nextValves(pos,time,valvesToOpen,value=0,d=0){
	d='|  '.repeat(d)
		// console.log(d,"Tried",pos.name, "are to open",valvesToOpen.map(x=>x.name))
		// 	console.log(d,"time",time,"val",value,"max",max)
	if(time<0) return [max]//times over
	if(valvesToOpen.length==0) return [value,path] 
	valvesToOpen = valvesToOpen.filter(v=>time-pos.d[v.name]-1>=0)//.sort((a,b)=>H(b,pos,time)-H(a,pos,time))
	valvesH = valvesToOpen.map(v=>H(v,pos,time))
			// console.log(d,"VH",valvesH)
	allOpen = valvesH.reduce((sum,h)=>sum+h,0)
	console.log(d,'v',value,'all',allOpen,'max',max)
	if(value+allOpen>max){ //cut if not enough potential pressure
		valvesToOpen.forEach((v,i)=>{
			h=valvesH[i] // heuristic to new point
			
			result = nextValves(v,
				time-pos.d[v.name]-1,
				valvesToOpen.filter(x=>x.name!=v.name),
				value+h,max,
				[v.name].concat(path),
				(d.length)/3+1)

			console.log(d,"Tried",v.name, "are to open",valvesToOpen.filter(x=>x.name!=v.name).map(x=>x.name))
			console.log(d,"time",time-pos.d[v.name]-1,"val",value+h,"max",max)
			console.log(d,"path",path)
			// console.log(d,"tried",i,v.name,h)
			console.log(d,"result",result)
			console.log(d)

			if(result[0]>max){
				console.log(d,"New Max !!",result)
				max = result[0]
				path = [v.name].concat(result[1])
			}
		})
	}
	return [max,path]
}

console.log(nextValves(pos,minutesMax,cares))

/*
//test
minutesMax=30
pos=GObj["AA"]
dest=undefined
opened = []
releasing = 0
released = 0
valvesToOpen=cares
console.log("Valves to open:",valvesToOpen.map(x=>x.name).join(','))
for (var i = 1; i < minutesMax+1; i++) {
	console.log("\n\n== Minute",i,"==")
	console.log("Currently in",pos.name)
	if(opened.length==0) console.log("No valves are open.")
	else{
		released+=releasing
		console.log("Valve",opened.join(" and ") ,"is open,")
		console.log("releasing",releasing,"pressure")
		console.log(released,"pressure released so far")
	}

		// we need a new destination
		console.log("searching for a new destination")
		function H(valve,from){
			return ((minutesMax-i)//remaining time
			-from.d[valve.name]) //distance to the valve
			*valve.pressure
		}

		if(valvesToOpen.length==0){
			console.log("everything is open already ! Just wait not to die")
			continue
		}
		else{
			valvesToOpen.sort((a,b)=>H(b,pos)-H(a,pos))
			console.log("Sorted valves:",valvesToOpen.map(x=>[H(x,pos),x.name,x.pressure,x.d[pos.name]]))
			dest=valvesToOpen[0]
		}

	//we have a destination
	 if(pos!=dest){
		console.log("You move to valve",pos.prev[dest.name].name,"towards",dest.name)
		pos=pos.prev[dest.name]
	}
	//we are in place
	else if(!opened.includes(pos.name)){//not opened yet
		//open valve
		console.log("You open valve",pos.name)
		opened.push(pos.name)
		releasing+=pos.pressure
		valvesToOpen.splice(valvesToOpen.indexOf(pos),1)
		dest=undefined
		console.log("Removed valve from to open",valvesToOpen.map(x=>x.name).join(','))
	}
	else console.log("ERROR ??")


}

console.log(opened.reverse())
// console.log("Part 1 from S",start.d[start.name])
// console.log("Part 2 from any a",A.sort((a,b)=>a.d-b.d)[0].distance)

*/