export const getPurchases = async () => {
    const response = await fetch('http://localhost:3000/api/v1/purchases', {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener las compras');
    }
  
    return response.json();
  };
  
  export const getPurchaseById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/purchases/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener la compra');
    }
  
    return response.json();
  };
  
  export const createPurchase = async (data: { purchase_date: Date, total_purchase: number }) => {
    const response = await fetch('http://localhost:3000/api/v1/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al crear la compra');
    }
  
    return response.json();
  };
  
  export const updatePurchase = async (id: number, data: { purchase_date?: Date, total_purchase?: number }) => {
    const response = await fetch(`http://localhost:3000/api/v1/purchases/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al actualizar la compra');
    }
  
    return response.json();
  };
  
  export const deletePurchase = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/purchases/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al eliminar la compra');
    }
  
    return response.json();
  };
  