export const getProducts = async () => {
  const response = await fetch('http://localhost:3000/api/v1/inventory', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener los productos');
  }

  return response.json();
};

export const getProductById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/inventory/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener el producto');
  }

  return response.json();
};

export const createProduct = async (data: { name: string, description?: string, quantity: number, purchase_price: number, sale_price: number, id_category: number }) => {
  const response = await fetch('http://localhost:3000/api/v1/inventory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al crear el producto');
  }

  return response.json();
};

export const updateProduct = async (id: number, data: { name?: string, description?: string, quantity?: number, purchase_price?: number, sale_price?: number, id_category?: number }) => {
  const response = await fetch(`http://localhost:3000/api/v1/inventory/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al actualizar el producto');
  }

  return response.json();
};

export const deleteProduct = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/inventory/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al eliminar el producto');
  }

  return response.json();
};
