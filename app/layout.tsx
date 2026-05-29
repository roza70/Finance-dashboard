import { ClerkProvider } from '@clerk/nextjs'
import { QueryProvider } from "@/providers/query-provider";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <QueryProvider>
        <html lang="en" className={inter.className}>
          <body className="h-full">
            <NewAccountSheet />
            <Toaster />
            {children}
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}