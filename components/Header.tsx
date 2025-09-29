
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
                <path d="M4 6h16M4 12h16M4 18h16" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5S8.5 11.683 8.5 9.753s1.567-3.5 3.5-3.5z" />
               </svg>
              <span className="text-2xl font-bold text-gray-800">World of Books Explorer</span>
            </NavLink>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>About</NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
