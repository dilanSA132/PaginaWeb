// pages/users.tsx
import React from 'react';
import InventoryMaintenance from '@/components/InventoryMaintenance/InventoryMaintenance'; '../components/UserMaintenance/UserMaintenance'; // Asegúrate de que la ruta sea correcta

const inventory: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mantenimiento de Inventario</h1>
      <InventoryMaintenance />
    </div>
  );
};

export default inventory;
