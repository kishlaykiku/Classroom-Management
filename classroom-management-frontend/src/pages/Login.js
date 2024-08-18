import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            const { role, access_token } = response.data;

            // Store the token and role in localStorage
            localStorage.setItem('token', access_token);
            localStorage.setItem('role', role);

            // Redirect based on role
            if (role === 'Principal') {
                navigate('/principal/dashboard');
            } else if (role === 'Teacher') {
                navigate('/teacher/dashboard');
            } else if (role === 'Student') {
                navigate('/student/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: ' + error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border w-full p-2 mb-4"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border w-full p-2 mb-4"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
