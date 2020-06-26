const intcode=require('./intcode')


let prog
    =require('fs')
    .readFileSync('input/aoc19.txt','utf8')
    .split(',')
    .map(Number)


let code=intcode(prog)


let beam=(code,x,y)=>{
    let c=code.copy()
    c.input(x)
    c.input(y)
    return c.run()
}


let part1=0
for(let y=0;y<50;y++)
    for(let x=0;x<50;x++)
        part1+=beam(code,x,y)
console.log(part1)



let a=[]
let b=[]
a[8]=9
b[8]=10
for(let y=9;y<10000;y++){
    let x1=a[y-1]
    let x2=b[y-1]
    while(beam(code,x1,y)==0) x1++
    while(beam(code,x2,y)==1) x2++
    a[y]=x1
    b[y]=x2-1
}
let minx=0
let miny=0
let mindist=1e100
for(let y=9;y+100<10000;y++){
    for(let x=b[y];x>=a[y];x--){
        let x2=x-100+1
        if(a[y]>x2) break
        if(a[y+100-1]>x2) break
        let d=x2*x2+y*y
        if(d<mindist){
            mindist=d
            minx=x2
            miny=y
        }
    }
}
let part2=minx*10000+miny
console.log(part2)