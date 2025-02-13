const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Parameter {
  id: number;
  info?: string;
  email: string;
  emailPassword: string;
  location?: string;
  pageName: string;
  mission?: string;
  vision?: string;
  logo?: string;
  createdAt: string; 
  phone: string; 
}

export async function getParameters(): Promise<Parameter[]> {
  const response = await fetch(`${API_BASE_URL}/parameters`);
  if (!response.ok) {
    throw new Error('Error al obtener los parámetros');
  }
  return await response.json();
}

export async function createParameters(
  data: Omit<Parameter, 'id' | 'createdAt'>
): Promise<Parameter> {
  const response = await fetch(`${API_BASE_URL}/parameters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al crear los parámetros');
  }
  return await response.json();
}

export async function updateParameters(
  id: number,
  data: Parameter
): Promise<Parameter> {
  const response = await fetch(`${API_BASE_URL}/parameters/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar los parámetros');
  }
  return await response.json();
}

// Elimina un parámetro
export async function deleteParameters(id: number): Promise<Parameter> {
  const response = await fetch(`${API_BASE_URL}/parameters/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar los parámetros');
  }
  return await response.json();
}
