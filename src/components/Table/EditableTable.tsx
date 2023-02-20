import React, { useState } from "react";
import { Table, InputNumber, Popover, Button } from "antd";
import { CurrencyItem } from "../../interfaces/Currency";
import { ColumnProps } from "antd/lib/table";
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../store/store";
import { editCellBuy, editCellSale } from "../../store/features/ratesSlice";
import { useAppSelector } from "../../store/store";

interface IMyTableData extends CurrencyItem {
  currency?: string;
}

type Operation = "buy" | "sale";

const EditableTable = () => {
  const rates = useAppSelector((state) => state.allRates.rates);
  const dispatch = useAppDispatch();

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [cellsWithEdit, setCellsWithEdit] = useState<{ [key: string]: string }>(
    {}
  );

  const getPercent = (a: string, b: string) => {
    const diff =
      100 *
      Math.abs(
        (parseFloat(a) - parseFloat(b)) / ((parseFloat(a) + parseFloat(b)) / 2)
      );

    if (diff >= 10) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  const startEdit = (index: number, operation: Operation) => {
    return () => {
      setCellsWithEdit({
        ...cellsWithEdit,
        [`${index}_${operation}`]: rates[index][operation]
      });
    };
  };

  const changeInputValue = (
    value: string,
    index: number,
    defaultValue: string,
    proprety: string
  ) => {
    getPercent(defaultValue, value);
    if (value === null) {
      setDisableButton(true);
    }
    setCellsWithEdit({
      ...cellsWithEdit,
      [`${index}_${proprety}`]: value || cellsWithEdit[`${index}_${proprety}`]
    });
  };

  const editCell = (index: number, property: Operation) => {
    const payload = {
      index,
      value: cellsWithEdit[`${index}_${property}`]
    };
    if (property === "buy") {
      dispatch(editCellBuy(payload));
    } else {
      dispatch(editCellSale(payload));
    }

    const newCells = { ...cellsWithEdit };
    delete newCells[`${index}_${property}`];
    setCellsWithEdit(newCells);
  };

  const closeCell = (index: number, property: Operation) => {
    const newCells = { ...cellsWithEdit };
    delete newCells[`${index}_${property}`];
    setCellsWithEdit(newCells);
  };

  const columns: ColumnProps<IMyTableData>[] = [
    {
      dataIndex: "ccy",
      title: "Currency / Current Date",
      render: (text) => <>{text} / UAH</>
    },
    {
      dataIndex: "buy",
      title: "Buy",
      key: "buy",
      render: (text, _, index) => (
        <>
          {cellsWithEdit[`${index}_buy`] ? (
            <Popover
              placement="topRight"
              content={
                <>
                  <Button
                    disabled={disableButton}
                    icon={<CheckOutlined />}
                    onClick={() => editCell(index, "buy")}
                  />
                  <Button
                    icon={<CloseOutlined />}
                    onClick={() => closeCell(index, "buy")}
                  />
                </>
              }
            >
              <InputNumber
                defaultValue={text}
                onChange={(value) =>
                  changeInputValue(value, index, text, "buy")
                }
              />
            </Popover>
          ) : (
            <Popover
              placement="topRight"
              content={
                <Button
                  onClick={startEdit(index, "buy")}
                  icon={<EditOutlined />}
                />
              }
            >
              <span>{text}</span>
            </Popover>
          )}
        </>
      )
    },
    {
      dataIndex: "sale",
      title: "Sell",
      key: "sell",
      render: (text, record, index) => (
        <>
          {cellsWithEdit[`${index}_sale`] ? (
            <Popover
              content={
                <>
                  <Button
                    disabled={disableButton}
                    icon={<CheckOutlined />}
                    onClick={() => editCell(index, "sale")}
                  />
                  <Button
                    icon={<CloseOutlined />}
                    onClick={() => closeCell(index, "sale")}
                  />
                </>
              }
            >
              <InputNumber
                defaultValue={text}
                onChange={(value) =>
                  changeInputValue(value, index, text, "sale")
                }
              />
            </Popover>
          ) : (
            <Popover
              placement="topRight"
              content={
                <Button
                  onClick={startEdit(index, "sale")}
                  icon={<EditOutlined />}
                />
              }
            >
              <span>{text}</span>
            </Popover>
          )}
        </>
      )
    }
  ];
  return (
    <Table
      rowKey="buy"
      size="large"
      columns={columns}
      dataSource={rates}
      pagination={false}
      bordered
    />
  );
};

export default EditableTable;
