"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await fetch("/api/categories/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!response.ok) throw new Error("Failed to delete categories");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Categories deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Failed to delete categories");
    },
  });
  return mutation;
};