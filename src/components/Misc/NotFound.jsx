import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function NotFound() {
    const navigate = useNavigate(); // Hook for navigation
    const handleGoHome = () => {
        navigate('/'); 
    };

    return (
        <div className="max-h-screen lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 flex justify-center items-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div>
                            <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                Looks like you've found the
                                doorway to nowhere!
                            </h1>
                            <p className="my-2 text-gray-800">Sorry about that! Please visit our homepage to get where you need to go.</p>
                            <link to ="/" />
                            <button onClick={handleGoHome} className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                                Take me there!
                            </button>
                        </div>
                    </div>
                    <div>
                        <img alt="Not Found" src="/images/404.png" />
                    </div>
                </div>
            </div>
            <div>
                <img alt="Decorative" src="/images/NotFound.png" />
            </div>
        </div>
    );
}

export default NotFound;
