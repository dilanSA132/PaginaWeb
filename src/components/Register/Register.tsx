import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { createUser } from '@/services/userService';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError(null);

    const userData = {
      name,
      email,
      password,
      roleId: 2 
    };

    try {
      const newUser = await createUser(userData);
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setLoading(false);
      setError('Error al registrar usuario: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-100 to-green-100 animate-fade-in">
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full transform transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold text-center mb-6 text-teal-600">Registrarse</h2>
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="text-left">
                <label className="block text-gray-700 mb-2" htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-gray-900"
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>
              <div className="text-left">
                <label className="block text-gray-700 mb-2" htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-gray-900"
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="text-left">
                <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-gray-900"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <div className="text-left">
                <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-gray-900"
                  placeholder="Repite tu contraseña"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-full hover:bg-teal-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
          <p className="mt-6 text-center text-gray-700">
            ¿Ya tienes una cuenta? <a href="/login" className="text-teal-600 hover:underline">Inicia sesión aquí</a>
          </p>
        </div>
      </main>
      <Footer />

      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-teal-600">¡Usuario Creado!</h3>
            <p className="text-gray-700 mt-4">El usuario ha sido registrado con éxito.</p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-600 transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
