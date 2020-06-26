let grid
    =require('fs')
    .readFileSync('input/aoc20.txt','utf8')
    .split('\r\n')
    .map(e=>e.split(''))

      
let H=grid.length
let W=grid[0].length


let key=[]


let wall='#'
let pass=(c)=>c=='.'
let alfa=(c)=>c>='A' && c<='Z'
let get=(y,x)=>grid[y][x]
let set=(y,x,c)=>grid[y][x]=c
let outer=(e)=>e?'outer':'inner'


for(let y=2;y<H;y++){
    for(let x=2;x<W;x++){
		
        let a=get(y,x-2)
        let b=get(y,x-1)
        let c=get(y,x)
        let d=get(y-1,x)
        let e=get(y-2,x)
        
		if(alfa(a) && alfa(b) && pass(c)){
            key[a+b]=key[a+b]||{}
            key[a+b][outer(x<W/2)]={y,x}
            set(y,x-2,wall)
            set(y,x-1,wall)
            set(y,x,a+b)
        }
        if(pass(a) && alfa(b) && alfa(c)){
            key[b+c]=key[b+c]||{}
            key[b+c][outer(x>W/2)]={y,x:x-2}
            set(y,x-2,b+c)
            set(y,x-1,wall)
            set(y,x,wall)
        }
        if(alfa(e) && alfa(d) && pass(c)){
            key[e+d]=key[e+d]||{}
            key[e+d][outer(y<H/2)]={y,x}
            set(y-2,x,wall)
            set(y-1,x,wall)
            set(y,x,e+d)
        }
        if(pass(e) && alfa(d) && alfa(c)){
            key[d+c]=key[d+c]||{}
            key[d+c][outer(y>H/2)]={y:y-2,x}
            set(y-2,x,d+c)
            set(y-1,x,wall)
            set(y,x,wall)
        }
    }
}


let bfs=(aa,zz,levd)=>{
	
    let Q=[]
    let seen=[]
    let [x0,y0,lev0]=[aa.outer.x,aa.outer.y,0]
    let [x1,y1,lev1]=[zz.outer.x,zz.outer.y,0]
    
	Q.push({y:y0,x:x0,lev:lev0,dist:0})
    seen[[y0,x0,lev0]]=true
    
	while(Q.length){
        
		let node=Q.shift()
        y0=node.y
        x0=node.x
        lev0=node.lev
        if(y0==y1 && x0==x1 && lev0==lev1) return node
        let dist=node.dist+1
		
        for(let d of [[-1,0],[0,1],[1,0],[0,-1]]){      
            let y=y0+d[0]
            let x=x0+d[1]
            if(get(y,x)==wall) continue
            if(seen[[y,x,lev0]]) continue
            Q.push({y,x,lev:lev0,dist})
            seen[[y,x,lev0]]=true
        }
        
		if(key[get(y0,x0)]){
            let {inner,outer}=key[get(y0,x0)]
            if(!inner || !outer) continue
            let [y,x,lev]
                =y0==inner.y && x0==inner.x
                ?[outer.y,outer.x,lev0+levd]
                :[inner.y,inner.x,lev0-levd]
            if(lev<0) continue
            if(seen[[y,x,lev]]) continue
            Q.push({y,x,lev,dist})
            seen[[y,x,lev]]=true
        }
    }
}


let part1=bfs(key['AA'],key['ZZ'],0)
let part2=bfs(key['AA'],key['ZZ'],1)


console.log(part1)
console.log(part2)