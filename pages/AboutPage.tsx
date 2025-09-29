
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About This Project</h1>
      <div className="prose prose-lg text-gray-700">
        <p>
          The <strong>World of Books Explorer</strong> is a frontend application built to demonstrate a production-minded product exploration platform. It allows users to navigate from high-level headings to categories, view product grids, and dive into detailed product pages.
        </p>
        <p>
          This application is built with modern web technologies, focusing on a great user experience, responsiveness, and clean design.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Core Technologies</h2>
        <ul>
          <li><strong>React:</strong> A JavaScript library for building user interfaces.</li>
          <li><strong>TypeScript:</strong> For static type-checking to reduce bugs in production.</li>
          <li><strong>Tailwind CSS:</strong> A utility-first CSS framework for rapid UI development.</li>
          <li><strong>React Router:</strong> For declarative routing in the single-page application.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Features</h2>
        <ul>
          <li><strong>Dynamic Routing:</strong> Seamless navigation between home, category, and product detail pages.</li>
          <li><strong>Component-Based Architecture:</strong> Reusable components for UI consistency and maintainability.</li>
          <li><strong>Mock API Layer:</strong> Simulates fetching data from a backend service, allowing the frontend to be developed independently.</li>
          <li><strong>Loading States:</strong> Skeleton loaders provide a better user experience during data fetching.</li>
          <li><strong>Responsive Design:</strong> The layout adapts to various screen sizes, from mobile to desktop.</li>
        </ul>
        <p className="mt-6">
          While the backend and live data scraping from World of Books are part of the full-stack goal, this implementation focuses exclusively on the frontend, using a mock API to simulate the data flow.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
