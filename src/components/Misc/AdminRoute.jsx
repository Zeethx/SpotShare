// protect the admin routes

import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../conf/axiosConfig';

const AdminRoute = ({ children }) => {
    const navigate = useNavigate();
    
    api.get('/users/me').then((response) => {
        if (response.data.data.role === 'admin') {
        return children;
        } else {
        navigate('/');
        }
    });
    
    return <>{children}</>;
    }

export default AdminRoute;