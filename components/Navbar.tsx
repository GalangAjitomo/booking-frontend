"use client";

import { logout } from "@/lib/auth";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="text-lg font-semibold">Room Booking App</div>

      <div className="flex gap-4">
        <a href="/rooms" className="hover:bg-indigo-500 px-3 py-2 rounded">
          Rooms
        </a>
        <a href="/bookings" className="hover:bg-indigo-500 px-3 py-2 rounded">
          My Bookings
        </a>
        <a href="/users" className="hover:bg-indigo-500 px-3 py-2 rounded">
          Users
        </a>

        <a href="/users/add" className="hover:bg-indigo-500 px-3 py-2 rounded">
          Add User
        </a>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}