const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCreditsDetails() {
  const response = await fetch(`${API_BASE_URL}/CreditPayments`);
  if (!response.ok) {
    throw new Error('Error al obtener los detalles de crédito');
  }
  return await response.json();
}

export async function createCreditDetail(data: {
  creditId: number;
  paymentAmount: number;
  paymentDate: string;
  paymentMethod?: string;
  note?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/CreditPayments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al crear los detalles de crédito');
  }

  return await response.json();
}

export async function updateCreditDetail(
  id: number,
  data: {
    creditId?: number;
    paymentAmount?: number;
    paymentDate?: string;
    paymentMethod?: string;
    note?: string;
  }
) {
  const response = await fetch(`${API_BASE_URL}/CreditPayments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar los detalles de crédito');
  }

  return await response.json();
}

export async function deleteCreditDetail(id: number) {
  const response = await fetch(`${API_BASE_URL}/CreditPayments/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar los detalles de crédito');
  }

  return await response.json();
}
