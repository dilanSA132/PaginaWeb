// src/services/roleService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getRoles() {
  const response = await fetch(`${API_BASE_URL}/roles`);
  if (!response.ok) {
    throw new Error('Error al obtener los roles');
  }
  return await response.json();
}

export async function createRole(data: { name: string }) {
  const response = await fetch(`${API_BASE_URL}/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al crear el rol');
  }

  return await response.json();
}

export async function updateRole(id: number, data: { name: string }) {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el rol');
  }

  return await response.json();
}

export async function deleteRole(id: number) {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
    method: 'DELETE',
    mode: 'no-cors',

  });

  if (!response.ok) {
    throw new Error('Error al eliminar el rol');
  }

  return await response.json();
}
