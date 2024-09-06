import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Products: React.FC = () => {
  const initialProducts = [
    { id: 1, name: 'Perfume de Lujo 1', price: '$99.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 2, name: 'Perfume de Lujo 2', price: '$129.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 3, name: 'Perfume de Lujo 3', price: '$79.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 4, name: 'Perfume de Lujo 4', price: '$109.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 5, name: 'Perfume de Lujo 5', price: '$99.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 6, name: 'Perfume de Lujo 6', price: '$129.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 7, name: 'Perfume de Lujo 7', price: '$79.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 8, name: 'Perfume de Lujo 8', price: '$109.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 9, name: 'Perfume de Lujo 9', price: '$99.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 10, name: 'Perfume de Lujo 10', price: '$129.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 11, name: 'Perfume de Lujo 11', price: '$79.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 12, name: 'Perfume de Lujo 12', price: '$109.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 13, name: 'Perfume de Lujo 13', price: '$99.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 14, name: 'Perfume de Lujo 14', price: '$129.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 15, name: 'Perfume de Lujo 15', price: '$79.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 16, name: 'Perfume de Lujo 16', price: '$109.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 17, name: 'Perfume de Lujo 17', price: '$99.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 18, name: 'Perfume de Lujo 18', price: '$129.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 19, name: 'Perfume de Lujo 19', price: '$79.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
    { id: 20, name: 'Perfume de Lujo 20', price: '$109.99', imageUrl: 'https://media.revistagq.com/photos/62fb4299fb28d86a38828b26/4:3/w_1331,h_998,c_limit/perfume%20sauvage%20de%20dior.jpg' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = initialProducts.filter(product =>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
                  <img src={product.imageUrl} alt={product.name} className="h-64 w-full object-cover mb-4 rounded-lg" />
                  <h3 className="text-xl font-semibold mb-2 text-teal-600">{product.name}</h3>
                  <span className="block text-2xl font-bold mb-4 text-teal-700">{product.price}</span>
                  <a href="#" className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors">Comprar</a>
                </div>
              ))}
            </div>
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
