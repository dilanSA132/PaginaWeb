export interface OrderDetails {
  productId: number;
  quantity: number;
  amount: number;
  saleId: number;
  name: string; 
}


export interface CreateOrderRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
}
