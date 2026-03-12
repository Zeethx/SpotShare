// protect the admin routes

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../conf/axiosConfig';

const AdminRoute = ({ children }) => {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        api.get('/users/me')
            .then((response) => {
                if (response.data.data.role === 'admin') {
                    setAuthorized(true);
                } else {
                    navigate('/');
                }
            })
            .catch(() => navigate('/'))
            .finally(() => setChecking(false));
    }, [navigate]);

    if (checking) return <div>Loading...</div>;
    return authorized ? <>{children}</> : null;
};

export default AdminRoute;
