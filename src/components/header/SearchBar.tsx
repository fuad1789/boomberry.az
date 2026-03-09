"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Məhsul və ya kateqoriya axtarın..."
        className="w-full py-2 md:py-2.5 pl-9 md:pl-10 pr-3 md:pr-4 rounded-full border border-gray-300 bg-white text-xs md:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
      />
      <Search className="absolute left-3 md:left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
    </div>
  );
}