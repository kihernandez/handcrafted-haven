"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const validate = () => {
    const errors = { email: "", password: "" };

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    setFieldErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validate()) {
      setError("Please fix the errors before signing in.");
      return;
    }

    setIsLoading(true);

    // Simulated login
    setTimeout(() => {
      setSuccess("Welcome back! You have successfully signed in.");
      setIsLoading(false);

      // Force full reload so navbar updates with "Welcome, Name"
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl border border-[#6F1D1B]/10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#6F1D1B]">Welcome Back</h2>
          <p className="text-gray-600 mt-2">
            Please enter your details to sign in
          </p>
        </div>

        {success && (
          <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
            {success}
          </div>
        )}

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              className="block mb-1.5 font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@example.com"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:border-transparent transition-all ${
                fieldErrors.email ? "border-red-400" : "border-gray-300"
              }`}
              required
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <label className="font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-[#6F1D1B] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:border-transparent transition-all ${
                fieldErrors.password ? "border-red-400" : "border-gray-300"
              }`}
              required
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 text-white bg-[#6F1D1B] rounded-md hover:bg-[#5a1716] transition-colors font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link 
            href="/sign-up" 
            className="text-[#6F1D1B] font-bold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}