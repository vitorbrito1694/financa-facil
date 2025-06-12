import { useCallback, useEffect, useState } from "react";
import {
  PaymentMethod,
  PaymentMethodsParams,
  PaymentMethodsResponse,
} from "@/types/payment-methods";

export function usePaymentMethods(initialParams: PaymentMethodsParams = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<PaymentMethodsResponse | null>(null);
  const [params, setParams] = useState(initialParams);

  const fetchPaymentMethods = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const searchParams = new URLSearchParams();
      if (params.page) searchParams.append("page", params.page.toString());
      if (params.limit) searchParams.append("limit", params.limit.toString());
      if (params.search) searchParams.append("search", params.search);
      if (params.type) searchParams.append("type", params.type);

      const response = await fetch(`/api/v1/payment-methods?${searchParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch payment methods");
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const updateParams = useCallback(
    (newParams: Partial<PaymentMethodsParams>) => {
      setParams((prev) => ({ ...prev, ...newParams }));
    },
    []
  );

  const createPaymentMethod = useCallback(
    async (
      newPaymentMethod: Omit<PaymentMethod, "id" | "createdAt" | "updatedAt">
    ) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/v1/payment-methods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPaymentMethod),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment method");
        }

        const json = await response.json();

        // Refresh the list after creating
        await fetchPaymentMethods();

        return json;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPaymentMethods]
  );

  return {
    paymentMethods: data?.data ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error,
    refresh: fetchPaymentMethods,
    updateParams,
    params,
    createPaymentMethod,
  };
}
