"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Hand, LogOut } from "lucide-react";
import { getUser, logout } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function TopBar() {
     const [username] = 
     useState<string | null>(() => {
        const user = getUser();
        return user?.userName ?? null;
     });


  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-2 font-semibold text-lg">
        <span>Hai {username ?? ""}</span>
        <Hand size={18} className="animate-pulse" />
      </div>


      {/* Right */}
      <Button
        variant="ghost"
        className="gap-2 text-red-600 cursor-pointer"
        onClick={logout}
      >
        <LogOut size={18} />
        Logout
      </Button>
    </header>
  );
}
