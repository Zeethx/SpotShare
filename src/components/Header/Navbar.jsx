import React from 'react';
import { Logo, Button } from '../';
import ProfileButton from './ProfileButton';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const isUserLoggedIn = useSelector((state) => state.auth.status);

    const navigate = useNavigate();

    const buttonClass = "block py-2 px-3 font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:px-4 md:py-2 md:dark:hover:bg-gray-200 md:dark:hover:rounded-full dark:border-gray-700";

    return (
        <nav className="bg-primary-white text-primary-black fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-md px-5 h-18">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                <div className="flex md:order-2 space-x-1 sm:space-x-2 md:space-x-3 rtl:space-x-reverse">
                    {isUserLoggedIn ? (
                        <ProfileButton isUserLoggedIn={isUserLoggedIn} />
                    ) : (
                        <Button text="Login" className={`${buttonClass} text-primary-color`} onClick={() => navigate('/login')} />
                    )}
                </div>
                <div className="hidden md:flex items-center justify-between w-full md:w-auto md:order-1">
                    <ul className="flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 md:flex">
                        <li className="hidden md:block">
                            <Link to="/find" className={buttonClass}>Find a Spot</Link>
                        </li>
                        <li className="hidden md:block">
                            {isUserLoggedIn ? (
                                <Link to="/become-a-host" className={buttonClass}>Share a Spot</Link>
                            ) : (
                                <Button text="Share a Spot" className={buttonClass} onClick={() => navigate('/login')} />
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
