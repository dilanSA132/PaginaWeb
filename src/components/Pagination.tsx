import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdArrowForward, MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onNext,
  onPrevious,
  onPageChange,
  onItemsPerPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Cambia el valor según tus necesidades
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const blockSize = isMobile ? 2 : 6;
  const totalBlocks = Math.ceil(totalPages / blockSize);
  const currentBlock = Math.floor((currentPage - 1) / blockSize);

  const pageNumbers = Array.from(
    { length: blockSize },
    (_, index) => currentBlock * blockSize + index + 1
  ).filter(page => page <= totalPages);

  const handleBlockChange = (direction: 'next' | 'previous') => {
    if (direction === 'next' && currentBlock < totalBlocks - 1) {
      onPageChange((currentBlock + 1) * blockSize + 1);
    } else if (direction === 'previous' && currentBlock > 0) {
      onPageChange(currentBlock * blockSize);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-8 items-center flex-wrap space-x-2">
        {/* Botón de página anterior */}
        <button
          onClick={onPrevious}
          disabled={currentPage <= 1}
          className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed"
          aria-label="Página anterior"
          aria-disabled={currentPage <= 1}
        >
          <MdArrowBack />
        </button>

        {/* Botón de bloque anterior */}
        <button
          onClick={() => handleBlockChange('previous')}
          disabled={currentBlock === 0}
          className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed"
          aria-label="Bloque anterior"
        >
          <MdChevronLeft />
        </button>

        {/* Números de página */}
        <div className="flex space-x-2">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-full ${
                currentPage === page
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-teal-500 hover:bg-teal-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Botón de bloque siguiente */}
        <button
          onClick={() => handleBlockChange('next')}
          disabled={currentBlock === totalBlocks - 1}
          className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed"
          aria-label="Bloque siguiente"
        >
          <MdChevronRight />
        </button>

        {/* Botón de página siguiente */}
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages}
          className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed"
          aria-label="Página siguiente"
          aria-disabled={currentPage >= totalPages}
        >
          <MdArrowForward />
        </button>
      </div>

      {/* Selector de cantidad de items por página centrado en la parte inferior */}
      <div className="mt-4 sm:mt-0 sm:ml-4 flex justify-center">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 text-black mt-5"
        >
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={24}>24</option>
          <option value={32}>32</option>
          <option value={40}>40</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
