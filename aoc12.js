let input
    =require('fs')
    .readFileSync('input/aoc12.txt','utf8')
    .split('\r\n')
    .map(e=>e.match(/[+-]?\d+/g).map(Number))
 

let part1=()=>{
    let moons=input.map(e=>[...e,0,0,0])
    for(let s=0;s<1000;s++){
        for(let i=0;i<4;i++)
            for(let j=i+1;j<4;j++)
                for(let k=0;k<3;k++){
                    let d=moons[i][k]-moons[j][k]
                    if(d<0) {moons[i][k+3]++;moons[j][k+3]--}
                    if(d>0) {moons[i][k+3]--;moons[j][k+3]++} 
                }
        for(let i=0;i<4;i++)
            for(let j=0;j<3;j++)
                moons[i][j]+=moons[i][j+3]
    }
    let ans=0
    for(let i=0;i<4;i++){
        let pot=0,kin=0
        for(let j=0;j<3;j++){
            pot+=Math.abs(moons[i][j])
            kin+=Math.abs(moons[i][j+3])
        }
        ans+=pot*kin
    }
    return ans
}


let gcd=(a,b)=>b?gcd(b,a%b):a
let lcm=(a,b)=>a*(b/gcd(a,b))
let period=(k,inp)=>{
    let [m,n,p,q]=inp.map(e=>e[k])
    for(let s=1;;s++){
        for(let i=0;i<4;i++){
            for(let j=i+1;j<4;j++){
                let a=inp[i]
                let b=inp[j]
                let d=a[k]-b[k]
                if(d<0) {a[k+3]++;b[k+3]--}
                else if(d>0) {a[k+3]--;b[k+3]++} 
            }
        }
        for(let i=0;i<4;i++){
            let a=inp[i]
            a[k]+=a[k+3]
        }
        if(inp[0][k  ]!=m) continue
        if(inp[0][k+3]!=0) continue
        if(inp[1][k  ]!=n) continue
        if(inp[1][k+3]!=0) continue
        if(inp[2][k  ]!=p) continue
        if(inp[2][k+3]!=0) continue
        if(inp[3][k  ]!=q) continue
        if(inp[3][k+3]!=0) continue
        return s
    }
}


let part2=()=>{
    let moons=input.map(e=>[...e,0,0,0])
    let a=period(0,moons)
    let b=period(1,moons)
    let c=period(2,moons)
    let ans=lcm(lcm(a,b),c)
    return ans
}


console.log(part1())
console.log(part2())