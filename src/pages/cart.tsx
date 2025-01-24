import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCartStore } from '@/store/useCartStore';

const Cart: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
   console.log('Cart page mounted', cart);
  }, []);  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-teal-600">Carrito de Compras</h2>
            {cart.length === 0 ? (
              <p className="text-center text-teal-600">Tu carrito está vacío.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                  <thead className="bg-teal-500 text-white">
                    <tr>
                      <th className="py-2 px-4 border-b">Imagen</th>
                      <th className="py-2 px-4 border-b">Nombre</th>
                      <th className="py-2 px-4 border-b">Precio</th>
                      <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product) => (
                      <tr key={product.id}>
                        <td className="py-2 px-4 border-b">
                          <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded-lg" />
                        </td>
                        <td className="py-2 px-4 border-b">{product.name}</td>
                        <td className="py-2 px-4 border-b">${product.salePrice}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
