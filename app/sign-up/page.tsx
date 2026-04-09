"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const validate = () => {
    const errors = { name: "", email: "", password: "", confirmPassword: "" };

    if (!name.trim()) {
      errors.name = "Full name is required.";
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (password.length > 32) {
      errors.password = "Password must be 32 characters or fewer.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number.";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      errors.password = "Password must contain at least one symbol.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return !errors.name && !errors.email && !errors.password && !errors.confirmPassword;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validate()) {
      setError("Please fix the highlighted fields before continuing.");
      return;
    }

    setSuccess("Account created successfully! You can now sign in.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl border border-[#6F1D1B]/10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#6F1D1B]">Create Account</h2>
          <p className="text-gray-600 mt-2">Join Handcrafted Haven today</p>
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

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block mb-1.5 font-medium text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:border-transparent transition-all ${
                fieldErrors.name ? "border-red-400" : "border-gray-300"
              }`}
              required
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-1.5 font-medium text-gray-700" htmlFor="email">
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
            <label className="block mb-1.5 font-medium text-gray-700" htmlFor="password">
              Password
            </label>
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
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>
          <div>
            <label className="block mb-1.5 font-medium text-gray-700" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:border-transparent transition-all ${
                fieldErrors.confirmPassword ? "border-red-400" : "border-gray-300"
              }`}
              required
            />
            {fieldErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 text-white bg-[#6F1D1B] rounded-md hover:bg-[#5a1716] transition-colors font-bold shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#6F1D1B] font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}