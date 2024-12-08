export const getAccountsReceivable = async () => {
  const response = await fetch('http://localhost:3000/api/v1/accountsReceivable', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener las cuentas por cobrar');
  }

  return response.json();
};

export const getAccountReceivableById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/accountsReceivable/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener la cuenta por cobrar');
  }

  return response.json();
};

export const createAccountReceivable = async (data: { debt_amount: number, issue_date: string, due_date?: string, account_status: string, id_customer: number }) => {
  const response = await fetch('http://localhost:3000/api/v1/accountsReceivable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al crear la cuenta por cobrar');
  }

  return response.json();
};

export const updateAccountReceivable = async (id: number, data: { debt_amount?: number, issue_date?: string, due_date?: string, account_status?: string, id_customer?: number }) => {
  const response = await fetch(`http://localhost:3000/api/v1/accountsReceivable/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al actualizar la cuenta por cobrar');
  }

  return response.json();
};

export const deleteAccountReceivable = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/accountsReceivable/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al eliminar la cuenta por cobrar');
  }

  return response.json();
};
