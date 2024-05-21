import React from 'react';

const RejectModal = ({ show, onClose, onSubmit, reason, setReason }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Reject Listing</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="reason">
                            Reason for Rejection
                        </label>
                        <textarea
                            id="reason"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                        >
                            Reject
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RejectModal;
