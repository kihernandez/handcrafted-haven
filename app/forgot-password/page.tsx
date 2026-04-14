"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    setTimeout(() => {
      setMessage("If an account with that email exists, we have sent a password reset link.");
      setIsLoading(false);

      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE0D4] px-4 py-10">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-6">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#6F1D1B]">
            Forgot Password?
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>

        {message && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#6F1D1B] text-white rounded-md hover:bg-[#5a1716] font-semibold transition disabled:opacity-70"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center">
          <Link href="/sign-in" className="text-[#6F1D1B] hover:underline text-sm">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}