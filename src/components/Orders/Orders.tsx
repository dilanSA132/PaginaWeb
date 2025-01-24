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
import { updateStockProduct } from '@/services/productService';
import { createSale } from '@/services/saleService';
export interface ProductDetail {
  id: number;
  quantity: number;
  amount: number;
  product: {
    id: number;
    name: string;
    description: string;
    salePrice: number;
    image: string;
    stock: number;  
  };
}

export interface Product {
  id: number;
  name: string;
  description: string ;
  salePrice: number;
  image: string;
  stock: number;  
}

export interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  userId: number; 
  status: string; // PENDING or SOLD
  details: ProductDetail[];
}


export interface Sale {
  id: number; 
  date: Date; 
  totalAmount: number; // Monto total de la venta
  paymentStatus: PaymentStatus; // Estado del pago
  paymentMethod: PaymentMethod; // Método de pago
  credit?: Credit; // Información del crédito (opcional)
  details: SaleDetail[]; // Detalles de los productos vendidos
  creditPayments?: CreditPayment[]; // Pagos del crédito (si aplica)
}

export interface SaleDetail {
  id: number; // ID opcional, generado automáticamente
  saleId?: number; // ID de la venta asociada
  productId: number; // ID del producto vendido
  quantity: number; // Cantidad del producto
  amount: number; // Monto total por este detalle
}

export type CreditStatus = 'ACTIVE' | 'PAID' | 'CANCELLED';

export type PaymentStatus = 'PAID' | 'PENDING' | 'PARTIAL';

export type PaymentMethod = 'CASH' | 'TRANSFER' | 'CREDIT' ;


export interface CreditPayment {
  id: number; // ID opcional, ya que se genera automáticamente
  creditId?: number; // ID del crédito asociado
  amountToPay?: number; // Monto a pagar en este pago 
  amountPaid?: number; // Monto pagado en este pago
  paymentDate?: Date; // Fecha del pago
}


export interface Credit {
  id: number;
  customerId?: number;
  totalAmount?: number;
  amountRemaining?: number;
  createdAt?: Date;
  dueDate?: Date;
  status?: CreditStatus;
  payments?: CreditPayment[];
  sales?: Sale[];
}




