import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getSales, createSale, deleteSale, updateSale } from '@/services/saleService';
import { createSaleDetail, getSaleDetailsBySaleId, deleteSaleDetail } from '@/services/saleDetailService';
import { getOrders } from '@/services/orderService';
import { getProducts } from '@/services/productService';
import { getPaymentPlans } from '@/services/paymentPlanService';
import { SaleDetailResponse } from '@/services/types';

interface Sale {
  id: number;
  date: string;
  totalAmount: number;
  paymentStatus: string;
  paymentPlanId?: number | null;
}

interface SaleDetail {
  id?: number;
  quantity: number;
  amount: number;
  productId: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Order {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  details: OrderDetail[];
}

interface OrderDetail {
  id: number;
  quantity: number;
  amount: number;
  productId: number;
  productName: string;
}

interface PaymentPlan {
  id: number;
  installments: number;
  amount: number;
}

const SalesManagement: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSale, setNewSale] = useState<Sale>({ id: 0, date: '', totalAmount: 0, paymentStatus: 'PENDING', paymentPlanId: null });
  const [saleDetails, setSaleDetails] = useState<SaleDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingNewSale, setIsCreatingNewSale] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      setError(null);
      try {
        const salesData = await getSales();
        setSales(salesData);
      } catch (err: any) {
        setError('Error al cargar las ventas');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (err) {
        console.error('Error al cargar las órdenes');
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (isCreatingNewSale) {
      const fetchProducts = async () => {
        try {
          const productsData = await getProducts();
          setProducts(productsData);
        } catch (err) {
          console.error('Error al cargar los productos');
        }
      };

      fetchProducts();
    }
  }, [isCreatingNewSale]);

  useEffect(() => {
    const fetchPaymentPlans = async () => {
      try {
        const plansData = await getPaymentPlans();
        setPaymentPlans(plansData);
      } catch (err) {
        console.error('Error al cargar los planes de pago');
      }
    };

    fetchPaymentPlans();
  }, []);

  const openModalForNewSale = () => {
    setIsEditing(false);
    setIsCreatingNewSale(true);
    setNewSale({ id: 0, date: new Date().toISOString(), totalAmount: 0, paymentStatus: 'PENDING', paymentPlanId: null });
    setSaleDetails([]);
    setModalIsOpen(true);
  };

  const handleChangeSaleType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "new";
    setIsCreatingNewSale(value);
    if (!value) {
      setSaleDetails([]);
    }
  };

  const handleSelectOrder = (order: Order) => {
    setNewSale({ 
      id: order.id, 
      date: order.createdAt, 
      totalAmount: order.details.reduce((acc, item) => acc + item.amount, 0), 
      paymentStatus: 'PENDING' 
    });
    setSaleDetails(order.details.map(detail => ({
      quantity: detail.quantity,
      amount: detail.amount,
      productId: detail.productId,
    })));
  };

  const handleSaveSale = async () => {
    try {
      const saleData = {
        date: newSale.date,
        totalAmount: saleDetails.reduce((acc, item) => acc + item.amount, 0),
        paymentStatus: newSale.paymentStatus,
        paymentPlanId: newSale.paymentPlanId || null,
      };

      let savedSale;
      if (isEditing) {
        savedSale = await updateSale(newSale.id, saleData);
      } else {
        savedSale = await createSale(saleData);
      }

      for (const detail of saleDetails) {
        const saleDetailData = {
          quantity: detail.quantity,
          amount: detail.amount,
          productId: detail.productId,
          saleId: savedSale.id,
        };
        await createSaleDetail(saleDetailData);
      }

      if (isEditing) {
        setSales((prevSales) => prevSales.map((s) => (s.id === savedSale.id ? savedSale : s)));
      } else {
        setSales((prevSales) => [...prevSales, savedSale]);
      }

      setModalIsOpen(false);
    } catch (err: any) {
      setError('Error al guardar la venta y sus detalles');
      console.error(err);
    }
  };

  const handleDelete = async (sale: Sale) => {
    try {
      // Eliminar los detalles de la venta primero
      const saleDetails: SaleDetailResponse[] = await getSaleDetailsBySaleId(sale.id);
  
      for (const detail of saleDetails) {
        await deleteSaleDetail(detail.id); // Asegúrate de tener un servicio que elimine los detalles de la venta
      }
  
      // Luego eliminar la venta
      await deleteSale(sale.id);
      setSales((prevSales) => prevSales.filter((s) => s.id !== sale.id));
    } catch (err: any) {
      setError('Error al eliminar la venta y sus detalles');
      console.error(err);
    }
  };
  
  const handleAddProductToSale = (product: Product) => {
    const existingDetail = saleDetails.find(detail => detail.productId === product.id);
    if (existingDetail) {
      setSaleDetails(saleDetails.map(detail =>
        detail.productId === product.id ?
          { ...detail, quantity: detail.quantity + 1, amount: (detail.quantity + 1) * product.price } :
          detail
      ));
    } else {
      setSaleDetails([...saleDetails, { quantity: 1, amount: product.price, productId: product.id }]);
    }
  };

  const handleUpdateSaleDetail = (index: number, field: keyof SaleDetail, value: any) => {
    const updatedDetails = [...saleDetails];
    updatedDetails[index][field] = value;
    setSaleDetails(updatedDetails);
  };

  const openModalForEditSale = async (sale: Sale) => {
    setIsEditing(true);
    setIsCreatingNewSale(false);
    setNewSale({ ...sale });
    setModalIsOpen(true);
  
    try {
      const detailsData: SaleDetailResponse[] = await getSaleDetailsBySaleId(sale.id);
      setSaleDetails(detailsData.map((detail: SaleDetailResponse) => ({
        quantity: detail.quantity,
        amount: detail.amount,
        productId: detail.productId,
      })));
    } catch (error) {
      console.error('Error al cargar los detalles de la venta:', error);
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Fecha', accessor: 'date' },
    { label: 'Total', accessor: 'totalAmount' },
    { label: 'Estado de Pago', accessor: 'paymentStatus' },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-indigo-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Gestión de Ventas</h1>
      <button onClick={openModalForNewSale} className="bg-blue-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-blue-600">
        Nueva Venta
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {!loading ? (
        <UniversalTable columns={columns} data={sales} onEdit={openModalForEditSale} onDelete={handleDelete} />
      ) : (
        <p className="text-center text-gray-600">Cargando ventas...</p>
      )}
      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Venta' : 'Crear Nueva Venta'}</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tipo de Venta</label>
          <select
            value={isCreatingNewSale ? "new" : "existing"}
            onChange={handleChangeSaleType}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
          >
            <option value="new">Nueva Venta</option>
            <option value="existing">Seleccionar Orden Existente</option>
          </select>
        </div>

        {!isCreatingNewSale && (
          <>
            <h3 className="text-xl font-bold mb-2">Seleccione una Orden Existente</h3>
            <div className="h-64 overflow-y-scroll border border-gray-300 p-2 rounded-lg mb-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectOrder(order)}
                >
                  Orden #{order.id} - {order.name}
                </div>
              ))}
            </div>
          </>
        )}

        {isCreatingNewSale || (!isCreatingNewSale && saleDetails.length > 0) ? (
          <>
            <h3 className="text-xl font-bold mb-2">Detalles de Venta</h3>
            <div className="h-64 overflow-y-scroll border border-gray-300 p-2 rounded-lg mb-4">
              {saleDetails.map((detail, index) => {
                const product = products.find((p) => p.id === detail.productId);
                return (
                  <div key={index} className="mb-2 p-2 border border-gray-300 rounded-lg text-black">
                    <div className="mb-2">
                      <label className="block text-gray-700 mb-1">Producto</label>
                      <span>{product ? product.name : 'Producto no encontrado'}</span>
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700 mb-1" htmlFor={`quantity-${index}`}>
                        Cantidad
                      </label>
                      <input
                        type="number"
                        id={`quantity-${index}`}
                        value={detail.quantity}
                        onChange={(e) =>
                          handleUpdateSaleDetail(index, 'quantity', parseInt(e.target.value))
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        placeholder="Cantidad"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700 mb-1" htmlFor={`amount-${index}`}>
                        Monto
                      </label>
                      <input
                        type="number"
                        id={`amount-${index}`}
                        value={detail.amount}
                        onChange={(e) =>
                          handleUpdateSaleDetail(index, 'amount', parseFloat(e.target.value))
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        placeholder="Monto"
                        readOnly
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}

        <button onClick={handleSaveSale} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
          {isEditing ? 'Guardar Cambios' : 'Crear Venta'}
        </button>
        <button onClick={() => setModalIsOpen(false)} className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600">
          Cancelar
        </button>
      </CustomModal>
    </div>
  );
};

export default SalesManagement;
