import {
  exchange,
  ExchangeFormKeys,
  exchangeFormPropertyChange
} from "../features/exchangeFormSlice";
import { AppDispatch, RootState } from "../store";

const getRate = (
  state: RootState,
  baseCurrency: string,
  targetCurrency: string
): number => {
  return state.allRates.flatRatesList[`${baseCurrency}_${targetCurrency}`] || 0;
};

const findCurrencyDifferentFrom = (currencies: string[], currency: string) => {
  return currencies.find((item) => item !== currency) || "";
};

export function invertFormSides() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state: RootState = getState();
    dispatch(
      exchangeFormPropertyChange({
        property: "baseCurrency",
        value: state.exchangeForm.targetCurrency
      })
    );
    dispatch(
      exchangeFormPropertyChange({
        property: "targetCurrency",
        value: state.exchangeForm.baseCurrency
      })
    );

    dispatch(
      exchange({
        rate: getRate(
          getState(),
          getState().exchangeForm.baseCurrency,
          getState().exchangeForm.targetCurrency
        ),
        updatedProperty: "baseCurrency"
      })
    );
  };
}

export function handleExchangeFormUpdateAction(
  property: ExchangeFormKeys,
  value: string | number | null
) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(exchangeFormPropertyChange({ property, value }));

    let state = getState();
    if (
      property === "baseCurrency" &&
      value === state.exchangeForm.targetCurrency
    ) {
      dispatch(
        exchangeFormPropertyChange({
          property: "targetCurrency",
          value: findCurrencyDifferentFrom(
            state.allRates.currencies,
            state.exchangeForm.baseCurrency
          )
        })
      );
    }
    if (
      property === "targetCurrency" &&
      value === state.exchangeForm.targetCurrency
    ) {
      dispatch(
        exchangeFormPropertyChange({
          property: "baseCurrency",
          value: findCurrencyDifferentFrom(
            state.allRates.currencies,
            state.exchangeForm.targetCurrency
          )
        })
      );
    }

    state = getState();
    let rate = getRate(
      state,
      state.exchangeForm.baseCurrency,
      state.exchangeForm.targetCurrency
    );
    if (rate === 0) {
      dispatch(exchangeFormPropertyChange({
        property: "targetCurrency",
        value: state.allRates.currencies.find((item) => getRate(state, state.exchangeForm.baseCurrency, item) !== 0) || ""
      }));
      state = getState();
      rate = getRate(
        state,
        state.exchangeForm.baseCurrency,
        state.exchangeForm.targetCurrency
      );
    }

    dispatch(
      exchange({
        rate: rate,
        updatedProperty: property
      })
    );
  };
}
