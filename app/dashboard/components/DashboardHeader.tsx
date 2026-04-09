"use client";

import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    // UI-only logout simulation
    router.push("/sign-in");
  };

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Welcome back!</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-[#6F1D1B] text-white rounded hover:bg-[#5a1716] transition"
      >
        Logout
      </button>
    </header>
  );
}
