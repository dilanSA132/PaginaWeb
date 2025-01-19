import { OrderDetails } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseUrl = `${API_BASE_URL}/orderDetails`;

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
      body: JSON.stringify(orderDetails),
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

export async function deleteOrderDetail(id: number) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting order detail');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateOrderDetail(id: number, updatedOrderDetail: OrderDetails) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOrderDetail),
    });
    if (!response.ok) {
      throw new Error('Error updating order detail');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
