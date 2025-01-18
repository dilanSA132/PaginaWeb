import React from 'react';
import { useRouter } from 'next/router';
import { FaUserCog, FaBoxOpen, FaKey, FaTags, FaShoppingCart, FaChartLine, FaMoneyBillWave , FaWallet} from 'react-icons/fa';

const Menu: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-100 to-green-100 animate-fade-in">
      <header className="bg-teal-500 text-white p-4 shadow-lg">
        
      </header>
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Carta de Mantenimiento de Usuarios */}
          <div
            className="bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/mantenimiento-usuarios')}
          >
            <FaUserCog className="text-teal-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-teal-700">Usuarios</h3>
            <p className="text-gray-700 text-sm">Gestiona usuarios, crea, edita o elimina usuarios del sistema.</p>
          </div>

          {/* Carta de Productos */}
          <div
            className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/productos')}
          >
            <FaBoxOpen className="text-green-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-green-700">Productos</h3>
            <p className="text-gray-700 text-sm">Gestiona los productos de tu tienda, incluyendo precios y categorías.</p>
          </div>

          {/* Carta de Roles */}
          <div
            className="bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/roles')}
          >
            <FaKey className="text-purple-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-purple-700">Roles</h3>
            <p className="text-gray-700 text-sm">Gestiona los roles y permisos de los usuarios en el sistema.</p>
          </div>

          {/* Carta de Categorías */}
          <div
            className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/categories')}
          >
            <FaTags className="text-yellow-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-yellow-700">Categorías</h3>
            <p className="text-gray-700 text-sm">Gestiona las categorías de tus productos.</p>
          </div>

          {/* Carta de Orders */}
          <div
            className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/orders')}
          >
            <FaShoppingCart className="text-blue-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-blue-700">Ordenes</h3>
            <p className="text-gray-700 text-sm">Gestiona los pedidos realizados por los clientes.</p>
          </div>

          {/* Carta de Sales */}
          <div
            className="bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/sale')}
          >
            <FaChartLine className="text-orange-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-orange-700">Panel</h3>
            <p className="text-gray-700 text-sm">Analiza las ventas y el rendimiento de tu tienda.</p>
          </div>

          {/* Carta de Cuentas por Cobrar */}
          <div
            className="bg-gradient-to-r from-red-200 via-red-300 to-red-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/cuentas-por-cobrar')}
          >
            <FaMoneyBillWave className="text-red-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-red-700">Cuentas por Cobrar</h3>
            <p className="text-gray-700 text-sm">Gestiona las cuentas pendientes de tus clientes.</p>
          </div>

          <div
            className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/saleMaintenance')}
          >
            <FaWallet className="text-indigo-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-indigo-700">Ventas</h3>
            <p className="text-gray-700 text-sm">Gestiona y realiza un seguimiento de las ventas realizadas.</p>
          </div>
        </div>
      </main>
      <footer className="bg-teal-500 text-white p-4 text-center">
        <p>&copy; 2024 Mi Aplicación</p>
      </footer>
      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-blink {
          animation: blink 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Menu;
