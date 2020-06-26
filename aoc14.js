let input
    =require('fs')
    .readFileSync('input/aoc14.txt','utf8')
    .split('\r\n')



let receipts=[]
for (let i of input){
    let [react,out]=i.split(' => ')
    let [qty,chem]=out.split(' ')
    react=react.split(', ').map(e=>{
        let [qty,name]=e.split(' ')
        return {qty,name}
    })
    receipts[chem]={qty,react}
}



let reaction=(qty,chem,a={})=>{
    let ore=0
    let need=Math.ceil(qty/receipts[chem].qty)
    for(let r of receipts[chem].react){
        let qty2=r.qty*need
        if(r.name=='ORE') 
            ore+=qty2
        else{
            a[r.name]|=0
            let d=qty2-a[r.name]
            if(d>0) ore+=reaction(d,r.name,a)
            a[r.name]-=qty2
        }
    }
    a[chem]+=need*receipts[chem].qty
    return ore
}



let part1=()=>reaction(1,'FUEL')



let part2=()=>{
    let ore=0
    let fuel=1e6
    let incr=1e6
    let ore2=1e12
    while(true){
        let ore0=ore
        ore=reaction(fuel,'FUEL')
        if(ore0>=ore2 && ore<=ore2 && incr==1)
            return fuel
        if(ore<ore2){
            if(ore>2*ore0) incr*=2
            fuel+=incr
        }else{
            incr=Math.ceil(incr/2)
            fuel-=incr
        }
    }
}



console.log(part1())
console.log(part2())