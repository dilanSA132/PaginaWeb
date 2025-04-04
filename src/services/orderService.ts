const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseUrl = `${API_BASE_URL}/orders`;

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

export async function getOrdersByUserId(userId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }), // Enviar el userId en el cuerpo de la solicitud
    });

    if (!response.ok) {
      throw new Error('Error fetching orders');
    }
    const re = await response.json();
    console.log("Aquiiiiii ", re)
    return re;
  } catch (error) {
    console.error('Error obteniendo órdenes:', error);
    throw error;
  }
}

export async function createOrder(order: any) {
  try {
    console.log('Este siiiiii es ', order);  

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

export async function deleteOrder(id: number) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting order');
    }
    return await response.json(); // Si deseas devolver alguna respuesta o confirmación
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateOrder(id: number, updatedOrder: any) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOrder),
    });
    if (!response.ok) {
      throw new Error('Error updating order');
    }
    return await response.json(); // Devuelve la orden actualizada
  } catch (error) {
    console.error(error);
    throw error;
  }
}
