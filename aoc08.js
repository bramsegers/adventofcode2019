let input
    =require('fs')
    .readFileSync('input/aoc08.txt','utf8')
    .split('')
    .map(Number)



let W=25
let H=6
    


let min=[W*H,0,0]
for(let i=0;i<input.length;i+=W*H){
    let occ=[0,0,0]
    for(let j=i;j<i+W*H;j++)
        occ[input[j]]++
    if(occ[0]<min[0]) min=occ
}
console.log(min[1]*min[2])



let layers=input.length/(W*H)
for(let h=0;h<H;h++){
    let str=''
    for(let w=0;w<W;w++){
        for(let i=0;i<layers;i++){
            let pos=(W*H*i)+(W*h)+w
            let col=input[pos]
            if(col==2) continue
            str+=(col==0?'  ':'★ ')
            break
        }  
    }
    console.log(str)
}