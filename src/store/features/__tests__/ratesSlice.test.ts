import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import {
  editCellBuy,
  editCellSale,
  RatesSlice,
  ratesState,
  setCurrencies,
  setFlatRatesList,
  setRate
} from "../ratesSlice";

const mockRates = [
  { ccy: "USD", base_ccy: "UAH", buy: "27.00000", sale: "27.35000" },
  { ccy: "EUR", base_ccy: "UAH", buy: "32.00000", sale: "32.50000" }
];

const mockPayload = { index: 0, value: "28.00000" };

const mockFlatRateList = {
  USD_UAH: 27,
  UAH_USD: 1 / 27.35,
  EUR_UAH: 32,
  UAH_EUR: 1 / 32.5
};

describe("RatesSlice", () => {
  let store: EnhancedStore<{ rates: ratesState }>;

  beforeEach(() => {
    store = configureStore({
      reducer: { rates: RatesSlice.reducer }
    });
  });

  it("should set rates when setRate is called", () => {
    store.dispatch(setRate(mockRates));

    expect(store.getState().rates.rates).toEqual(mockRates);
  });

  it("should set currencies when setCurrencies is called", () => {
    store.dispatch(setCurrencies(mockRates));

    expect(store.getState().rates.currencies).toEqual(["USD", "UAH", "EUR"]);
  });

  it("should set flat rates list when setFlatRatesList is called", () => {
    store.dispatch(setFlatRatesList(mockRates));

    expect(store.getState().rates.flatRatesList).toEqual(mockFlatRateList);
  });

  it("should edit cell buy when editCellBuy is called", () => {
    store.dispatch(setRate(mockRates));
    store.dispatch(editCellBuy(mockPayload));

    expect(store.getState().rates.rates[0].buy).toEqual(mockPayload.value);
    expect(store.getState().rates.flatRatesList).toEqual({ USD_UAH: 28 });
  });

  it("should set flat rates list when editCellSale is called", () => {
    store.dispatch(setRate(mockRates));
    store.dispatch(editCellSale(mockPayload));

    expect(store.getState().rates.rates[0].sale).toBe(mockPayload.value);
    expect(store.getState().rates.flatRatesList).toEqual({
      UAH_USD: 1 / parseFloat(mockPayload.value)
    });
  });
});
