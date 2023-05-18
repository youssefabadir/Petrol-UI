export interface PaymentMethod {

    id?: number;

    name: string;

}

export const defaultPaymentMethod: PaymentMethod = {
    id: null,
    name: ''
}