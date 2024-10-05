
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const Authcontext = createContext()

const authReducer = (state, action) => {

    switch (action.type) {
        case "signup":
            return { signuser: action.payload }
            case "login":
                return { user: action.payload }
        case "logout":
            return { user: null }
        default:
            return state
    }

}

const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        signuser: null,
        user:null
    })

    useEffect(()=>{

        const user = JSON.parse(localStorage.getItem('user'))
        // console.log(user)

        if(user){
            dispatch({type:"login",payload:user})
        }

    },[])

// console.log(state.user)
    return (<Authcontext.Provider value={{ ...state, dispatch }}>
        {children}
    </Authcontext.Provider>)

}

export default AuthProvider
