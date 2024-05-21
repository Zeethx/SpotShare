import React, { useEffect, useState, useCallback } from 'react';
import api from '../../conf/axiosConfig';

const AdminDashboard = () => {
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [filteredSpaces, setFilteredSpaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        // Fetch all parking spaces
        api.get('/parking-space/all').then((response) => {
            setParkingSpaces(response.data.data);
            setFilteredSpaces(response.data.data);
        }).catch((error) => {
            console.error('Failed to fetch parking spaces:', error);
        });
    }, []);

    const applyFilter = useCallback(() => {
        if (filter === 'All') {
            setFilteredSpaces(parkingSpaces);
        } else {
            setFilteredSpaces(parkingSpaces.filter(space => space.status === filter));
        }
        setCurrentPage(1); // Reset to the first page when applying a new filter
    }, [filter, parkingSpaces]);

    useEffect(() => {
        applyFilter();
    }, [filter, parkingSpaces, applyFilter]);

    const approveListing = async (id) => {
        // Approve a parking space listing
        api.patch(`/parking-space/${id}/approve`, { status: 'Approved' }).then(() => {
            setParkingSpaces(parkingSpaces.map(space => space._id === id ? { ...space, status: 'Approved' } : space));
        }).catch((error) => {
            console.error('Failed to approve parking space:', error);
        });
    };

    const rejectListing = async (id) => {
        // Reject a parking space listing
        api.patch(`/parking-space/${id}/reject`, { status: 'Rejected' }).then(() => {
            setParkingSpaces(parkingSpaces.map(space => space._id === id ? { ...space, status: 'Rejected' } : space));
        }).catch((error) => {
            console.error('Failed to reject parking space:', error);
        });
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSpaces = filteredSpaces.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>
            <div className="mb-4 flex justify-end">
                <select
                    className="border border-gray-300 rounded px-3 py-2"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 border-b border-gray-300 text-left">Title</th>
                            <th className="py-3 px-6 border-b border-gray-300 text-left">Address</th>
                            <th className="py-3 px-6 border-b border-gray-300 text-left">Status</th>
                            <th className="py-3 px-6 border-b border-gray-300 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSpaces.map(space => (
                            <tr key={space._id} className="hover:bg-gray-100">
                                <td className="py-4 px-6 border-b border-gray-300">{space.title}</td>
                                <td className="py-4 px-6 border-b border-gray-300">{space.address}</td>
                                <td className={`py-4 px-6 border-b border-gray-300 ${space.status.toLowerCase()}`}>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                        space.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                        space.status === 'Approved' ? 'bg-green-200 text-green-800' :
                                        'bg-red-200 text-red-800'
                                    }`}>
                                        {space.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 border-b border-gray-300">
                                    {space.status === 'Pending' && (
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                onClick={() => approveListing(space._id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                onClick={() => rejectListing(space._id)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                {filteredSpaces.length > itemsPerPage && (
                    <ul className="flex space-x-2">
                        {Array.from({ length: Math.ceil(filteredSpaces.length / itemsPerPage) }, (_, index) => (
                            <li key={index} className="cursor-pointer px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
