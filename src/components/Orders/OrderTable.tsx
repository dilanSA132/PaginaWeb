import React from 'react';
import { Order } from './interfaces';

interface OrderTableProps {
  orders: Order[];
  onDelete: (id: number) => void;
  openModalForOrderDetails: (order: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onDelete, openModalForOrderDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-teal-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Correo</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-300">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.name}</td>
              <td className="px-4 py-2">{order.email}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => openModalForOrderDetails(order)}
                  className="bg-teal-500 text-white py-1 px-2 rounded-full hover:bg-teal-600"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => onDelete(order.id)}
                  className="bg-red-500 text-white py-1 px-2 ml-2 rounded-full hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
