"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  const [name, setName] = useState("");
  const mutation = useCreateAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(name, {
      onSuccess: () => {
        setName("");
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <Input
            disabled={mutation.isPending}
            placeholder="e.g. Cash, Bank, Credit Card"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button disabled={mutation.isPending} className="w-full">
            Create account
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};