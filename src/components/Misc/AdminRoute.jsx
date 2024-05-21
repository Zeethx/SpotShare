// protect the admin routes

import React from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../conf/axiosConfig';

const AdminRoute = ({ children }) => {
    // check if user is admin
    const user = api.get('/users/admin').then((response) => {
        return response.data;
    }
    );
    if (user) {
        return children;
    }
    return <Navigate to="/" />;
}

export default AdminRoute;