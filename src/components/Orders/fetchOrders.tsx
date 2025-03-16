 
 import { signOut, useSession } from 'next-auth/react';
 import React, { useState, useEffect } from 'react';
 import { Order, Product, ProductDetail } from './interfaces'; 
 import { createOrderDetail, deleteOrderDetail, updateOrderDetail } from '@/services/orderDetailService';
 import { getOrders, createOrder, deleteOrder, updateOrder } from '@/services/orderService';
 import { CreateOrderRequest, OrderDetails } from '@/services/types';
const [orders, setOrders] = useState<Order[]>([]);



  const { data: session } = useSession();
  const [deletedDetails, setDeletedDetails] = useState<number[]>([]);

  
 const [newOrder, setNewOrder] = useState<Order>({
     id: 0,
     name: '',
     email: '',
     phone: '',
     address: '',
     userId: session?.user?.id ,
     createdAt: '',
     status: 'PENDING',
     details: [],
   });
 
 
 export const handleUpdateOrder = async () => {
    try {
      const updatedOrder = {
        name: newOrder.name,
        email: newOrder.email,
        phone: newOrder.phone,
        address: newOrder.address,
      };

      await updateOrder(newOrder.id, updatedOrder);

      if (deletedDetails.length > 0) {
        await Promise.all(deletedDetails.map(detailId => deleteOrderDetail(detailId)));
      }

      const details: OrderDetails[] = newOrder.details.map((detail) => ({
        productId: detail.product.id,
        quantity: detail.quantity,
        amount: detail.amount,
        orderId: newOrder.id,
      }));

      await createOrderDetail(details);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === newOrder.id
            ? { ...order, ...updatedOrder, details: newOrder.details }
            : order
        )
      );

      closeModal();
      toast.success('Orden actualizada exitosamente.');
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      toast.error('Error al actualizar la orden. Por favor, inténtalo de nuevo.');
    }
  };
