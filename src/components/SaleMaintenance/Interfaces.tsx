

export interface Sale {
    id: number;
    date: Date;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    credit: Credit;
    details: SaleDetail[];
    creditPayments: CreditPayment[];
}

export interface SaleDetail {
    id: number;
    saleId: number;
    productId: number;
    quantity: number;
    amount: number;
}

export type CreditStatus = 'ACTIVE' | 'PAID' | 'CANCELLED';

export type PaymentStatus = 'PAID' | 'PENDING' | 'PARTIAL';

export type PaymentMethod = 'CASH' | 'TRANSFER' | 'CREDIT';

export interface CreditPayment {
    id?: number;
    creditId: number;
    amountPaid: number;
    paymentDate: Date;
    amountToPay: number;
}

export interface Credit {
    id?: number;
    customerId: number;
    totalAmount: number;
    amountRemaining: number;
    createdAt?: Date;
    dueDate?: Date;
    status: CreditStatus;
    payments: CreditPayment[];
    sales?: Sale[];
}
