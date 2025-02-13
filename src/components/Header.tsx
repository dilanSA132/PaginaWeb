import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaHome, FaStore, FaInfoCircle, FaUser, FaList, FaBox, FaCog } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { getParameters } from '@/services/parametersService'; // Asegúrate de tener el servicio
interface Parameter {
  info?: string;
  email?: string;
  emailPassword?: string;
  location?: string;
  pageName?: string;
  mission?: string;
  vision?: string;
  logo?: string;
  phone?: string;
}


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [parameters, setParameters] = useState<Parameter | null>(null);


  useEffect(() => {
    const fetchParameters = async () => {
      const data = await getParameters();
      setParameters(data[0]);
      console.log(parameters?.logo); // Check if this is undefined or null
    };

    fetchParameters();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!parameters) {
    return <header className="bg-gradient-to-r from-teal-300 to-green-400 shadow-lg">Cargando...</header>;
  }

  return (
    <header className="bg-gradient-to-r from-teal-300 to-green-400 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {session?.user?.roleId === 1 && (
            <a
              href="/parametersPage"
              className="flex items-center space-x-2 text-white hover:text-gray-100 transition-colors py-2"
            >
              <FaCog className="text-2xl transition-transform transform hover:scale-125" />
            </a>
          )}
          {/* Logo */}

          <div className="relative w-12 h-10">
            {parameters.logo ? (
              <img
                src={parameters.logo}
                alt="Logo"
                className="rounded-full shadow-lg transition-transform transform hover:scale-110"
                width={48}
                height={48}
              />
            ) : (
              <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">Logo</div>
            )}
          </div>



          <span className="text-3xl font-bold text-white tracking-widest transition-transform transform hover:scale-105">
            {parameters.pageName || 'Mi Tienda'}
          </span>

        </div>

        {/* Botón de menú en móviles */}
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

        {/* Menú */}
        <nav className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <a href="/" className="flex items-center space-x-2 text-white hover:text-gray-100 transition-colors py-2 md:py-0">
            <FaHome className="text-2xl transition-transform transform hover:scale-125" />
            <span className="hidden md:inline">Inicio</span>
          </a>
          {session && (
            <a
              href="/products"
              className="flex items-center space-x-2 text-white hover:text-gray-100 transition-colors py-2 md:py-0"
            >
              <FaStore className="text-2xl transition-transform transform hover:scale-125" />
              <span className="hidden md:inline">Tienda</span>
            </a>
          )}
          {session?.user?.roleId === 1 && (
            <a
              href="/menu"
              className="flex items-center space-x-2 text-white hover:text-gray-100 transition-colors py-2 md:py-0"
            >
              <FaList className="text-2xl transition-transform transform hover:scale-125" />
              <span className="hidden md:inline">Menú</span>
            </a>
          )}
          {session && (
            <a
              href="/myOrders"
              className="flex items-center space-x-2 text-white hover:text-gray-100 transition-colors py-2 md:py-0"
            >
              <FaBox className="text-2xl transition-transform transform hover:scale-125" />
              <span className="hidden md:inline">Mis Pedidos</span>
            </a>
          )}
          <a
            href="/about"
            className="flex items-center space-x-2 text-white hover:text-gray-100 transition-colors py-2 md:py-0"
          >
            <FaInfoCircle className="text-2xl transition-transform transform hover:scale-125" />
            <span className="hidden md:inline">Acerca de</span>
          </a>

          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center space-x-2 text-white hover:text-gray-100 transition-colors py-2 md:py-0"
            >
              <FaUser className="text-2xl transition-transform transform hover:scale-125" />
              <span className="hidden md:inline">Cerrar Sesión</span>
            </button>
          ) : (
            <a
              href="/login"
              className="flex items-center space-x-2 text-white hover:text-gray-100 transition-colors py-2 md:py-0"
            >
              <FaUser className="text-2xl transition-transform transform hover:scale-125" />
              <span className="hidden md:inline">Iniciar Sesión</span>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
