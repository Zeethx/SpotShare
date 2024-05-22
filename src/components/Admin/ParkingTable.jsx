import React from 'react';

const ParkingTable = ({ currentSpaces, approveListing, openRejectModal }) => {
    return (
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
                                }`} title={space.rejectionReason}>
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
                                            onClick={() => openRejectModal(space._id)}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                                {space.status === 'Approved' && (
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => openRejectModal(space._id)}
                                    >
                                        Reject
                                    </button>
                                )}
                                {space.status === 'Rejected' && (
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        onClick={() => approveListing(space._id)}
                                    >
                                        Approve
                                    </button>
                                )
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParkingTable;
