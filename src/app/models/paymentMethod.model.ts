export interface PaymentMethod {

    id?: number;

    name: string;

    balance?: number;

}

export function createEmptyPaymentMethod(): PaymentMethod {
    return {
        id: undefined,
        name: undefined,
        balance: undefined
    }
}