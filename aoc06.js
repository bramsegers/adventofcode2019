let input
    =require('fs')
    .readFileSync('input/aoc06.txt','utf8')
    .split('\r\n')


let you
let san


class Orbit{
    constructor(n,p,o){
        this.name=n
        this.parent=p
        this.orb=o
        total+=this.orb
        if(n=='YOU') you=this
        if(n=='SAN') san=this
        for(let i of input){
            if(i.startsWith(this.name)){
                let name=i.substring(4)
                new Orbit(name,this,o+1)
            }
        }
    }
}


let total=0
new Orbit('COM',null,0)
console.log(total)


let you_com=[]
let san_com=[]
while(you.parent) you_com.push(you=you.parent)
while(san.parent) san_com.push(san=san.parent)
let j=you_com.length
let k=san_com.length
while(you_com[j-1]==san_com[k-1]) {j--;k--}
console.log(j+k)