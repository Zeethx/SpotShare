import React, { useState } from 'react';
import { Logo, Button, LogoutBtn } from '../';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const isUserLoggedIn = useSelector((state) => state.auth.status)

    const navigate = useNavigate();

    const buttonClass = "block py-2 px-3 font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:px-4 md:py-2 md:dark:hover:bg-gray-200  md:dark:hover:rounded-full dark:border-gray-700"

    return (
        <nav className="bg-primary-white text-primary-black fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-md px-5">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {isUserLoggedIn ? (
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <LogoutBtn />
                    <Button text="Profile" className={`${buttonClass} text-primary-color`}
                    onClick={() => navigate('/Profile')} />
                </div>
                )
                : (
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Button text="Login" className={`${buttonClass} text-primary-color`} 
                    onClick={() => navigate('/login')} />
                </div>
                )}

                <div className={`${isOpen ? 'flex' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                    <li>
                            <Link to="/find" className={buttonClass}>Find a Spot</Link>
                        </li>
                        <li>
                            {isUserLoggedIn ? (
                                <Link to="/become-a-host" className={buttonClass}> Share a Spot</Link>
                            ): (
                                <Button text="Share a Spot" className={buttonClass} 
                                onClick={() => navigate('/login')} />
                            )}

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;