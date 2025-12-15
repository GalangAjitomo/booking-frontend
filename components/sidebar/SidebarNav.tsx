"use client";

import NavItem from "./NavItem";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import RoleGuard from "@/components/RoleGuard";
import {
  Building,
  Calendar,
  Users,
  LogOut,
} from "lucide-react";

export default function SidebarNav() {
  return (
    <div className="flex h-full flex-col justify-between">
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

        <RoleGuard role="Admin">
          <NavItem
            href="/users"
            icon={<Users size={18} />}
            label="Users"
          />
        </RoleGuard>
      </nav>

      <Button
        variant="ghost"
        className="mt-4 justify-start gap-3 text-red-600"
        onClick={logout}
      >
        <LogOut size={18} />
        Logout
      </Button>
    </div>
  );
}
