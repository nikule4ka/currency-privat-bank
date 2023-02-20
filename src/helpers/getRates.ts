import { store } from '../store/store';

export const getRate = (baseCurrency: string, targetCurrency: string): number => {
    const rates = store.getState().allRates.flatRatesList;

    return rates[`${baseCurrency}_${targetCurrency}`] || 0;
};
