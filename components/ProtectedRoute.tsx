"use client";

import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  role, 
}: {
  children: React.ReactNode;
  role?: string;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not logged in → redirect to sign-in
      if (!user) {
        router.push("/sign-in");
      }

      // Logged in but wrong role → redirect to dashboard
      if (user && role && user.role !== role) {
        router.push("/dashboard");
      }
    }
  }, [loading, user, role, router]);

  if (loading || !user) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // If role is required but doesn't match, show nothing (redirect already triggered)
  if (role && user.role !== role) {
    return <div className="p-10 text-center text-red-600">Not authorized.</div>;
  }

  return <>{children}</>;
}
