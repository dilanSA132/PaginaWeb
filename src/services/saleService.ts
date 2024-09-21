const baseUrl = 'http://localhost:3000/api/v1/sale';

export async function getSales() {
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error fetching sales');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createSale(sale: any) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sale),
    });
    if (!response.ok) {
      throw new Error('Error creating sale');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
