import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-3xl font-bold text-teal-600 mb-8">Acerca de Nosotros</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              En MiTiendaDeColonias, nos especializamos en ofrecer las mejores fragancias del mercado. Nuestro compromiso es
              brindarte una experiencia olfativa inigualable, con productos seleccionados cuidadosamente para garantizar la
              máxima calidad y satisfacción.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Desde nuestras primeras ventas, hemos crecido y expandido nuestra selección de productos, asegurando que cada
              cliente encuentre la fragancia que más le guste. Nos enorgullece ofrecer perfumes y colonias de marcas
              reconocidas y exclusivas, que reflejan tanto la elegancia como la sofisticación.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Nuestra misión es ayudarte a descubrir tu esencia personal, aquella que resalta tu identidad y te hace único.
              Creemos que el perfume adecuado puede transformar tu día y elevar tu confianza, y estamos aquí para ayudarte a
              encontrar el que más te representa.
            </p>
            <img
              src="https://images.unsplash.com/photo-1532634726-8b9fb998fb24?fit=crop&w=800&q=80"
              alt="Imagen de tienda de colonias"
              className="mx-auto rounded-lg shadow-lg mt-8"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
