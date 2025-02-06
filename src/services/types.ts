export interface OrderDetails {
  productId: number;
  quantity: number;
  amount: number;
  saleId?: number;
  name?: string; 
  orderId?: number; 
}


export interface CreateOrderRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  userId: number; 
}

export interface SaleDetailResponse {
  id: number;
  quantity: number;
  amount: number;
  productId: number;
  product: {
    id: number;
    name: string;
    description: string | null;
    price: number;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;  
}


export interface SaleDetail {
 
  quantity: number;
  amount: number;
  product: Product;
  saleId?: number; // Hacer que sea opcional
}

export interface PaymentDetail {
  id: number;
  saleId: number;
  paymentMethod: string; // Ajusta según tus métodos de pago (por ejemplo, "CREDIT_CARD", "DEBIT_CARD", etc.)
  amountPaid: number;
  paymentDate: string;
}

// services/types.ts

export interface PaymentPlan {
  id: number;
  installments: number;
  amount: number;
  sales?: any[]; // Puedes especificar el tipo adecuado si sabes cómo manejarás las ventas asociadas
}


export interface Sale {
  
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING' | 'PARTIAL';
  date: string;
  details: SaleDetail[]; // Lista de detalles de la venta
  paymentDetails: PaymentDetail[]; // Lista de detalles de pago
  paymentPlanId?: number | null; // Plan de pago (opcional)
  originOrderId?: number | null; // Orden de origen (opcional)
}
