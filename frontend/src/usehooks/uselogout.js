
import Authusecontext from '../context/authusecontext'

const Uselogout = () => {

    const { dispatch } = Authusecontext()

    const uselogout = () =>{
        localStorage.removeItem('user')
        dispatch({type:"logout"})
    } 
    return {uselogout}
};

export default Uselogout;