import React, { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={`w-10 h-10 ${index <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-full h-full"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.23 6.842a1 1 0 00.95.69h7.113c.969 0 1.371 1.24.588 1.81l-5.755 4.168a1 1 0 00-.363 1.118l2.23 6.842c.3.921-.755 1.688-1.54 1.118l-5.755-4.168a1 1 0 00-1.175 0l-5.755 4.168c-.784.57-1.838-.197-1.54-1.118l2.23-6.842a1 1 0 00-.363-1.118L2.879 11.27c-.783-.57-.381-1.81.588-1.81h7.113a1 1 0 00.95-.69l2.23-6.842z"
                            />
                        </svg>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
