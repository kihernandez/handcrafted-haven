"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PRODUCT_CATEGORIES } from "@/lib/categories";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image_url: "",
  });

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/dashboard/products/${id}`);
        const data = await res.json();
        setForm({
          name: data.name || "",
          price: String(data.price ?? ""),
          description: data.description || "",
          category: data.category || "",
          image_url: data.image_url || "",
        });
      } finally {
        setLoadingProduct(false);
      }
    };
    load();
  }, [id]);

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

    if (
      form.image_url &&
      form.image_url.trim() !== "" &&
      !form.image_url.startsWith("/") &&
      !form.image_url.startsWith("http")
    ) {
      return "Image URL must start with '/' for local images or 'http' for external images.";
    }

    return null;
  };

  const handleSave = async () => {
    const error = validate();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/dashboard/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image_url: form.image_url || "/images/placeholder.jpg",
        }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      setMessage({ type: "success", text: "Product updated successfully!" });

      setTimeout(() => {
        router.push("/dashboard/seller/products");
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error updating product." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(`/api/dashboard/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      router.push("/dashboard/seller/products");
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error deleting product." });
    }
  };

  return (
    <ProtectedRoute role="seller">
      {!user || user.role !== "seller" ? (
        <div>Not authorized.</div>
      ) : loadingProduct ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

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
                onClick={handleSave}
                disabled={submitting}
                className="px-4 py-2 bg-[#6F1D1B] text-white rounded"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
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
      )}
    </ProtectedRoute>
  );
}
