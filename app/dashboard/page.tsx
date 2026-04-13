"use client";

// import { useEffect, useState } from "react";
import { useAuth } from "@/lib/use-auth";
import SellerDashboard from "./components/SellerDashboard";
import CustomerDashboard from "./components/CustomerDashboard";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  if (!user) {
    return <div className="p-10 text-center text-red-600">Please log in to access the dashboard.</div>;
  }

  return (
    <>
      {user.role === "seller" && <SellerDashboard />}
      {user.role === "customer" && <CustomerDashboard />}
    </>
  );
}
