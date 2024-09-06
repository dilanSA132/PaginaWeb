import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getProducts, createProduct, deleteProduct, updateProduct } from '@/services/productService'; // Importa el servicio

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
}

const MantenimientoProductos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', description: '', price: 0, categoryId: 0 });
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos editando

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (err: any) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openModalForNewProduct = () => {
    setIsEditing(false); // Estamos creando un nuevo producto
    setNewProduct({ id: 0, name: '', description: '', price: 0, categoryId: 0 }); // Limpia el formulario
    setModalIsOpen(true);
  };

  const openModalForEditProduct = (product: Product) => {
    setIsEditing(true); // Estamos editando un producto existente
    setNewProduct({ ...product }); // Carga la info del producto en el formulario
    setModalIsOpen(true);
  };

  const handleSaveProduct = async () => {
    if (isEditing) {
      // Si estamos en modo edición, actualizamos el producto existente
      try {
        const updatedProduct = await updateProduct(newProduct.id, {
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          categoryId: newProduct.categoryId,
        }); // Llama al servicio
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        setModalIsOpen(false);
        setNewProduct({ id: 0, name: '', description: '', price: 0, categoryId: 0 }); // Limpia los campos después de guardar
      } catch (err: any) {
        setError('Error al actualizar el producto');
      }
    } else {
      // Si no estamos en modo edición, estamos creando un nuevo producto
      try {
        const createdProduct = await createProduct({
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          categoryId: newProduct.categoryId,
        });
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
        setModalIsOpen(false);
        setNewProduct({ id: 0, name: '', description: '', price: 0, categoryId: 0 }); // Limpia los campos después de crear
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
    { label: 'Categoría', accessor: 'categoryId' },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Mantenimiento de Productos</h1>

      {/* Botón para abrir el modal de creación de producto */}
      <button
        onClick={openModalForNewProduct}
        className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-600"
      >
        Nuevo Producto
      </button>

      {/* Mostrar errores */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar tabla si no está cargando */}
      {!loading ? (
        <UniversalTable
          columns={columns}
          data={products}
          onEdit={openModalForEditProduct} // Al editar, abre el modal con la info del producto
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-center text-gray-600">Cargando productos...</p>
      )}

      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
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
          <input
            type="number"
            id="categoryId"
            value={newProduct.categoryId}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: parseInt(e.target.value) })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el ID de la categoría"
          />
        </div>
        <button
          onClick={handleSaveProduct}
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
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

export default MantenimientoProductos;
