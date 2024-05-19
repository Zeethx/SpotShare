import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    
  return (
    <footer className="bg-primary-white text-primary-black bottom-0 mt-10 block">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 ">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img src="/images/location.svg" className="h-8 mr-1" alt=" Logo" />
                            <span className="self-center text-2xl font-semibold font-freeman text-primary-color">SpotShare</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 " >
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase ">Resources</h2>
                            <ul className=" font-medium">
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">SpotShare</Link>
                                </li>
                                <li>
                                    <Link to="_https://github.com/Zeethx/SpotShare" className="hover:underline">Github</Link>
                                </li>
                            </ul>
                        </div>
                         <div>
                            <h2 className="mb-6 text-sm font-semibold  uppercase ">About us</h2>
                            <ul className=" font-medium">
                                <li className="mb-4">
                                    <Link to="/about" className="hover:underline ">About</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="hover:underline">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold  uppercase ">Legal</h2>
                            <ul className=" font-medium">
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:underline">Terms &amp; Conditions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm sm:text-center ">© 2024 <Link to="/" className="hover:underline">SpotShare™</Link>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        {/* Icons links could potentially be a separate component */}
                        {/* Each icon link could be a component if they share a lot of common logic */}
                        <Link to="/" className=" hover:text-gray-900 dark:hover:text-white">
                            {/* SVG Inline can be abstracted if reused */}
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                {/* SVG path */}
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </Link>
                        {/* More social media icons */}
                    </div>
                </div>
            </div>
        </footer>
  )
}

export default Footer