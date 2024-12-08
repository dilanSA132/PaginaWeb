export const getPurchaseDetails = async () => {
    const response = await fetch('http://localhost:3000/api/v1/purchaseDetail', {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener los detalles de la compra');
    }
  
    return response.json();
  };
  
  export const getPurchaseDetailById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/purchaseDetail/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener el detalle de la compra');
    }
  
    return response.json();
  };
  
  export const createPurchaseDetail = async (data: { purchase_price: number, purchase_quantity: number, id_purchase: number, id_product: number }) => {
    const response = await fetch('http://localhost:3000/api/v1/purchaseDetail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al crear el detalle de la compra');
    }
  
    return response.json();
  };
  
  export const updatePurchaseDetail = async (id: number, data: { purchase_price?: number, purchase_quantity?: number, id_purchase?: number, id_product?: number }) => {
    const response = await fetch(`http://localhost:3000/api/v1/purchaseDetail/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al actualizar el detalle de la compra');
    }
  
    return response.json();
  };
  
  export const deletePurchaseDetail = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/purchaseDetail/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al eliminar el detalle de la compra');
    }
  
    return response.json();
  };
  