"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { User } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user?: User;
}

export default function UserFormDialog({
  open,
  onClose,
  onSuccess,
  user,
}: Props) {
  const isEdit = !!user;

  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setDisplayName(user.displayName);
      setPassword("");
    } else {
      setUserName("");
      setDisplayName("");
      setPassword("");
    }
    setErrors([]);
  }, [user, open]);

  // =========================
  // SUBMIT
  // =========================
  async function submit() {
    setLoading(true);
    setErrors([]);

    try {
      if (isEdit) {
        // UPDATE
        await apiFetch(`/api/v1/users/${user!.id}`, {
          method: "PUT",
          body: JSON.stringify({ displayName }),
        });
        toast.success("User updated");
      } else {
        // CREATE
        await apiFetch("/api/v1/users", {
          method: "POST",
          body: JSON.stringify({
            userName,
            displayName,
            password,
            isAdmin: false,
          }),
        });
        toast.success("User created");
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      const messages: string[] = [];

      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message);
          if (Array.isArray(parsed)) {
            parsed.forEach((e) => e.description && messages.push(e.description));
          } else {
            messages.push(err.message);
          }
        } catch {
          messages.push(err.message);
        }
      } else {
        messages.push("Unexpected error");
      }

      setErrors(messages);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit User" : "Add User"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* USERNAME */}
          <div>
            <Label>Username</Label>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isEdit}
            />
          </div>

          {/* DISPLAY NAME */}
          <div>
            <Label>Display Name</Label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          {/* PASSWORD (ADD ONLY) */}
          {!isEdit && (
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          {/* ERRORS */}
          {errors.length > 0 && (
            <ul className="rounded bg-red-50 p-3 text-sm text-red-600 space-y-1">
              {errors.map((e, i) => (
                <li key={i}>• {e}</li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
