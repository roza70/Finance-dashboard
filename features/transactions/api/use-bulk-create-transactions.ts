"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: {
      date: Date;
      accountId: string;
      categoryId?: string | null;
      payee: string;
      amount: number;
      notes?: string | null;
    }[]) => {
      const response = await fetch("/api/transactions/bulk-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed to create transactions");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Transactions created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Failed to create transactions");
    },
  });
  return mutation;
};