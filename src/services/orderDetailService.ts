const baseUrl = 'http://localhost:3000/api/v1/orderDetail';

export async function getOrderDetails() {
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error fetching order details');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createOrderDetail(orderDetail: any) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetail),
    });
    if (!response.ok) {
      throw new Error('Error creating order detail');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
