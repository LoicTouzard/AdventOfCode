var input =	require('fs').readFileSync('./input.txt',"utf8").toString().split('\r').join('') // reading windows file..


//partie 2
console.log(input.split('\n\n').map((elf)=>elf.split('\n').reduce((sum,calorie)=>sum+Number(calorie),0)).sort((a,b)=>b-a).slice(0,3).reduce((sum,topElf)=>sum+Number(topElf),0))
//
//Partie 1
//console.log(Math.max(...input.split('\n\n').map((elf)=>elf.split('\n').reduce((sum,calorie)=>sum+Number(calorie),0))))