import React from 'react';

const SearchFilterBar = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
    return (
        <div className="mb-4 flex justify-between items-center">
            <input
                type="text"
                placeholder="Search listings..."
                className="border border-gray-300 rounded px-3 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
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
    );
};

export default SearchFilterBar;
