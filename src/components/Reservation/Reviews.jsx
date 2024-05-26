import React, { useState, useEffect } from 'react';
import api from '../../conf/axiosConfig';

function Reviews({ spotId }) {
    const [reviews, setReviews] = useState([]);
    const [sortedReviews, setSortedReviews] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('Most Relevant');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get(`/review/${spotId}/all`);
                setReviews(response.data.data);
                setSortedReviews(response.data.data);
                console.log("Reviews:", response.data.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [spotId]);

    useEffect(() => {
        sortReviews(sortCriteria);
    }, [sortCriteria, reviews]);

    const calculateRatingPercentage = (rating) => {
        const totalReviews = reviews.length;
        if (totalReviews === 0) return 0;
        const count = reviews.filter(review => review.rating === rating).length;
        return (count / totalReviews) * 100;
    };

    const overallRating = () => {
        const totalReviews = reviews.length;
        if (totalReviews === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (totalRating / totalReviews).toFixed(1);
    };

    const sortReviews = (criteria) => {
        let sorted = [];
        switch (criteria) {
            case 'Most Relevant':
                sorted = [...reviews];
                break;
            case 'Highest Rated':
                sorted = [...reviews].sort((a, b) => b.rating - a.rating);
                break;
            case 'Lowest Rated':
                sorted = [...reviews].sort((a, b) => a.rating - b.rating);
                break;
            case 'Newest':
                sorted = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'Oldest':
                sorted = [...reviews].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            default:
                sorted = [...reviews];
                break;
        }
        setSortedReviews(sorted);
    };

    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                <div className="">
                    <h2 className="font-bold text-3xl sm:text-4xl leading-10 text-black mb-8 text-center">
                        Customer reviews & rating
                    </h2>
                    <div className="grid grid-cols-12 mb-11">
                        <div className="col-span-12 xl:col-span-4 flex items-center justify-center">
                            <div className="flex flex-col gap-y-4 w-full mx-auto">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <div className="flex items-center w-full" key={i}>
                                        <p className="font-medium text-lg text-black mr-2">{5 - i}</p>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z" fill="#FBBF24" />
                                        </svg>
                                        <div className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
                                            <span className="h-full w-[30%] rounded-[30px] bg-indigo-500 flex" style={{ width: `${calculateRatingPercentage(5 - i)}%` }}></span>
                                        </div>
                                        <p className="font-medium text-lg text-black mr-2">{reviews.filter(review => review.rating === 5 - i).length}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-12 max-xl:mt-8 xl:col-span-8 xl:pl-8 w-full min-h-[230px] flex justify-center items-center">
                            <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full">
                                <div className="sm:pr-3  border-gray-200 flex items-center justify-center flex-col">
                                    <h2 className="font-bold text-5xl text-black text-center mb-4">{overallRating()}</h2>
                                    <div className="flex items-center gap-3 mb-4">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                                <path d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z" fill="#FBBF24" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="font-normal text-lg leading-8 text-gray-400">{reviews.length} Ratings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-8 border-b border-gray-200 max-xl:max-w-3xl mx-auto">
                        <h4 className="font-semibold text-3xl leading-10 text-black mb-6">Most helpful positive review</h4>
                        {sortedReviews.length > 0 && (
                            <div>
                                <div className="flex sm:items-center flex-col sm:flex-row justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {Array.from({ length: sortedReviews[0].rating }, (_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                <path d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z" fill="#FBBF24" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <h6 className="font-semibold text-lg leading-8 text-black">@{sortedReviews[0].user.firstName} {sortedReviews[0].user.lastName}</h6>
                                        <p className="font-medium text-base leading-7 text-gray-400">{new Date(sortedReviews[0].createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <p className="font-normal text-lg leading-8 text-gray-500">
                                    {sortedReviews[0].comment}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-8 max-xl:max-w-3xl mx-auto">
                        <p className="font-normal text-lg text-black">{sortedReviews.length} reviews</p>
                        <form>
                            <div className="flex">
                                <div className="relative">
                                    <div className="absolute -left-0 px-2 top-0 py-2">
                                        <p className="font-normal text-lg leading-8 text-gray-500">Sort by:</p>
                                    </div>
                                    <select
                                        className="block w-60 h-11 pr-4 pl-20 py-2.5 text-lg leading-8 font-medium rounded-full cursor-pointer shadow-xs text-black bg-transparent placeholder-black focus:outline-gray-200"
                                        value={sortCriteria}
                                        onChange={(e) => setSortCriteria(e.target.value)}
                                    >
                                        <option value="Most Relevant">Most Relevant</option>
                                        <option value="Highest Rated">Highest Rated</option>
                                        <option value="Lowest Rated">Lowest Rated</option>
                                        <option value="Newest">Newest</option>
                                        <option value="Oldest">Oldest</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reviews;
