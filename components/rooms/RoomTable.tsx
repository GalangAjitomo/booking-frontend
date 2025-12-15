"use client";

import { Room } from "@/types/room";
import { Button } from "@/components/ui/button";

interface Props {
  rooms: Room[];
  isAdmin: boolean;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export default function RoomTable({
  rooms,
  isAdmin,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="border rounded overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Capacity</th>
            {isAdmin && (
              <th className="p-2 text-center">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {rooms.map((r) => (
            <tr key={r.roomId} className="border-t">
              <td className="p-2">{r.name}</td>
              <td className="p-2 font-mono">{r.code}</td>
              <td className="p-2">{r.location ?? "-"}</td>
              <td className="p-2">{r.capacity}</td>

              {isAdmin && (
                <td className="p-2">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => onEdit(r)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => onDelete(r)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
