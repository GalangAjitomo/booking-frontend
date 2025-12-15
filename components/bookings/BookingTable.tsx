"use client";

import { Booking } from "@/types/booking";
import { Button } from "@/components/ui/button";

interface Props {
  bookings: Booking[];
  onDelete: (id: string) => void;
}

export default function BookingTable({
  bookings,
  onDelete,
}: Props) {
  return (
    <div className="border rounded overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Room</th>
            <th className="p-2 text-left">Purpose</th>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.bookingId} className="border-t">
              <td className="p-2">
                {new Date(b.bookingDate).toLocaleDateString()}
              </td>
              <td className="p-2">{b.roomName}</td>
              <td className="p-2">{b.purpose || "-"}</td>
              <td className="p-2">{b.userName}</td>
              <td className="p-2 text-center">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(b.bookingId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
