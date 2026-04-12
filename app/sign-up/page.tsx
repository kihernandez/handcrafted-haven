"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // NEW FIELD

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const validate = () => {
    const errors = { name: "", email: "", password: "", confirmPassword: "", role: "" };

    if (!name.trim()) errors.name = "Full name is required.";

    if (!email.trim()) errors.email = "Email is required.";
    else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";

    if (!password) errors.password = "Password is required.";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters.";
    else if (password.length > 32) errors.password = "Password must be 32 characters or fewer.";
    else if (!/[A-Z]/.test(password)) errors.password = "Password must contain at least one uppercase letter.";
    else if (!/[a-z]/.test(password)) errors.password = "Password must contain at least one lowercase letter.";
    else if (!/[0-9]/.test(password)) errors.password = "Password must contain at least one number.";
    else if (!/[^A-Za-z0-9]/.test(password)) errors.password = "Password must contain at least one symbol.";

    if (!confirmPassword) errors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";

    if (!role) errors.role = "Please select an account type.";

    setFieldErrors(errors);
    return !errors.name && !errors.email && !errors.password && !errors.confirmPassword && !errors.role;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validate()) {
      setError("Please fix the highlighted fields before continuing.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccess("Account created successfully! Redirecting to sign in...");
      setIsLoading(false);

      // Redirect to sign-in page
      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    } catch (err) {
      console.error("Sign-up error:", err);
      setError("An error occurred during registration. Please try again.");
      setIsLoading(false);
    }
    // localStorage so dashboard can read it (for testing purposes until authentication system is implemented)
    localStorage.setItem("mockRole", role);

    setSuccess("Account created successfully! Redirecting...");
  };

  return (
    <div className="flex flex-col justify-center min-h-[70vh] px-4">
      <div className="w-full p-8 max-w-none space-y-6 bg-white rounded-lg shadow-xl border border-[#6F1D1B]/10">
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
          {/* NAME */}
          <div>
            <label className="block mb-1.5 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6F1D1B] ${
                fieldErrors.name ? "border-red-400" : "border-gray-300"
              }`}
            />
            {fieldErrors.name && <p className="text-sm text-red-600">{fieldErrors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1.5 font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@example.com"
              className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6F1D1B] ${
                fieldErrors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1.5 font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6F1D1B] ${
                fieldErrors.password ? "border-red-400" : "border-gray-300"
              }`}
            />
            {fieldErrors.password && <p className="text-sm text-red-600">{fieldErrors.password}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block mb-1.5 font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6F1D1B] ${
                fieldErrors.confirmPassword ? "border-red-400" : "border-gray-300"
              }`}
            />
            {fieldErrors.confirmPassword && (
              <p className="text-sm text-red-600">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          {/* ROLE SELECTION */}
          <div>
            <label className="block mb-1.5 font-medium text-gray-700">Account Type</label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6F1D1B] ${
                fieldErrors.role ? "border-red-400" : "border-gray-300"
              }`}
            >
              <option value="">Select an option</option>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
            {fieldErrors.role && <p className="text-sm text-red-600">{fieldErrors.role}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 text-white bg-[#6F1D1B] rounded-md hover:bg-[#5a1716] transition-colors font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
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
