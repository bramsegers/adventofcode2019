let input
    =require('fs')
    .readFileSync('input/aoc01.txt','utf8')
    .split('\r\n')
    .map(Number)


let part1=0
for(let n of input)
    part1+=((n/3)|0)-2
console.log(part1)


let part2=0
for(let n of input)
    for(let m=n;;){
        m=((m/3)|0)-2
        if(m<0) break
        part2+=m
    }
console.log(part2)