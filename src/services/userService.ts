export const getUsers = async () => {
    const response = await fetch('/api/v1/users', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error fetching users');
    }
    return response.json();
  };
  
  export const createUser = async (userData: any) => {
    const response = await fetch('/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error creating user');
    }
    return response.json();
  };
  
  export const deleteUser = async (id: number) => {
    const response = await fetch(`/api/v1/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting user');
    }
    return response.json();
  };
  

export async function updateUser(id: number, data: { name: string; email: string }) {
  const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error actualizando el usuario');
  }

  const updatedUser = await response.json();
  return updatedUser;
}


  export const authenticateUser = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/v1/users/byUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error autenticando usuario');
      }
  
      return await response.json(); // Devolver los datos del usuario autenticado
    } catch (error: any) {
      throw new Error(error.message || 'Error en el servicio de autenticación');
    }
  };
  
  