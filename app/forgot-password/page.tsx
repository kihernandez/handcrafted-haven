"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Generate a temporary token (replace with backend later)
    const token = crypto.randomUUID();

    // Create full reset link
    const resetLink = `${window.location.origin}/reset-password?token=${token}&email=${email}`;

    console.log("Reset Link:", resetLink);

    // Redirect user (simulate clicking email link)
    setTimeout(() => {
      router.push(`/reset-password?token=${token}&email=${email}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE0D4] px-4 py-10">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#6F1D1B]">
            Forgot Password?
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] transition"
              required
            />
          </div>

          {/* BUTTON - Fixed to dark red like your navbar */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 text-white bg-[#6F1D1B] rounded-md hover:bg-[#5a1716] transition-all duration-200 font-semibold shadow-sm disabled:opacity-70"
          >
            {isLoading ? "Redirecting..." : "Send Reset Link"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center text-sm text-gray-600">
          <Link
            href="/sign-in"
            className="text-[#6F1D1B] font-semibold hover:underline"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}