let input
    =require('fs')
    .readFileSync('input/aoc02.txt','utf8')
    .split(',')
    .map(Number)


let run=(a)=>{
    for(let i=0;;i+=4){
        let op=a[i]
        if(op==99) break
        if(op==1) a[a[i+3]]=a[a[i+1]]+a[a[i+2]]
        if(op==2) a[a[i+3]]=a[a[i+1]]*a[a[i+2]]
    }
}


let part1=()=>{
    let a=[...input]
    a[1]=12
    a[2]=2
    run(a)
    console.log(a[0])
}


let part2=()=>{
    for(let p=0;p<100;p++){
        for(let q=0;q<100;q++){
            let a=[...input]
            a[1]=p
            a[2]=q
            run(a)
            if(a[0]!=19690720) continue
            console.log(p,q)
            return
        }
    }
}


part1()
part2()