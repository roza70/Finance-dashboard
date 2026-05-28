"use client";

import { UserButton } from "@clerk/nextjs";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export default function Home() {
  const { data, isLoading } = useGetAccounts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}