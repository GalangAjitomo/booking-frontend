"use client";

import { useEffect, useState } from "react";
import { Room, RoomFormDto } from "@/types/room";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
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

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  room?: Room;
}

export default function RoomFormDialog({
  open,
  onClose,
  onSuccess,
  room,
}: Props) {
  const [form, setForm] = useState<RoomFormDto>({
    code: "",
    name: "",
    capacity: 0,
    location: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // INIT FORM (EDIT MODE)
  // =========================
  useEffect(() => {
    if (room) {
      setForm({
        code: room.code,
        name: room.name,
        capacity: room.capacity,
        location: room.location ?? "",
      });
    } else {
      setForm({
        code: "",
        name: "",
        capacity: 0,
        location: "",
      });
    }
  }, [room]);

  // =========================
  // SUBMIT
  // =========================
  async function submit() {
    setLoading(true);

    try {
      if (room) {
        await apiFetch(`/api/v1/rooms/${room.roomId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        toast.success("Room updated successfully");
      } else {
        await apiFetch(`/api/v1/rooms`, {
          method: "POST",
          body: JSON.stringify(form),
        });
        toast.success("Room created successfully");
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save room";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{room ? "Edit Room" : "Add Room"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* CODE */}
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                value={form.code}
                onChange={(e) =>
                  setForm({ ...form, code: e.target.value })
                }
                required
              />
            </div>

            {/* NAME */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            {/* LOCATION */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
              />
            </div>

            {/* CAPACITY */}
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min={0}
                value={form.capacity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    capacity: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" className="cursor-pointer" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={submit} className="cursor-pointer" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <LoadingOverlay show={loading} />
    </>
  );
}
