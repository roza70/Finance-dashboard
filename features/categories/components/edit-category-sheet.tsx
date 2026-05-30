"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useState, useEffect } from "react";

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );

  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const [name, setName] = useState("");

  useEffect(() => {
    if (categoryQuery.data?.data) {
      setName(categoryQuery.data.data.name);
    }
  }, [categoryQuery.data]);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = categoryQuery.isLoading;

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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <Input
                disabled={isPending}
                placeholder="e.g. Food, Travel, etc."
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
                Delete category
              </Button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};