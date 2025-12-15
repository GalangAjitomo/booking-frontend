"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import { apiFetch } from "@/lib/api";

type User = {
  id: string;
  userName: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<User[]>("/api/v1/users")
      .then(setUsers)
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Protected>
      <div className="max-w-lg">
        <h1 className="text-xl font-semibold mb-4">Users</h1>

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <ul className="space-y-2">
            {users.map(u => (
              <li
                key={u.id}
                className="border p-2 rounded"
              >
                {u.userName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Protected>
  );
}
