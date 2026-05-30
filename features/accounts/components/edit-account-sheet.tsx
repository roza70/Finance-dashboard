"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useState, useEffect } from "react";

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const [name, setName] = useState("");

  useEffect(() => {
    if (accountQuery.data?.data) {
      setName(accountQuery.data.data.name);
    }
  }, [accountQuery.data]);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = accountQuery.isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editMutation.mutate(name, {
      onSuccess: () => onClose(),
    });
  };

  const handleDelete = async () => {
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
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <Input
                disabled={isPending}
                placeholder="e.g. Cash, Bank, Credit Card"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button disabled={isPending} className="w-full">
                Save changes
              </Button>
              <Button
                type="button"
                disabled={isPending}
                onClick={handleDelete}
                className="w-full"
                variant="outline"
              >
                <Trash className="size-4 mr-2" />
                Delete account
              </Button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};