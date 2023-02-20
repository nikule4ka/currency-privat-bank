import { CurrencyItem } from "../../interfaces/Currency";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const fetchCurrency = async (): Promise<CurrencyItem[]> => {
  let counter = parseInt(localStorage.getItem("counter") || "0");

  localStorage.setItem("counter", String(++counter));

  if (counter >= 5) {
    throw new Error("Imitated server error occurred.");
  }

  const url: string =
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

  const response = await axios.get(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch currency data.");
  }

  const { data } = await response;

  return data;
};

export const useCurrency = (): UseQueryResult<CurrencyItem[]> => {
  const uniqueKey = ["currency"];

  return useQuery<CurrencyItem[]>(uniqueKey, fetchCurrency, {
    retry: false
  });
};