const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [saleModalOpen, setsaleModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [creditTerm, setCreditTerm] = useState<string>('');
  const [creditDuration, setCreditDuration] = useState<number>(0);
  const [creditInterest, setCreditInterest] = useState<number>(0);
  const [deletedDetails, setDeletedDetails] = useState<number[]>([]);
  const { data: session } = useSession();
  const [filterText, setFilterText] = useState(''); 
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState<number>(1);
  const [newOrder, setNewOrder] = useState<Order>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    userId: session?.user?.id,
    createdAt: '',
    status: 'PENDING',
    details: [],
  });
  let totalPerQuota: any = 0;
  let totalWithInterest: any = 0;
  let totalAmount: any = 0;


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
      userId: session?.user?.id,
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
          updatedDetails[existingDetailIndex].amount = updatedDetails[existingDetailIndex].quantity * product.salePrice;
          setNewOrder({ ...newOrder, details: updatedDetails });
        } else {
          const newDetail: ProductDetail = {
            id: 0,
            quantity: selectedProductQuantity,
            amount: product.salePrice * selectedProductQuantity,
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
        userId: session?.user?.id,
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
    { label: 'Usuario', accessor: 'userId' },
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

    if (saleModalOpen) {
      setNewOrder({
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        userId: session?.user?.id,
        createdAt: '',
        status: 'PENDING',
        details: [],
      });
      setDeletedDetails([]);
      setSelectedProductId(null);
      setSelectedProductQuantity(1);
    }

  };

  const saleOrder = async (order: Order) => {
    setNewOrder(order);
    setsaleModalOpen(true);

    console.log(order);
    closeModal();

  }
  const closeSaleModal = () => {
    setsaleModalOpen(false);
    setNewOrder({
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      userId: session?.user?.id,
      createdAt: '',
      status: 'PENDING',
      details: [],
    });
    setDeletedDetails([]);
    setSelectedProductId(null);
    setSelectedProductQuantity(1);
    setPaymentMethod('');
    setPaymentStatus('');
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentStatus(e.target.value);
  };
  const handleSaveSale = async () => {
    try {
      if (!paymentMethod || !paymentStatus) {
        toast.error('Por favor selecciona el método y estado de pago.');
        return;
      }

      const totalAmount = newOrder.details.reduce(
        (total, detail) => total + detail.amount,
        0
      );

      if (newOrder.details.length === 0) {
        toast.error('No hay productos en la orden.');
        return;
      }

      const creditData =
        paymentMethod === 'CREDIT'
          ? {
            customerId: newOrder.userId,
            totalAmount: totalAmount,
            amountRemaining: totalAmount,
            dueDate: new Date(
              new Date().setMonth(new Date().getMonth() + creditDuration)
            ),
            status: 'ACTIVE' as CreditStatus,
          }
          : undefined;

      const creditPayments =
        paymentMethod === 'CREDIT' && creditData
          ? Array.from({ length: creditDuration }, (_, index) => ({
            amountPaid: 0,
            amountToPay: totalAmount / creditDuration,  
            paymentDate: new Date(
              new Date().setMonth(new Date().getMonth() + index + 1)
            ),
          }))
          : undefined;


      const saleDetails = newOrder.details.map((detail) => ({
        productId: detail.product.id,
        quantity: detail.quantity,
        amount: detail.amount,
      }));

      const saleData = {
        date: new Date(),
        totalAmount,
        paymentMethod: paymentMethod as PaymentMethod,
        paymentStatus: paymentStatus as PaymentStatus,
        credit: creditData,
        details: saleDetails,
        ...(creditPayments && {
          creditPayments,
        }),
      };

      const outOfStockProducts = newOrder.details.filter(
        (detail) => detail.product.stock < detail.quantity
      );

      if (outOfStockProducts.length > 0) {
        const productNames = outOfStockProducts.map((detail) => detail.product.name).join(', ');
        toast.error(`Los siguientes productos no tienen suficiente stock: ${productNames}`);
        return;
      }

      console.log('Datos de la venta:', saleData);

      const result = await createSale(saleData);
      const updatedOrder = await updateOrder(newOrder.id, { status: 'SOLD' });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      await Promise.all(
        newOrder.details.map((detail) =>
          updateStockProduct({ id: detail.product.id, stock: detail.product.stock - detail.quantity })
        )
      );


      setsaleModalOpen(false);
      toast.success('Venta creada exitosamente.');
      console.log('Resultado:', result);
    } catch (error) {
      console.error('Error al crear la venta:', error);
      toast.error('Error al crear la venta. Por favor, inténtalo de nuevo.');
    }
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

      <CustomModal isOpen={saleModalOpen} onClose={closeSaleModal}>
        <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg max-w-4x max-h-90 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Realizar Venta</h2>

          <div className="mb-4">

            <div className="border p-4 rounded-lg text-black max-h-96 overflow-y-auto">
              <p><strong>Nombre:</strong> {newOrder.name}</p>
              <p><strong>Correo Electrónico:</strong> {newOrder.email}</p>
              <p><strong>Teléfono:</strong> {newOrder.phone}</p>
              <p><strong>Dirección:</strong> {newOrder.address}</p>
              <p><strong>Fecha de Creación:</strong> {newOrder.createdAt}</p>
              <p><strong>Estado:</strong> {newOrder.status}</p>
              <p><strong>Usuario:</strong> {newOrder.userId}</p>

              <h4 className="text-lg font-bold mt-4">Productos:</h4>
              {newOrder.details.map((detail) => (
                <div key={detail.id} className="border-b py-2">
                  <p><strong>Producto:</strong> {detail.product.name}</p>
                  <p><strong>Cantidad:</strong> {detail.quantity}</p>
                  <p><strong>Monto:</strong> ₡{detail.amount}</p>
                </div>
              ))}
              <p className="mt-4"><strong>Total:</strong> ₡{newOrder.details.reduce((total, detail) => total + detail.amount, 0)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="paymentMethod">Método de Pago</label>
              <select
                id="paymentMethod"
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="">Seleccionar Método de Pago</option>
                <option value="CASH">Efectivo</option>
                <option value="TRANSFER">Transferencia</option>
                <option value="CREDIT">Crédito</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="paymentStatus">Estado del Pago</label>
              <select
                id="paymentStatus"
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
                value={paymentStatus}
                onChange={handlePaymentStatusChange}
              >
                <option value="">Seleccionar Estado de Pago</option>
                <option value="PAID">Pagado</option>
                <option value="PENDING">Pendiente</option>
              </select>
            </div>
          </div>

          {paymentMethod === 'CREDIT' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="creditTerm">Plazo</label>
                <select
                  id="creditTerm"
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  value={creditTerm}
                  onChange={(e) => setCreditTerm(e.target.value)}
                >
                  <option value="">Seleccionar Plazo</option>
                  <option value="MONTHLY">Mensual</option>
                  <option value="WEEKLY">Semanal</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="creditDuration">Duración</label>
                <input
                  type="number"
                  id="creditDuration"
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  value={creditDuration}
                  onChange={(e) => setCreditDuration(Number(e.target.value))}
                  placeholder="Duración en meses/semanas"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="creditInterest">Interés</label>
                <input
                  type="number"
                  id="creditInterest"
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  value={creditInterest}
                  onChange={(e) => setCreditInterest(Number(e.target.value))}
                  placeholder="Interés en %"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'CREDIT' && (
            <div className="mt-4">
              <h4 className="text-lg font-bold">Resumen de Crédito</h4>
              {(() => {
                const totalAmount = newOrder.details.reduce((total, detail) => total + detail.amount, 0);
                const totalWithInterest = totalAmount * (1 + creditInterest / 100);
                const totalPerQuota = totalWithInterest / creditDuration;

                return (
                  <>
                    <p><strong>Total Final:</strong> ₡{totalWithInterest.toFixed(2)}</p>
                    <p><strong>Total por Cuota:</strong> ₡{totalPerQuota.toFixed(2)}</p>
                    <p><strong>Plazo:</strong> {creditDuration} {creditTerm === 'MONTHLY' ? 'meses' : 'semanas'}</p>
                  </>
                );
              })()}
            </div>
          )}

          <div className="flex justify-end mt-4 gap-4">
            <button
              onClick={handleSaveSale}
              className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
            >
              {newOrder.id ? 'Guardar Venta' : 'Crear Orden'}
            </button>
            <button
              onClick={closeSaleModal}
              className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </CustomModal>


      <CustomModal isOpen={modalIsOpen} onClose={closeModal} width='1000px'>
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

          <div className="lg:w-1/2 w-full mt-4 lg:mt-0 flex flex-col">
    <h3 className="text-xl font-bold mb-2">Añadir Productos a la Orden</h3>
    
    {/* Campo de filtro */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Filtrar productos"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-lg text-black"
      />
    </div>

    {/* Sección para seleccionar producto */}
    <div className="flex space-x-2 mb-4">
      <select
        value={selectedProductId || ''}
        onChange={(e) => setSelectedProductId(Number(e.target.value))}
        className="w-full p-4 border border-gray-300 rounded-lg text-black"
      >
        <option value="">Seleccionar Producto</option>
        {products
          .filter((product) => 
            product.name.toLowerCase().includes(filterText.toLowerCase()) // Filtrado de productos
          )
          .map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ₡{product.salePrice}
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

     
        <div className="flex justify-end mt-4">
          <button
            onClick={newOrder.id ? handleUpdateOrder : handleSaveOrder}
            className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
          >
            {newOrder.id ? 'Guardar Cambios' : 'Crear Orden'}
          </button>
          <button
            onClick={closeModal}
            className="ml-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
          >
            Cancelar
          </button>

          {newOrder.details.length > 0 && (
          <button
            onClick={() => saleOrder(newOrder)} // Pasa las variables necesarias aquí
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
          >
            Realizar Venta
          </button>
        )} 
        </div>

      </CustomModal>
      <ToastContainer />
    </div>
  );

};

export default Orders;
