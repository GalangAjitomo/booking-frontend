"use client";

import NavItem from "./NavItem";
import {
  Building,
  Calendar,
  Users,
} from "lucide-react";

export default function SidebarNav() {
  return (
    <nav className="space-y-1">
      <NavItem
        href="/rooms"
        icon={<Building size={18} />}
        label="Rooms"
      />

      <NavItem
        href="/bookings"
        icon={<Calendar size={18} />}
        label="Bookings"
      />

      <NavItem
        href="/users"
        icon={<Users size={18} />}
        label="Users"
      />
    </nav>
  );
}
