let input
    =require('fs')
    .readFileSync('input/aoc22.txt','utf8')
    .split('\r\n')
    

let solve=(part,cards,shuffles,i)=>{
    if(part==2) input.reverse()
    let to_f=(part==1)
        ?(e)=>e[2]=='new' ? [-1n,-1n]:
              e[0]=='cut' ? [1n,-(BigInt(e[1])%cards)]:
                            [BigInt(e[3]),0n]
        :(e)=>e[2]=='new' ? [-1n,-1n-cards]:
              e[0]=='cut' ? [1n,BigInt(e[1])%cards]:
                            [modinv(BigInt(e[3]),cards),0n]  
    let shuffle
        =input
        .map(e=>e.split(' '))
        .map(e=>to_f(e))
        .reduce((a,b)=>[b[0]*a[0],b[0]*a[1]+b[1]],[1n,0n])
    let r=rep(shuffle[0],shuffle[1],shuffles,cards)
    r=(i*r[0]+r[1])%cards
    if(r<0) r+=cards
    console.log(r)
}


let modinv=(k,m)=>{
    let [n,p,q,s]=[m,1n,0n,1]
    while(k) [p,q,n,k,s]=[n/k*p+q,p,k,n%k,1-s]
    return s?m-q:q
}


let rep=(a,b,s,c)=>{
    if(!s) return [1n,0n]
    if(!(s%2n)) return rep((a*a)%c,(a*b+b)%c,s/2n,c)
    let r=rep(a,b,s-1n,c)
    return [(a*r[0])%c,(a*r[1]+b)%c]
}


solve(1,10007n,1n,2019n)
solve(2,119315717514047n,101741582076661n,2020n)