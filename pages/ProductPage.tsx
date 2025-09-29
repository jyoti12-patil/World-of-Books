import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductDetail } from '../types';
import Breadcrumb from '../components/Breadcrumb';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { SkeletonLoader } from '../components/SkeletonLoader';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data || null);
      setLoading(false);

      if (data) {
        // Viewing history
        const history = JSON.parse(localStorage.getItem('view_history') || '[]');
        const newHistory = [data, ...history.filter((p: ProductDetail) => p.id !== data.id)].slice(0, 5);
        localStorage.setItem('view_history', JSON.stringify(newHistory));
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    return <div className="text-center text-gray-500 mt-12">Product not found.</div>;
  }

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' }, 
          { label: 'Category', href: '/category/books' }, 
          { label: product.title }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-6">
        {/* Product Image */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 aspect-[3/4] rounded-xl overflow-hidden shadow-lg w-full max-w-md">
            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
          </div>
          {/* Quick info below image */}
          <div className="mt-5 text-center">
            <span className="text-gray-600 font-medium">by {product.author}</span>
          </div>
          <div className="mt-4 flex justify-center">
            <StarRating rating={product.ratings_avg} />
            <span className="ml-2 text-sm text-gray-500">({product.reviews_count} reviews)</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:sticky lg:top-24">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-2xl font-extrabold text-teal-700 mb-6">
            {new Intl.NumberFormat('en-GB', { style: 'currency', currency: product.currency }).format(product.price)}
          </p>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Specs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Specifications</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
              {Object.entries(product.specs).map(([key, value]) => (
                <React.Fragment key={key}>
                  <dt className="font-medium text-gray-600">{key}</dt>
                  <dd className="text-gray-800">{value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {product.reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            product.reviews.map(review => (
              <div key={review.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow">
                <div className="flex items-center mb-2">
                  <StarRating rating={review.rating} />
                  <span className="ml-3 font-semibold text-gray-800">{review.author}</span>
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Recommendations Section */}
      {product.recommendations.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {product.recommendations.map(rec => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const ProductPageSkeleton: React.FC = () => (
  <div>
      <SkeletonLoader className="h-6 w-1/2 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <SkeletonLoader className="aspect-[3/4] rounded-lg" />
          <div className="space-y-4">
              <SkeletonLoader className="h-10 w-full" />
              <SkeletonLoader className="h-6 w-1/3" />
              <SkeletonLoader className="h-6 w-1/2" />
              <SkeletonLoader className="h-8 w-1/4" />
              <div className="pt-4 space-y-2">
                  <SkeletonLoader className="h-5 w-1/4" />
                  <SkeletonLoader className="h-20 w-full" />
              </div>
          </div>
      </div>
  </div>
);

export default ProductPage;
