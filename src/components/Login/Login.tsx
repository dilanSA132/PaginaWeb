import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../Header';
import Footer from '../Footer';
import { authenticateUser } from '@/services/userService'; // Importa el servicio de autenticación

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter(); // Hook para redirigir

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const user = await authenticateUser(email, password);
      setLoading(false);
      setSuccess(`Bienvenido, ${user.user.name}!`);
      router.push('/menu'); // Redirigir a la página de menú
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-100 to-green-100 animate-fade-in">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold text-center mb-6 text-teal-600">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
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
            <div className="mb-6">
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
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-full hover:bg-teal-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={loading}
            >
              {loading ? 'Autenticando...' : 'Iniciar Sesión'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </form>
          <p className="mt-6 text-center text-gray-700">
            ¿No tienes una cuenta? <a href="/register" className="text-teal-600 hover:underline">Regístrate aquí</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
