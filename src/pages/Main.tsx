import React, { useEffect } from "react";
import { Alert, Button, Col, Row, Spin } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import CurrencyInput from "../features/currency/CurrencyInput";
import EditableTable from "../components/Table/EditableTable";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  setRate,
  setCurrencies,
  setFlatRatesList
} from "../store/features/ratesSlice";
import { ExchangeFormKeys } from "../store/features/exchangeFormSlice";
import {
  handleExchangeFormUpdateAction,
  invertFormSides
} from "../store/actions/exchange";
import { getRate } from "../helpers/getRates";
import { useCurrency } from "./hooks/useCurrency";

const Main = () => {
  const { data, isLoading, isError, isSuccess, status } = useCurrency();
  const dispatch = useAppDispatch();

  const currencies = useAppSelector((state) => state.allRates.currencies);
  const exchangeForm = useAppSelector((state) => state.exchangeForm);

  useEffect((): void => {
    if (isSuccess) {
      dispatch(setRate(data));
      dispatch(setCurrencies(data));
      dispatch(setFlatRatesList(data));
    }
  }, [data, isSuccess, dispatch]);

  const createPropertyChangeHandler = (property: ExchangeFormKeys) => {
    return (value: string | number | null) => {
      dispatch(handleExchangeFormUpdateAction(property, value));
    };
  };

  const handleInvertButtonClick = () => {
    dispatch(invertFormSides());
  };

  const editableTable = (): JSX.Element => {
    if (isLoading) {
      return (
        <Row justify="center" align="middle">
          <Spin size="large" />
        </Row>
      );
    }

    if (isError || status !== "success") {
      return (
        <Alert
          message="The server should respond, but we're simmulating a failure."
          type="error"
          action={
            <Button
              size="small"
              onClick={() => {
                localStorage.removeItem("counter");
                window.location.reload();
              }}
            >
              Reset counter and reload page
            </Button>
          }
        />
      );
    }

    return <EditableTable />;
  };

  return (
    <>
      {editableTable()}

      {data?.length && (
        <>
          <Row
            align="middle"
            justify="center"
            gutter={16}
            style={{ paddingTop: 100 }}
          >
            <CurrencyInput
              currencies={currencies}
              name="Change"
              amount={parseFloat(exchangeForm.baseAmount)}
              currency={exchangeForm.baseCurrency}
              onAmountChange={createPropertyChangeHandler("baseAmount")}
              onCurrencyChange={createPropertyChangeHandler("baseCurrency")}
            />

            <Col xs={24} sm={2} style={{ paddingBottom: 15 }}>
              <Row justify="center">
                <Button
                  icon={<SwapOutlined />}
                  onClick={handleInvertButtonClick}
                />
              </Row>
            </Col>

            <CurrencyInput
              currencies={currencies.filter(
                (currency) => getRate(exchangeForm.baseCurrency, currency) !== 0
              )}
              name="Get"
              amount={parseFloat(exchangeForm.targetAmount)}
              currency={exchangeForm.targetCurrency}
              onAmountChange={createPropertyChangeHandler("targetAmount")}
              onCurrencyChange={createPropertyChangeHandler("targetCurrency")}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default Main;
