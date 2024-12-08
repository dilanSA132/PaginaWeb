export const getClients = async () => {
    const response = await fetch('http://localhost:3000/api/v1/clients', {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener los clientes');
    }
  
    return response.json();
  };
  
  export const getClientById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/clients/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener el cliente');
    }
  
    return response.json();
  };
  
  export const createClient = async (data: { name: string, email: string, phone?: string, address?: string }) => {
    const response = await fetch('http://localhost:3000/api/v1/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al crear el cliente');
    }
  
    return response.json();
  };
  
  export const updateClient = async (id: number, data: { name?: string, email?: string, phone?: string, address?: string }) => {
    const response = await fetch(`http://localhost:3000/api/v1/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al actualizar el cliente');
    }
  
    return response.json();
  };
  
  export const deleteClient = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/clients/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al eliminar el cliente');
    }
  
    return response.json();
  };
  