"use client";

import { useEffect, useMemo, useState } from "react";
import Protected from "@/components/Protected";
import { apiFetch } from "@/lib/api";
import { Room } from "@/types/room";
import { getUser } from "@/lib/auth";

const PAGE_SIZE = 10;

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const user = getUser();
  const isAdmin = user?.roles?.includes("Admin");

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch<Room[]>("/api/v1/rooms");
        setRooms(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ===== Client-side pagination =====
  const totalPages = Math.ceil(rooms.length / PAGE_SIZE);

  const pagedRooms = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return rooms.slice(start, start + PAGE_SIZE);
  }, [rooms, page]);

  if (loading) {
    return (
      <Protected>
        <p className="p-6">Loading rooms...</p>
      </Protected>
    );
  }

  if (error) {
    return (
      <Protected>
        <p className="p-6 text-red-600">{error}</p>
      </Protected>
    );
  }

  return (
    <Protected>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Rooms</h1>

          {isAdmin && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Add Room
            </button>
          )}
        </div>

        <div className="overflow-x-auto border rounded">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Location</th>
                <th className="border p-2 text-left">Capacity</th>
                {isAdmin && (
                  <th className="border p-2 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {pagedRooms.length === 0 ? (
                <tr>
                  <td
                    colSpan={isAdmin ? 4 : 3}
                    className="p-4 text-center text-gray-500"
                  >
                    No rooms available
                  </td>
                </tr>
              ) : (
                pagedRooms.map((r) => (
                  <tr key={r.roomId} className="hover:bg-gray-50">
                    <td className="border p-2">{r.name}</td>
                    <td className="border p-2">{r.location}</td>
                    <td className="border p-2">{r.capacity}</td>

                    {isAdmin && (
                      <td className="border p-2 space-x-2">
                        <button className="text-blue-600 hover:underline">
                          Edit
                        </button>
                        <button className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-2 py-1">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
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
