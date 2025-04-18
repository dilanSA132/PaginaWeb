
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in the environment variables');
}

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}/users`);
  if (!response.ok) {
    throw new Error('Error al obtener los usuarios');
  }
  return await response.json();
};

export const createUser = async (userData: any) => {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Error al crear el usuario');
  }

  return await response.json();
};


export const setRecoverMode = async (email: string) => {
  const response = await fetch(`${baseUrl}/users/recUser/setPassTemp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Error al setear contraseña temporal al usuario');
  }

  return await response.json();
};


export const reActiveUser = async (email: string, tempPassword: string , newPassword: string) => {
  const response = await fetch(`${baseUrl}/users/recUser/reActiveUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, tempPassword, newPassword }), 
  });

  if (!response.ok) {
    throw new Error('Error al reactivar el usuario');
  }

  return await response.json();
};


export const deleteUser = async (id: number) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el usuario');
  }

  return await response.json();
};

export const updateUser = async (id: number, data: { name: string; email: string; roleId: number }) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el usuario');
  }

  return await response.json();
};

export const authenticateUser = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/users/byUsername`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Error al autenticar al usuario');
  }

  return await response.json();
};
