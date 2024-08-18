import React, { useState } from 'react';
import api from '../api/axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [role, setRole] = useState('Teacher');

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== retypePassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await api.post('/auth/signup', { name, email, password, role });

            if (response && response.data) {
                alert('User created successfully');
            } else {
                alert('Unexpected response format');
            }

        } catch (error) {
            console.error('Signup failed:', error);

            if (error.response && error.response.data) {
                alert('Signup failed: ' + error.response.data.message);
            } else {
                alert('Signup failed: An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border w-full p-2 mb-4"
                    required
                />
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
                <input
                    type="password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    placeholder="Retype Password"
                    className="border w-full p-2 mb-4"
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="border w-full p-2 mb-4">
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
