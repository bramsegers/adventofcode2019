const intcode=require('./intcode')

let prog
    =require('fs')
    .readFileSync('input/aoc15.txt','utf8')
    .split(',')
    .map(Number)


let grid
let oxygen
let maxdist


let dx=[0,0,-1,1]
let dy=[-1,1,0,0]


let search=(_x,_y,_dist,_code)=>{
    for(let d=0;d<4;d++){
        let x=_x+dx[d]
        let y=_y+dy[d]
        let dist=_dist+1
        if(grid[[x,y]]) continue
        let code=_code.copy()
        code.input(d+1)
        let r=code.run()
        grid[[x,y]]=1
        if(r==2) oxygen={x,y,dist,code}
        if(r>0 && dist>maxdist) maxdist=dist
        if(r>0) search(x,y,dist,code)
    }
}


grid={}
search(0,0,0,intcode(prog))
console.log(oxygen.dist)


grid={}
maxdist=0
search(oxygen.x,oxygen.y,0,oxygen.code)
console.log(maxdist)