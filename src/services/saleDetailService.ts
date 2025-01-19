// src/services/saleDetailService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getSaleDetails() {
  try {
    const response = await fetch(`${API_BASE_URL}/saleDetails`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error fetching sale details');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createSaleDetail(saleDetail: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/saleDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleDetail),
    });
    if (!response.ok) {
      throw new Error('Error creating sale detail');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un detalle de venta
export async function deleteSaleDetail(saleDetailId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/saleDetails/${saleDetailId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting sale detail');
    }
    return true; // o cualquier mensaje de éxito
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar un detalle de venta
export async function updateSaleDetail(saleDetailId: number, saleDetailData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/saleDetails/${saleDetailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleDetailData),
    });
    if (!response.ok) {
      throw new Error('Error updating sale detail');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSaleDetailsBySaleId(saleId: number) {
  const response = await fetch(`${API_BASE_URL}/saleDetails/${saleId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al obtener los detalles de la venta');
  }

  return await response.json();
}
