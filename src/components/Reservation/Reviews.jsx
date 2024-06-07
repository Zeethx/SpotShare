import React, { useState, useEffect } from 'react';
import api from '../../conf/axiosConfig';

function Reviews({ spotId }) {
    const [reviews, setReviews] = useState([]);
    const [sortedReviews, setSortedReviews] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('Most Relevant');
    const [showReviews, setShowReviews] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get(`/review/${spotId}/all`);
                setReviews(response.data.data);
                setSortedReviews(response.data.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [spotId]);

    const overallRating = () => {
        const totalReviews = reviews.length;
        if (totalReviews === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (totalRating / totalReviews).toFixed(1);
    };

    const renderStars = (rating, size = 36) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <>
                {Array.from({ length: fullStars }, (_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 36 36" fill="none">
                        <path d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z" fill="#FBBF24" />
                    </svg>
                ))}
                {halfStar && (
                    <svg key="half" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 36 36" fill="none">
                        <path d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z" fill="url(#halfGradient)" />
                        <defs>
                            <linearGradient id="halfGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="50%" stopColor="#FBBF24" />
                                <stop offset="50%" stopColor="#E5E7EB" />
                            </linearGradient>
                        </defs>
                    </svg>
                )}
                {Array.from({ length: emptyStars }, (_, i) => (
                    <svg key={i + 'empty'} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 36 36" fill="none">
                        <path d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z" fill="#E5E7EB" />
                    </svg>
                ))}
            </>
        );
    };

    return (
        <section className="py-8 relative">
            <div className="w-full max-w-7xl md:px-5 mx-auto">
                <div className="">
                    <h2 className="font-bold text-4xl sm:text-3xl leading-10 text-black mb-4 text-center">
                        Customer reviews & rating
                    </h2>
                    <div className="grid grid-cols-10">
                        <div className="col-span-10 flex items-center justify-center ">
                            <div className="flex flex-col items-center">
                                <h2 className="font-bold text-5xl text-black text-center mb-4">{overallRating()}</h2>
                                <div className="flex items-center gap-1">
                                    {renderStars(overallRating(), 36)} {/* Average rating stars size */}
                                </div>
                                <p className="font-normal text-lg leading-8 text-gray-400">{reviews.length} Ratings</p>
                            </div>
                        </div>
                    </div>

                    <div className={`mx-auto bg-white rounded-lg w-full max-w-5xl px-7 py-5 ${showReviews ? 'shadow-2xl' : ''}`}>
                        <div className="flex justify-center">
                            <button
                                className="mt-4 text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full px-4 py-2 focus:outline-none transition duration-300 ease-in-out"
                                onClick={() => setShowReviews(!showReviews)}
                            >
                                {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                            </button>
                        </div>
                        {showReviews && (
                            <div className="mt-4 max-h-96 overflow-y-auto">
                                {sortedReviews.length > 0 ? (
                                    sortedReviews.map((review, index) => (
                                        <div key={index} className="pb-8 border-b border-gray-200">
                                            <div className="flex sm:items-center flex-col sm:flex-row justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={review.user.profilePhoto} alt={review.user.fullName} className="w-10 h-10 rounded-full" />
                                                    <h6 className="font-semibold text-lg leading-8 text-black">@{review.user.fullName}</h6>
                                                    <p className="font-medium text-base leading-7 text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {renderStars(review.rating, 25)} {/* Individual review stars size */}
                                                </div>
                                            </div>
                                            <p className="font-normal text-lg leading-8 text-gray-500">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="font-normal text-lg leading-8 text-gray-500">No reviews available.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reviews;
