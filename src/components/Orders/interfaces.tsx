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
  };
}

export interface Product {
  id: number;
  name: string;
  description: string ;
  salePrice: number;
  image: string;
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
  date: string;
  totalAmount: number;
  paymentStatus: PaymentStatus; 
  paymentMethod: PaymentMethod; 
  credit?: Credit;
  creditId?: number;
  details?: SaleDetail[]; 
}

export interface SaleDetail {
  id: number;
  saleId: number; 
  sale: Sale;
  productId: number;
 // product: Product; 
  quantity: number; 
  amount: number;
}

export type PaymentStatus = 'PAID' | 'PENDING' | 'PARTIAL';

export type PaymentMethod = 'CASH' | 'TRANSFER' | 'CREDIT' ;

export interface Credit {
  id: number;
  term: string;
  duration: number;
  interestRate: number;
}


