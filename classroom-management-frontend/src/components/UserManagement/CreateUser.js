import React, { useState } from 'react';
import { createUser } from '../../services/apiService';

const CreateUser = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Teacher');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreate = async () => {
    // Check if all fields are filled
    if (!name || !email || !password || !role) {
      setErrorMessage('Please fill in all fields before creating a user.');
      return;
    }

    try {
      await createUser({ name, email, password, role });
      onUserCreated(); // Callback to refresh the user list
      setName(''); // Clear the input fields after creation
      setEmail('');
      setPassword('');
      setRole('Teacher');
      setErrorMessage(''); // Clear error message on successful creation
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('An error occurred while creating the user.');
    }
  };

  return (
    <div className="mb-4">
    <h4 className="text-xl font-semibold mb-2">Create User</h4>
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      >
        <option value="Teacher">Teacher</option>
        <option value="Student">Student</option>
      </select>
      <button
        onClick={handleCreate}
        className="bg-green-500 text-white p-2 rounded w-full"
      >
        Create User
      </button>
    </div>
  );
};

export default CreateUser;
