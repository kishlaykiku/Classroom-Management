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

            if (response && response.data) {
                const { role, access_token } = response.data;

                // Store the token and role in localStorage
                localStorage.setItem('token', access_token);
                localStorage.setItem('role', role);

                // Redirect based on role
                if (role === 'Principal') {
                    navigate('/PrincipalDashboard');
                } else if (role === 'Teacher') {
                    navigate('/TeacherDashboard');
                } else if (role === 'Student') {
                    navigate('/StudentDashboard');
                }
            } else {
                alert('Unexpected response format.');
            }
        } catch (error) {
            console.error('Login failed:', error);

            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);

                alert('Login failed: ' + error.response.data.message || 'An error occurred.');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request data:', error.request);
                alert('Login failed: No response from server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                alert('Login failed: ' + error.message);
            }
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
                <div className="mt-4 text-center">
                    <a href="/signup" className="text-blue-500">Create Account</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
