export const getCreditDetails = async () => {
    const response = await fetch('http://localhost:3000/api/v1/credit-details', {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener los detalles del crédito');
    }
  
    return response.json();
  };
  
  export const getCreditDetailById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/credit-details/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener el detalle del crédito');
    }
  
    return response.json();
  };
  
  export const createCreditDetail = async (data: { payment_amount: number, remaining_balance: number, payment_date: Date, id_credit: number }) => {
    const response = await fetch('http://localhost:3000/api/v1/credit-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al crear el detalle del crédito');
    }
  
    return response.json();
  };
  
  export const updateCreditDetail = async (id: number, data: { payment_amount?: number, remaining_balance?: number, payment_date?: Date, id_credit?: number }) => {
    const response = await fetch(`http://localhost:3000/api/v1/credit-details/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al actualizar el detalle del crédito');
    }
  
    return response.json();
  };
  
  export const deleteCreditDetail = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/credit-details/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al eliminar el detalle del crédito');
    }
  
    return response.json();
  };
  

  