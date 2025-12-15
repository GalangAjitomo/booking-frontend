"use client";

import { useEffect, useState, useEffectEvent } from "react";
import { apiFetch } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { User } from "@/types/user";
import UserTable from "@/components/users/UserTable";
import UserFormDialog from "@/components/users/UserFormDialog";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  // =========================
  // STATE
  // =========================
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<User | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // =========================
  // EVENT (EFFECT ONLY)
  // =========================
  const resolveAuthEvent = useEffectEvent(() => {
    const user = getUser();
    setIsAdmin(user?.roles?.includes("Admin") ?? false);
    setAuthReady(true);
  });

  const loadUsersEvent = useEffectEvent(async () => {
    const data = await apiFetch<User[]>("/api/v1/users");
    setUsers(data);
  });

  // =========================
  // EFFECT (TRIGGER EVENTS)
  // =========================
  useEffect(() => {
    resolveAuthEvent();
    loadUsersEvent();
  }, []);

  // =========================
  // UI CALLBACK (NORMAL FUNCTION)
  // =========================
  async function reloadUsers() {
    const data = await apiFetch<User[]>("/api/v1/users");
    setUsers(data);
  }

  // =========================
  // CONSISTENT INITIAL RENDER
  // =========================
  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // =========================
  // RENDER
  // =========================
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Users</h1>

        {isAdmin && (
          <Button onClick={() => setFormOpen(true)}>
            Add User
          </Button>
        )}
      </div>

      <UserTable
        users={users}
        isAdmin={isAdmin}
        onEdit={(u) => {
          setEditing(u);
          setFormOpen(true);
        }}
        onDelete={(u) => setDeletingId(u.id)}
      />

      <UserFormDialog
        open={formOpen}
        user={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(undefined);
        }}
        onSuccess={reloadUsers} 
      />

      <DeleteUserDialog
        open={!!deletingId}
        userId={deletingId}
        onClose={() => setDeletingId(null)}
        onSuccess={reloadUsers} 
      />
    </div>
  );
}
