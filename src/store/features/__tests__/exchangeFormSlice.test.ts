import { configureStore } from "@reduxjs/toolkit";
import {
  exchange,
  ExchangeForm,
  exchangeFormPropertyChange,
  ExchangeFormSlice
} from "../exchangeFormSlice";

const store = configureStore({
  reducer: {
    exchangeForm: ExchangeFormSlice.reducer
  }
});

const mockPropperty = "baseAmount";
const mockUpdatedProperty = "baseAmount";

const mockValue = "100";
const mockRate = 2;

describe("ExchangeFormSlice", () => {
  it("should change exchange form property when exchangeFormPropertyChange is called", () => {
    store.dispatch(
      exchangeFormPropertyChange({ property: mockPropperty, value: mockValue })
    );

    const formState = store.getState().exchangeForm as ExchangeForm;
    expect(formState[mockPropperty]).toEqual(mockValue);
  });

  it("should calculate target amount when exchange is called with updated base amount", () => {
    store.dispatch(
      exchangeFormPropertyChange({ property: mockPropperty, value: mockValue })
    );
    store.dispatch(
      exchange({ rate: mockRate, updatedProperty: mockUpdatedProperty })
    );

    const formState = store.getState().exchangeForm as ExchangeForm;

    expect(formState.targetAmount).toEqual("200.00");
  });

  it("should calculate base amount when exchange is called with updated target amount", () => {
    const mockUpdatedProperty = "targetAmount";
    const value = "200";

    store.dispatch(
      exchangeFormPropertyChange({ property: mockUpdatedProperty, value })
    );
    store.dispatch(
      exchange({ rate: mockRate, updatedProperty: mockUpdatedProperty })
    );

    const formState = store.getState().exchangeForm as ExchangeForm;

    expect(formState.baseAmount).toEqual("100.00");
  });
});
