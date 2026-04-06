import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

/**
 * Hook to get current authenticated user
 * Returns { user, loading, error, logout }
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/user/me");
      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        setUser(null);
        if (response.status !== 401) {
          setError(data.error || "Failed to fetch user");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("An error occurred");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/sign-out", { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return {
    user,
    loading,
    error,
    logout,
    isAuthenticated: user !== null,
    refresh: fetchUser,
  };
}
