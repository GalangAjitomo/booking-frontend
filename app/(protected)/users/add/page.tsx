"use client";

import { useState } from "react";
import Protected from "@/components/Protected";
import { apiFetch } from "@/lib/api";
import { toast } from "react-hot-toast";

type CreateUserPayload = {
  username: string;
  password: string;
  isAdmin: boolean;
};

export default function AddUserPage() {
  const [form, setForm] = useState<CreateUserPayload>({
    username: "",
    password: "",
    isAdmin: false,
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await apiFetch("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      toast.success("User created");
      setForm({ username: "", password: "", isAdmin: false });
    } catch {
      toast.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Protected>
      <div className="max-w-md">
        <h1 className="text-xl font-semibold mb-4">Add User</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Username"
            value={form.username}
            onChange={e =>
              setForm({ ...form, username: e.target.value })
            }
            required
          />

          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
            value={form.password}
            onChange={e =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isAdmin}
              onChange={e =>
                setForm({ ...form, isAdmin: e.target.checked })
              }
            />
            Admin
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Create User"}
          </button>
        </form>
      </div>
    </Protected>
  );
}
