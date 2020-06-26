const intcode=require('./intcode')


let prog
    =require('fs')
    .readFileSync('input/aoc21.txt','utf8')
    .split(',')
    .map(Number)


let part1=
`NOT C J
AND D J
NOT A T
OR T J
WALK
`


let part2=
`NOT C J
AND D J
AND H J
NOT B T
AND D T
OR T J
NOT A T
OR T J
RUN
`


let run=(inp)=>{
    let code=intcode(prog)
    for(let i of inp) 
        code.input(i.charCodeAt(0))
    while(code.run()!='halted'){}
    console.log(code.outputs().pop())
}


run(part1)
run(part2)