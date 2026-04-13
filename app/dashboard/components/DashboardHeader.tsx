"use client";

import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. Call the API route to clear the cookie
      const response = await fetch("/api/sign-out", {
        method: "POST",
      });

      if (response.ok) {
        // 2. Redirect to sign-in page after successful server-side logout
        router.push("/sign-in");
        // Refresh the page to clear any client-side state
        router.refresh();
      } else {
        console.error("Logout failed on the server.");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
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
