let mapHeight=41
let mapWitdh=70
// let mapHeight=5
// let mapWitdh=8

let G=undefined
let A=[]
let P=new Set()
let start,end=undefined
ctoi="abcdefghijklmnopqrstuvwxyz"

function Node(x,y,val){
	this.x=x
	this.y=y
	this.val=ctoi.indexOf(val)
	this.prev=null
	this.canGoTo = (n2)=>(n2.val<=this.val+1)
	this.canGoFrom = (n2)=>(this.val<=n2.val+1)
	this.distance = Number.MAX_SAFE_INTEGER
}


G=require('fs').readFileSync('./input.txt').toString().split('\r').join('')
	.split('\n').map((l,i)=>l.split('').map((n,j)=>{
		node = new Node(i,j,n)
		if(n=='a' || n=='S') A.push(node)
		if(n=='S'){
			start=node
			node.val=0
		}
		if(n=='E'){
			node.distance=0
			end=node
			node.val=26
		}
		return node
	}))

// dijkstra
priority = [end]
while(priority.length != 0){
	n = priority.pop()

	//for every neighbor
	neighbors = []
	//top
	if(n.x!=0 && n.canGoFrom(G[n.x-1][n.y])) neighbors.push(G[n.x-1][n.y])
	//bottom
	if(n.x!=mapHeight-1 && n.canGoFrom(G[n.x+1][n.y])) neighbors.push(G[n.x+1][n.y])
	//left
	if(n.y!=0 && n.canGoFrom(G[n.x][n.y-1])) neighbors.push(G[n.x][n.y-1])
	//right
	if(n.y!=mapWitdh-1 && n.canGoFrom(G[n.x][n.y+1])) neighbors.push(G[n.x][n.y+1])

	neighbors.forEach(neighbor =>{
		d = n.distance + 1
		if(d<neighbor.distance){
			neighbor.distance=d
			neighbor.prev = n
			priority.push(neighbor)
			priority.sort((a,b)=>b.distance-a.distance)
		}
	})
}
console.log("Part 1 from S",start.distance)
console.log("Part 2 from any a",A.sort((a,b)=>a.distance-b.distance)[0].distance)

