let intcode=(params)=>{
    
    let ip=0            // instruction pointer  
    let rp=0            // relative position  
    let reg={}          // register map
    let inputQ=[]       // input queue
    let outputQ=[]      // output queue

    if(params.constructor===Array){                                         // create from number array
        if(params.some(e=>typeof e!=='number')) throw ('invalid code')
        reg={...params}

    }else{                                                                  // create from copy
        ip=params.ip
        rp=params.rp
        reg=params.reg2
        inputQ=params.inputQ2
        outputQ=params.outputQ2
    }

    let copy=()=>{                                                          // public
        let reg2={...reg}
        let inputQ2=[...inputQ]
        let outputQ2=[...outputQ]
        return intcode({ip,rp,reg2,inputQ2,outputQ2})
    }
    
    let input=(inp)=>{                                                      // public
        if(typeof inp!=='number') throw ('invalid input')
        inputQ.push(inp)
    }
    
    let outputs=()=>outputQ                                                 // public
    
    let flush=()=>outputQ=[]                                                // public
    
    let run=()=>{                                                           // public

        while(true){
            let instr=reg[ip]
            if(!instr) throw ('invalid instruction pointer:'+ip)
            let r1,r2,w
            let op=instr%100
            let mode1=parseInt(instr/100)%10
            let mode2=parseInt(instr/1000)%10
            let mode3=parseInt(instr/10000)%10
            switch(op){

                case 1: // add
                    r1=read(ip+1,mode1)
                    r2=read(ip+2,mode2)
                    w=write(ip+3,mode3)
                    set(w,r1+r2)
                    ip+=4
                    break

                case 2: // mul
                    r1=read(ip+1,mode1)
                    r2=read(ip+2,mode2)
                    w=write(ip+3,mode3)
                    set(w,r1*r2)
                    ip+=4
                    break

                case 3: // in
                    if(!inputQ.length) return 'no input'        // return 'no input' 
                    r1=inputQ.shift()
                    w=write(ip+1,mode1)
                    set(w,r1)
                    ip+=2
                    break
                
                case 4: // out
                    r1=read(ip+1,mode1)
                    outputQ.push(r1)
                    ip+=2
                    return r1                                   // return output

                case 5: // jit
                    r1=read(ip+1,mode1)
                    r2=read(ip+2,mode2)
                    ip=(r1==0)?ip+3:r2
                    break
                
                case 6: // jif
                    r1=read(ip+1,mode1)
                    r2=read(ip+2,mode2)
                    ip=(r1!=0)?ip+3:r2
                    break
                
                case 7: // lt
                    r1=read(ip+1,mode1)
                    r2=read(ip+2,mode2)
                    w=write(ip+3,mode3)
                    set(w,(r1<r2)?1:0)
                    ip+=4
                    break
                
                case 8: // eq
                    r1=read(ip+1,mode1)
                    r2=read(ip+2,mode2)
                    w=write(ip+3,mode3)
                    set(w,(r1==r2)?1:0)
                    ip+=4
                    break
                
                case 9: // rel pos
                    r1=read(ip+1,mode1)
                    rp+=r1
                    ip+=2
                    break

                case 99: // halt
                    return 'halted'                             // return 'halted'

                default:
                    throw ('invalid opcode:'+op)
            }
        }
    }

    let get=(i)=>{
        if(!reg[i]) return 0
        else return reg[i]
    }

    let set=(i,v)=>{
        if(!v) delete reg[i] 
        else reg[i]=v
    }

    let read=(i,m)=>{
        if(m==0) return get(get(i))
        if(m==1) return get(i)
        if(m==2) return get(get(i)+rp)
        throw ('invalid read mode')
    }

    let write=(i,m)=>{
        if(m==0) return get(i)
        if(m==2) return get(i)+rp
        throw ('invalid write mode')
    }

    return {run,copy,input,outputs,flush}
}

module.exports=intcode