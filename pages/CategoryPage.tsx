import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug, getProducts } from '../services/api';
import { Category, Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import Breadcrumb from '../components/Breadcrumb';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);

      const [categoryData, productsData] = await Promise.all([
        getCategoryBySlug(slug),
        getProducts(slug, page, PRODUCTS_PER_PAGE)
      ]);

      setCategory(categoryData || null);
      setProducts(productsData.products);
      setTotal(productsData.total);

      setLoading(false);
    };

    fetchData();
  }, [slug, page]);

  if (!category && !loading) {
    return <div className="text-center text-gray-500 mt-12">Category not found.</div>;
  }

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: category?.title || '...' }]} />

      {/* Hero Section for the Category Title */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-100 p-8 rounded-xl mb-10 shadow-md flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{category?.title}</h1>
        <p className="text-gray-700 text-base md:text-lg">
          {category?.product_count} products{category?.description && ` • ${category.description}`}
        </p>
      </div>

      {/* Subcategories */}
      {category && category.subcategories.length > 0 && (
        <div className="mb-10 p-5 bg-gray-100 rounded-lg shadow flex flex-col items-start">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Subcategories</h2>
          <div className="flex flex-wrap gap-3">
            {category.subcategories.map(sub => (
              <Link
                key={sub.id}
                to={`/category/${sub.slug}`}
                className="px-4 py-1.5 bg-white border border-teal-200 rounded-full text-sm text-gray-800 font-medium shadow-sm hover:bg-teal-50 hover:border-teal-400 transition"
              >
                {sub.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {loading ? (
          Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : products.length ? (
          products.map(product => (
            <div className="transition-transform hover:-translate-y-1" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center text-gray-500 py-16">
            <span className="text-5xl mb-3">📦</span>
            <span className="text-lg">No products found in this category.</span>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map(idx => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border ${
                page === idx + 1
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              } transition`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
