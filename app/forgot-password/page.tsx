'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [resetUrl, setResetUrl] = useState<string | null>(null);   // ← New state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setResetUrl(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: data.message || 'Reset link sent! Check your email.' 
        });
        
        if (data.resetUrl) {
          setResetUrl(data.resetUrl);   // ← Show the clickable link
        }
        
        setEmail(''); // clear email field
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#6F1D1B] rounded-full flex items-center justify-center mb-4 text-white text-3xl">
            🔑
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
          <p className="text-gray-600 mt-2">
            No worries! Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#6F1D1B]/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
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

            {/* Show clickable reset link after success */}
            {resetUrl && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-2 font-medium">✅ Reset link ready (Development Mode):</p>
                <a 
                  href={resetUrl} 
                  className="text-blue-600 hover:underline break-all text-sm block"
                  target="_blank"
                >
                  {resetUrl}
                </a>
                <p className="text-xs text-blue-600 mt-2">
                  Click the link above to reset your password
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#6F1D1B] hover:bg-[#5a1716] text-white font-bold py-3.5 rounded-lg transition disabled:opacity-70"
            >
              {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="text-center mt-6 text-sm">
            Remember your password?{' '}
            <Link href="/sign-in" className="text-[#6F1D1B] font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Handcrafted Haven
          </Link>
        </div>
      </div>
    </div>
  );
}