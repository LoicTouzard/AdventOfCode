console.log(require('fs').readFileSync('./input.txt').toString().split('\r').join('').split('\n').map(l=>l.split(' '))
    .reduce((args,line)=> //read input line like [command, value]
        [args[0]+Array((line[0]=='addx')+1).fill('').reduce(draw=> //iterates 1 or 2 times according to command
            draw+(Math.abs((args[0]+draw).split('\n').at(-1).length-args[1])>1?'.':'#')+ //draw current pixel
                (args[2]++%40==0?'\n':'')   // add newline every 40char
            ,''), // draw init
        args[1]+Number(line[1]?line[1]:0), //update x value
        args[2]]
    ,['',1,1])[0])  //args[] init is like [CRT,X,cycle]
