"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/use-auth";
import SellerDashboard from "./components/SellerDashboard";
import CustomerDashboard from "./components/CustomerDashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      {user?.role === "seller" ? <SellerDashboard /> : <CustomerDashboard />}
    </ProtectedRoute>
  );
}
