
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in the environment variables');
}

export async function getSales() {
  const response = await fetch(`${baseUrl}/sales`);
  if (!response.ok) {
    throw new Error('Error al obtener las ventas');
  }
  return await response.json();
}

export async function createSale(data: any) {
  const response = await fetch(`${baseUrl}/sales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al crear la venta');
  }

  return await response.json();
}

export async function deleteSale(saleId: number) {
  const response = await fetch(`${baseUrl}/sales/${saleId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la venta');
  }

  return await response.json();
}

export async function updateSale(saleId: number, saleData: any) {
  const response = await fetch(`${baseUrl}/sales/${saleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(saleData),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la venta');
  }

  return await response.json();
}

export async function updateSaleStatus(saleId: number, paymentStatus: string) {
  const response = await fetch(`${baseUrl}/sales/${saleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentStatus }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el estado de la venta');
  }

  return await response.json();
}
