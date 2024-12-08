export const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/v1/user', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener los usuarios');
  }

  return response.json();
};

export const getUserById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/user/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener el usuario');
  }

  return response.json();
};

export const createUser = async (data: { email: string, name: string, password: string, roleId: number }) => {
  const response = await fetch('http://localhost:3000/api/v1/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al crear el usuario');
  }

  return response.json();
};

export const updateUser = async (id: number, data: { email?: string, name?: string, password?: string, roleId?: number }) => {
  const response = await fetch(`http://localhost:3000/api/v1/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al actualizar el usuario');
  }

  return response.json();
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/user/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al eliminar el usuario');
  }

  return response.json();
};
