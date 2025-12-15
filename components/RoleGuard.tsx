"use client";

import { getUser } from "@/lib/auth";

export default function RoleGuard({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const user = getUser();
  if (!user?.roles.includes(role)) return null;
  return <>{children}</>;
}
