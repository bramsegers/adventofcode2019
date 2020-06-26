let input
    =require('fs')
    .readFileSync('input/aoc03.txt','utf8')
    .split('\r\n')
    .map(e=>e.split(','))


let points=(wire)=>{
    let pts={}
    let x=0,y=0,steps=0
    for(let t of wire){
        let dir=t[0]
        let len=t.substring(1)|0
        let dx=0
        let dy=0
        if(dir=='L') dx--
        if(dir=='R') dx++
        if(dir=='U') dy--
        if(dir=='D') dy++
        while(len--){
            x+=dx
            y+=dy
            steps++
            let k=[x,y]
            if(!pts[k]) pts[k]={x,y,steps}
        }
    }
    return pts
}


let points1=points(input[0])
let points2=points(input[1])


let intersect
    =Object
    .keys(points1)
    .filter(k=>k in points2)


let part1=
    intersect
    .map(k=>
        Math.abs(points1[k].x)+
        Math.abs(points1[k].y)
    )
    .reduce((a,b)=>a<b?a:b)


let part2=
    intersect
    .map(k=>
        points1[k].steps+
        points2[k].steps
    )
    .reduce((a,b)=>a<b?a:b)


console.log(part1)
console.log(part2)