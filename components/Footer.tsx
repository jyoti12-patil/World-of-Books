
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} World of Books Explorer. All rights reserved.</p>
        <p className="text-sm mt-1">This is a concept project and is not affiliated with World of Books.</p>
      </div>
    </footer>
  );
};

export default Footer;
