import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="flex space-x-2">
            {pageNumbers.map(number => (
                <li key={number} className="cursor-pointer px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => paginate(number)}>
                    {number}
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
