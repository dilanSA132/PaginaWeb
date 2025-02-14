import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getParameters, Parameter } from '../services/parametersService';

const About: React.FC = () => {
  const [parameters, setParameters] = useState<Parameter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const data = await getParameters();
        setParameters(data[0]);
      } catch (error) {
        setError('Error al obtener los parámetros');
      } finally {
        setLoading(false);
      }
    };

    fetchParameters();
  }, []);

  if (loading) return <div className="text-center py-10 text-xl">Cargando...</div>;
  if (error) return <div className="text-center py-10 text-xl text-red-600">{error}</div>;

  const handleClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-gray-800">Acerca de Nosotros</h2>

          {/* Contenedor de tarjetas responsivo */}
          <div className="flex flex-col md:flex-row md:justify-center gap-8 md:gap-12 mb-12">
            {/* Tarjeta Información */}
            <div
              className="relative w-full md:w-96 h-64 bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 shadow-xl rounded-lg p-6 cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-blink"
              onClick={() => handleClick('info')}
            >
              <div className="flex items-center justify-center h-full">
                <h3 className="text-3xl font-bold text-white">Información</h3>
              </div>
              {activeSection === 'info' && (
                <div className="absolute inset-0 p-6 bg-teal-500 rounded-lg opacity-100 transition-opacity duration-500">
                  <p className="text-lg md:text-xl font-light text-white">{parameters?.info}</p>
                </div>
              )}
            </div>

            {/* Tarjeta Misión */}
            <div
              className="relative w-full md:w-96 h-64 bg-gradient-to-r from-green-200 via-green-300 to-green-400 shadow-xl rounded-lg p-6 cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-blink"
              onClick={() => handleClick('mission')}
            >
              <div className="flex items-center justify-center h-full">
                <h3 className="text-3xl font-bold text-white">Misión</h3>
              </div>
              {activeSection === 'mission' && (
                <div className="absolute inset-0 p-6 bg-green-500 rounded-lg opacity-100 transition-opacity duration-500">
                  <p className="text-lg md:text-xl font-light italic text-white">
                    "{parameters?.mission}"
                  </p>
                </div>
              )}
            </div>

            {/* Tarjeta Visión */}
            <div
              className="relative w-full md:w-96 h-64 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 shadow-xl rounded-lg p-6 cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-blink"
              onClick={() => handleClick('vision')}
            >
              <div className="flex items-center justify-center h-full">
                <h3 className="text-3xl font-bold text-white">Visión</h3>
              </div>
              {activeSection === 'vision' && (
                <div className="absolute inset-0 p-6 bg-purple-500 rounded-lg opacity-100 transition-opacity duration-500">
                  <p className="text-lg md:text-xl font-light text-white">
                    {parameters?.vision}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default About;
