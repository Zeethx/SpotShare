import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-primary-white text-primary-black bottom-0 mt-10 block">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div onClick={() => handleNavigation('/')} className="flex items-center cursor-pointer">
              <img src="/images/location.svg" className="h-8 mr-1" alt="Logo" />
              <span className="self-center text-2xl font-semibold font-freeman text-primary-color">SpotShare</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <span onClick={() => handleNavigation('/')} className="hover:underline cursor-pointer">SpotShare</span>
                </li>
                <li>
                  <a href="https://github.com/Zeethx/SpotShare" className="hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">About us</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <span onClick={() => handleNavigation('/about')} className="hover:underline cursor-pointer">About</span>
                </li>
                <li>
                  <span onClick={() => handleNavigation('/contact')} className="hover:underline cursor-pointer">Contact</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <span onClick={() => handleNavigation('/privacy-policy')} className="hover:underline cursor-pointer">Privacy Policy</span>
                </li>
                <li>
                  <span onClick={() => handleNavigation('/terms-and-conditions')} className="hover:underline cursor-pointer">Terms &amp; Conditions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">© 2024 <span onClick={() => handleNavigation('/')} className="hover:underline cursor-pointer">SpotShare™</span>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {/* Social media icons can also use handleNavigation */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
