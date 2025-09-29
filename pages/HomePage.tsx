import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHeadings } from '../services/api';
import { NavigationHeading } from '../types';
import { SkeletonLoader } from '../components/SkeletonLoader';

// Import icon components from react-icons
import { FaBook, FaHeart, FaFlask, FaUser, FaChild } from 'react-icons/fa';
import { GiWizardStaff, GiAncientColumns, GiKnifeThrust } from 'react-icons/gi';
import { BiSearchAlt } from 'react-icons/bi';
import { MdAutoStories } from 'react-icons/md';

// Map category slug to icon component
const categoryIcons: { [key: string]: JSX.Element } = {
  fantasy:     <GiWizardStaff className="text-teal-600 text-3xl mb-3" />,
  science:     <FaFlask className="text-blue-600 text-3xl mb-3" />,
  romance:     <FaHeart className="text-pink-500 text-3xl mb-3" />,
  history:     <GiAncientColumns className="text-yellow-700 text-3xl mb-3" />,
  mystery:     <BiSearchAlt className="text-gray-700 text-3xl mb-3" />,
  children:    <FaChild className="text-purple-400 text-3xl mb-3" />,
  horror:      <GiKnifeThrust className="text-red-600 text-3xl mb-3" />,
  comics:      <MdAutoStories className="text-orange-500 text-3xl mb-3" />,
  biography:   <FaUser className="text-green-600 text-3xl mb-3" />,
  default:     <FaBook className="text-indigo-500 text-3xl mb-3" />,
};

const HomePage: React.FC = () => {
  const [headings, setHeadings] = useState<NavigationHeading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadings = async () => {
      setLoading(true);
      const data = await getHeadings();
      setHeadings(data);
      setLoading(false);
    };
    fetchHeadings();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-50 to-blue-100 py-12 mb-12 rounded-xl overflow-hidden shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Explore a World of Books
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl">
            Navigate through our vast collection of genres and categories to find your next great read.
          </p>
          <Link
            to="/popular"
            className="inline-block mt-6 px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg shadow-sm hover:bg-teal-600 transition"
          >
            Browse Popular Categories
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-4 lg:px-0">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} className="h-40 rounded-xl" />
            ))
          : headings.map((heading) => (
              <Link
                key={heading.id}
                to={`/category/${heading.slug}`}
                className="group flex flex-col items-center p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-teal-400 transition-all duration-300 transform hover:-translate-y-1 relative"
              >
                {/* Icon based on category slug */}
                {categoryIcons[heading.slug] || categoryIcons.default}

                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-teal-600 mb-2">
                  {heading.title}
                </h2>

                {/* Optional: Short description for the category */}
                {heading.description && (
                  <p className="text-sm text-gray-500 text-center">
                    {heading.description}
                  </p>
                )}
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HomePage;
