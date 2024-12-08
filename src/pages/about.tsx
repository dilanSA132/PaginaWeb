import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <main className="flex-grow">
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-teal-700 mb-6 md:mb-10">Quiénes Somos</h2>
            <p className="text-gray-700 leading-relaxed mb-6 md:mb-10 text-lg md:text-xl">
              En MiTienda, nos dedicamos a ofrecer una experiencia de compra excepcional, brindando productos de alta calidad
              que van desde fragancias elegantes hasta artículos de uso diario. Nuestro compromiso es seleccionar solo lo mejor
              para ti, garantizando satisfacción y estilo en cada compra.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 md:mb-10 text-lg md:text-xl">
              Desde nuestros comienzos, hemos ampliado nuestra oferta de productos, incluyendo marcas de renombre y exclusivas
              que reflejan tanto la sofisticación como la accesibilidad. Queremos que cada cliente encuentre algo especial que
              resuene con su estilo personal.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 md:mb-10 text-lg md:text-xl">
              Nuestra misión es ayudarte a descubrir productos que complementen tu vida, desde fragancias y cosméticos hasta
              accesorios únicos. Creemos que un producto adecuado puede transformar tu día y mejorar tu bienestar, y estamos
              aquí para asegurarnos de que encuentres lo que más te representa.
            </p>

          </div>
        </section>

        <section className="bg-white py-16 md:py-1">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h3 className="text-3xl font-bold text-teal-700 mb-6">Nuestra Misión</h3>
            <p className="text-gray-700 leading-relaxed mb-6 md:mb-10 text-lg md:text-xl">
              Nuestra misión es brindar productos de alta calidad que enriquezcan la vida de nuestros clientes. Nos esforzamos por
              ofrecer una experiencia de compra única, enfocándonos en la excelencia, la atención al cliente y la innovación.
            </p>
            <h3 className="text-3xl font-bold text-teal-700 mb-6">Nuestra Visión</h3>
            <p className="text-gray-700 leading-relaxed mb-6 md:mb-10 text-lg md:text-xl">
              Nuestra visión es convertirnos en la tienda de confianza y preferida, reconocida por ofrecer productos de alta
              calidad y un servicio excepcional. Queremos que nuestros clientes encuentren siempre lo que buscan y que cada
              compra les deje una experiencia memorable.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
