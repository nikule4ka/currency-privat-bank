import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ExchangeFormKeys =
  | "baseCurrency"
  | "targetCurrency"
  | "baseAmount"
  | "targetAmount";

export type ExchangeForm = {
  [key in ExchangeFormKeys]: string;
};

const initialState: ExchangeForm = {
  baseCurrency: "USD",
  targetCurrency: "UAH",
  baseAmount: "",
  targetAmount: ""
};

const format = (value: number) => {
  return value.toFixed(2);
};

export const ExchangeFormSlice = createSlice({
  name: "exchangeForm",
  initialState,
  reducers: {
    exchange: (
      state,
      action: PayloadAction<{ rate: number; updatedProperty: ExchangeFormKeys }>
    ) => {
      const { rate, updatedProperty } = action.payload;
      const result = { ...state };

      if (
        updatedProperty === "baseAmount" ||
        updatedProperty === "baseCurrency"
      ) {
        result.targetAmount = format(
          rate * parseFloat(result.baseAmount || "0")
        );
      }
      if (
        updatedProperty === "targetAmount" ||
        updatedProperty === "targetCurrency"
      ) {
        result.baseAmount = format(
          parseFloat(result.targetAmount || "0") / rate
        );
      }

      return result;
    },
    exchangeFormPropertyChange: (
      state,
      action: PayloadAction<{ property: string; value: string | number | null }>
    ) => {
      const { property, value } = action.payload;

      const result = { ...state, [property]: value || "0" };

      return result;
    }
  }
});

export default ExchangeFormSlice.reducer;
export const { exchangeFormPropertyChange, exchange } =
  ExchangeFormSlice.actions;
