import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          ¡Bienvenido a mi Página Web en TypeScript!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Construida con React, TypeScript y Tailwind CSS
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
          Empezar
        </button>
      </div>
    </div>
  );
}

export default App;
