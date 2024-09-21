const baseUrl = 'http://localhost:3000/api/v1/saleDetail';

export async function getSaleDetails() {
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error fetching sale details');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createSaleDetail(saleDetail: any) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleDetail),
    });
    if (!response.ok) {
      throw new Error('Error creating sale detail');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
