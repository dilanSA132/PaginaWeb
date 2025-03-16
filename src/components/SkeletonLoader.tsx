import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="h-6 w-4/5 bg-gray-300 animate-pulse rounded-md"></div>
      <div className="h-4 w-full bg-gray-300 animate-pulse rounded-md"></div>
      <div className="h-4 w-full bg-gray-300 animate-pulse rounded-md"></div>
      <div className="h-12 w-1/3 bg-gray-300 animate-pulse rounded-md"></div>
    </div>
  );
};

export default SkeletonLoader;
