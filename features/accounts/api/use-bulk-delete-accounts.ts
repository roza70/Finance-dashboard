import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await fetch("/api/accounts/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!response.ok) throw new Error("Failed to delete accounts");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Accounts deleted");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: () => {
      toast.error("Failed to delete accounts");
    },
  });

  return mutation;
};