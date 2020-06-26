const intcode=require('./intcode')


let prog
    =require('fs')
    .readFileSync('input/aoc11.txt','utf8')
    .split(',')
    .map(Number)



let grid=(color)=>{
    let x=0
    let y=0
    let grid={}
    grid[[x,y]]=color
    let P=intcode(prog)
    let di=0
    let dir=[[0,-1],[1,0],[0,1],[-1,0]]
    while(true){
        let color1=grid[[x,y]]|0
        P.input(color1)
        let color2=P.run()
        let turnR=P.run()
        if(turnR=='halted') break
        grid[[x,y]]=color2              // paint
        di=turnR ? (di+1)%4 : (di+3)%4  // turn
        x+=dir[di][0]                   // move x
        y+=dir[di][1]                   // move y
    }
    return grid
}



let grid1=grid(0)
let part1=Object.keys(grid1).length
console.log(part1)



let grid2=grid(1)
let part2=''
for(let y=0;y<6;y++){
    for(let x=0;x<40;x++)
        part2+=grid2[[x,y]]?'★ ':'  '
    part2+='\n'
}
console.log(part2)