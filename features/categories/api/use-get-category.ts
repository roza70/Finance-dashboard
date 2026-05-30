"use client";

import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${id}`);
      if (!response.ok) throw new Error("Failed to fetch category");
      return response.json();
    },
  });
  return query;
};