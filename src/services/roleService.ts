// src/services/roleService.ts

export async function getRoles() {
    const response = await fetch('http://localhost:3000/api/v1/roles');
    if (!response.ok) {
      throw new Error('Error al obtener los roles');
    }
    return await response.json();
  }
  
  export async function createRole(data: { name: string }) {
    const response = await fetch('http://localhost:3000/api/v1/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error al crear el rol');
    }
  
    return await response.json();
  }
  
  export async function updateRole(id: number, data: { name: string }) {
    const response = await fetch(`http://localhost:3000/api/v1/roles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el rol');
    }
  
    return await response.json();
  }
  
  export async function deleteRole(id: number) {
    const response = await fetch(`http://localhost:3000/api/v1/roles/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Error al eliminar el rol');
    }
  
    return await response.json();
  }
  