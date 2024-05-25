import React, {useState} from 'react';
import api from '../../conf/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';

function Review() {
    const { parkingId, reservationId } = useParams();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/reviews/${parkingId}/${reservationId}`, { rating, comment});
            setSuccess(response.data.message);
            navigate(`/profile`)
        } catch (error) {
            setError("Failed to submit review");
            console.error("Error submitting review:", error);
        }
    
    }

  return (
<div className="max-w-4xl mx-auto p-6 mt-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center">
                    <ReactStars
                        count={5}
                        onChange={(newRating) => setRating(newRating)}
                        size={50}
                        half={false}
                        value={rating}
                        color2={'#ffd700'}
                    />
                </div>
                <div className="flex flex-col">
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
                <button type="submit" className="w-full py-2 px-4 bg-primary-color text-white font-bold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!comment || !rating}>Submit Review</button>
                {error && <p className="mt-4 text-red-600">{error}</p>}
                {success && <p className="mt-4 text-green-600">{success}</p>}
            </form>
        </div>
  )
}

export default Review