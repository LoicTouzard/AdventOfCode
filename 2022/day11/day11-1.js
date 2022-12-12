input = require('fs').readFileSync('./demo.txt').toString().split('\r').join('').split('\n\n')

function Monkey(items,operator='+',value='0',testDivisor, trueTo, falseTo){
	this.items=items
	this.operator=operator
	this.value=value
	this.testDivisor=+testDivisor
	this.trueTo=+trueTo
	this.falseTo=+falseTo
	this.inspectCount=0
}

//parser
monkeys = new Array(input.length).fill().map((monk,i)=>{
	split=input[i].split('\n').map(l=>l.split(' '))
	// console.log(split[1].splice(4).map(i=>Number(i.replace(',',''))),split[2][6],split[2][7],split[3][5],split[4][9],split[5][9])
	return new Monkey(split[1].splice(4).map(i=>Number(i.replace(',',''))),split[2][6],split[2][7],split[3][5],split[4][9],split[5][9])
})

var rounds = 20

for (var n = 0; n < rounds; n++) {
	console.log("--------- ROUND",n,"---------")
	monkeys.forEach((m,index)=>{
		console.log("Monkey ",index)
		while (m.items.length != 0) {
			item = m.items.shift()
			console.log("\tMonkey inspects",item)
			m.inspectCount++
			worry = m.operator=='+'?
						item+(+m.value):
						(m.value=='old'?
							item*item:
							item*(+m.value))
			console.log("\t\tworry from",item, "to",worry)
			worry = Math.floor(worry/3)
			console.log("\t\tworry / 3 goes to ",worry)
			console.log("\t\tworry divisible by ",m.testDivisor,worry%m.testDivisor==0)
			
			monkeys.at((worry%m.testDivisor==0)?m.trueTo:m.falseTo).items.push(worry)
			console.log("\t\titem with worry",worry, "thrown to monkey",(worry%m.testDivisor==0)?m.trueTo:m.falseTo)
		}
	})
}

console.log(monkeys)

console.log(monkeys.map(m=>m.inspectCount).sort((a,b)=>b-a).splice(0,2).reduce((acc,m)=>acc*m))
