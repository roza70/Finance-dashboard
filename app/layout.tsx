import { ClerkProvider } from '@clerk/nextjs'
import { QueryProvider } from "@/providers/query-provider";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet";

// Add inside body:


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "Manage your money smartly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="h-full">
          <QueryProvider>
            <TooltipProvider>
              <NewAccountSheet />
              <EditAccountSheet />
              <NewCategorySheet />
              <EditCategorySheet />
              <NewTransactionSheet />
              <EditTransactionSheet />
              <Toaster />
              {children}
            </TooltipProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}