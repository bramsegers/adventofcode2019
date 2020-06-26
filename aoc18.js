let grid
    =require('fs')
    .readFileSync('input/aoc18.txt','utf8')
    .split('\r\n')
    .map(e=>e.split(''))

      
let H=grid.length
let W=grid[0].length


let keys
let nodes
let dists
let mindist


let solve=(part)=>{
    keys={}
    nodes={}
    dists={}
    mindist=1e100
    for(let y=0;y<H;y++){
        for(let x=0;x<W;x++){
            let c=grid[y][x]
            if(c>='a' && c<='z') keys[c]={x,y}
            if(c!='@') continue
            if(part==1) 
                keys[1]={x,y}
            if(part==2){
                grid[y][x]='#'
                grid[y-1][x]='#'
                grid[y+1][x]='#'
                grid[y][x-1]='#'
                grid[y][x+1]='#'
                keys[1]={x:x-1,y:y-1}
                keys[2]={x:x-1,y:y+1}
                keys[3]={x:x+1,y:y-1}
                keys[4]={x:x+1,y:y+1}
            }
        }
    }
    for(let k1 in keys){
        for(let k2 in keys){
            if(k1>=k2) continue
            let v1=keys[k1]
            let v2=keys[k2]
            let node=bfs(v1.y,v1.x,v2.y,v2.x)
            if(!node) continue
            nodes[[k1,k2]]=node
            nodes[[k2,k1]]=node
        }
    }
    let last=(part==1)?'1':'1234'
    let todo=Object.keys(keys).filter(e=>!last.includes(e)).join('')
    search(0,'',todo,last)
    console.log(mindist)
}


let search=(dist,done,todo,last)=>{
    if(!todo.length){
        mindist=dist
        console.log(dist,done)
    }
    for(let j of last){
        for(let k of todo){
            let n=nodes[[j,k]]
            if(!n) continue
            if(![...n.keysNeeded].every(e=>done.includes(e))) continue
            let key=done.split('').sort().join('')+k
            let dist2=dist+n.dist
            if(dist2>=mindist) continue
            if(dists[key]<=dist2) continue
            dists[key]=dist2
            let done2=done+k
            let todo2=todo.replace(k,'')
            let last2=last.replace(j,k)
            search(dist2,done2,todo2,last2)
        }
    }
}
        
       
let bfs=(y0,x0,y1,x1)=>{
    let q=[]
    let visited={}
    visited[[y0,x0]]=true
    q.push({y:y0,x:x0,dist:0,keysNeeded:''})
    while(q.length){
        let node=q.shift()
        y0=node.y
        x0=node.x
        let dist=node.dist
        if(y0==y1 && x0==x1) return node
        for(let d of [[-1,0],[0,1],[1,0],[0,-1]]){          
            let y=y0+d[0]
            let x=x0+d[1]
            let g=grid[y][x].toLowerCase()
            if(!g || g=='#') continue
            if(visited[[y,x]]) continue
            visited[[y,x]]=true
            let k=node.keysNeeded
            if(g!='.' && (y!=y1 || x!=x1) && !k.includes(g)) k+=g
            let n={y,x,dist:dist+1,keysNeeded:k}
            q.push(n)
        }
    }
}


solve(1)
solve(2)