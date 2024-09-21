const baseUrl = 'http://localhost:3000/api/v1/orders';

export async function getOrders() {
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error fetching orders');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createOrder(order: any) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error('Error creating order');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
