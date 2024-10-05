
import { useContext } from "react";
import { Authcontext } from "./authContext";

const Authusecontext = ()=>{
    const  authcontext= useContext(Authcontext)
    
    if(!authcontext){
        throw Error('User inside Provider')
    }
    return authcontext
}

export default Authusecontext