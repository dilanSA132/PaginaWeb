export interface Role {
  id: number;
  name: string;
  users: User[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  roleId: number;
  role: Role;
  sales: Sale[];
}

export interface Customer {
  id_customer: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  customer_type?: string;
  sales: Sale[];
  credits: Credit[];
  accountsReceivable: AccountsReceivable[];
}

export interface Inventory {
  id_product: number;
  name: string;
  description?: string;
  quantity: number;
  purchase_price: number;
  sale_price: number;
  purchase_date?: string;
  image_url?: string;
  id_category: number;
  category: Category;
  purchases: PurchaseDetail[];
  sales: SaleDetail[];
}

export interface Category {
  id_category: number;
  name: string;
  description?: string;
  products: Inventory[];
}

export interface Purchase {
  id_purchase: number;
  purchase_date: string;
  total_purchase: number;
  details: PurchaseDetail[];
}

export interface PurchaseDetail {
  id_purchase_detail: number;
  quantity: number;
  unit_price: number;
  id_product: number;
  id_purchase: number;
  product: Inventory;
  purchase: Purchase;
}

export interface Sale {
  id_sale: number;
  sale_date: string;
  total_sale: number;
  sale_status: 'Pending' | 'Completed' | 'Canceled';
  id_customer: number;
  id_user: number;
  customer: Customer;
  user: User;
  saleDetails: SaleDetail[];
  analysis?: SalesAnalysis;
}

export interface SaleDetail {
  id_sale_detail: number;
  quantity: number;
  unit_price: number;
  id_product: number;
  id_sale: number;
  product: Inventory;
  sale: Sale;
}

export interface Credit {
  id_credit: number;
  credit_amount: number;
  credit_balance: number;
  grant_date: string;
  due_date?: string;
  credit_status: 'Active' | 'Paid' | 'Expired';
  id_customer: number;
  customer: Customer;
  creditDetails: CreditDetail[];
}

export interface CreditDetail {
  id_credit_detail: number;
  payment_amount: number;
  remaining_balance: number;
  payment_date: string;
  id_credit: number;
  credit: Credit;
}

export interface AccountsReceivable {
  id_account: number;
  debt_amount: number;
  issue_date: string;
  due_date?: string;
  account_status: 'Pending' | 'Paid' | 'Overdue';
  id_customer: number;
  customer: Customer;
}

export interface SalesAnalysis {
  id_analysis: number;
  analysis_date: string;
  total_sale: number;
  quantity_sold: number;
  id_sale: number;
  sale: Sale;
}

export interface Product {
  id_product: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

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
