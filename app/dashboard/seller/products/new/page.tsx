"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function NewProductPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image_url: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Product name is required.";
    if (!form.price || Number(form.price) <= 0)
      return "Price must be a positive number.";
    if (!form.category) return "Category is required.";

    // Your original rule: image must be a valid URL if provided
    if (form.image_url && !form.image_url.startsWith("/images/")) {
      return 'Image path must start with "/images/".';
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/dashboard/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image_url: form.image_url || "/images/placeholder.jpg",
        }),
      });

      if (!res.ok) throw new Error("Failed to create product");

      setMessage({ type: "success", text: "Product created successfully!" });

      setTimeout(() => {
        router.push("/dashboard/seller/products");
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error creating product." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute role="seller">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Add Product</h1>

        {message && (
          <div
            className={`p-3 rounded mb-4 ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-white"
          >
            <option value="">Select a category</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            name="image_url"
            placeholder="/images/placeholder.jpg"
            value={form.image_url}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            rows={4}
          />

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-[#6F1D1B] text-white rounded"
            >
              {submitting ? "Saving..." : "Create Product"}
            </button>

            <button
              onClick={() => router.push("/dashboard/seller/products")}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
