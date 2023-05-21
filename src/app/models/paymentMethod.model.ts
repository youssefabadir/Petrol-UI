export interface PaymentMethod {

    id?: number;

    name: string;

}

export function createEmptyPaymentMethod(): PaymentMethod {
    return {
        id: undefined,
        name: undefined
    }
}