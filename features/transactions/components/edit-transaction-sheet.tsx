"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useConfirm } from "@/hooks/use-confirm";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { Loader2 } from "lucide-react";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

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
    editMutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const defaultValues = transactionQuery.data?.data
    ? {
        accountId: transactionQuery.data.data.accountId,
        categoryId: transactionQuery.data.data.categoryId,
        amount: convertAmountFromMilliUnits(
          transactionQuery.data.data.amount
        ).toString(),
        date: transactionQuery.data.data.date
          ? new Date(transactionQuery.data.data.date)
          : new Date(),
        payee: transactionQuery.data.data.payee,
        notes: transactionQuery.data.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  const onSubmit = (values: any) => {
    editMutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};