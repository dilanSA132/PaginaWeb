import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onNext, onPrevious }) => {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors"
        aria-disabled={currentPage <= 1}
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors"
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
