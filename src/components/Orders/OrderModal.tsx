import React, { useState, useEffect } from 'react';
import { Order } from './interfaces';
import { Product, ProductDetail } from './interfaces';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from '../modal/CustomModal'; 
import { createOrderDetail, deleteOrderDetail, updateOrderDetail } from '@/services/orderDetailService';
import { CreateOrderRequest, OrderDetails } from '@/services/types';
import { getOrders, createOrder, deleteOrder, updateOrder } from '@/services/orderService';
import { signOut, useSession } from 'next-auth/react';
import OrderForm from './OrderForm';

interface OrderModalProps {
  isOpen: boolean; // Indica si el modal está abierto o cerrado
  onClose: () => void; // Función para cerrar el modal
  products: Product[]; // Lista de productos disponibles
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>; // Función para actualizar la lista de órdenes
  order: Order | null; // Orden seleccionada, puede ser nula si no hay ninguna seleccionada
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, products, setOrders, order }) => {
    const { data: session } = useSession();
    const [newOrder, setNewOrder] = useState<Order>({
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      userId: 1, // Example userId
      createdAt: '',
      status: 'PENDING',
      details: [],
    });
  
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [selectedProductQuantity, setSelectedProductQuantity] = useState<number>(1);
    const [deletedDetails, setDeletedDetails] = useState<number[]>([]); // Moved state inside component

    useEffect(() => {
        if (order) {
          setNewOrder(order);  
        } else {
          setNewOrder({
            id: 0,
            name: '',
            email: '',
            phone: '',
            address: '',
            userId: 1,
            createdAt: '',
            status: 'PENDING',
            details: [],
          });
        }
        setDeletedDetails([]); 
      }, [order]);  

    const handleAddProductToOrder = () => {
      if (selectedProductId && selectedProductQuantity > 0) {
        const product = products.find((p) => p.id === selectedProductId);
        if (product) {
          const existingDetailIndex = newOrder.details.findIndex((d) => d.product.id === product.id);
          if (existingDetailIndex !== -1) {
            const updatedDetails = [...newOrder.details];
            updatedDetails[existingDetailIndex].quantity += selectedProductQuantity;
            updatedDetails[existingDetailIndex].amount = updatedDetails[existingDetailIndex].quantity * product.salePrice;
            setNewOrder({ ...newOrder, details: updatedDetails });
          } else {
            const newDetail: ProductDetail = {
              id: 0,
              quantity: selectedProductQuantity,
              amount: product.salePrice * selectedProductQuantity,
              product: product,
            };
            setNewOrder({ ...newOrder, details: [...newOrder.details, newDetail] });
          }
        }
      } else {
        toast.error('Por favor selecciona un producto y una cantidad válida.');
      }
    };
   
    const handleUpdateOrder = async () => {
      try {
        const updatedOrder = {
          name: newOrder.name,
          email: newOrder.email,
          phone: newOrder.phone,
          address: newOrder.address,
        };
        await Promise.all(deletedDetails?.map(detailId => deleteOrderDetail(detailId)));

        await updateOrder(newOrder.id, updatedOrder);
  
        if (deletedDetails.length > 0) {
          await Promise.all(deletedDetails?.map(detailId => deleteOrderDetail(detailId)));
        }
  
        const details: OrderDetails[] = newOrder.details?.map((detail) => ({
          productId: detail.product.id,
          quantity: detail.quantity,
          amount: detail.amount,
          orderId: newOrder.id,
        }));
  
        await createOrderDetail(details);
  
        setOrders((prevOrders) =>
          prevOrders?.map((order) =>
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
  
    const handleSaveOrder = async () => {
      try {
        const createdOrder = await createOrder({
          name: newOrder.name,
          email: newOrder.email,
          phone: newOrder.phone,
          address: newOrder.address,
          userId: session?.user?.id,
        });
  
        const details: OrderDetails[] = newOrder.details.map((detail) => ({
          productId: detail.product.id,
          quantity: detail.quantity,
          amount: detail.amount,
          orderId: createdOrder.id,
        }));
  
        await createOrderDetail(details);
  
        setOrders((prevOrders) => [...prevOrders, createdOrder]);  // Add the new order to parent state
        closeModal();
        toast.success('Orden creada exitosamente.');
      } catch (err) {
        console.error('Error al realizar el pedido o enviar el correo:', err);
        toast.error('Ocurrió un error al realizar el pedido. Por favor, inténtalo de nuevo.');
      }
    };
  
    const closeModal = () => {
      setNewOrder({
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        userId: 1,
        createdAt: '',
        status: 'PENDING',
        details: [],
      });
      setDeletedDetails([]);  // Limpiar detalles eliminados
      setSelectedProductId(null);
      setSelectedProductQuantity(1);
      onClose();
    };

    return (
      <CustomModal isOpen={isOpen} onClose={closeModal}>
        <OrderForm
          newOrder={newOrder}
          setNewOrder={setNewOrder}
          products={products}
          selectedProductId={selectedProductId}
          setSelectedProductId={setSelectedProductId}
          selectedProductQuantity={selectedProductQuantity}
          setSelectedProductQuantity={setSelectedProductQuantity}
          handleAddProductToOrder={handleAddProductToOrder}
          handleSaveOrder={handleSaveOrder}
          handleUpdateOrder={handleUpdateOrder}
          deletedDetails={deletedDetails}
          setDeletedDetails={setDeletedDetails}
        />
        <ToastContainer />
      </CustomModal>
    );
};

export default OrderModal;
