"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded hover:bg-[#6F1D1B] hover:text-white transition ${
      pathname === path ? "bg-[#6F1D1B] text-white" : "text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Overview
        </Link>

        <Link href="/dashboard/account" className={linkClass("/dashboard/account")}>
          Account Settings
        </Link>

        <Link href="/dashboard/orders" className={linkClass("/dashboard/orders")}>
          Orders
        </Link>

        <Link href="/dashboard/products" className={linkClass("/dashboard/products")}>
          My Products
        </Link>

        <Link href="/dashboard/add-product" className={linkClass("/dashboard/add-product")}>
          Add Product
        </Link>
      </nav>
    </aside>
  );
}
