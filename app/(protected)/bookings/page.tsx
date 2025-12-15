"use client";

import { useEffect, useMemo, useState } from "react";
import Protected from "@/components/Protected";
import { apiFetch } from "@/lib/api";
import { Booking } from "@/types/booking";
import BookingForm from "@/components/BookingForm";

const PAGE_SIZE = 10;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // =========================
  // FETCH DATA
  // =========================
  async function loadBookings() {
    setLoading(true);
    setError(null);

    try {
      const data = await apiFetch<Booking[]>("/api/v1/bookings");
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  // =========================
  // CLIENT-SIDE PAGINATION
  // =========================
  const totalPages = Math.ceil(bookings.length / PAGE_SIZE);

  const pagedBookings = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return bookings.slice(start, start + PAGE_SIZE);
  }, [bookings, page]);

  return (
    <Protected>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Bookings</h1>

          <button
            onClick={loadBookings}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* CREATE BOOKING */}
        <BookingForm onSuccess={loadBookings} />

        {/* ERROR STATE */}
        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Room</th>
                <th className="border p-2 text-left">Purpose</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center">
                    Loading bookings...
                  </td>
                </tr>
              ) : pagedBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="p-4 text-center text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                pagedBookings.map((b) => (
                  <tr key={b.bookingId} className="hover:bg-gray-50">
                    <td className="border p-2">
                      {new Date(b.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      {b.roomId}
                    </td>
                    <td className="border p-2">
                      {b.purpose || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-end gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-2 py-1">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Protected>
  );
}
