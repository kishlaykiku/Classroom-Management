import api from '../api/axios';

export const fetchProtectedData = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get('/PrincipalDashboard', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching protected data:', error);
        throw error;
    }
};

export const fetchClassrooms = async () => {
    const response = await api.get('/classrooms');
    return response.data;
};
  
export const createClassroom = async (classroom) => {
    const response = await api.post('/classrooms', classroom);
    return response.data;
};

export const fetchUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const createUser = async (user) => {
    const response = await api.post('/auth/signup', user);
    return response.data;
};

export const fetchTimetables = async () => {
    const response = await api.get('/timetables');
    return response.data;
};

export const createTimetable = async (timetable) => {
    const response = await api.post('/timetables', timetable);
    return response.data;
};

export const deleteClassroom = (id) => api.delete(`/classrooms/${id}`);
export const deleteTimetable = (id) => api.delete(`/timetables/${id}`);
export const deleteUser = (id) => api.delete(`/users/${id}`);