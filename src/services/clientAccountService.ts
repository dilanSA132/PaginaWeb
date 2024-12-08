export const getClientAccounts = async () => {
    const response = await fetch('http://localhost:3000/api/v1/client-accounts', {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener las cuentas de cliente');
    }
  
    return response.json();
  };
  
  export const getClientAccountById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/client-accounts/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener la cuenta del cliente');
    }
  
    return response.json();
  };
  
  export const createClientAccount = async (data: { account_balance: number, id_client: number }) => {
    const response = await fetch('http://localhost:3000/api/v1/client-accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al crear la cuenta del cliente');
    }
  
    return response.json();
  };
  
  export const updateClientAccount = async (id: number, data: { account_balance?: number, id_client?: number }) => {
    const response = await fetch(`http://localhost:3000/api/v1/client-accounts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al actualizar la cuenta del cliente');
    }
  
    return response.json();
  };
  
  export const deleteClientAccount = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/client-accounts/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al eliminar la cuenta del cliente');
    }
  
    return response.json();
  };
  