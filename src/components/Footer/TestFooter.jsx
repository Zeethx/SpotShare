import React from 'react';


function TestFooter() {
    return (
        <footer className="bg-primary-white text-primary-black bottom-0 mt-10">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 ">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <img src="/logo512.png" className="h-8 mr-3" alt=" Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap ">SpotShare</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 " >
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase ">Resources</h2>
                            <ul className=" font-medium">
                                <li className="mb-4">
                                    <a href="/" className="hover:underline">SpotShare</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold  uppercase ">Follow us</h2>
                            <ul className=" font-medium">
                                <li className="mb-4">
                                    <a href="/" className="hover:underline ">Github</a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold  uppercase ">Legal</h2>
                            <ul className=" font-medium">
                                <li className="mb-4">
                                    <a href="/" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm sm:text-center ">© 2024 <a href="/" className="hover:underline">SpotShare™</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        {/* Icons links could potentially be a separate component */}
                        {/* Each icon link could be a component if they share a lot of common logic */}
                        <a href="/" className=" hover:text-gray-900 dark:hover:text-white">
                            {/* SVG Inline can be abstracted if reused */}
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                {/* SVG path */}
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        {/* More social media icons */}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default TestFooter;
