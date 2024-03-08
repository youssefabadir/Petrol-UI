export interface FinancialSummary {
    totalPayments: number;

    totalBills: number;

    totalLiters;
}

export function createEmptyFinancialSummary(): FinancialSummary {
    return {
        totalPayments: undefined,
        totalBills: undefined,
        totalLiters: undefined
    }
}