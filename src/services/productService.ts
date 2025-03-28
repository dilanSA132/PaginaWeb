
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  return await response.json();
}

export async function createProduct(data: { 
  name: string; 
  description?: string; 
  purchasePrice: number; 
  salePrice: number; 
  stock: number; 
  categoryId: number; 
  image?: string 
}) {
  const response = await fetch(`${API_BASE_URL}/products`, {
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
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
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

export async function updateStockProduct(data: { id: number; stock: number }) {
  const response = await fetch(`${API_BASE_URL}/products/${data.id}`, {
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
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }

  return await response.json();
}
