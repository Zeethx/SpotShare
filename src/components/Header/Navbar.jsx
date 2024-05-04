import React, { useState } from 'react';
import { Logo, Button, LogoutBtn } from '../';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const isUserLoggedIn = useSelector((state) => state.auth.status)

    const navigate = useNavigate();



    return (
        <nav className="bg-primary-white text-primary-black  fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                {isUserLoggedIn ? (
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <LogoutBtn />
                </div>
                )
                : (
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Button text="Login" className='font-bold rounded-lg text-sm px-4 py-2 text-center  dark:hover:text-primary-color' 
                    onClick={() => navigate('/login')} />
                </div>
                )}

                <div className={`${isOpen ? 'flex' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                        <li>
                            <a href="/" className="block py-2 px-3 rounded 
                            hover:bg-gray-100 md:hover:bg-transparent 
                            md:hover:text-primary-color md:p-0 
                            md:dark:hover:text-primary-color md:dark:hover:bg-transparent 
                            dark:border-gray-700">Find a Spot</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 rounded 
                            hover:bg-gray-100 md:hover:bg-transparent 
                            md:hover:text-primary-color md:p-0 
                            md:dark:hover:text-primary-color md:dark:hover:bg-transparent 
                            dark:border-gray-700">Share a Spot</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
