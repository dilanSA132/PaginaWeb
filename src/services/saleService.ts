const baseUrl = 'http://localhost:3000/api/v1/sales';

export async function getSales() {
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error fetching sales');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createSale(sale: any) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sale),
    });
    if (!response.ok) {
      throw new Error('Error creating sale');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar una venta
export async function deleteSale(saleId: number) {
  try {
    const response = await fetch(`${baseUrl}/${saleId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting sale');
    }
    return true; // o cualquier mensaje de éxito
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para actualizar una venta
export async function updateSale(saleId: number, saleData: any) {
  try {
    const response = await fetch(`${baseUrl}/${saleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData),
    });
    if (!response.ok) {
      throw new Error('Error updating sale');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
