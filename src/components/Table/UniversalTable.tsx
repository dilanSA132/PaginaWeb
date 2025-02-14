import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Column {
  label: string;
  accessor?: string;
  render?: (order: any) => JSX.Element;
}

interface UniversalTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (rowData: any) => void;
  onDelete?: (rowData: any) => void;
}

const UniversalTable: React.FC<UniversalTableProps> = ({ columns, data = [], onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const filteredData = Array.isArray(data) ? data.filter((row) =>
    columns.some((column) => {
      const cellValue = column.accessor ? row[column.accessor] : '';
      return cellValue.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  ) : [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Resetear la página actual cuando se cambian los elementos por página
  };

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-xl">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="overflow-x-auto">
        <div className="rounded-lg shadow-lg bg-white">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-teal-500 to-green-500 text-white">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-wider">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b transition duration-300 ease-in-out hover:bg-gray-50"
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="py-3 px-6 text-gray-700 whitespace-normal text-sm break-words"
                      >
                        {column.render ? column.render(row) : row[column.accessor as keyof typeof row]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="py-3 px-6 text-gray-700 flex items-center space-x-2 text-black">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="text-blue-500 hover:text-blue-700 text-xs rounded-full p-2 hover:bg-blue-100"
                          >
                            <FaEdit />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="text-red-500 hover:text-red-700 text-xs rounded-full p-2 hover:bg-red-100"
                          >
                            <FaTrashAlt />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-4 text-gray-700">
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 bg-gray-100 mt-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Mostrar</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md p-2 text-gray-700"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <span className="text-gray-700">por página</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`bg-teal-500 text-white py-2 px-4 rounded-full flex items-center justify-center ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'}`}
          >
            <FaChevronLeft />
          </button>

          <span className="text-gray-700 text-xs sm:text-sm">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`bg-teal-500 text-white py-2 px-4 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'}`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversalTable;
