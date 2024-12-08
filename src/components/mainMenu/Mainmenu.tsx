import React from 'react';
import { useRouter } from 'next/router';
import { FaUserCog, FaBoxOpen, FaKey, FaTags, FaShoppingCart, FaChartLine, FaFileInvoiceDollar, FaClipboardList, FaWarehouse, FaCartPlus, FaListAlt, FaChartPie } from 'react-icons/fa';

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
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Carta de Mantenimiento de Usuarios */}
          <div
            className="bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/users')}
          >
            <FaUserCog className="text-teal-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-teal-700">Usuarios</h3>
            <p className="text-gray-700 text-sm">Gestiona usuarios, crea, edita o elimina usuarios del sistema.</p>
          </div>

          {/* Carta de Productos */}
          <div
            className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/inventory')}
          >
            <FaBoxOpen className="text-green-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-green-700">Productos</h3>
            <p className="text-gray-700 text-sm">Gestiona los productos de tu tienda, incluyendo precios y categorías.</p>
          </div>

          {/* Carta de Roles */}
          <div
            className="bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/role')}
          >
            <FaKey className="text-purple-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-purple-700">Roles</h3>
            <p className="text-gray-700 text-sm">Gestiona los roles y permisos de los usuarios en el sistema.</p>
          </div>

          {/* Carta de Categorías */}
          <div
            className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/category')}
          >
            <FaTags className="text-yellow-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-yellow-700">Categorías</h3>
            <p className="text-gray-700 text-sm">Gestiona las categorías de tus productos.</p>
          </div>

          {/* Carta de Ordenes */}
          <div
            className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/orders')}
          >
            <FaShoppingCart className="text-blue-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-blue-700">Ordenes</h3>
            <p className="text-gray-700 text-sm">Gestiona los pedidos realizados por los clientes.</p>
          </div>

          {/* Carta de Ventas */}
          <div
            className="bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/sale')}
          >
            <FaChartLine className="text-orange-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-orange-700">Ventas</h3>
            <p className="text-gray-700 text-sm">Analiza las ventas y el rendimiento de tu tienda.</p>
          </div>

          {/* Carta de Clientes */}
          <div
            className="bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/api/v1/client')}
          >
            <FaFileInvoiceDollar className="text-teal-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-teal-700">Clientes</h3>
            <p className="text-gray-700 text-sm">Gestiona los detalles de tus clientes.</p>
          </div>

          {/* Carta de Cuentas por Cobrar */}
          <div
            className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/api/v1/accountsReceivable')}
          >
            <FaClipboardList className="text-blue-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-blue-700">Cuentas por Cobrar</h3>
            <p className="text-gray-700 text-sm">Controla los ingresos y cobros de la empresa.</p>
          </div>

          {/* Carta de Inventario */}
          <div
            className="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/api/v1/inventory')}
          >
            <FaWarehouse className="text-yellow-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-yellow-700">Inventario</h3>
            <p className="text-gray-700 text-sm">Gestiona y controla el inventario de tu tienda.</p>
          </div>

          {/* Carta de Compras */}
          <div
            className="bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/api/v1/purchase')}
          >
            <FaCartPlus className="text-orange-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-orange-700">Compras</h3>
            <p className="text-gray-700 text-sm">Administra las compras realizadas por tu empresa.</p>
          </div>

          {/* Carta de Detalles de Compras */}
          <div
            className="bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/api/v1/purchaseDetail')}
          >
            <FaListAlt className="text-teal-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-teal-700">Detalles de Compras</h3>
            <p className="text-gray-700 text-sm">Consulta los detalles de cada compra.</p>
          </div>

          {/* Carta de Detalles de Créditos */}
          <div
            className="bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 w-64 h-64 rounded-lg shadow-md text-center flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl animate-blink"
            onClick={() => handleNavigation('/api/v1/creditDetails')}
          >
            <FaChartPie className="text-purple-700 text-5xl mb-3" />
            <h3 className="text-lg font-bold mb-1 text-purple-700">Detalles de Créditos</h3>
            <p className="text-gray-700 text-sm">Gestión y análisis de detalles de créditos.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Menu;
