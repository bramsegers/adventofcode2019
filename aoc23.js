const intcode=require('./intcode')


let prog
    =require('fs')
    .readFileSync('input/aoc23.txt','utf8')
    .split(',')
    .map(Number)


let codes=[]
for(let i=0;i<50;i++){
    codes[i]=intcode(prog)
    codes[i].input(i)
}


let run=()=>{
    let part1
    let part2
    let nat
    while(true){
        let idle=0
        for(let i=0;i<50;i++){
            let r=codes[i].run()
            if(r=='no input'){
                codes[i].input(-1)
                r=codes[i].run()
            }
            if(r=='no input') idle++
            let out=codes[i].outputs()
            if(out.length==3){
                if(out[0]==255){
                    nat=out
                    if(!part1) part1=nat[2]
                }else{
                    codes[out[0]].input(out[1])
                    codes[out[0]].input(out[2])
                }
                codes[i].flush()
            }
        }
        if(idle==50){
            codes[0].input(nat[1])
            codes[0].input(nat[2])
            if(part2==nat[2]) return {part1,part2}
            part2=nat[2]
        }
    }
}


console.log(run())