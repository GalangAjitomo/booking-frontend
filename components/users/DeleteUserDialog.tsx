"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  userId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteUserDialog({
  open,
  userId,
  onClose,
  onSuccess,
}: Props) {
  async function confirm() {
    if (!userId) return;

    try {
      await apiFetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
      });
      toast.success("User deleted");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to delete user");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>

        <p>Are you sure you want to delete this user?</p>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
