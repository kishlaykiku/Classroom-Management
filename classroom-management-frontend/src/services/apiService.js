import api from '../api/axios';

export const fetchProtectedData = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get('/some-protected-endpoint', {
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
