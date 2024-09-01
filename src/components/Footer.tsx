import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-500 to-green-600 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Columna de información */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-2xl font-bold mb-4">MiTiendaDeColonias</h4>
            <p className="text-gray-200">Tu tienda en línea de colonias y perfumes de lujo. Encuentra tu fragancia perfecta y disfruta de nuestros productos exclusivos.</p>
            <p className="text-gray-200 mt-4">Correo: <a href="mailto:contacto@mitiendadecolonias.com" className="hover:underline">contacto@mitiendadecolonias.com</a></p>
            <p className="text-gray-200">Teléfono: <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a></p>
          </div>

          {/* Columna de enlaces */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Enlaces Rápidos</h4>
            <ul>
              <li className="mb-2"><a href="#inicio" className="text-gray-200 hover:text-white transition-colors">Inicio</a></li>
              <li className="mb-2"><a href="#productos" className="text-gray-200 hover:text-white transition-colors">Productos</a></li>
              <li className="mb-2"><a href="#suscribete" className="text-gray-200 hover:text-white transition-colors">Suscríbete</a></li>
              <li className="mb-2"><a href="#contacto" className="text-gray-200 hover:text-white transition-colors">Contacto</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          {/* Columna de redes sociales */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Síguenos</h4>
            <p className="text-gray-200 mb-4">¡Síguenos en nuestras redes sociales y mantente al tanto de nuestras últimas ofertas y novedades!</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-200 hover:text-white transition-colors"><img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6"/></a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors"><img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6"/></a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors"><img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6"/></a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors"><img src="/icons/pinterest.svg" alt="Pinterest" className="h-6 w-6"/></a>
            </div>
          </div>

          {/* Columna de suscripción */}
          <div className="w-full md:w-1/4">
            <h4 className="text-xl font-bold mb-4">Suscríbete</h4>
            <p className="text-gray-200 mb-4">Suscríbete a nuestro boletín para recibir las últimas novedades y ofertas exclusivas directamente en tu bandeja de entrada.</p>
            <form className="flex flex-col space-y-3">
              <input type="email" className="px-4 py-2 rounded-full focus:outline-none text-black" placeholder="Tu correo electrónico" />
              <button type="submit" className="bg-white text-teal-600 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors">Suscribirse</button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-400" />

        <div className="flex flex-wrap justify-between items-center text-gray-400">
          <p className="text-sm">&copy; {new Date().getFullYear()} MiTiendaDeColonias. Todos los derechos reservados.</p>
          <ul className="flex space-x-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mapa del Sitio</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
