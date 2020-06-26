const intcode=require('./intcode')


let prog
    =require('fs')
    .readFileSync('input/aoc09.txt','utf8')
    .split(',')
    .map(Number)


let run=(i)=>{
    let c=intcode(prog)
    c.input(i)
    while(c.run()!='halted'){}
    console.log(c.outputs().pop())
}
    
    
run(1)
run(2)