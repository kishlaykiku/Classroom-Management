import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import ClassroomList from '../components/ClassroomManagement/ClassroomList';
import CreateClassroom from '../components/ClassroomManagement/CreateClassroom';
import UserList from '../components/UserManagement/UserList';
import CreateUser from '../components/UserManagement/CreateUser';
import ManageTimetable from '../components/TimetableManagement/ManageTimetable';

const PrincipalDashboard = () => {
  const [refreshClassrooms, setRefreshClassrooms] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [refreshTeachers, setRefreshTeachers] = useState(false);
  const [refreshTimetables, setRefreshTimetables] = useState(false);
  
  const navigate = useNavigate(); // Hook for navigation

  const handleClassroomChange = () => {
    setRefreshClassrooms(!refreshClassrooms);
    setRefreshTimetables(!refreshTimetables);
  };

  const handleUserChange = () => {
    setRefreshUsers(!refreshUsers);
    setRefreshTeachers(!refreshTeachers);
    setRefreshClassrooms(!refreshClassrooms);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    localStorage.removeItem('role');  // Clear the role
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Principal Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Classroom Management</h3>
          <CreateClassroom
            onClassroomCreated={handleClassroomChange}
            refreshTeachers={refreshTeachers}
          />
          <ClassroomList 
            key={refreshClassrooms} 
            onClassroomDeleted={handleClassroomChange} 
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">User Management</h3>
          <CreateUser 
            onUserCreated={handleUserChange} 
          />
          <UserList 
            key={refreshUsers} 
            onUserDeleted={handleUserChange} 
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Timetable Management</h3>
          <ManageTimetable 
            key={refreshTimetables} 
            refreshClassrooms={refreshClassrooms} 
          />
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
