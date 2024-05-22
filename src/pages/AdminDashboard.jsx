import React, { useEffect, useState, useCallback } from 'react';
import api from '../conf/axiosConfig';
import { ParkingTable, Pagination, SearchFilterBar, RejectModal } from '../components/Admin';

const AdminDashboard = () => {
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [filteredSpaces, setFilteredSpaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filter, setFilter] = useState('Pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedSpaceId, setSelectedSpaceId] = useState(null);

    useEffect(() => {
        // Fetch all parking spaces
        api.get('/parking-space/all').then((response) => {
            setParkingSpaces(response.data.data);
            setFilteredSpaces(response.data.data);
            console.log('Fetched parking spaces:', response.data.data);
        }).catch((error) => {
            console.error('Failed to fetch parking spaces:', error);
        });
    }, []);

    const applyFilter = useCallback(() => {
        let spaces = parkingSpaces;

        if (filter !== 'All') {
            spaces = spaces.filter(space => space.status === filter);
        }

        if (searchTerm) {
            spaces = spaces.filter(space =>
                space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                space.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredSpaces(spaces);
        setCurrentPage(1); // Reset to the first page when applying a new filter
    }, [filter, searchTerm, parkingSpaces]);

    useEffect(() => {
        applyFilter();
    }, [filter, searchTerm, parkingSpaces, applyFilter]);

    const approveListing = async (id) => {
        // Approve a parking space listing
        api.patch(`/parking-space/${id}/approve`, { status: 'Approved' }).then(() => {
            setParkingSpaces(parkingSpaces.map(space => space._id === id ? { ...space, status: 'Approved' } : space));
        }).catch((error) => {
            console.error('Failed to approve parking space:', error);
        });
    };

    const openRejectModal = (id) => {
        setSelectedSpaceId(id);
        setShowRejectModal(true);
    };

    const handleRejectSubmit = async (event) => {
        event.preventDefault();
        if (selectedSpaceId) {
            api.patch(`/parking-space/${selectedSpaceId}/reject`, { rejectionReason: rejectReason }).then(() => {
                setParkingSpaces(parkingSpaces.map(space => space._id === selectedSpaceId ? { ...space, status: 'Rejected', reason: rejectReason } : space));
                setShowRejectModal(false);
                setRejectReason('');
            }).catch((error) => {
                console.error('Failed to reject parking space:', error);
            });
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSpaces = filteredSpaces.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4 font-outfit">
            <h1 className="text-3xl font-bold text-center mb-6 border-b-1 border-black">Admin Dashboard</h1>
            <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
            />
            <ParkingTable
                currentSpaces={currentSpaces}
                approveListing={approveListing}
                openRejectModal={openRejectModal}
            />
            <div className="mt-4 flex justify-center">
                <Pagination
                    totalItems={filteredSpaces.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
            <RejectModal
                show={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                onSubmit={handleRejectSubmit}
                reason={rejectReason}
                setReason={setRejectReason}
            />
        </div>
    );
};

export default AdminDashboard;
