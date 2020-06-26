let input
    =require('fs')
    .readFileSync('input/aoc10.txt','utf8')
    .split('\r\n')
    .map(e=>e.split(''))


let W=input[0].length
let H=input.length



let list=[[1,0],[-1,0],[0,1],[0,-1]]
let gcd=(a,b)=>b?gcd(b,a%b):a
for(let i=1;i<W;i++){
    for(let j=1;j<H;j++){
        if(gcd(i,j)==1){
            list.push([ i, j])
            list.push([ i,-j])
            list.push([-i, j])
            list.push([-i,-j])
        }
    }
}


let x,y


let part1=()=>{
    let max=0
    for(let j=0;j<H;j++){
        for(let i=0;i<W;i++){
            if(input[j][i]=='#'){
                let c=0
                for(let [x2,y2] of list){
                    let [i2,j2]=[i,j]
                    while(true){
                        i2+=x2
                        j2+=y2
                        if(i2<0 || i2>=W) break
                        if(j2<0 || j2>=H) break
                        if(input[j2][i2]=='#') {c++;break}
                    }
                }
                if(c>max) [max,x,y]=[c,i,j]
            }
        }
    }
    return {max,x,y,ans:max}
}



let part2=()=>{
    list.sort((a,b)=>{
        let t1=Math.atan2(a[1],a[0])
        let t2=Math.atan2(b[1],b[0])
        return t2-t1
    })
    let i=0
    while(list[i][0]<0) i++
    for(let ast=0;;i++){
        if(i==list.length) i=0
        let [x2,y2]=list[i]
        let [i2,j2]=[x,y]
        while(true){
            i2+=x2
            j2-=y2
            if(i2<0 || i2>=W) break
            if(j2<0 || j2>=H) break
            if(input[j2][i2]=='#'){
                input[j2][i2]='.'
                if(++ast==200) return {ast,x:i2,y:j2,ans:100*i2+j2}
                break
            }
        }
    }
}



console.log(part1())
console.log(part2())