import React from 'react';
import { Link } from 'react-router-dom'
import Uselogout from '../usehooks/uselogout'
import Authusecontext from '../context/authusecontext';

const Navbar = () => {
    const { uselogout } = Uselogout()
    const { user } = Authusecontext()

    const logout = (e) => {
        console.log('a')
        e.preventDefault()
        uselogout()
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Svasam</h1>
                </Link>
                <div className='nav'>
                    <Link to="/">Home</Link>
                    <Link to="/addform">AddForm</Link>
                    {!user && (
                        <div style={{'padding':'8px'}}>
                            <Link to="/signup">Signup</Link>
                            <Link to="/login">Login</Link>
                        </div>
                    )}
                    {user && (
                        <div style={{'padding':'8px'}}>
                            <span>{user.email}</span>
                            {<button onClick={logout}>Logout</button>}
                        </div>
                    )}

                </div>
            </div>
        </header >
    );
};

export default Navbar;