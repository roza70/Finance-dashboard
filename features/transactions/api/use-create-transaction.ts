"use client";

import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const response = await fetch(`/api/transactions/${id}`);
      if (!response.ok) throw new Error("Failed to fetch transaction");
      return response.json();
    },
  });
  return query;
};