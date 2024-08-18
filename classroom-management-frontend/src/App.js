import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrincipalDashboard from './pages/PrincipalDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
