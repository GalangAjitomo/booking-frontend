"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Booking } from "@/types/booking";
import { Room } from "@/types/room";
import BookingFormDialog from "@/components/bookings/BookingFormDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // =========================
  // LOAD DATA (EFFECT ONLY)
  // =========================
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        const [bookingData, roomData] = await Promise.all([
          apiFetch<Booking[]>("/api/v1/bookings"),
          apiFetch<Room[]>("/api/v1/rooms"),
        ]);

        if (!cancelled) {
          setBookings(bookingData);
          setRooms(roomData);
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load bookings");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  // =========================
  // DELETE
  // =========================
  async function deleteBooking(id: string) {
    try {
      await apiFetch(`/api/v1/bookings/${id}`, {
        method: "DELETE",
      });
      toast.success("Booking deleted");
      setRefreshKey((k) => k + 1);
    } catch {
      toast.error("Failed to delete booking");
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Bookings</h1>
        <Button onClick={() => setFormOpen(true)}>
          Add Booking
        </Button>
      </div>

      {/* CREATE DIALOG */}
      <BookingFormDialog
        open={formOpen}
        rooms={rooms}
        onClose={() => setFormOpen(false)}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />

      {/* TABLE */}
      <div className="border rounded overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Room</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Purpose</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-500"
                >
                  No bookings
                </td>
              </tr>
            )}

            {bookings.map((b) => (
              <tr key={b.bookingId} className="border-t">
                <td className="p-2">{b.roomName}</td>
                <td className="p-2">
                  {new Date(b.bookingDate).toLocaleDateString()}
                </td>
                <td className="p-2">{b.purpose || "-"}</td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteBooking(b.bookingId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
