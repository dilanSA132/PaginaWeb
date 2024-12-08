export const getRoles = async () => {
  const response = await fetch('http://localhost:3000/api/v1/role', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener los roles');
  }

  return response.json();
};

export const getRoleById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/role/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener el rol');
  }

  return response.json();
};

export const createRole = async (data: { role_name: string, permissions?: string[] }) => {
  const response = await fetch('http://localhost:3000/api/v1/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al crear el rol');
  }

  return response.json();
};

export const updateRole = async (id: number, data: { role_name?: string, permissions?: string[] }) => {
  const response = await fetch(`http://localhost:3000/api/v1/role/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al actualizar el rol');
  }

  return response.json();
};

export const deleteRole = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/role/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al eliminar el rol');
  }

  return response.json();
};
