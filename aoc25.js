const intcode=require('./intcode')


let prog
    =require('fs')
    .readFileSync('input/aoc25.txt','utf8')
    .split(',')
    .map(Number)


let asciiIn=(code,inp)=>{
    for(let i of inp)
        code.input(i.charCodeAt(0))
}


let asciiOut=(code)=>{
	while(true){
        let r=code.run()
        if(r=='halted' || r=='no input'){
			let out=code.outputs().map(Number)
				.map(e=>String.fromCharCode(e)).join('')
			code.flush()
			return out
		}
    }
}



let dirs=['north\n','south\n','east\n','west\n']		// bfs to find all rooms
let code=intcode(prog)
let r=asciiOut(code)
let Q=[{r,code}]
let seen={}
seen[r]='path\n'
while(Q.length){
	let n=Q.shift()
	let r0=n.r
	let code0=n.code
	console.log(seen[r0],r0)
	for(let d of dirs){
		if(!r0.includes(d)) continue
		let code=code0.copy()
		asciiIn(code,d)
		let r=asciiOut(code)
		if(seen[r]) continue
		Q.push({r,code})
		seen[r]=seen[r0]+d
	}
}


let actions={
	N:'north\n',
	S:'south\n',
	E:'east\n',
	W:'west\n',
	a:'take whirled peas\n',
	b:'take prime number\n',
	c:'take escape pod😠\n',
	d:'take infinite loop😠\n',
	e:'take dark matter\n',
	f:'take coin\n',
	g:'take giant electromagnet😠\n',
	h:'take molten lava😠\n',
	i:'take photons😠\n',
	j:'take astrolabe\n',
	k:'take antenna\n',
	m:'take fixed point\n',
	n:'take weather machine\n'
}


let input='EaENbSEEEeWWWWNfWNWjESSkNESWNmNnES'			// walk to pressure sensitive floor
let poss='abefjkmn'										// try all 2^8 combinations of good items
for(let i=0;i<256;i++){
	let p=''
	for(let j=0;j<8;j++)
		if((i>>j)&1) p+=poss[j]
	let inp=input
		.split('')
		.filter(e=>!p.includes(e))
		.map(e=>actions[e])
		.join('')
	let code=intcode(prog)
	let res=asciiOut(code)
	asciiIn(code,inp)
	res=asciiOut(code)
	if(!res.includes('ejected')){
		console.log(res)
		break
	}
}