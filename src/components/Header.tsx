import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-teal-300 to-green-400 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-3xl font-bold text-white tracking-widest transition-transform transform hover:scale-105">
          Mi Tienda
        </a>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.364 5.636a1 1 0 00-1.414 0L12 10.586 7.05 5.636A1 1 0 105.636 7.05l4.95 4.95-4.95 4.95a1 1 0 101.414 1.414L12 13.414l4.95 4.95a1 1 0 001.414-1.414l-4.95-4.95 4.95-4.95a1 1 0 000-1.414z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>
        </div>
        <nav className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <a href="/" className="block text-white hover:text-gray-100 transition-colors py-2 md:py-0">Inicio</a>
          <a href="/products" className="block text-white hover:text-gray-100 transition-colors py-2 md:py-0">Tienda</a>
          <a href="#carrito" className="block text-white hover:text-gray-100 transition-colors py-2 md:py-0">Carrito</a>
          <a href="/about" className="block text-white hover:text-gray-100 transition-colors py-2 md:py-0">Acerca de</a>
          <a href="#contacto" className="block text-white hover:text-gray-100 transition-colors py-2 md:py-0">Contacto</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
