"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-bold">
        Hey{isLoaded ? ", " : " "}
        <span className="text-indigo-400">{user?.firstName}</span> 👋
      </h2>
      <p className="text-sm lg:text-base text-gray-400">
        Track your spending, grow your wealth
      </p>
    </div>
  );
};