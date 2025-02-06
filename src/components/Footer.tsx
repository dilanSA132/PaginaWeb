import About from '@/pages/about';
import React from 'react';

const Footer: React.FC = () => {
  const links = ['Inicio', 'Productos', 'About'];

  return (
    <footer className="bg-gradient-to-r from-teal-500 to-green-600 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between text-gray-200">

          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-2xl font-bold mb-4 ">Mi Tienda</h4>
            <p>Tu tienda en línea de colonias y perfumes de lujo. Encuentra tu fragancia perfecta y disfruta de nuestros productos exclusivos.</p>

          </div>

          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4 flex">Enlaces Rápidos</h4>
            <ul className="flex space-x-4">
              {links.map((link, index) => (
              <li key={index} className="mb-2">
                <a href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">{link}</a>
              </li>
              ))}
            </ul>
       
          </div>

          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Síguenos</h4>
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" alt="Facebook" className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png" alt="Instagram" className="w-6 h-6" />
                </a>
              </li>
            </ul>
            <p className="mt-4">Correo: <a href="mailto:contacto@mitiendadecolonias.com" className="hover:underline">contacto@mitiendadecolonias.com</a></p>
            <p>Teléfono: <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a></p>
          </div>
        </div>

        <hr className="my-4 border-gray-400" />

        <div className="flex justify-between items-center text-white">
          <p className="text-sm">&copy; {new Date().getFullYear()} MiTiendaDeColonias. Todos los derechos reservados.</p>
          <p className="text-sm ">Creado por <a href="https://www.cristalab.com" className="hover:underline">Dilan Sancho Lopez</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
