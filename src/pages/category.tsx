// pages/users.tsx
import React from 'react';
import CategoryMaintenance from '@/components/CategoryMaintenance/CategoryMaintenance'; '../components/CategoryMaintenance/CategoryMaintenance'; // Asegúrate de que la ruta sea correcta

const categories: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mantenimiento de Categorias</h1>
      <CategoryMaintenance />
    </div>
  );
};

export default categories;
