"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export default function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
        active
          ? "bg-slate-200 font-medium"
          : "hover:bg-slate-100"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
