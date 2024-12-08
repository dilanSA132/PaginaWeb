import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getCategories, createCategory, deleteCategory, updateCategory } from '@/services/categoryService'; 

interface Category {
  id: number;
  name: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>({ id: 0, name: '' });
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (err: any) {
        setError('Error al cargar las categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const openModalForNewCategory = () => {
    setIsEditing(false); 
    setNewCategory({ id: 0, name: '' }); 
    setModalIsOpen(true);
  };

  const openModalForEditCategory = (category: Category) => {
    setIsEditing(true); 
    setNewCategory({ ...category }); 
    setModalIsOpen(true);
  };

  const handleSaveCategory = async () => {
    if (isEditing) {
      try {
        const updatedCategory = await updateCategory(newCategory.id, { name: newCategory.name });
        setCategories((prevCategories) =>
          prevCategories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
        );
        setModalIsOpen(false);
        setNewCategory({ id: 0, name: '' }); 
      } catch (err: any) {
        setError('Error al actualizar la categoría');
      }
    } else {
      try {
        const createdCategory = await createCategory({ name: newCategory.name });
        setCategories((prevCategories) => [...prevCategories, createdCategory]);
        setModalIsOpen(false);
        setNewCategory({ id: 0, name: '' }); 
      } catch (err: any) {
        setError('Error al crear la categoría');
      }
    }
  };

  const handleDelete = async (category: Category) => {
    try {
      await deleteCategory(category.id);
      setCategories((prevCategories) => prevCategories.filter((c) => c.id !== category.id));
    } catch (err: any) {
      setError('Error al eliminar la categoría');
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Mantenimiento de Categorías</h1>

      <button
        onClick={openModalForNewCategory}
        className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-600"
      >
        Nueva Categoría
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {!loading ? (
        <UniversalTable
          columns={columns}
          data={categories}
          onEdit={openModalForEditCategory} 
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-center text-gray-600">Cargando categorías...</p>
      )}

      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el nombre de la categoría"
          />
        </div>
        <button
          onClick={handleSaveCategory}
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Categoría'}
        </button>
        <button
          onClick={() => setModalIsOpen(false)}
          className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
        >
          Cancelar
        </button>
      </CustomModal>
    </div>
  );
};

export default Categories;
