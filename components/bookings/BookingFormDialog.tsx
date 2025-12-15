"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Room } from "@/types/room";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Props {
  open: boolean;
  rooms: Room[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookingFormDialog({
  open,
  rooms,
  onClose,
  onSuccess,
}: Props) {
  const [roomId, setRoomId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [purpose, setPurpose] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // =========================
  // RESET ON OPEN
  // =========================
  useEffect(() => {
    if (open) {
      setRoomId("");
      setBookingDate("");
      setPurpose("");
      setErrors([]);
    }
  }, [open]);

  // =========================
  // SUBMIT
  // =========================
  async function submit() {
    setLoading(true);
    setErrors([]);

    try {
      await apiFetch("/api/v1/bookings", {
        method: "POST",
        body: JSON.stringify({
          roomId,
          bookingDate,
          purpose,
        }),
      });

      toast.success("Booking created");
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const messages: string[] = [];

      if (err instanceof Error) {
        // API bisa balikin:
        // { message: "Room already booked on this date" }
        try {
          const parsed = JSON.parse(err.message);
          if (parsed?.message) {
            messages.push(parsed.message);
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
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* ROOM */}
          <div>
            <Label>Room</Label>
            <Select value={roomId} onValueChange={setRoomId}>
              <SelectTrigger>
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((r) => (
                  <SelectItem key={r.roomId} value={r.roomId}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DATE */}
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>

          {/* PURPOSE */}
          <div>
            <Label>Purpose</Label>
            <Input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Optional"
            />
          </div>

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
