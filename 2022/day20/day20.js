key = 811589153
function Node(val){
	this.val=val*key
	this.next=null
	this.prev=null
	this.str = function(){
		return "["+
		(this.prev?this.prev.val:"n")+
		" ("+this.val+") "+
		(this.next?this.next.val:"n")
		+"]"
	}
}
function printList(head){
	str = [head.val]
	current = head.next
	while(current != head){
		str.push(current.val)
		current = current.next	
	}
	console.log(str.join(', '))
}

zero = null
ordered=require('fs').readFileSync('./input.txt').toString().split('\r\n').map((l=>{
	node = new Node(Number(l))
	return node	
}))
ordered.forEach((n,i,list)=>{
	if(n.val==0) zero = n
	n.prev=list.at(i-1)
	if(i==list.length-1) n.next=list.at(0)
	else n.next=list.at(i+1)
})

head = ordered[0]
size = ordered.length

console.log("initial arrangment")
// printList(ordered[0])
console.log()
for (var j = 0; j < 10; j++) {
		
	for (var i = 0; i < ordered.length; i++) {
		n = ordered[i]
		// console.log("on ordered",i,n.str())
		offset = n.val%(size-1)
		if(offset==0){
			// console.log("not moving")
			// printList(head)
			// console.log()
			continue
		}
		//remove the current element of the linkedlist
		n.prev.next = n.next
		n.next.prev = n.prev

		//move to the new position
		if(head==ordered[i]) head=head.next
		count=0
		if(offset<0){
			while(count--!=offset) n=n.prev
			// insert "before" n element
			ordered[i].next = n
			ordered[i].prev = n.prev
			n.prev.next = ordered[i]
			n.prev = ordered[i]
		}

		if(offset>0){
			while(count++!=offset) n=n.next
			//insert "after" n element
			ordered[i].prev = n
			ordered[i].next = n.next
			n.next.prev = ordered[i]
			n.next = ordered[i]
		}

		// console.log(`${ordered[i].val} moves between ${ordered[i].prev.val} and ${ordered[i].next.val} :`)
		// printList(head)
		// console.log()
	}
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
