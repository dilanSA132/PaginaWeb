import React, { useState } from 'react';
import { setRecoverMode, reActiveUser } from '@/services/userService';  // Asegúrate de importar la función reActiveUser
import { useRouter } from 'next/router';

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showResetForm, setShowResetForm] = useState(false); // Nuevo estado para mostrar el formulario de restablecer la contraseña
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRecover = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await setRecoverMode(email);
      setMessage('Se ha enviado una contraseña temporal para restablecer tu contraseña.');
      setShowResetForm(true);  
    } catch (err: any) {
      setError(err.message || 'Hubo un error. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await reActiveUser(email, tempPassword, newPassword);
      setMessage('Contraseña restablecida correctamente');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Hubo un error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 animate-fade-in">
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-transform duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-center mb-6 text-teal-600">
            Recuperar Contraseña
          </h2>

          {!showResetForm ? (
            <form onSubmit={handleRecover}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-full hover:bg-teal-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Instrucciones'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="tempPassword">
                  Contraseña Temporal
                </label>
                <input
                  type="password"
                  id="tempPassword"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Ingresa la contraseña temporal"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Ingresa la nueva contraseña"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Confirma la nueva contraseña"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-full hover:bg-teal-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled={loading}
              >
                {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
              </button>
            </form>
          )}

          {message && (
            <p className="mt-4 text-green-500 text-center">{message}</p>
          )}
          {error && (
            <p className="mt-4 text-red-500 text-center">{error}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecoverPassword;
