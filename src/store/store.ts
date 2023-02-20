import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ExchangeFormSlice } from "./features/exchangeFormSlice";
import { RatesSlice } from "./features/ratesSlice";

export const store = configureStore({
  reducer: combineReducers({
    allRates: RatesSlice.reducer,
    exchangeForm: ExchangeFormSlice.reducer
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
