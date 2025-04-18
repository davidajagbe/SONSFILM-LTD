
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/SONSFILM_ENT_LOGO-removebg-preview.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-12 w-auto" src={logo} alt="SonsFilm Logo" />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Events
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
            <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link to="/about" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
            About
          </Link>
          <Link to="/events" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
            Events
          </Link>
          <Link to="/contact" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
            Contact
          </Link>
          <Link to="/login" className="block w-full text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
