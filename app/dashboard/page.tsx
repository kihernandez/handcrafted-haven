"use client";

import { useEffect, useState } from "react";
import SellerDashboard from "./components/SellerDashboard";
import CustomerDashboard from "./components/CustomerDashboard";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadRole = () => {
      const savedRole = localStorage.getItem("mockRole");
      setRole(savedRole);
    };

    loadRole();
  }, []);

  if (!role) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  return (
    <>
      {role === "seller" && <SellerDashboard />}
      {role === "customer" && <CustomerDashboard />}
    </>
  );
}
