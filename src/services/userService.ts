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
  
  export const updateUser = async (id: number, userData: any) => {
    const response = await fetch(`/api/v1/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error updating user');
    }
    return response.json();
  };
  