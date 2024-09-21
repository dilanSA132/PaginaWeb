import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getOrders, createOrder,deleteOrder, updateOrder } from '@/services/orderService';

interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<Order>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    createdAt: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (err: any) {
        setError('Error al cargar las órdenes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openModalForNewOrder = () => {
    setIsEditing(false);
    setNewOrder({
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      createdAt: '',
    });
    setModalIsOpen(true);
  };

  const openModalForEditOrder = (order: Order) => {
    setIsEditing(true);
    setNewOrder({ ...order });
    setModalIsOpen(true);
  };

  const handleSaveOrder = async () => {
    if (isEditing) {
      try {
        const updatedOrder = await updateOrder(newOrder.id, {
          name: newOrder.name,
          email: newOrder.email,
          phone: newOrder.phone,
          address: newOrder.address,
        });
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
        );
        setModalIsOpen(false);
        setNewOrder({
          id: 0,
          name: '',
          email: '',
          phone: '',
          address: '',
          createdAt: '',
        });
      } catch (err: any) {
        setError('Error al actualizar la orden');
      }
    } else {
      try {
        const createdOrder = await createOrder({
          name: newOrder.name,
          email: newOrder.email,
          phone: newOrder.phone,
          address: newOrder.address,
        });
        setOrders((prevOrders) => [...prevOrders, createdOrder]);
        setModalIsOpen(false);
        setNewOrder({
          id: 0,
          name: '',
          email: '',
          phone: '',
          address: '',
          createdAt: '',
        });
      } catch (err: any) {
        setError('Error al crear la orden');
      }
    }
  };

  const handleDelete = async (order: Order) => {
    try {
      await deleteOrder(order.id);
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
    } catch (err: any) {
      setError('Error al eliminar la orden');
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Correo Electrónico', accessor: 'email' },
    { label: 'Teléfono', accessor: 'phone' },
    { label: 'Dirección', accessor: 'address' },
    { label: 'Fecha de Creación', accessor: 'createdAt' },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Mantenimiento de Órdenes</h1>

      <button
        onClick={openModalForNewOrder}
        className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-600"
      >
        Nueva Orden
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {!loading ? (
        <UniversalTable
          columns={columns}
          data={orders}
          onEdit={openModalForEditOrder}
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-center text-gray-600">Cargando órdenes...</p>
      )}

      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Orden' : 'Crear Nueva Orden'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={newOrder.name}
            onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={newOrder.email}
            onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el correo electrónico"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            value={newOrder.phone}
            onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el teléfono"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            value={newOrder.address}
            onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa la dirección"
          />
        </div>
        <button
          onClick={handleSaveOrder}
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Orden'}
        </button>
        <button
          onClick={() => setModalIsOpen(false)}
          className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
        >
          Cancelar
        </button>
      </CustomModal>
    </div>
  );
};

export default Orders;
