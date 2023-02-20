import React from "react";
import { Col, InputNumber, Row, Select, Space } from "antd";

const { Option } = Select;

interface CurrencyProps {
  name: string;
  currency: string;
  amount: number;
  currencies: string[];
  onCurrencyChange: (value: string) => void;
  onAmountChange: (value: number | null) => void;
}

const CurrencyInput = ({
  name,
  amount,
  currency,
  currencies,
  onCurrencyChange,
  onAmountChange
}: CurrencyProps) => {
  const selectAfter = (
    <Select value={currency} style={{ width: 80 }} onChange={onCurrencyChange}>
      {currencies.map((currency) => (
        <Option key={currency} value={currency}>
          {currency}
        </Option>
      ))}
    </Select>
  );
  return (
    <Col xs={24} sm={11} style={{ paddingBottom: 15 }}>
      <Row justify="center">
        <Space direction="horizontal">
          {name}
          <InputNumber
            addonAfter={selectAfter}
            value={amount}
            onChange={onAmountChange}
          />
        </Space>
      </Row>
    </Col>
  );
};

export default CurrencyInput;
