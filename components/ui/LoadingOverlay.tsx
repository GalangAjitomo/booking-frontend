"use client";

import { Loader2 } from "lucide-react";

export default function LoadingOverlay({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div
      className="
        fixed inset-0 
        z-[9999]
        flex items-center justify-center
        bg-black/40
      "
    >
      <div className="flex items-center gap-2 rounded-md bg-white px-6 py-4 shadow-lg">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm font-medium">Processing...</span>
      </div>
    </div>
  );
}
