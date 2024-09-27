import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getSales, createSale, deleteSale, updateSale } from '@/services/saleService';
import { createSaleDetail } from '@/services/saleDetailService';
import { getPaymentPlans } from '@/services/paymentPlanService';
import { getProducts } from '@/services/productService';
import { Sale, SaleDetail, PaymentPlan,Product } from '@/services/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSale, setNewSale] = useState<Sale>({
    id: 0,
    totalAmount: 0,
    paymentStatus: 'PENDING',
    date: new Date().toISOString(),
    details: [],
    paymentDetails: [],
    paymentPlanId: null,
    originOrderId: null,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchSalesAndProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const [fetchedSales, fetchedProducts, fetchedPaymentPlans] = await Promise.all([
          getSales(),
          getProducts(),
          getPaymentPlans(),
        ]);
        setSales(fetchedSales);
        setProducts(fetchedProducts);
        setPaymentPlans(fetchedPaymentPlans);
      } catch (err: any) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    fetchSalesAndProducts();
  }, []);

  const openModalForNewSale = () => {
    setNewSale({
      id: 0,
      totalAmount: 0,
      paymentStatus: 'PENDING',
      date: new Date().toISOString(),
      details: [],
      paymentDetails: [],
      paymentPlanId: null,
      originOrderId: null,
    });
    setModalIsOpen(true);
  };

  const handleAddProductToSale = () => {
    if (selectedProductId && selectedProductQuantity > 0) {
      const product = products.find((p) => p.id === selectedProductId);
      if (product) {
        const existingDetailIndex = newSale.details.findIndex((d) => d.product.id === product.id);
        if (existingDetailIndex !== -1) {
          const updatedDetails = [...newSale.details];
          updatedDetails[existingDetailIndex].quantity += selectedProductQuantity;
          updatedDetails[existingDetailIndex].amount = updatedDetails[existingDetailIndex].quantity * product.price;
          setNewSale({ ...newSale, details: updatedDetails });
        } else {
          const newDetail: SaleDetail = {
            id: 0,
            quantity: selectedProductQuantity,
            amount: product.price * selectedProductQuantity,
            product: product,
          };
          setNewSale({ ...newSale, details: [...newSale.details, newDetail] });
        }
        setSelectedProductId(null);
        setSelectedProductQuantity(1);
      }
    }
  };

  const handleSaveSale = async () => {
    try {
      const createdSale = await createSale(newSale);
      const details = newSale.details.map((detail) => ({
        productId: detail.product.id,
        quantity: detail.quantity,
        amount: detail.amount,
        saleId: createdSale.id,
      }));

      await createSaleDetail(createdSale.id);
      setSales([...sales, { ...createdSale, details }]);
      closeModal();
      toast.success('Venta creada exitosamente.');
    } catch (error) {
      console.error('Error al crear la venta:', error);
      toast.error('Error al crear la venta.');
    }
  };

  const handleDelete = async (sale: Sale) => {
    try {
      await deleteSale(sale.id);
      setSales((prevSales) => prevSales.filter((s) => s.id !== sale.id));
      toast.success('Venta eliminada exitosamente.');
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      toast.error('Error al eliminar la venta.');
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Fecha', accessor: 'date' },
    { label: 'Monto Total', accessor: 'totalAmount' },
    { label: 'Estado de Pago', accessor: 'paymentStatus' },
    {
      label: 'Acciones',
      render: (sale: Sale) => (
        <button
          onClick={() => openModalForSaleDetails(sale)}
          className="bg-teal-500 text-white py-1 px-2 rounded-full hover:bg-teal-600"
        >
          Ver Detalles
        </button>
      ),
    },
  ];

  const openModalForSaleDetails = (sale: Sale) => {
    setNewSale({
      ...sale,
      details: sale.details.map((detail) => ({ ...detail })),
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewSale({
      id: 0,
      totalAmount: 0,
      paymentStatus: 'PENDING',
      date: new Date().toISOString(),
      details: [],
      paymentDetails: [],
      paymentPlanId: null,
      originOrderId: null,
    });
  };

  return (
    <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Gestión de Ventas</h1>
      <button
        onClick={openModalForNewSale}
        className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-600"
      >
        Nueva Venta
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {!loading ? (
        <UniversalTable columns={columns} data={sales} onDelete={handleDelete} />
      ) : (
        <p className="text-center text-gray-600">Cargando ventas...</p>
      )}
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">{newSale.id ? 'Detalles de la Venta' : 'Crear Nueva Venta'}</h2>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-4">
          <div className="lg:w-1/2 w-full">
            <h3 className="text-xl font-bold mb-2">Añadir Productos a la Venta</h3>
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
                onClick={handleAddProductToSale}
                className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
              >
                Añadir
              </button>
            </div>

            {/* Display added products with scroll */}
            {newSale.details.length > 0 && (
              <div className="flex flex-col mb-4">
                <h3 className="text-xl font-bold mb-2 text-black">Productos Añadidos</h3>
                <div className="overflow-y-auto max-h-64 text-black border p-2 rounded-lg">
                  {newSale.details.map((detail) => (
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment Plan Selection */}
          <div className="lg:w-1/2 w-full">
            <h3 className="text-xl font-bold mb-2">Seleccionar Plan de Pago</h3>
            <select
              value={newSale.paymentPlanId || ''}
              onChange={(e) => setNewSale({ ...newSale, paymentPlanId: Number(e.target.value) })}
              className="w-full p-4 border border-gray-300 rounded-lg text-black"
            >
              <option value="">Seleccionar Plan de Pago</option>
              {paymentPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.installments} cuotas de ₡{plan.amount.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save and Cancel buttons */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveSale}
            className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
          >
            {newSale.id ? 'Guardar Cambios' : 'Crear Venta'}
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

export default Sales;
