// types.ts (o donde defines tus tipos)
export interface OrderDetails {
  productId: number;
  quantity: number;
  amount: number;
  saleId: number;
}

export interface CreateOrderRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  details: OrderDetails[];
}
