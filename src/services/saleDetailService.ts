export const getSaleDetails = async () => {
    const response = await fetch('http://localhost:3000/api/v1/saleDetails', {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener los detalles de la venta');
    }
  
    return response.json();
  };
  
  export const getSaleDetailById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/saleDetails/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener el detalle de la venta');
    }
  
    return response.json();
  };
  
  export const createSaleDetail = async (data: { quantity: number, unit_price: number, id_product: number, id_sale: number }) => {
    const response = await fetch('http://localhost:3000/api/v1/saleDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al crear el detalle de la venta');
    }
  
    return response.json();
  };
  
  export const updateSaleDetail = async (id: number, data: { quantity?: number, unit_price?: number, id_product?: number, id_sale?: number }) => {
    const response = await fetch(`http://localhost:3000/api/v1/saleDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al actualizar el detalle de la venta');
    }
  
    return response.json();
  };
  
  export const deleteSaleDetail = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/saleDetails/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al eliminar el detalle de la venta');
    }
  
    return response.json();
  };
  