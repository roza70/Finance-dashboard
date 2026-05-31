"use client";

import { useQuery } from "@tanstack/react-query";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const response = await fetch(`/api/transactions/${id}`);
      if (!response.ok) throw new Error("Failed to fetch transaction");
      const data = await response.json();
      return {
        ...data,
        data: {
          ...data.data,
          amount: convertAmountFromMilliUnits(data.data.amount),
        },
      };
    },
  });
  return query;
};