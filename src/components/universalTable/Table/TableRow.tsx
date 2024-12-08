import React from 'react';

interface TableRowProps {
  item: { id: number; name: string };
  onDelete: (id: number) => void;

}

const TableRow: React.FC<TableRowProps> = ({ item, onDelete }) => {
  return (
    <tr>
 
      <td className="border border-gray-300">{item.id}</td>
      <td className="border border-gray-300">{item.name}</td>
      <td className="border border-gray-300">
        <button className="bg-red-500 text-white px-2 py-1" onClick={() => onDelete(item.id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default TableRow;
