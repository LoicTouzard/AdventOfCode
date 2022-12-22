key = 811589153
function Node(val){
	this.val=val*key
	this.next=null
	this.prev=null
}

ordered=require('fs').readFileSync('./input.txt').toString().split('\r\n')
.map((l=> new Node(Number(l))))

//build doublelinkedlist
zero = null
ordered.forEach((n,i,list)=>{
	if(n.val==0) zero = n
	n.prev=list.at(i-1)
	if(i==list.length-1) n.next=list.at(0)
	else n.next=list.at(i+1)
})

//mix 10 times
for (var j = 0; j < 10; j++) {

	//ordered contains the node in input order
	ordered.forEach(elem=>{
		offset = elem.val%(ordered.length-1)
		if(offset==0) return //no offest, nothing move
		//remove the current element of the linkedlist
		elem.prev.next = elem.next
		elem.next.prev = elem.prev

		//move to the new position
		count=0
		n=elem
		if(offset>0){
			while(count++!=offset) n=n.next //moving forward
			//insert "after" n element
		 	n=n.next
		}
		else if(offset<0){
			while(count--!=offset) n=n.prev //moving backward
			// insert "before" n element
		}
		elem.next = n
		elem.prev = n.prev
		n.prev.next = elem
		n.prev = elem
	})
}

n=zero
for (var i = 0; i < 1000; i++) {
	n=n.next
}
n1000 = n.val

for (var i = 0; i < 1000; i++) {
	n=n.next
}
n2000 = n.val

for (var i = 0; i < 1000; i++) {
	n=n.next
}
n3000 = n.val

// printList(zero)
console.log(1000,n1000)
console.log(2000,n2000)
console.log(3000,n3000)
console.log("Part2:",n1000+n2000+n3000)
