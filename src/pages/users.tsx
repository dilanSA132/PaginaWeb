// pages/users.tsx
import React from 'react';
import UserMaintenance from '../components/UserMaintenance/UserMaintenance'; // Asegúrate de que la ruta sea correcta

const users: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mantenimiento de Usuarios</h1>
      <UserMaintenance />
    </div>
  );
};

export default users;
