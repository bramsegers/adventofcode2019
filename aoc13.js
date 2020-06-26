const intcode=require('./intcode')


let input
    =require('fs')
    .readFileSync('input/aoc13.txt','utf8')
    .split(',')
    .map(Number)



let blocks=0
let P1=intcode(input)
while(true){
    let x=P1.run()
    let y=P1.run()
    let t=P1.run()
    if(t=='halted') break
    blocks+=(t==2)
}
console.log(blocks)



input[0]=2
let score
let ballx
let paddlex
let P2=intcode(input)
while(true){    
    let x=P2.run()
    let y=P2.run()
    let t=P2.run()
    if(t=='halted') break
    if(t=='no input') P2.input( ballx<paddlex?-1: ballx==paddlex?0 :1)
    if(x==-1 && y==0) score=t
    if(t==3) paddlex=x
    if(t==4) ballx=x
}
console.log(score)