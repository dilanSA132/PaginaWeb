import React from 'react';

type OrderFormProps = {
  newOrder: any;
  setNewOrder: React.Dispatch<React.SetStateAction<any>>;
  products: any[];
  selectedProductId: number | null;
  setSelectedProductId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedProductQuantity: number;
  setSelectedProductQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleAddProductToOrder: () => void;
  handleSaveOrder: () => void;
  handleUpdateOrder: () => void;
  deletedDetails: number[];
  setDeletedDetails: React.Dispatch<React.SetStateAction<number[]>>;
};

const OrderForm: React.FC<OrderFormProps> = ({
  newOrder,
  setNewOrder,
  products,
  selectedProductId,
  setSelectedProductId,
  selectedProductQuantity,
  setSelectedProductQuantity,
  handleAddProductToOrder,
  handleSaveOrder,
  handleUpdateOrder,
  deletedDetails,
  setDeletedDetails
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{newOrder.id ? 'Detalles de la Orden' : 'Crear Nueva Orden'}</h2>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-4">
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
              type="text"
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
        <div className="lg:w-1/2 w-full">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="product">Producto</label>
            <select
              id="product"
              value={selectedProductId ?? ''}
              onChange={(e) => setSelectedProductId(Number(e.target.value))}
              className="w-full p-4 border border-gray-300 rounded-lg text-black"
            >
              <option value="">Selecciona un producto</option>
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
              className="w-full p-4 border border-gray-300 rounded-lg text-black"
            />
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleAddProductToOrder}
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg"
            >
              Agregar Producto
            </button>
          </div>
          {newOrder.details.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Detalles de la Orden</h3>
              <ul>
                {newOrder.details.map((detail:any, index:any) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    <span>{detail.product.name} - ${detail.amount}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedDetails = newOrder.details.filter((_:any, i:any) => i !== index);
                        setNewOrder({ ...newOrder, details: updatedDetails });
                      }}
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mb-4 flex justify-between">
            <button
              onClick={newOrder.id ? handleUpdateOrder : handleSaveOrder}
              className="w-1/2 py-3 bg-green-500 text-white font-bold rounded-lg"
            >
              {newOrder.id ? 'Actualizar Orden' : 'Crear Orden'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
