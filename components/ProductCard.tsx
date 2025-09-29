
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image_url}
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-teal-600" title={product.title}>
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.author}</p>
        <p className="mt-2 text-lg font-bold text-gray-900">
          {new Intl.NumberFormat('en-GB', { style: 'currency', currency: product.currency }).format(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
