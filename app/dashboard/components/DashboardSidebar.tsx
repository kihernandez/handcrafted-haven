"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/use-auth";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded transition ${
      pathname === path ? "bg-[#6F1D1B] text-white" : "text-gray-700 hover:bg-[#6F1D1B] hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Overview
        </Link>

        <Link href="/dashboard/account" className={linkClass("/dashboard/account")}>
          Account Settings
        </Link>

        {user?.role === "seller" && (
          <>
            <Link
              href="/dashboard/seller/products"
              className={linkClass("/dashboard/seller/products")}
            >
              My Products
            </Link>
            <Link
              href="/dashboard/seller/products/new"
              className={linkClass("/dashboard/seller/products/new")}
            >
              Add Product
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
