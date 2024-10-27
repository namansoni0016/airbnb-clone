import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../components/UserContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { setUser } = useContext(UserContext);
    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            const userInfo = await axios.post('/login', {
                email,
                password
            });
            setUser(userInfo.data.rest);
            alert('Login successful!');
            navigate('/');
        } catch (error) {
            alert('Login failed. Please try again!');
        }
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder='your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet? <Link className='underline text-black' to="/register">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage