"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { getToken } from "@/lib/auth";

interface Props {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <Sidebar />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <TopBar />

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
