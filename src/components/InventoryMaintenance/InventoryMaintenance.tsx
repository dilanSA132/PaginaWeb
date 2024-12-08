// components/InventoryMaintenance/InventoryMaintenance.tsx
import React, { useEffect, useState } from 'react';
import UniversalTable from '../universalTable/Table/Table'; // Asegúrate de que la ruta sea correcta
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/inventoryService'; // Asegúrate de que la ruta sea correcta

interface Category {
  id_category: number;
  name: string;
  description: string;
}

interface Product {
  id_product: number;
  name: string;
  description: string;
  quantity: number;
  purchase_price: number;
  sale_price: number;
  purchase_date: string;
  image_url: string;
  id_category: number;
  category: Category; 
}

const InventoryMaintenance: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (product: Product) => {
    try {
      await deleteProduct(product.id_product);
      setProducts(products.filter(p => p.id_product !== product.id_product));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleEdit = async (product: Product) => {
    try {
      // Aquí puedes agregar lógica para editar un producto, como abrir un modal y luego hacer la llamada a updateProduct
      console.log(`Editando producto: ${product.name}`);
      const updatedProductData = { ...product, name: 'Nuevo Nombre', purchase_price: 100, quantity: 10 }; // Ejemplo de edición
      await updateProduct(product.id_product, updatedProductData);
      setProducts(products.map(p => (p.id_product === product.id_product ? { ...p, ...updatedProductData } : p)));
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };

  // Definición de las columnas de la tabla
  const columns = [
    { label: 'ID', accessor: 'id_product' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Descripción', accessor: 'description' },
    { label: 'Cantidad', accessor: 'quantity' },
    { label: 'Precio de Compra', accessor: 'purchase_price' },
    { label: 'Precio de Venta', accessor: 'sale_price' },
    { label: 'Fecha de Compra', accessor: 'purchase_date' },
    { label: 'URL de Imagen', accessor: 'image_url' },
    { label: 'ID Categoría', accessor: 'id_category' },
    { label: 'Nombre de Categoría', accessor: 'category.name' }, // Acceso a la propiedad anidada
  ];

  return (
    <div className="ml-5 mr-5 mt-5 overflow-x-auto">
      <UniversalTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default InventoryMaintenance;
