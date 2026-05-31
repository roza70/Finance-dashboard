"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await fetch(
        `/api/summary?from=${from}&to=${to}&accountId=${accountId}`
      );
      if (!response.ok) throw new Error("Failed to fetch summary");
      const data = await response.json();
      return {
        ...data.data,
        incomeAmount: convertAmountFromMilliUnits(data.data.incomeAmount),
        expensesAmount: convertAmountFromMilliUnits(data.data.expensesAmount),
        remainingAmount: convertAmountFromMilliUnits(data.data.remainingAmount),
        categories: data.data.categories.map((c: any) => ({
          ...c,
          value: convertAmountFromMilliUnits(c.value),
        })),
        days: data.data.days.map((d: any) => ({
          ...d,
          income: convertAmountFromMilliUnits(d.income),
          expenses: convertAmountFromMilliUnits(d.expenses),
        })),
      };
    },
  });
  return query;
};