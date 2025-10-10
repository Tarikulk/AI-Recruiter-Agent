"use client";

import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

export default function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="bg-white p-4 rounded-3xl flex justify-between items-center shadow-md border border-gray-100">
      {/* Greeting */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Welcome Back, {user?.name || "User"} 👋
        </h2>
        <p className="mt-1 text-gray-500 text-sm md:text-base">
          AI-Driven Interviews, Hassle-Free Hiring
        </p>
      </div>

      {/* User Avatar */}
      {user && (
        <div className="flex-shrink-0">
          <Image
            src={user?.picture}
            alt="user"
            height={50}
            width={50}
            className="rounded-full border-2 border-blue-200 shadow-sm"
          />
        </div>
      )}
    </div>
  );
}
