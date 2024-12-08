export const getSales = async () => {
  const response = await fetch('http://localhost:3000/api/v1/sale', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener las ventas');
  }

  return response.json();
};

export const getSaleById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/sale/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener la venta');
  }

  return response.json();
};

export const createSale = async (data: { sale_date: Date, total_amount: number, id_client: number, id_user: number }) => {
  const response = await fetch('http://localhost:3000/api/v1/sale', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al crear la venta');
  }

  return response.json();
};

export const updateSale = async (id: number, data: { sale_date?: Date, total_amount?: number, id_client?: number, id_user?: number }) => {
  const response = await fetch(`http://localhost:3000/api/v1/sale/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al actualizar la venta');
  }

  return response.json();
};

export const deleteSale = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/sale/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al eliminar la venta');
  }

  return response.json();
};
