import React from 'react';
import Slider from 'react-slick';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home: React.FC = () => {
  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Carrusel de imágenes */}
      <Slider {...settings} className="relative w-full h-80 md:h-[500px]">
        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg"
            alt="Imagen de perfume 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg"
            alt="Imagen de perfume 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg"
            alt="Imagen de perfume 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Slider>

      {/* Contenido principal */}
      <div className="absolute inset-0 bg-white opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center">
        <div className="text-teal-900 animate-fade-in">
          <h1 className="text-5xl font-bold tracking-wide">Encuentra Tu Fragancia Perfecta</h1>
          <p className="mt-4 text-lg">Colección exclusiva de perfumes de lujo.</p>
          <a
            href="/products"
            className="mt-8 inline-block bg-gradient-to-r from-teal-400 to-green-400 text-white px-6 py-3 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform active:scale-95"
          >
            Comprar Ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
