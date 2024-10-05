import React from 'react';
import { useState } from 'react';
import Usesignup from '../usehooks/usesignup';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isloading} = Usesignup()

    const signUp = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={signUp}>
            <label>Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} 
             value={email}/>
            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
            value={password} />
            <button disabled={isloading} type='submit'>Signup</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default Signup;