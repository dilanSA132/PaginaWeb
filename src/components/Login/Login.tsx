// Login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react'; // Importa el método signIn de next-auth
import Header from '../Header';
import Footer from '../Footer';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Captura el parámetro de la URL
  const { p } = router.query;

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Llamada al método signIn de next-auth
    const result = await signIn('credentials', {
      redirect: false, // Evitar redirección automática
      email,
      password
    });

    setLoading(false);

    if (result?.error) {
      // Mostrar error si ocurre algún problema durante la autenticación
      setError(result.error);
    } else {
      // Redirigir a la página solicitada o a /menu si no hay ninguna
      router.push(p ? String(p) : '/menu');
    }
  };

  return (
<div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 animate-fade-in">
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
