import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getProducts, createProduct, deleteProduct, updateProduct } from '@/services/productService'; 
import { getCategories } from '@/services/CategoriesService'; 

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  image?: string;
}

interface Category {
  id: number;
  name: string;
}

const MantenimientoProductos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', description: '', price: 0, categoryId: 0, image: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([getProducts(), getCategories()]);
        setProducts(productsResponse);
        setCategories(categoriesResponse);
      } catch (err: any) {
        setError('Error al cargar los productos y categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const openModalForNewProduct = () => {
    setIsEditing(false);
    setNewProduct({ id: 0, name: '', description: '', price: 0, categoryId: 0, image: '' });
    setModalIsOpen(true);
  };

  const openModalForEditProduct = (product: Product) => {
    setIsEditing(true);
    setNewProduct({ ...product });
    setModalIsOpen(true);
  };

  const handleSaveProduct = async () => {
    if (isEditing) {
      try {
        const updatedProduct = await updateProduct(newProduct.id, {
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          categoryId: newProduct.categoryId,
          image: newProduct.image,
        });
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        setModalIsOpen(false);
        setNewProduct({ id: 0, name: '', description: '', price: 0, categoryId: 0, image: '' });
      } catch (err: any) {
        setError('Error al actualizar el producto');
      }
    } else {
      try {
        const createdProduct = await createProduct({
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          categoryId: newProduct.categoryId,
          image: newProduct.image,
        });
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
        setModalIsOpen(false);
        setNewProduct({ id: 0, name: '', description: '', price: 0, categoryId: 0, image: '' });
      } catch (err: any) {
        setError('Error al crear el producto');
      }
    }
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteProduct(product.id);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id));
    } catch (err: any) {
      setError('Error al eliminar el producto');
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Descripción', accessor: 'description' },
    { label: 'Precio', accessor: 'price' },
    { label: 'Categoría', accessor: 'categoryName' }, // Cambia el accesor para mostrar el nombre de la categoría
    { label: 'Imagen', accessor: 'image' },
  ];

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'No definida';
  };

  const productsWithCategoryName = products.map(product => ({
    ...product,
    categoryName: getCategoryName(product.categoryId),
  }));

  return (
    <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Mantenimiento de Productos</h1>

      <button
        onClick={openModalForNewProduct}
        className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-600"
      >
        Nuevo Producto
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {!loading ? (
        <UniversalTable
          columns={columns}
          data={productsWithCategoryName} // Usa los datos con el nombre de la categoría
          onEdit={openModalForEditProduct}
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-center text-gray-600">Cargando productos...</p>
      )}

      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-black">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el nombre del producto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            value={newProduct.description || ''}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa la descripción del producto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el precio del producto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="categoryId">Categoría</label>
          <select
            id="categoryId"
            value={newProduct.categoryId}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: parseInt(e.target.value) })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
          >
            <option value={0}>Selecciona una categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">Imagen</label>
          <input
            type="text"
            id="image"
            value={newProduct.image || ''}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa la URL de la imagen del producto"
          />
        </div>
        <button
          onClick={handleSaveProduct}
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
        >
          {isEditing ? 'Actualizar Producto' : 'Guardar Producto'}
        </button>
      </CustomModal>
    </div>
  );
};

export default MantenimientoProductos;
