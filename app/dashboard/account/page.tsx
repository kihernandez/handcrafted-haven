"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format.";
    if (form.password && form.password.length > 0 && form.password.length < 8)
      return "Password must be at least 8 characters.";
    return null;
  };

  const handleSave = async () => {
    const error = validate();
    if (error) return setMessage({ type: "error", text: error });

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update account");

      setMessage({ type: "success", text: "Account updated successfully!" });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Error updating account." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete your account? This cannot be undone.")) return;

    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete account");

      router.push("/");
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Error deleting account." });
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

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
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="New Password (optional)"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <div className="flex gap-3 mt-4">
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
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
