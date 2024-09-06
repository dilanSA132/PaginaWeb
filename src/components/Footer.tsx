import React from 'react';

const Footer: React.FC = () => {
  const links = ['Inicio', 'Productos', 'Suscríbete', 'Contacto', 'Política de Privacidad'];

  return (
    <footer className="bg-gradient-to-r from-teal-500 to-green-600 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between text-gray-200">
          {/* Sección de Información */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-2xl font-bold mb-4">MiTiendaDeColonias</h4>
            <p>Tu tienda en línea de colonias y perfumes de lujo. Encuentra tu fragancia perfecta y disfruta de nuestros productos exclusivos.</p>
            <p className="mt-4">Correo: <a href="mailto:contacto@mitiendadecolonias.com" className="hover:underline">contacto@mitiendadecolonias.com</a></p>
            <p>Teléfono: <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a></p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Enlaces Rápidos</h4>
            <ul>
              {links.map((link, index) => (
                <li key={index} className="mb-2">
                  <a href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Síguenos</h4>
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>

          {/* Suscripción */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Suscríbete a nuestro boletín</h4>
            <p className="mb-4">Recibe ofertas exclusivas y novedades directamente en tu bandeja de entrada.</p>
            <form>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              />
              <button className="w-full bg-teal-500 text-white py-2 rounded-full hover:bg-teal-600 transition-colors">
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-400" />

        <div className="flex justify-between items-center text-gray-400">
          <p className="text-sm">&copy; {new Date().getFullYear()} MiTiendaDeColonias. Todos los derechos reservados.</p>
          <ul className="flex space-x-4 text-sm">
            {['Términos y Condiciones', 'Política de Privacidad', 'Mapa del Sitio'].map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:text-white transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
