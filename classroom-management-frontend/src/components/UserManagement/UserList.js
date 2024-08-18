import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../services/apiService';

const UserList = ({ onUserDeleted }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
      onUserDeleted(); // Trigger refresh in other components
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h4 className="text-xl font-semibold mb-2">Users</h4>
      <ul className="list-disc pl-5 space-y-2">
        {users.map((user) => (
          <li key={user._id} className="p-2 border rounded flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
            <button
              onClick={() => handleDelete(user._id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
