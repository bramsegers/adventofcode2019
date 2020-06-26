let input=[353096,843212]


let valid=(n,part)=>{
    let valid=false
    let dig=n%10
    let adj=1
    let test=()=>part==1?adj>=2:adj==2
    n=(n/10)|0
    while(n){
        let d2=n%10
        if(dig<d2) return false
        if(dig==d2) adj++
        else{
            valid|=test()
            adj=1
        }
        dig=d2
        n=(n/10)|0
    }
    valid|=test()
    return valid
}


let part1=0
let part2=0


for(let n=input[0];n<=input[1];n++){
    part1+=valid(n,1)
    part2+=valid(n,2)
}


console.log(part1)
console.log(part2)