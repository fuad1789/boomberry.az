"use client";

import { User, Heart, ShoppingBag } from "lucide-react";

interface HeaderIconsProps {
  mobile?: boolean;
}

export default function HeaderIcons({ mobile = false }: HeaderIconsProps) {
  if (mobile) {
    // Mobil: Yalnız Heart və Cart (User gizli)
    return (
      <div className="flex items-center gap-1">
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <Heart className="w-5 h-5" />
        </button>
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    );
  }

  // Desktop: Bütün ikonlar
  return (
    <div className="flex items-center gap-4">
      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200">
        <User className="w-5 h-5" />
      </button>
      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200">
        <Heart className="w-5 h-5" />
      </button>
      <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200">
        <ShoppingBag className="w-5 h-5" />
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
          0
        </span>
      </button>
    </div>
  );
}