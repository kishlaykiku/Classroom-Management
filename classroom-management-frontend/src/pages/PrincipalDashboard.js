import React, { useEffect, useState } from 'react';
import { fetchProtectedData } from '../services/apiService';

const PrincipalDashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchProtectedData();
                setData(data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();
    }, []);

    return (
        <div>
            <h2>Principal Dashboard</h2>
            {/* Render the fetched data here */}
        </div>
    );
};

export default PrincipalDashboard;
