function Node(name, val, left=null, op='', right=null){
	this.name=name,
	this.val=val,
	this.left=left,
	this.right=right,
	this.op=op,
	this.getVal= function(newCalc=false){
		if(this.val == null || (newCalc==true && this.left!=null)){
			if(this.op=='+') this.val = nDict[this.left].getVal(newCalc) + nDict[this.right].getVal(newCalc)
			else if(this.op=='-') this.val = nDict[this.left].getVal(newCalc) - nDict[this.right].getVal(newCalc)
			else if(this.op=='*') this.val = nDict[this.left].getVal(newCalc) * nDict[this.right].getVal(newCalc)
			else if(this.op=='/') this.val = nDict[this.left].getVal(newCalc) / nDict[this.right].getVal(newCalc)
			else console.error("unknown operator", this.op, "for node",this.name)
		}
		return this.val
	}
}

nDict = {}

require('fs').readFileSync('./input.txt').toString().split('\r\n')
.map(l=>{
	let n=null, name,rest,left,op,right
	[name,rest]=l.split(": ")
	if(isNaN(rest)){
		[left,op,right]=rest.split(" ")
		n = new Node(name,null,left,op,right)
	}
	else{
		n = new Node(name,Number(rest))
	}
	nDict[name]=n
	return n
})

r=nDict['root']
function rootDiff(humn){
	nDict["humn"].val=humn
	left = nDict[r.left].getVal(true)
	right = nDict[r.right].getVal(true)
	// console.log(nDict["humn"].val/*,left,right*/,left-right)
	if(left==right){
		console.log("CORRECT SOLUTION !")
	}
	return left-right
}

console.log("Part 1 : ",r.getVal())

i=0
step=Math.pow(2,64)
while((diff = rootDiff(i))!=0) {
	if(diff<0) i-=(step/=2) // too far, reducting step
	else i+=step //continuing
}
console.log(cpt,"iterations")
console.log("Part 2 : ",i)
// correct = 3342154812537