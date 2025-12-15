"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function BookingForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [roomId, setRoomId] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch("/api/v1/bookings", {
        method: "POST",
        body: JSON.stringify({ roomId, bookingDate, purpose }),
      });

      onSuccess();
      setRoomId("");
      setBookingDate("");
      setPurpose("");
    } catch (err) {
      console.error(err);
      alert("Booking failed: " + (err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div>
        <label className="block text-sm font-medium">Room ID</label>
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
          className="border p-2 w-full"
          placeholder="Enter room ID"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Booking Date</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Purpose</label>
        <input
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="border p-2 w-full"
          placeholder="Purpose"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Create Booking
      </button>
    </form>
  );
}
