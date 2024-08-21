import React, { useState } from 'react';
import api from '../../conf/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

function Review() {
    const { parkingId, reservationId } = useParams();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // for tracking the hover rating
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/review/${parkingId}/${reservationId}/create`, {
                rating,
                comment,
            });
            if (response.status === 201) {
                setSuccess('Review submitted successfully');
                setTimeout(() => {
                    navigate(`/profile`);
                }, 2000);
            }
        } catch (error) {
            setError('Failed to submit review');
            console.error('Error submitting review:', error);
        }
    };

    const renderStar = (starValue) => {
        const isFilled = starValue <= (hoverRating || rating);
        return (
            <svg
                key={starValue}
                xmlns="http://www.w3.org/2000/svg"
                width={36}
                height={36}
                viewBox="0 0 36 36"
                fill="none"
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(starValue)}
                className="cursor-pointer"
            >
                <path
                    d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                    fill={isFilled ? "#FBBF24" : "#E5E7EB"}
                />
            </svg>
        );
    };

    return (
        <div>
            <h2 className="text-4xl font-bold mb-4 mt-12 text-gray-800 text-center font-freeman">Write a Review</h2>
            <div className="max-w-[70vw] mx-auto p-6 bg-white rounded-lg shadow-md font-outfit">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='flex flex-row justify-center items-center'>
                        {/* Render stars in a horizontal row */}
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => renderStar(i + 1))}
                        </div>
                    </div>

                    <div className="flex flex-col mt-6">
                        <label htmlFor="comment" className="mb-2 text-lg font-medium text-gray-700">Comment:</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Write your review here...'
                            rows="5"
                            required
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-primary-color text-white font-bold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!comment || !rating}
                    >
                        Submit Review
                    </button>
                    {error && <p className="mt-4 text-red-600">{error}</p>}
                    {success && <p className="mt-4 text-green-600">{success}</p>}
                </form>
            </div>
        </div>
    );
}

export default Review;
