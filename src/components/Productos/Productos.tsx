import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getProducts, createProduct, deleteProduct, updateProduct } from '@/services/productService';
import { getCategories } from '@/services/CategoriesService';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Product {
  id: number;
  name: string;
  description?: string;
  purchasePrice: number; // Precio de compra  
  salePrice: number;     // Precio de venta
  stock: number;         // Cantidad en inventario
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
  const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', description: '', purchasePrice:0, salePrice:0 , stock:0, categoryId: 0, image: '' });
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
    setNewProduct({ id: 0, name: '', description: '', purchasePrice:0, salePrice:0, stock:0, categoryId: 0, image: '' });
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
          purchasePrice: newProduct.purchasePrice,
          salePrice: newProduct.salePrice,
          stock: newProduct.stock,  
          categoryId: newProduct.categoryId,
          image: newProduct.image,
        });
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        setModalIsOpen(false);
        setNewProduct({ id: 0, name: '', description: '', purchasePrice:0, salePrice:0, stock:0, categoryId: 0, image: '' });
      } catch (err: any) {
        setError('Error al actualizar el producto');
      }
    } else {
      try {
        const createdProduct = await createProduct({
          name: newProduct.name,
          description: newProduct.description,
          purchasePrice: newProduct.purchasePrice,
          salePrice: newProduct.salePrice,  
          stock: newProduct.stock,  
          categoryId: newProduct.categoryId,
          image: newProduct.image,
        });
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
        setModalIsOpen(false);
        setNewProduct({ id: 0, name: '', description: '',purchasePrice:0,  salePrice:0, stock:0,  categoryId: 0, image: '' });
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
    { label: 'Precio de Compra', accessor: 'purchasePrice' },
    { label: 'Precio de Venta', accessor: 'salePrice' },
    { label: 'Cantidad', accessor: 'stock' },
    { label: 'Categoría', accessor: 'categoryName' },
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


  const handleDownloadExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Catálogo de Productos');

      // Define columns
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'name', width: 30 },
        { header: 'Descripción', key: 'description', width: 50 },
        { header: 'PrecioCompra', key: 'purchasePrice', width: 20 },
        { header: 'PrecioVenta', key: 'salePrice', width: 20 },
        { header: 'Cantidad', key: 'stock', width: 20 },    
        { header: 'Categoría', key: 'category', width: 20 },
        { header: 'Imagen', key: 'image', width: 30 },
      ];

      products.forEach(product => {
        worksheet.addRow({
          id: product.id,
          name: product.name,
          description: product.description || 'Sin descripción',
          purchasePrice: product.purchasePrice, 
          salePrice: product.salePrice, 
          stock: product.stock,
          category: getCategoryName(product.categoryId),
          image: product.image || 'Sin imagen',
        });
      });

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFCC00' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      const analysisWorksheet = workbook.addWorksheet('Análisis de Precios');
      analysisWorksheet.columns = [
        { header: 'Producto', key: 'name', width: 30 },
        { header: 'Precio', key: 'price', width: 15 }
      ];

      // Add rows to the analysis worksheet
      products.forEach(product => {
        analysisWorksheet.addRow({ name: product.name,purchasePrice: product.purchasePrice, salePrice: product.salePrice, stock: product.stock });  
      });

      // Style the header of the analysis worksheet
      analysisWorksheet.getRow(1).font = { bold: true };
      analysisWorksheet.getRow(1).eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD700' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      const totalRow = analysisWorksheet.addRow([
        'Total Valor del Inventario',
        { formula: `SUM(B2:B${products.length + 1})` }
      ]);

      totalRow.font = { bold: true };
      totalRow.eachCell((cell, colNumber) => {
        if (colNumber === 1) {
          cell.alignment = { horizontal: 'right' };
        }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'E0E0E0' },
        };
      });

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), 'catalogo_productos_con_datos.xlsx');
      toast.success('Catálogo de productos descargado con éxito!');

    } catch (error) {
      toast.error('Error al generar el archivo de Excel');
    }
  };



  const handleImportExcel = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: Array<{ Nombre: string; Descripción: string; PrecioCompra:any, PrecioVenta:any, Cantidad:any,  Categoría: string; Imagen?: string }> = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        for (const product of jsonData) {
          try {
             
            await createProduct({
              name: product.Nombre,
              description: product.Descripción || '',
              purchasePrice: product.PrecioCompra,
              salePrice:   product.PrecioVenta, 
              stock:    product.Cantidad,
              categoryId: categories.find(c => c.name === product.Categoría)?.id || 0,
              image: product.Imagen || '',
            });
          } catch (error) {
            toast.error(`Error al importar el producto: ${product.Nombre}  ` );
          }
        }

        const productsResponse = await getProducts();
        setProducts(productsResponse);
      };

      reader.readAsArrayBuffer(file);
      toast.success('Archivo de Excel importado con éxito!');
    } catch (error) {
      toast.error('Error al importar el archivo de Excel');
      console.error("Error al importar el archivo de Excel:", error);
    }
  };


  return (
    <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Mantenimiento de Productos</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={openModalForNewProduct}
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
        >
          Nuevo Producto
        </button>

        <div className="flex space-x-4">
          <button
            onClick={handleDownloadExcel}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
          >
            Descargar Catálogo
          </button>

          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleImportExcel}
            className="text-black border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>


      {error && <p className="text-red-500">{error}</p>}

      {!loading ? (
        <UniversalTable
          columns={columns}
          data={productsWithCategoryName}
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
          <label className="block text-gray-700 mb-2" htmlFor="purchasePrice">Precio Compra</label>
          <input
            type="number"
            id="purchasePrice"
            value={newProduct.purchasePrice}
            onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: parseFloat(e.target.value) })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el precio del producto"
          />
        </div>   
         <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="salePrice">Precio Venta</label>
          <input
            type="number"
            id="salePrice"
            value={newProduct.salePrice}
            onChange={(e) => setNewProduct({ ...newProduct, salePrice: parseFloat(e.target.value) })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el precio del producto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="stock">Cantidad</label>
          <input
            type="number"
            id="stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseFloat(e.target.value) })}
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
