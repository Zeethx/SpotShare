// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import api from '../../conf/axiosConfig';

const AdminDashboard = () => {
    const [parkingSpaces, setParkingSpaces] = useState([]);

    useEffect(() => {
        const fetchParkingSpaces = async () => {
            const { data } = await api.get('/api/parkingSpace/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setParkingSpaces(data.data);
        };

        fetchParkingSpaces();
    }, []);

    const approveListing = async (id) => {
        await api.patch(`parkingSpace/${id}/approve`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setParkingSpaces(parkingSpaces.map(space => space._id === id ? { ...space, status: 'Approved' } : space));
    };

    const rejectListing = async (id) => {
        await api.patch(`parkingSpace/${id}/reject`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setParkingSpaces(parkingSpaces.map(space => space._id === id ? { ...space, status: 'Rejected' } : space));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parkingSpaces.map(space => (
                        <tr key={space._id}>
                            <td>{space.title}</td>
                            <td>{space.address}</td>
                            <td>{space.status}</td>
                            <td>
                                {space.status === 'In Review' && (
                                    <>
                                        <button onClick={() => approveListing(space._id)}>Approve</button>
                                        <button onClick={() => rejectListing(space._id)}>Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
