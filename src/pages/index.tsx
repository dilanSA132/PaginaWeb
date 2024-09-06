import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-100 via-white to-teal-100">
      <Header />
      <main className="flex-grow">
        <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598032896233-8f8d137cf7af?fit=crop&w=1500&q=80')" }}>
          <div className="absolute inset-0 bg-white opacity-50"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center">
            <div className="text-teal-900 animate-fade-in">
              <h1 className="text-5xl font-bold tracking-wide">Encuentra Tu Fragancia Perfecta</h1>
              <p className="mt-4 text-lg">Colección exclusiva de perfumes de lujo.</p>
              <a href="#productos" className="mt-8 inline-block bg-gradient-to-r from-teal-400 to-green-400 text-white px-6 py-3 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform">Comprar Ahora</a>
            </div>
          </div>
        </section>

        <section id="productos" className="py-16">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-teal-600">Productos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
                <img src="https://images.unsplash.com/photo-1598032896233-8f8d137cf7af?fit=crop&w=600&q=80" alt="Perfume 1" className="h-64 w-full object-cover mb-4 rounded-lg" />
                <h3 className="text-xl font-semibold mb-2 text-teal-600">Perfume de Lujo 1</h3>
                <p className="text-gray-600 mb-4">Una mezcla cautivadora de notas florales y almizcladas.</p>
                <span className="block text-2xl font-bold mb-4 text-teal-700">$99.99</span>
                <a href="#" className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors">Comprar</a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
                <img src="https://images.unsplash.com/photo-1598032896233-8f8d137cf7af?fit=crop&w=600&q=80" alt="Perfume 2" className="h-64 w-full object-cover mb-4 rounded-lg" />
                <h3 className="text-xl font-semibold mb-2 text-teal-600">Perfume de Lujo 2</h3>
                <p className="text-gray-600 mb-4">Una mezcla sofisticada de aromas cítricos y madera.</p>
                <span className="block text-2xl font-bold mb-4 text-teal-700">$129.99</span>
                <a href="#" className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors">Comprar</a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
                <img src="https://images.unsplash.com/photo-1598032896233-8f8d137cf7af?fit=crop&w=600&q=80" alt="Perfume 3" className="h-64 w-full object-cover mb-4 rounded-lg" />
                <h3 className="text-xl font-semibold mb-2 text-teal-600">Perfume de Lujo 3</h3>
                <p className="text-gray-600 mb-4">Un aroma fresco y vibrante con toques de vainilla.</p>
                <span className="block text-2xl font-bold mb-4 text-teal-700">$79.99</span>
                <a href="#" className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors">Comprar</a>
              </div>
            </div>
          </div>
        </section>

        <section id="suscribete" className="bg-gradient-to-r from-teal-400 to-green-400 text-white py-16">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Únete a Nuestra Comunidad de Fragancias</h2>
            <p className="text-lg mb-8">Regístrate para recibir ofertas exclusivas y novedades.</p>
            <a href="#contacto" className="inline-block bg-white text-teal-600 px-6 py-3 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform">Suscribirse Ahora</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
