import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getOrders, createOrder, deleteOrder, updateOrder } from '@/services/orderService';
import { getProducts } from '@/services/productService';
import { createOrderDetail, deleteOrderDetail, updateOrderDetail } from '@/services/orderDetailService';
import { CreateOrderRequest, OrderDetails } from '@/services/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';

interface ProductDetail {
  id: number;
  quantity: number;
  amount: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  status: string; // PENDING or SOLD
  details: ProductDetail[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletedDetails, setDeletedDetails] = useState<number[]>([]);
    const { data: session } = useSession();
  
  const [newOrder, setNewOrder] = useState<Order>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    createdAt: '',
    status: 'PENDING',
    details: [],
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const [fetchedOrders, fetchedProducts] = await Promise.all([getOrders(), getProducts()]);
        setOrders(fetchedOrders);
        setProducts(fetchedProducts);
      } catch (err: any) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    fetchOrdersAndProducts();
  }, []);

  const openModalForNewOrder = () => {
    setNewOrder({
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      createdAt: '',
      status: 'PENDING',
      details: [],
    });
    setDeletedDetails([]);
    setModalIsOpen(true);
  };

  const handleAddProductToOrder = () => {
    if (selectedProductId && selectedProductQuantity > 0) {
      const product = products.find((p) => p.id === selectedProductId);
      if (product) {
        const existingDetailIndex = newOrder.details.findIndex((d) => d.product.id === product.id);
        if (existingDetailIndex !== -1) {
          const updatedDetails = [...newOrder.details];
          updatedDetails[existingDetailIndex].quantity += selectedProductQuantity;
          updatedDetails[existingDetailIndex].amount = updatedDetails[existingDetailIndex].quantity * product.price;
          setNewOrder({ ...newOrder, details: updatedDetails });
        } else {
          const newDetail: ProductDetail = {
            id: 0,
            quantity: selectedProductQuantity,
            amount: product.price * selectedProductQuantity,
            product: product,
          };
          setNewOrder({ ...newOrder, details: [...newOrder.details, newDetail] });
        }
        setSelectedProductId(null);
        setSelectedProductQuantity(1);
      }
    }
  };

  const handleUpdateOrder = async () => {
    try {
      const updatedOrder = {
        name: newOrder.name,
        email: newOrder.email,
        phone: newOrder.phone,
        address: newOrder.address,
      };

      await updateOrder(newOrder.id, updatedOrder);

      if (deletedDetails.length > 0) {
        await Promise.all(deletedDetails.map(detailId => deleteOrderDetail(detailId)));
      }

      const details: OrderDetails[] = newOrder.details.map((detail) => ({
        productId: detail.product.id,
        quantity: detail.quantity,
        amount: detail.amount,
        orderId: newOrder.id,
      }));

      await createOrderDetail(details);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === newOrder.id
            ? { ...order, ...updatedOrder, details: newOrder.details }
            : order
        )
      );

      closeModal();
      toast.success('Orden actualizada exitosamente.');
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      toast.error('Error al actualizar la orden. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSaveOrder = async () => {
    try {
      const createdOrder = await createOrder({
        name: newOrder.name,
        email: newOrder.email,
        phone: newOrder.phone,
        address: newOrder.address,
        userId:session?.user?.id,
      });

      const details: OrderDetails[] = newOrder.details.map((detail) => ({
        productId: detail.product.id,
        quantity: detail.quantity,
        amount: detail.amount,
        orderId: createdOrder.id,
      }));

      await createOrderDetail(details);

      setOrders([...orders, { ...createdOrder, details }]);
      closeModal();
      toast.success('Orden creada exitosamente.');
    } catch (err) {
      console.error('Error al realizar el pedido o enviar el correo:', err);
      toast.error('Ocurrió un error al realizar el pedido. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDelete = async (order: Order) => {
    try {
      await Promise.all(order.details.map(detail => deleteOrderDetail(detail.id)));
      await deleteOrder(order.id);
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
      toast.success('Orden eliminada exitosamente.');
    } catch (err: any) {
      console.error('Error al eliminar la orden o sus detalles:', err);
      setError('Error al eliminar la orden');
      toast.error('Ocurrió un error al eliminar la orden.');
    }
  };

  const handleRemoveProductFromOrder = (productId: number) => {
    const detailToRemove = newOrder.details.find((detail) => detail.product.id === productId);
    if (detailToRemove && detailToRemove.id !== 0) {
      setDeletedDetails([...deletedDetails, detailToRemove.id]);
    }
    const updatedDetails = newOrder.details.filter((detail) => detail.product.id !== productId);
    setNewOrder({ ...newOrder, details: updatedDetails });
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Correo Electrónico', accessor: 'email' },
    { label: 'Teléfono', accessor: 'phone' },
    { label: 'Dirección', accessor: 'address' },
    { label: 'Fecha de Creación', accessor: 'createdAt' },
    { label: 'Estado', accessor: 'status' },
    {label : 'Usuario', accessor: 'userId'},
    {
      label: 'Acciones',
      render: (order: Order) => (
        <button
          onClick={() => openModalForOrderDetails(order)}
          className="bg-teal-500 text-white py-1 px-2 rounded-full hover:bg-teal-600"
        >
          Ver Detalles
        </button>
      ),
    },
  ];

  const openModalForOrderDetails = (order: Order) => {
    setDeletedDetails([]);
    setNewOrder({
      ...order,
      details: order.details.map((detail) => ({ ...detail })),
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewOrder({
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      createdAt: '',
      status: 'PENDING',
      details: [],
    });
    setDeletedDetails([]);
    setSelectedProductId(null);
    setSelectedProductQuantity(1);
  };

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
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-center text-gray-600">Cargando órdenes...</p>
      )}
  
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">{newOrder.id ? 'Detalles de la Orden' : 'Crear Nueva Orden'}</h2>
        
        <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-4">
          {/* Left Section */}
          <div className="lg:w-1/2 w-full">
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
          </div>
  
          {/* Right Section */}
          <div className="lg:w-1/2 w-full mt-4 lg:mt-0 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Añadir Productos a la Orden</h3>
            <div className="flex space-x-2 mb-4">
              <select
                value={selectedProductId || ''}
                onChange={(e) => setSelectedProductId(Number(e.target.value))}
                className="w-full p-4 border border-gray-300 rounded-lg text-black"
              >
                <option value="">Seleccionar Producto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ₡{product.price}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={selectedProductQuantity}
                onChange={(e) => setSelectedProductQuantity(Number(e.target.value))}
                className="w-24 p-4 border border-gray-300 rounded-lg text-black"
                placeholder="Cantidad"
              />
              <button
                onClick={handleAddProductToOrder}
                className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
              >
                Añadir
              </button>
            </div>
  
            {/* Display added products with scroll */}
            {newOrder.details.length > 0 && (
              <div className="flex flex-col mb-4">
                <h3 className="text-xl font-bold mb-2 text-black">Productos Añadidos</h3>
                <div className="overflow-y-auto max-h-64 text-black border p-2 rounded-lg">
                  {newOrder.details.map((detail) => (
                    <div key={detail.id} className="flex items-center justify-between border-b py-2">
                      <div className="flex items-center">
                        <img 
                          src={detail.product?.image || '/path/to/default-image.jpg'}
                          alt={detail.product?.name || 'Producto sin nombre'}
                          className="w-16 h-16 mr-4"
                        />
                        <div>
                          <p><strong>Producto:</strong> {detail.product?.name || 'Producto desconocido'}</p>
                          <p><strong>Cantidad:</strong> {detail.quantity}</p>
                          <p><strong>Monto:</strong> ₡{detail.amount}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveProductFromOrder(detail.product.id)}
                        className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
  
        {/* Save and Cancel buttons */}
        <div className="flex justify-end mt-4">
          <button
            onClick={newOrder.id ? handleUpdateOrder : handleSaveOrder}
            className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
          >
            {newOrder.id ? 'Guardar Cambios' : 'Crear Orden'}
          </button>
          <button
            onClick={closeModal}
            className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </CustomModal>
      <ToastContainer />
    </div>
  );
  
};

export default Orders;
