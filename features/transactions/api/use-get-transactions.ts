"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetTransactions = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const response = await fetch(
        `/api/transactions?from=${from}&to=${to}&accountId=${accountId}`
      );
      if (!response.ok) throw new Error("Failed to fetch transactions");
      return response.json();
    },
  });
  return query;
};