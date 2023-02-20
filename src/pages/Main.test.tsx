import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyItem } from "../interfaces/Currency";
import { renderHook, waitFor } from "@testing-library/react";
import { useCurrency } from "./hooks/useCurrency";
import { useAppSelector } from "../store/store";
import { ReactNode } from "react";

const mockDData = "mocksData" as unknown as CurrencyItem[];

const queryClient = new QueryClient();

const mockCurrencies = ["USD", "UAH", "EUR"];

jest.mock("../store/store", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn()
}));

jest.mock("../store/actions/exchange", () => ({
  handleExchangeFormUpdateAction: jest.fn(),
  invertFormSides: jest.fn()
}));

jest.mock("../helpers/getRates", () => ({
  getRate: jest.fn()
}));

jest.mock("./hooks/useCurrency", () => ({
  useCurrency: jest.fn()
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
describe("Main component", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
  });

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue(mockCurrencies);
    (useCurrency as jest.Mock).mockReturnValueOnce({
      data: mockDData,
      isLoading: false,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
      status: "success"
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("hook", async () => {
    const { result } = await renderHook(() => useCurrency(), {
      wrapper
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockDData);

    await waitFor(() => expect(result.current.isError).toBe(false));
  });
});
