export interface Discount {
    id: number;

    discount: number;

    customerId: number;

    customerName: string;

    productId: number;

    productName: string;

}

export function createEmptyDiscount(): Discount {
    return {
        id: undefined,
        discount: undefined,
        customerId: undefined,
        customerName: '',
        productId: undefined,
        productName: ''
    }
}