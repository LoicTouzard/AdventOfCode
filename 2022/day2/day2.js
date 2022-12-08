var input =	require('fs').readFileSync('./input.txt',"utf8").toString().split('\r').join('') // reading windows file..

/*
A < B
B < C
C < A

X Lose
Y draw
Z win
*/
var manches = input.split('\n')
var score = 0
manches.forEach(manche=>{
	tmp = manche.split(' ')
	opp = tmp[0]
	me = tmp[1]

	// version 1
	/*
	switch(me){
		case 'X'://rock
			score+= 1
			switch(opp){
				case 'A'://rock
					score+=3
				break;
				case 'B'://paper
					score+=0
				break;
				case 'C'://scissor
					score+=6
				break;
			}
		break;
		case 'Y': //paper
			score+=2
			switch(opp){
				case 'A'://rock
					score+=6
				break;
				case 'B'://paper
					score+=3
				break;
				case 'C'://scissor
					score+=0
				break;
			}
		break;
		case 'Z': //scissor
			score+=3
			switch(opp){
				case 'A'://rock
					score+=0
				break;
				case 'B'://paper
					score+=6
				break;
				case 'C'://scissor
					score+=3
				break;
			}
		break;
	}
	*/

	// Version 2
	switch(me){
		case 'X'://Lose
			score+= 0
			switch(opp){
				case 'A'://rock -> scissor
					score+=3
				break;
				case 'B'://paper -> rock
					score+=1
				break;
				case 'C'://scissor -> paper
					score+=2
				break;
			}
		break;
		case 'Y': //draw
			score+=3
			switch(opp){
				case 'A'://rock -> rock
					score+=1
				break;
				case 'B'://paper -> paper
					score+=2
				break;
				case 'C'://scissor -> scissor
					score+=3
				break;
			}
		break;
		case 'Z': //win
			score+=6
			switch(opp){
				case 'A'://rock -> paper
					score+=2
				break;
				case 'B'://paper -> scissor
					score+=3
				break;
				case 'C'://scissor -> rock
					score+=1
				break;
			}
		break;
	}
	console.log("manche",manche)
	console.log("score :", score)
})

console.log("score :", score)