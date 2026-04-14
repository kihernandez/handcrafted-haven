"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setMessage("Password reset successful! Redirecting to sign in...");
      setIsLoading(false);

      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    }, 1200);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDE0D4]">
        <p className="text-red-600 text-center">Invalid or expired reset link.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE0D4] px-4 py-10">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">

        <h2 className="text-3xl font-bold text-center text-[#6F1D1B]">
          Reset Password
        </h2>

        {message && (
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-md text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#6F1D1B] text-white rounded-md hover:bg-[#5a1716] font-semibold transition disabled:opacity-70"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center">
          Resetting password for: <span className="font-medium">{email}</span>
        </p>
      </div>
    </div>
  );
}