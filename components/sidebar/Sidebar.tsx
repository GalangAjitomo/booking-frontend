"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SidebarNav from "./SidebarNav";
import { Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex w-64 border-r bg-white">
        <div className="w-full p-4">
          <h1 className="mb-6 text-lg font-bold">Room Booking</h1>
          <SidebarNav />
        </div>
      </aside>

      {/* Mobile */}
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64">
            <h1 className="mb-6 text-lg font-bold">Room Booking</h1>
            <SidebarNav />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
