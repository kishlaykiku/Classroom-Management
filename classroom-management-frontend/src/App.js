import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrincipalDashboard from './pages/PrincipalDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Redirect the root path to the login page */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/PrincipalDashboard" element={<PrincipalDashboard />} />
                <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
                <Route path="/StudentDashboard" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
