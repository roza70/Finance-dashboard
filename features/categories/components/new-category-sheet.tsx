"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const [name, setName] = useState("");
  const mutation = useCreateCategory();

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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <Input
            disabled={mutation.isPending}
            placeholder="e.g. Food, Travel, etc."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button disabled={mutation.isPending} className="w-full">
            Create category
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};