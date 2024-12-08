import React, { useEffect, useState } from 'react';
import UniversalTable from '../universalTable/Table/Table'; 
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';

interface Category {
  id: number;
  name: string;
  description: string;
}

const CategoryMaintenance: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (category: Category) => {
    try {
      await deleteCategory(category.id);
      setCategories(categories.filter(c => c.id !== category.id));
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  const handleEdit = async (category: Category) => {
    try {
      console.log(`Editando categoría: ${category.name}`);
      const updatedCategoryData = { ...category, name: 'Nuevo Nombre', description: 'Nueva Descripción' }; // Ejemplo de edición
      await updateCategory(category.id, updatedCategoryData);
      setCategories(categories.map(c => (c.id === category.id ? { ...c, ...updatedCategoryData } : c)));
    } catch (error) {
      console.error('Error al editar la categoría:', error);
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id_category' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Descripción', accessor: 'description' },
  ];

  return (
    <div className="ml-5 mr-5 mt-5 overflow-x-auto">
      <UniversalTable
        columns={columns}
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CategoryMaintenance;
