import { useEffect, useState } from 'react';
import { getParameters } from '@/services/parametersService'; // Asegúrate de tener este servicio configurado

const Footer: React.FC = () => {
  const [parameterData, setParameterData] = useState<any>(null);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const parameters = await getParameters();
        setParameterData(parameters[0]); // Suponiendo que solo tienes un registro de parámetros
      } catch (error) {
        console.error("Error al obtener los parámetros:", error);
      }
    };

    fetchParameters();
  }, []);

  if (!parameterData) {
    return <footer className="bg-gradient-to-r from-teal-500 to-green-600 text-white py-12">Cargando...</footer>;
  }

  return (
    <footer className="bg-gradient-to-r from-teal-500 to-green-600 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between text-gray-200">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-2xl font-bold mb-4">Mi Tienda</h4>
            <p>{parameterData.info || 'Tu tienda en línea de colonias y perfumes de lujo. Encuentra tu fragancia perfecta y disfruta de nuestros productos exclusivos.'}</p>
          </div>

          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4 flex">Enlaces Rápidos</h4>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#productos" className="hover:text-white transition-colors">Productos</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
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
            <p className="mt-4">Correo: <a href={`mailto:${parameterData.email}`} className="hover:underline">{parameterData.email}</a></p>
            <p>Teléfono: <a href={`tel:${parameterData.phone}`} className="hover:underline">{parameterData.phone}</a></p>
          </div>
        </div>

        <hr className="my-4 border-gray-400" />

        <div className="flex justify-between items-center text-white">
          <p className="text-sm">&copy; {new Date().getFullYear()} MiTiendaDeColonias. Todos los derechos reservados.</p>
          <p className="text-sm">Creado por <a href="https://www.instagram.com/dilan_sancho.9/" className="hover:underline">Dilan Sancho Lopez</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
