"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Room } from "@/types/room";
import { getUser } from "@/lib/auth";
import RoomTable from "@/components/rooms/RoomTable";
import RoomFormDialog from "@/components/rooms/RoomFormDialog";
import DeleteRoomDialog from "@/components/rooms/DeleteRoomDialog";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editing, setEditing] = useState<Room | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // ⬇️ NULL = belum tahu (server & first client render SAMA)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // =========================
  // LOAD ROOMS
  // =========================
  async function loadRooms() {
    setPageLoading(true);
    try {
      const data = await apiFetch<Room[]>("/api/v1/rooms");
      setRooms(data);
    } catch (err) {
      console.error("Failed to load rooms", err);
    } finally {
      setPageLoading(false);
    }
  }

  // =========================
  // INIT (CLIENT ONLY)
  // =========================
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // 🔒 Ambil user SETELAH mount (AMAN)
        const user = getUser();
        if (!cancelled) {
          setIsAdmin(user?.roles?.includes("Admin") ?? false);
        }

        const data = await apiFetch<Room[]>("/api/v1/rooms");
        if (!cancelled) {
          setRooms(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
        }
      } finally {
        if (!cancelled) {
          setPageLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Rooms</h1>

        {/* ⬇️ Render aman: null & false sama-sama tidak render */}
        {isAdmin === true && (
          <Button className="cursor-pointer" onClick={() => setFormOpen(true)}>
            Add Room
          </Button>
        )}
      </div>

      <RoomTable
        rooms={rooms}
        isAdmin={isAdmin === true}
        onEdit={(r) => {
          setEditing(r);
          setFormOpen(true);
        }}
        onDelete={(r) => setDeletingId(r.roomId)}
      />

      <RoomFormDialog
        open={formOpen}
        room={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(undefined);
        }}
        onSuccess={loadRooms}
      />

      <DeleteRoomDialog
        open={!!deletingId}
        roomId={deletingId}
        onClose={() => setDeletingId(null)}
        onSuccess={loadRooms}
      />

      <LoadingOverlay show={pageLoading} />
    </div>
  );
}
