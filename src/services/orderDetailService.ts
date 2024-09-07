export async function getOrderDetails() {
    const response = await fetch('http://localhost:3000/api/v1/order-details');
    if (!response.ok) {
      throw new Error('Error al obtener los detalles de la orden');
    }
    return await response.json();
  }
  
  export async function getOrderDetailById(id: number) {
    const response = await fetch(`http://localhost:3000/api/v1/order-details/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el detalle de la orden');
    }
    return await response.json();
  }
  
  export async function createOrderDetail(data: {
    quantity: number;
    amount: number;
    productId: number;
    saleId: number;
    orderId: number;
  }) {
    const response = await fetch('http://localhost:3000/api/v1/order-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error al crear el detalle de la orden');
    }
  
    return await response.json();
  }
  
  export async function updateOrderDetail(id: number, data: {
    quantity?: number;
    amount?: number;
    productId?: number;
    saleId?: number;
    orderId?: number;
  }) {
    const response = await fetch(`http://localhost:3000/api/v1/order-details/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el detalle de la orden');
    }
  
    return await response.json();
  }
  
  export async function deleteOrderDetail(id: number) {
    const response = await fetch(`http://localhost:3000/api/v1/order-details/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Error al eliminar el detalle de la orden');
    }
  
    return await response.json();
  }
  