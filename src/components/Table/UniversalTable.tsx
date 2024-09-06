import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Column {
  label: string;
  accessor: string;
}

interface UniversalTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (rowData: any) => void;
  onDelete?: (rowData: any) => void;
}

const UniversalTable: React.FC<UniversalTableProps> = ({ columns, data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const itemsPerPage = 15; // Número de elementos por página

  // Calcular los índices para paginar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage); // Total de páginas

  // Función para avanzar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Función para retroceder a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="overflow-x-auto ">
      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-teal-500 to-green-500 text-white">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className="border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="py-3 px-6 text-gray-700 whitespace-nowrap"
                  >
                    {row[column.accessor]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="py-3 px-6 text-gray-700 flex items-center space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Controles de paginación */}
        <div className="flex justify-between items-center p-4 bg-gray-100  ">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`bg-teal-500 text-white py-2 px-4 rounded-full flex items-center justify-center ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'}`}
          >
            <FaChevronLeft />
          </button>

          <span className="text-gray-700">
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
