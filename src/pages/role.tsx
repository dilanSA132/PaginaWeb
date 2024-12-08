// pages/users.tsx
import React from 'react';
import RolMaintenance from '../components/RoleMaintenance/RoleMaintenance'; // Asegúrate de que la ruta sea correcta

const roles: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mantenimiento de Roles</h1>
      <RolMaintenance />
    </div>
  );
};

export default roles;
