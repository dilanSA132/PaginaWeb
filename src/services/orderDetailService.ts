import { OrderDetails } from "./types";

const baseUrl = 'http://localhost:3000/api/v1/orderDetails';

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
export async function createOrderDetail(orderDetails: OrderDetails[]) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails), // Enviar un array de detalles
    });
    if (!response.ok) {
      throw new Error('Error creating order details');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
