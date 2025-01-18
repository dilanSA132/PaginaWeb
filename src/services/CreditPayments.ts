export async function getCreditsDetails() {
  const response = await fetch('http://localhost:3000/api/v1/CreditPayments');
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
  const response = await fetch('http://localhost:3000/api/v1/CreditPayments', {
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
  const response = await fetch(`http://localhost:3000/api/v1/CreditPayments/${id}`, {
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
  const response = await fetch(`http://localhost:3000/api/v1/CreditPayments/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar los detalles de crédito');
  }

  return await response.json();
}
