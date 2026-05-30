"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { Loader2 } from "lucide-react";

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const createMutation = useCreateTransaction();

  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();
  const onCreateCategory = (name: string) => categoryMutation.mutate(name);
  const categoryOptions = (categoryQuery.data?.data ?? []).map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const accountMutation = useCreateAccount();
  const accountQuery = useGetAccounts();
  const onCreateAccount = (name: string) => accountMutation.mutate(name);
  const accountOptions = (accountQuery.data?.data ?? []).map((a) => ({
    label: a.name,
    value: a.id,
  }));

  const isPending =
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading =
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const onSubmit = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};