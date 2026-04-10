'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

// Inner Client Component (this uses useSearchParams)
function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  // Strong password validation (same as your sign-up page)
  const validatePassword = (pass: string): string => {
    if (!pass) return "Password is required.";
    if (pass.length < 8) return "Password must be at least 8 characters long.";
    if (pass.length > 32) return "Password must be no more than 32 characters.";
    if (!/[A-Z]/.test(pass)) return "Password must contain at least one uppercase letter (A-Z).";
    if (!/[a-z]/.test(pass)) return "Password must contain at least one lowercase letter (a-z).";
    if (!/[0-9]/.test(pass)) return "Password must contain at least one number (0-9).";
    if (!/[^A-Za-z0-9]/.test(pass)) return "Password must contain at least one special character (!@#$%^&* etc.).";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMessage({ type: 'error', text: passwordError });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: "Passwords do not match." });
      return;
    }

    if (!token) {
      setMessage({ type: 'error', text: "Invalid or missing reset token." });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: "Your password has been reset successfully!" });
        setTimeout(() => router.push('/sign-in'), 2000);
      } else {
        setMessage({ type: 'error', text: data.message || "Failed to reset password." });
      }
    } catch (err) {
      setMessage({ type: 'error', text: "Network error. Please check your connection and try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // If no token in URL
  if (!token) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600 text-4xl">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h1>
        <p className="text-gray-600 mb-6">This reset link is invalid or has expired.</p>
        <Link href="/forgot-password" className="text-[#6F1D1B] font-bold hover:underline">
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-[#6F1D1B] rounded-full flex items-center justify-center mb-4 text-white text-3xl">🔑</div>
        <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
        <p className="text-gray-600 mt-2">Enter your new password below</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#6F1D1B]/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
              disabled={isLoading}
            />
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-sm ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6F1D1B] hover:bg-[#5a1716] text-white font-bold py-3.5 rounded-lg transition disabled:opacity-70"
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <Link href="/sign-in" className="text-[#6F1D1B] font-bold hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Handcrafted Haven
        </Link>
      </div>
    </div>
  );
}

// Main Page with Suspense Boundary (this fixes the build error)
export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Suspense fallback={
        <div className="text-center py-12">
          <div className="animate-spin mx-auto h-8 w-8 border-4 border-[#6F1D1B] border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Loading reset page...</p>
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}