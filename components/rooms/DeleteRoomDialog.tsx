"use client";

import { useState } from "react";
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
import LoadingOverlay from "@/components/ui/LoadingOverlay";

interface Props {
  open: boolean;
  roomId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteRoomDialog({
  open,
  roomId,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function confirmDelete() {
    if (!roomId) return;

    setLoading(true);
    try {
      await apiFetch(`/api/v1/rooms/${roomId}`, {
        method: "DELETE",
      });

      toast.success("Room deleted successfully");

      onSuccess(); // reload rooms list
      onClose();   // close dialog
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete room");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          fixed left-1/2 top-1/2 z-50
          w-[95vw] max-w-md
          -translate-x-1/2 -translate-y-1/2
        "
      >
        <DialogHeader>
          <DialogTitle>Delete Room</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this room?
          <br />
          This action cannot be undone.
        </p>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={confirmDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>

        <LoadingOverlay show={loading} />
      </DialogContent>
    </Dialog>
  );
}
