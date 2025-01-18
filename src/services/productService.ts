// src/services/productService.ts

export async function getProducts() {
    const response = await fetch('http://localhost:3000/api/v1/products');
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    return await response.json();
  }
  
  export async function createProduct(data: { name: string; description?: string; purchasePrice:number, salePrice:number, stock:number,  categoryId: number; image?: string }) {
    const response = await fetch('http://localhost:3000/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }
  
    return await response.json();
  }
  
  export async function updateProduct(
    id: number,
    data: {
      name: string;
      description?: string;
      purchasePrice: number; // Precio de compra
      salePrice: number;     // Precio de venta
      stock: number;         // Cantidad en inventario
      categoryId: number;
      image?: string;
    }
  ) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }
  
    return await response.json();
  }
  





  export async function updateStockProduct(data:{ id: number, stock: number}) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }
  
    return await response.json();
  }
  


  
  export async function deleteProduct(id: number) {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }
  
    return await response.json();
  }
  