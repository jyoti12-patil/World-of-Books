import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

// FIX: Export the SkeletonLoader component so it can be imported in other files.
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className }) => {
  return <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>;
};

export const ProductCardSkeleton: React.FC = () => {
    return (
        <div className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
            <SkeletonLoader className="w-full aspect-[3/4]" />
            <div className="p-4 space-y-3">
                <SkeletonLoader className="h-5 w-3/4" />
                <SkeletonLoader className="h-4 w-1/2" />
                <SkeletonLoader className="h-6 w-1/3" />
            </div>
        </div>
    );
};