import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { getProducts } from '@/services/productService'; // Importa el servicio

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Define el tipo de los productos
  const [products, setProducts] = useState<Product[]>([]); // Define el tipo de los productos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProducts();
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
    const filtered = products.filter(product =>
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
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-teal-600">Nuestros Productos</h2>
            <SearchBar onSearch={handleSearch} />
            {loading ? (
              <p className="text-center text-teal-600">Cargando productos...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((product) => (
                  <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
                    <img src={product.image} alt={product.name} className="h-64 w-full object-cover mb-4 rounded-lg" />
                    <h3 className="text-xl font-semibold mb-2 text-teal-600">{product.name}</h3>
                    <span className="block text-2xl font-bold mb-4 text-teal-700">${product.price}</span>
                    <a href="#" className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors">Comprar</a>
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
    </div>
  );
};

export default Products;
