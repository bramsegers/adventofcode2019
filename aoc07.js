const intcode=require('./intcode')


let prog
    =require('fs')
    .readFileSync('input/aoc07.txt','utf8')
    .split(',')
    .map(Number)


function* permutations(p,q=[]){
    let n=p.length
    if(!n) yield q
    for(let i=0;i<n;i++){
        let r=[...p]
        let s=[...q,p[i]]
        r.splice(i,1)
        for(let y of permutations(r,s)) 
            yield y
    }
}


let solve=(perm)=>{
    let ans={thrust:0}
    for(let p of permutations(perm)){
        p=p.map(Number)
        let code=[]
        for(let i=0;i<5;i++){
            code[i]=intcode(prog)
            code[i].input(p[i])
        }
        code[0].input(0)
        while(true){
            for(let i=0;i<4;i++){
                let r=code[i].run()
                if(r=='halted') break
                code[i+1].input(r)
            }
            let r=code[4].run()
            if(r=='halted') break
            if(r>ans.thrust) ans={thrust:r,p}
            code[0].input(r)
        }
    }
    console.log(ans)
}


solve('01234')
solve('56789')