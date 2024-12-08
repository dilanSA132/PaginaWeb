export const getCategories = async () => {
    const response = await fetch('http://localhost:3000/api/v1/categories', {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener las categorías');
    }
  
    return response.json();
  };
  
  export const getCategoryById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al obtener la categoría');
    }
  
    return response.json();
  };
  
  export const createCategory = async (data: { name: string, description?: string }) => {
    const response = await fetch('http://localhost:3000/api/v1/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al crear la categoría');
    }
  
    return response.json();
  };
  
  export const updateCategory = async (id: number, data: { name?: string, description?: string }) => {
    const response = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al actualizar la categoría');
    }
  
    return response.json();
  };
  
  export const deleteCategory = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error al eliminar la categoría');
    }
  
    return response.json();
  };
  