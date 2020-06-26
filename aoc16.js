let input
    =require('fs')
    .readFileSync('input/aoc16.txt','utf8')
    .split('')
    .map(Number)


let R1=100
let R2=10000


let len=input.length
let pattern=[0,1,0,-1]


let P1=[...input]
for(let r=0;r<R1;r++){
    let p=new Array(len).fill(0)
    for(let i=0;i<len;i++)
        for(let j=0;j<len;j++){
            let a=(j+1)%(4*(i+1))
            let b=(a/(i+1))|0
            p[i]+=P1[j]*pattern[b]
        }
    for(let i=0;i<len;i++)
        P1[i]=Math.abs(p[i])%10
}

 
let P2=[]
let off=input.slice(0,7).join('')
let i=len*R2-off
let j=len-1
while(--i>=0){
    P2[i]=input[j]
    if(--j<0) j=len-1
}
for(let i=0;i<R1;i++){
    for(let c=0,j=P2.length-1;j>=0;j--){
        c=(c+P2[j])%10
        P2[j]=c
    }
}


console.log(P1.slice(0,8).join(''))
console.log(P2.slice(0,8).join(''))