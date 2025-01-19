const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1/sales';

export async function getSales() {
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching sales');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
}

export async function createSale(data:any) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error creating sale');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating sale:', error);
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
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error deleting sale');
    }
    return true; // o cualquier mensaje de éxito
  } catch (error) {
    console.error('Error deleting sale:', error);
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
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error updating sale');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating sale:', error);
    throw error;
  }
}


export async function updateSaleStatus(saleId: number, paymentStatus: string) {
  try {
    const response = await fetch(`${baseUrl}/${saleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentStatus }), 
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error updating sale');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating sale:', error);
    throw error;
  }
}
