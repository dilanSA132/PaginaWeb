// components/Menu/Menu.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { FaUserCog, FaBoxOpen, FaKey } from 'react-icons/fa'; // Importar íconos

const Menu: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-100 to-green-100 animate-fade-in">
      <header className="bg-teal-500 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Menú Principal</h1>
      </header>
      <main className="flex-grow flex flex-wrap justify-center items-center p-8 gap-8">
        {/* Carta de Mantenimiento de Usuarios */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg text-center w-64 h-64 flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
          onClick={() => handleNavigation('/mantenimiento-usuarios')}
        >
          <FaUserCog className="text-teal-600 text-6xl mb-4" />
          <h3 className="text-xl font-bold mb-2 text-teal-600">Mantenimiento Usuarios</h3>
          <p className="text-gray-600">Gestiona usuarios, crea, edita o elimina usuarios del sistema.</p>
        </div>

        {/* Carta de Productos */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg text-center w-64 h-64 flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
          onClick={() => handleNavigation('/productos')}
        >
          <FaBoxOpen className="text-teal-600 text-6xl mb-4" />
          <h3 className="text-xl font-bold mb-2 text-teal-600">Productos</h3>
          <p className="text-gray-600">Gestiona los productos de tu tienda, incluyendo precios y categorías.</p>
        </div>

        {/* Carta de Roles */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg text-center w-64 h-64 flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
          onClick={() => handleNavigation('/roles')}
        >
          <FaKey className="text-teal-600 text-6xl mb-4" />
          <h3 className="text-xl font-bold mb-2 text-teal-600">Roles</h3>
          <p className="text-gray-600">Gestiona los roles y permisos de los usuarios en el sistema.</p>
        </div>
      </main>
      <footer className="bg-teal-500 text-white p-4 text-center">
        <p>&copy; 2024 Mi Aplicación</p>
      </footer>
    </div>
  );
};

export default Menu;
