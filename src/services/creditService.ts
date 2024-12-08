export const getCredits = async () => {
    const response = await fetch('http://localhost:3000/api/v1/credit', {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener los créditos');
    }
  
    return response.json();
  };
  
  export const getCreditById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/credit/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener el crédito');
    }
  
    return response.json();
  };
  
  export const createCredit = async (data: { credit_amount: number, credit_balance: number, due_date?: Date, id_customer: number }) => {
    const response = await fetch('http://localhost:3000/api/v1/credit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al crear el crédito');
    }
  
    return response.json();
  };
  
  export const updateCredit = async (id: number, data: { credit_amount?: number, credit_balance?: number, due_date?: Date, credit_status?: string }) => {
    const response = await fetch(`http://localhost:3000/api/v1/credit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al actualizar el crédito');
    }
  
    return response.json();
  };
  
  export const deleteCredit = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/credit/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al eliminar el crédito');
    }
  
    return response.json();
  };
  