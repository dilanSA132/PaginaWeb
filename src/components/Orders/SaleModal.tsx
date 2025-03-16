import React, { useState } from 'react';
import CustomModal from '../modal/CustomModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SaleDetails {
  saleId: string;
  productId: string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
}

interface Product {
    id: number;
    name: string;
    description: string;
    salePrice: number;
    image: string;
  }

interface Sale {

    date: string;
  
    time: string;
  
    product: string;
  
    quantity: number;
  
    amount: number;
  
    paymentStatus: "PAID" | "INSTALLMENTS";
  
  }

const SaleModal: React.FC = () => {
  const [newSale, setNewSale] = useState<Sale>({
    date: "",
    time: "",
    product: "",
    quantity: 0,
    amount: 0,
    paymentStatus: "PAID",
  });
  const [saleDetails, setSaleDetails] = useState<SaleDetails>({
    saleId: "",
    productId: "",
    quantity: 0,
    pricePerUnit: 0,
    totalAmount: 0,
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Perfume A',
      description: 'Descripción del perfume A',
      salePrice: 20,
      image: '',
    },
    {
      id: 2,
      name: 'Perfume B',
      description: 'Descripción del perfume B',
      salePrice: 30,
      image: '',
    },
  ]);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState<number>(1);

  const handleAddSale = () => {
    if (selectedProductId && selectedProductQuantity > 0) {
      const product = products.find((p) => p.id === selectedProductId);
      if (product) {
        const totalAmount = product.salePrice * selectedProductQuantity;
        setNewSale({
          ...newSale,
          product: product.name,
          quantity: selectedProductQuantity,
          amount: totalAmount,
        });

        setSaleDetails({
          ...saleDetails,
          productId: product.id.toString(),
          quantity: selectedProductQuantity,
          pricePerUnit: product.salePrice,
          totalAmount: totalAmount,
        });

        toast.success('Venta añadida correctamente.');
      }
    }
  };

  const handleSaveSale = async () => {
    // Aquí se puede agregar la lógica para guardar la venta en la base de datos.
    // Puedes llamar al servicio para registrar la venta, por ejemplo:
    // await createSale(newSale);
    // await createSaleDetail(saleDetails);

    toast.success('Venta registrada correctamente.');
  };

  const handleCloseModal = () => {
    setNewSale({
      date: "",
      time: "",
      product: "",
      quantity: 0,
      amount: 0,
      paymentStatus: "PAID",
    });
    setSaleDetails({
      saleId: "",
      productId: "",
      quantity: 0,
      pricePerUnit: 0,
      totalAmount: 0,
    });
    setSelectedProductId(null);
    setSelectedProductQuantity(1);
  };

  return (
    <CustomModal isOpen={true} onClose={handleCloseModal}>
      <h2 className="text-2xl font-bold mb-4">Realizar Venta</h2>

      <div className="flex flex-col space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">Fecha</label>
          <input
            type="date"
            id="date"
            value={newSale.date}
            onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="time">Hora</label>
          <input
            type="time"
            id="time"
            value={newSale.time}
            onChange={(e) => setNewSale({ ...newSale, time: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="product">Producto</label>
          <select
            id="product"
            value={selectedProductId || ""}
            onChange={(e) => setSelectedProductId(Number(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
          >
            <option value="" disabled>Selecciona un producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.salePrice}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            id="quantity"
            value={selectedProductQuantity}
            onChange={(e) => setSelectedProductQuantity(Number(e.target.value))}
            min="1"
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="paymentStatus">Estado de Pago</label>
          <select
            id="paymentStatus"
            value={newSale.paymentStatus}
            onChange={(e) => setNewSale({ ...newSale, paymentStatus: e.target.value as "PAID" | "INSTALLMENTS" })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
          >
            <option value="paid">Pagado</option>
            <option value="installments">A plazos</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleAddSale}
            className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
          >
            Añadir Venta
          </button>
          <button
            onClick={handleSaveSale}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
          >
            Guardar Venta
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default SaleModal;
