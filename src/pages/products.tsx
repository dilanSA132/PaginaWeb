import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { getProducts } from '@/services/productService';
import { createOrder } from '@/services/orderService';
import { useCartStore } from '@/store/useCartStore';
import { CreateOrderRequest, OrderDetails } from '@/services/types';
import { sendEmail } from '@/services/emailService';
import { createOrderDetail,getOrderDetails } from '@/services/orderDetailService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
}

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProducts();
        if (!fetchedProducts) {
          throw new Error('No se encontraron productos');
        }
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleQuantityChange = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleOrder = async () => {
    try {
      const orderRequest: CreateOrderRequest = {
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: contactInfo.address,
      
      };
  
      const newOrder = await createOrder(orderRequest);
  
      const orderDetailsEmail: OrderDetails[] = cart.map((product) => ({
        productId: product.id,
        name: product.name, 
        quantity: product.quantity,
        amount: product.price * product.quantity,
        orderId: newOrder.id,
      }));

      
      const orderDetails: OrderDetails[] = cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        amount: product.price * product.quantity,
        orderId: newOrder.id,
      }));
  
  
      const newOrderDetails = await createOrderDetail(orderDetails);
  
      toast.success('¡Pedido realizado con éxito! Te hemos enviado un correo con los detalles.');
  
      const subject = `Confirmación de Pedido para ${contactInfo.name}`;
      const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #007BFF;">Hola ${contactInfo.name},</h2>
        <p>Gracias por tu pedido. Aquí están los detalles:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f8f8f8;">
              <th style="padding: 10px; border: 1px solid #ddd;">Producto</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Cantidad</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Precio</th>
            </tr>
          </thead>
          <tbody>
            ${orderDetailsEmail
              .map(
                (item) => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
                  <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
                  <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${item.amount.toFixed(2)}</td>
                </tr>
              `
              )
              .join('')}
          </tbody>
        </table>
        <p style="font-size: 18px;">Total: <strong style="color: #28a745;">$${calculateTotal().toFixed(
          2
        )}</strong></p>
        <p style="color: #555;">Tu pedido está siendo procesado y te informaremos cuando esté en camino.</p>
        <p>Gracias por tu compra!</p>
        <p style="color: #888;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
      </div>
    `;

  
      await sendEmail(subject, html, contactInfo.email);
  
      console.log('Pedido realizado con éxito y correo enviado');
      setIsCartOpen(false);
    } catch (err) {
      console.error('Error al realizar el pedido o enviar el correo:', err);
      toast.error('Ocurrió un error al realizar el pedido. Por favor, inténtalo de nuevo.');
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-teal-600">
              Nuestros Productos
            </h2>
            <SearchBar onSearch={handleSearch} />
            {loading ? (
              <p className="text-center text-teal-600">Cargando productos...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-64 w-full object-cover mb-4 rounded-lg"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-teal-600">
                      {product.name}
                    </h3>
                    <span className="block text-2xl font-bold mb-4 text-teal-700">
                    ₡{product.price}
                    </span>
                    <button
                      onClick={() => addToCart({ ...product, quantity: 1 })}
                      className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
            />
          </div>
        </section>
      </main>
      <Footer />

      {/* Botón para abrir el carrito */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
      >
        Ver Carrito
      </button>

      {/* Modal del Carrito */}
      {isCartOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 text-black">Tu Carrito</h2>
            {cart.length === 0 ? (
              <p className="text-center text-black">Tu carrito está vacío.</p>
            ) : (
              <div>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 border-b border-gray-200 ">
                      <tr>
                        <th className="py-3 px-4 text-left text-black">Imagen</th>
                        <th className="py-3 px-4 text-left text-black">Producto</th>
                        <th className="py-3 px-4 text-left text-black">Cantidad</th>
                        <th className="py-3 px-4 text-left text-black">Precio</th>
                        <th className="py-3 px-4 text-left text-black">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3 px-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 object-cover rounded-lg"
                            />
                          </td>
                          <td className="py-3 px-4 text-black">{item.name}</td>
                          <td className="py-3 px-4 text-black">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value))
                              }
                              className="w-16 border border-gray-300 rounded-md px-2 py-1"
                            />
                          </td>
                          <td className="py-3 px-4 text-black">
                          ₡{(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-black">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2 text-black">
                    Información de Contacto
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleOrder();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="block text-black font-semibold">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={contactInfo.name}
                        onChange={(e) =>
                          setContactInfo({ ...contactInfo, name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-black font-semibold">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo({ ...contactInfo, email: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-black font-semibold">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={contactInfo.phone}
                        onChange={(e) =>
                          setContactInfo({ ...contactInfo, phone: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-black font-semibold">
                        Dirección
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={contactInfo.address}
                        onChange={(e) =>
                          setContactInfo({ ...contactInfo, address: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-black">
                        Total: ₡{calculateTotal().toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="bg-gray-300 text-black px-6 py-3 rounded-full hover:bg-gray-400 transition-colors"
                      >
                        Cerrar
                      </button>
                      <button
                        type="submit"
                        className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-colors"
                      >
                        Realizar Pedido
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
