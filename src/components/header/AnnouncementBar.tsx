"use client";

import { Gift } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#E8EFE9] py-1.5 px-4">
      <div className="flex items-center justify-center gap-1.5 text-xs" style={{ color: "#5A6B5B" }}>
        <Gift className="w-3.5 h-3.5" strokeWidth={1.5} />
        <span className="font-medium tracking-wide">Yeni müştərilərə özəl 10% endirim</span>
      </div>
    </div>
  );
}