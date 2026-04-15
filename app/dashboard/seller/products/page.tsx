"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/use-auth";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string | null;
};

export default function SellerProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "seller") return;

    const load = async () => {
      try {
        const res = await fetch("/api/dashboard/products");
        const data = await res.json();
        setProducts(data);
      } finally {
        setLoadingProducts(false);
      }
    };

    load();
  }, [user]);

  return (
    <ProtectedRoute role="seller">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Products</h1>
          <Link
            href="/dashboard/seller/products/new"
            className="px-4 py-2 bg-[#6F1D1B] text-white rounded"
          >
            Add Product
          </Link>
        </div>

        {loadingProducts ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded shadow flex justify-between"
              >
                <div>
                  <h2 className="font-semibold">{p.name}</h2>
                  <p className="text-sm text-gray-600">
                    ${Number(p.price).toFixed(2)}
                  </p>
                  {p.category && (
                    <p className="text-xs text-gray-500 mt-1">{p.category}</p>
                  )}
                  <Link
                    href={`/dashboard/seller/products/${p.id}/edit`}
                    className="text-[#6F1D1B] text-sm mt-2 inline-block"
                  >
                    Edit →
                  </Link>
                </div>
                <Image
                  src={p.image_url || "/images/placeholder.jpg"}
                  alt={p.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
