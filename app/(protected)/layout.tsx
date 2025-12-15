"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    console.log("[PROTECTED] token check:", token);

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const token = getToken();

  // 🔑 Render guard (NO setState)
  if (!token) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
