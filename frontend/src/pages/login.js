import React from 'react';
import { useState } from 'react';
import Authusecontext from '../context/authusecontext'
import Uselogin from '../usehooks/uselogin';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isloading} = Uselogin()


    const login = async(e) => {
        e.preventDefault()
       await signup(email,password)
      
    }
    return (
        <form onSubmit={login} className="login">
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} 
            />
            <label>Password:</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit' disabled={isloading}>Login</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default Login;