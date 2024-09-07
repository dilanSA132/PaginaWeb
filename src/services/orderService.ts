export async function getOrders() {
    const response = await fetch('http://localhost:3000/api/v1/orders');
    if (!response.ok) {
      throw new Error('Error al obtener las órdenes');
    }
    return await response.json();
  }
  
  export async function getOrderById(id: number) {
    const response = await fetch(`http://localhost:3000/api/v1/orders/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener la orden');
    }
    return await response.json();
  }
  
  export async function createOrder(data: {
    email: string;
    phone: string;
    address: string;
    details: { productId: number; quantity: number; amount: number; saleId: number }[];
  }) {
    const response = await fetch('http://localhost:3000/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error al crear la orden');
    }
  
    return await response.json();
  }
  
  export async function updateOrder(id: number, data: {
    email?: string;
    phone?: string;
    address?: string;
    details?: { productId: number; quantity: number; amount: number; saleId: number }[];
  }) {
    const response = await fetch(`http://localhost:3000/api/v1/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar la orden');
    }
  
    return await response.json();
  }
  
  export async function deleteOrder(id: number) {
    const response = await fetch(`http://localhost:3000/api/v1/orders/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Error al eliminar la orden');
    }
  
    return await response.json();
  }
  