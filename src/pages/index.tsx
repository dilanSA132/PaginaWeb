import React, { useState } from 'react';
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
  { top: '60%', left: '80%' },  // Añadí la décima posición
];

// Imágenes que se mostrarán en el fondo
const images = [
  'https://images.unsplash.com/photo-1598032896233-8f8d137cf7af?fit=crop&w=1500&q=80',
  'https://images.unsplash.com/photo-1601022420377-e1c4e3d32016?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg5OXwwfDF8c2VhY2h8MXx8cGVyZmVjdHxlbnwwfHx8fDE2NjY5NzM2MzI&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1610737978654-343b41a84d7a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg5OXwwfDF8c2VhY2h8N3x8cGVyZmVjdHxlbnwwfHx8fDE2NjY5NzM2MzI&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1601023275693-d66f98bfa9d1?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg5OXwwfDF8c2VhY2h8MXx8cGVyZmVjdHxlbnwwfHx8fDE2NjY5NzM2MzI&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1561487223-5fe7c3a0500f?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg5OXwwfDF8c2VhY2h8OXx8cGVyZmVjdHxlbnwwfHx8fDE2NjY5NzM2MzI&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1568091629-b0c03fc9b0b5?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg5OXwwfDF8c2VhY2h8Mnx8cGVyZmVjdHxlbnwwfHx8fDE2NjY5NzM2MzI&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1602547096998-325d6c7bb2b9?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg5OXwwfDF8c2VhY2h8N3x8cGVyZmVjdHxlbnwwfHx8fDE2NjY5NzM2MzI&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1581573952924-b21b35c94385?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg5OXwwfDF8c2VhY2h8Nnx8cGVyZmVjdHxlbnwwfHx8fDE2NjY5NzM2MzI&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1562265630-8c9da8b4fa89?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg5OXwwfDF8c2VhY2h8OXx8cGVyZmVjdHxlbnwwfHx8fDE2NjY5NzM2MzI&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1593630531519-c26d54d585c5?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg5OXwwfDF8c2VhY2h8OHx8cGVyZmVjdHxlbnwwfHx8fDE2NjY5NzM2MzI&ixlib=rb-1.2.1&q=80&w=1080',
];

const Home: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<boolean[]>(Array(images.length).fill(false));

  const handleError = (index: number) => {
    const updatedErrors = [...imageErrors];
    updatedErrors[index] = true;
    setImageErrors(updatedErrors);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-r from-teal-200 via-white to-green-200 bg-[length:200%_200%] animate-gradient overflow-hidden">
      <main className="flex-grow relative z-10">
        <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598032896233-8f8d137cf7af?fit=crop&w=1500&q=80')" }}>
          {/* Fondo de círculos distribuidos uniformemente */}
          <div className="absolute inset-0">
            {/* Círculos distribuidos uniformemente */}
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

            {/* Imágenes distribuidas aleatoriamente */}
            {images.map((image, index) => {
              const position = positions[index % positions.length];
              const size = `${Math.random() * 50 + 50}px`; // Tamaño aleatorio entre 50px y 100px

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    width: size,
                    height: size,
                    top: position.top,
                    left: position.left,
                    backgroundImage: imageErrors[index] ? 'url("/path/to/question-mark-icon.svg")' : `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '50%',
                    opacity: 0.6,
                    backgroundColor: imageErrors[index] ? '#ccc' : 'initial',
                  }}
                  onError={() => handleError(index)}
                />
              );
            })}
          </div>
          <div className="absolute inset-0 bg-white opacity-50"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center">
            <div className="text-teal-900 animate-fade-in">
              <h1 className="text-5xl font-bold tracking-wide">Encuentra Tu Fragancia Perfecta</h1>
              <p className="mt-4 text-lg">Colección exclusiva de perfumes de lujo.</p>
              <a href="/products" className="mt-8 inline-block bg-gradient-to-r from-teal-400 to-green-400 text-white px-6 py-3 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform active:scale-95">
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
