import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { invertFormSides } from "./exchange";
import {
  exchange,
  exchangeFormPropertyChange
} from "../features/exchangeFormSlice";

const mockStore = configureStore([thunk]);

describe("exchangeForm actions", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      allRates: {
        flatRatesList: {},
        currencies: []
      },
      exchangeForm: {
        baseCurrency: "",
        targetCurrency: "",
        amount: "",
        result: ""
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it("should dispatch exchangeFormPropertyChange and exchange actions", () => {
    const expectedActions = [
      exchangeFormPropertyChange({ property: "baseCurrency", value: "" }),
      exchangeFormPropertyChange({ property: "targetCurrency", value: "" }),
      exchange({ rate: 0, updatedProperty: "baseCurrency" })
    ];

    store.dispatch(invertFormSides());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
