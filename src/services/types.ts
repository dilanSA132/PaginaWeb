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
