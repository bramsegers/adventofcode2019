const intcode=require('./intcode')


let prog
    =require('fs')
    .readFileSync('input/aoc17.txt','utf8')
    .split(',')
    .map(Number)


let code=intcode(prog)
let grid=[]
let str=''

while(true){
    let r=code.run()
    if(r=='halted') break
    if(r==10) {grid.push(str.split(''));str=''}
    else str+=String.fromCharCode(r)
}


let W=grid[0].length
let H=grid.length


let valid=(j,i)=>j>=0 && i>=0 && j<H && i<W && grid[j][i]=='#'


let robot
let sum=0


for(let y=0;y<H;y++){
    for(let x=0;x<W;x++){
        let d=('^>v<').indexOf(grid[y][x])
        if(d>=0) robot={x,y,d}
        if(!valid(y,x)) continue
        if(!valid(y+1,x)) continue
        if(!valid(y-1,x)) continue
        if(!valid(y,x+1)) continue
        if(!valid(y,x-1)) continue
        sum+=y*x
    }
}
console.log(sum)


let dx=[ 0, 1, 0,-1]
let dy=[-1, 0, 1, 0]
let {x,y,d}=robot
let x2,y2,len=0
let path=''
while(true){
    y2=y+dy[d]
    x2=x+dx[d]
    if(valid(y2,x2)){
        len++
        x=x2
        y=y2
        continue
    }
    if(len) path+=len+' '
    len=0
    y2=y+dy[(d+1)%4]
    x2=x+dx[(d+1)%4]
    if(valid(y2,x2)){
        path+='R'
        d=(d+1)%4
        continue
    }
    y2=y+dy[(d+3)%4]
    x2=x+dx[(d+3)%4]
    if(valid(y2,x2)){
        path+='L'
        d=(d+3)%4
        continue
    }
    break
}
console.log(path)


//    Output:
//    R12 L6 R12 L8 L6 L10 R12 L6 R12 R12 L10 L6 R10 L8 L6 L10 R12 L10 L6 R10 L8 L6 L10 R12 L10 L6 R10 R12 L6 R12 R12 L10 L6 R10

//    Solution:
//    B C B A C A C A B A
//    A=R12 L10 L6 R10
//    B=R12 L6 R12
//    C=L8 L6 L10


let instr=
`B,C,B,A,C,A,C,A,B,A
R,12,L,10,L,6,R,10
R,12,L,6,R,12
L,8,L,6,L,10
n
`


prog[0]=2
code=intcode(prog)
for(let i of instr)
    code.input(i.charCodeAt(0))
while(true){
    let r=code.run()
    if(r=='halted') break
}
console.log(code.outputs().pop())