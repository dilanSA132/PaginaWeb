import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Colores para los círculos
const colors = [
  'bg-circle-color-1',
  'bg-circle-color-2',
  'bg-circle-color-3',
  'bg-circle-color-4',
  'bg-circle-color-5',
];

const positions = [
  { top: '10%', left: '15%' },
  { top: '20%', left: '60%' },
  { top: '30%', left: '35%' },
  { top: '40%', left: '75%' },
  { top: '50%', left: '20%' },
  { top: '60%', left: '50%' },
  { top: '70%', left: '80%' },
  { top: '80%', left: '30%' },
  { top: '90%', left: '60%' },
];

const Home: React.FC = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-r from-teal-200 via-white to-green-200 bg-[length:200%_200%] animate-gradient overflow-hidden">
      <main className="flex-grow relative z-10">
        <section
          className="relative bg-cover bg-center h-screen"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1598032896233-8f8d137cf7af?fit=crop&w=1500&q=80')",
          }}
        >
          {/* Fondo de círculos distribuidos uniformemente */}
          <div className="absolute inset-0">
            {positions.map((position, index) => {
              const colorClass = colors[index % colors.length]; // Cicla a través de los colores
              const size = `${Math.random() * 50 + 30}px`; // Tamaño aleatorio entre 30px y 80px

              return (
                <div
                  key={index}
                  className={`absolute rounded-full opacity-75 ${colorClass} animate-circle-float`}
                  style={{
                    width: size,
                    height: size,
                    top: position.top,
                    left: position.left,
                  }}
                />
              );
            })}
          </div>
          <div className="absolute inset-0 bg-white opacity-50"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center">
            <div className="text-teal-900 animate-fade-in">
              <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
                Encuentra Tu Fragancia Perfecta
              </h1>
              <p className="mt-4 text-base md:text-lg">
                Colección exclusiva de perfumes de lujo.
              </p>
              <a
                href="/products"
                className="mt-8 inline-block bg-gradient-to-r from-teal-400 to-green-400 text-white text-sm md:text-base px-6 py-3 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform active:scale-95"
              >
                Comprar Ahora
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
