console.log(
	require('fs').readFileSync('./input.txt',"utf8").toString().split('\r').join('') // reading windows file..
	.match(/\$ ls\n\n?[^\$]*/g).map(line=>({
		sub: (line.split('dir ').length-1),
		size: (('0\n'+line).match(/[0-9]+/g).reduce((sum,e)=>sum+Number(e),0))
	}))
	.map((_,i,arr)=>(dirSize=(arr, j, subCpt)=>arr[j].size+((subCpt+=arr[j].sub)==0?0:dirSize(arr,j+1,subCpt-1)))(arr,i,0))
	//1
	//.filter(size=>size<=100000).reduce((sum,e)=>sum+e,0))
	//2
	.filter((e,i,arr)=>e>-40000000+arr[0]).sort((a,b)=>a-b)[0])