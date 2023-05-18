export interface CustomerTransaction {

    customer: string;

    customerBalance: number;

    paymentNumber?: string;

    paymentAmount?: number;

    transferredPayment?: boolean;

    paymentMethod?: string;

    billNumber?: string;

    billQuantity?: number;

    billAmount?: number;

    productName?: string;

    date: string;

}