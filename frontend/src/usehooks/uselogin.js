

import { useState } from 'react';
import Authusecontext from '../context/authusecontext'
import axios from 'axios';

const Uselogin = () => {
    const [error, setError] = useState()
    const [isloading, isSetloading] = useState()
    const { dispatch } = Authusecontext()

    const signup = async (email, password) => {
        const data = {email,password}
        // console.log(data)
        try {
            const response = await axios.post('users/login', data)
            if (response) {
                console.log(JSON.stringify(response.data))
                localStorage.setItem('user', JSON.stringify(response.data))
                dispatch({ type: "login", payload: response.data })
                isSetloading(false)
            }
        }
        catch (error) {
            if (error.response) {
                isSetloading(false)
                setError(error.response.data.error)
            }
        }

    }

    return { signup, isloading, error }
};

export default Uselogin;