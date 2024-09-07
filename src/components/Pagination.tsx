import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onNext, onPrevious }) => (
  <div className="flex justify-center mt-8 space-x-4">
    <button
      onClick={onPrevious}
      disabled={currentPage <= 1}
      className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors"
      aria-label="Página anterior"
      aria-disabled={currentPage <= 1}
    >
      Anterior
    </button>
    <span className="text-white">{currentPage} / {totalPages}</span>
    <button
      onClick={onNext}
      disabled={currentPage >= totalPages}
      className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors"
      aria-label="Página siguiente"
      aria-disabled={currentPage >= totalPages}
    >
      Siguiente
    </button>
  </div>
);

export default Pagination;
