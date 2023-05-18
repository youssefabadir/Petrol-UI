export interface Discount {
    id: number;

    discount: number;

    customerId: number;

    customerName: string;

    productId: number;

    productName: string;

}

export const defaultDiscount = {
    id: null,
    discount: null,
    customerId: null,
    customerName: '',
    productId: null,
    productName: ''
}