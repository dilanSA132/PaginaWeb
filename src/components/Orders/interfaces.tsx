export interface ProductDetail {
  id: number;
  quantity: number;
  amount: number;
  product: {
    id: number;
    name: string;
    description: string;
    salePrice: number;
    image: string;
    stock: number;  
  };
}

export interface Product {
  id: number;
  name: string;
  description: string ;
  salePrice: number;
  image: string;
  stock: number;  
}

export interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  userId: number; 
  status: string; // PENDING or SOLD
  details: ProductDetail[];
}


export interface Sale {
  id: number; 
  date: Date; 
  totalAmount: number; // Monto total de la venta
  paymentStatus: PaymentStatus; // Estado del pago
  paymentMethod: PaymentMethod; // Método de pago
  credit?: Credit; // Información del crédito (opcional)
  details: SaleDetail[]; // Detalles de los productos vendidos
  creditPayments?: CreditPayment[]; // Pagos del crédito (si aplica)
}

export interface SaleDetail {
  id: number; // ID opcional, generado automáticamente
  saleId?: number; // ID de la venta asociada
  productId: number; // ID del producto vendido
  quantity: number; // Cantidad del producto
  amount: number; // Monto total por este detalle
}

export type CreditStatus = 'ACTIVE' | 'PAID' | 'CANCELLED';

export type PaymentStatus = 'PAID' | 'PENDING' | 'PARTIAL';

export type PaymentMethod = 'CASH' | 'TRANSFER' | 'CREDIT' ;


export interface CreditPayment {
  id: number; // ID opcional, ya que se genera automáticamente
  creditId?: number; // ID del crédito asociado
  amountToPay?: number; // Monto a pagar en este pago 
  amountPaid?: number; // Monto pagado en este pago
  paymentDate?: Date; // Fecha del pago
}


export interface Credit {
  id: number;
  customerId?: number;
  totalAmount?: number;
  amountRemaining?: number;
  createdAt?: Date;
  dueDate?: Date;
  status?: CreditStatus;
  payments?: CreditPayment[];
  sales?: Sale[];
}


