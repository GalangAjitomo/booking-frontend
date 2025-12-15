"use client";

import { User } from "@/types/user";
import { Button } from "@/components/ui/button";

interface Props {
  users: User[];
  isAdmin: boolean;
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
}

export default function UserTable({
  users,
  isAdmin,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="border rounded overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Display Name</th>
            {isAdmin && <th className="p-2 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.userName}</td>
              <td className="p-2">{u.displayName}</td>
              {isAdmin && (
                <td className="p-2 text-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(u)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(u)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
