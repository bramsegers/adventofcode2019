const intcode=require('./intcode')


let input
    =require('fs')
    .readFileSync('input/aoc05.txt','utf8')
    .split(',')
    .map(Number)


let run=(i)=>{
    let c=intcode(input)
    c.input(i)
    while(c.run()!='halted'){} 
    console.log(c.outputs().pop())
}


run(1)
run(5)