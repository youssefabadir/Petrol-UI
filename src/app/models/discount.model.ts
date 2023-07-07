export interface Discount {
    id: number;

    discountedPrice: number;

    customerId: number;

    customerName: string;

    productId: number;

    productName: string;

}

export function createEmptyDiscount(): Discount {
    return {
        id: undefined,
        discountedPrice: undefined,
        customerId: undefined,
        customerName: '',
        productId: undefined,
        productName: ''
    }
}