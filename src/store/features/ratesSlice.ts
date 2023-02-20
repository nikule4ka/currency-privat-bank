import { createSlice } from "@reduxjs/toolkit";
import { CurrencyItem } from "../../interfaces/Currency";

type FlatRatesList = { [key: string]: number };

export interface ratesState {
  rates: CurrencyItem[];
  currencies: string[];
  flatRatesList: FlatRatesList;
}

const initialState: ratesState = {
  rates: [],
  currencies: [],
  flatRatesList: {}
};

export const RatesSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    setRate: (state, action) => {
      return {
        ...state,
        rates: action.payload
      };
    },
    setCurrencies: (state, action) => {
      let newCurrencies: string[] = [];
      action.payload.forEach((item: CurrencyItem) =>
        newCurrencies.push(item.ccy, item.base_ccy)
      );
      state.currencies = [...new Set(newCurrencies)];
    },
    setFlatRatesList: (state, action) => {
      let newFlatRatesList: FlatRatesList = {};
      action.payload.forEach((item: CurrencyItem) => {
        newFlatRatesList[`${item.ccy}_${item.base_ccy}`] = parseFloat(item.buy);
        newFlatRatesList[`${item.base_ccy}_${item.ccy}`] =
          1 / parseFloat(item.sale);
      });
      state.flatRatesList = newFlatRatesList;
    },
    editCellBuy: (state, action) => {
      state.rates[action.payload.index].buy = action.payload.value;
      state.flatRatesList[
        `${state.rates[action.payload.index].ccy}_${
          state.rates[action.payload.index].base_ccy
        }`
      ] = parseFloat(action.payload.value);
    },
    editCellSale: (state, action) => {
      state.rates[action.payload.index].sale = action.payload.value;
      state.flatRatesList[
        `${state.rates[action.payload.index].base_ccy}_${
          state.rates[action.payload.index].ccy
        }`
      ] = 1 / parseFloat(action.payload.value);
    }
  }
});

export default RatesSlice.reducer;
export const {
  setRate,
  setCurrencies,
  setFlatRatesList,
  editCellBuy,
  editCellSale
} = RatesSlice.actions;
