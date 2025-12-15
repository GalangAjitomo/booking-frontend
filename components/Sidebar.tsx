
"use client";

import { useState } from "react";
import Link from "next/link";
import { logout } from "@/lib/auth";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`bg-slate-900 text-white ${open ? "w-64" : "w-16"}`}>
      <button onClick={() => setOpen(!open)} className="p-2">
        ☰
      </button>

      <nav className="mt-4 space-y-2">
        <Link href="/bookings">📅 {open && "Bookings"}</Link>
        <Link href="/rooms">🏢 {open && "Rooms"}</Link>
        <Link href="/users">👤 {open && "Users"}</Link>
        <button onClick={logout}>🚪 {open && "Logout"}</button>
      </nav>
    </aside>
  );
}
