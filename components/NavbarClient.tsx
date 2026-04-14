'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function NavbarClient() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function handleSignOut() {
    await fetch('/api/sign-out', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  }

  // Don't flash Sign In/Sign Up before we know auth state
  if (loading) {
    return <div className="w-48 h-10" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white font-medium text-sm">
          👋 {user.name}
        </span>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#6F1D1B] transition text-sm text-white"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <Link
        href="/sign-in"
        className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#6F1D1B] transition text-sm text-white"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="px-4 py-2 bg-white text-[#6F1D1B] rounded hover:bg-gray-200 transition text-sm font-semibold"
      >
        Sign Up
      </Link>
    </div>
  );
}