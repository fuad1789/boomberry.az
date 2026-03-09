"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string;
  bgColor: string;
  hoverBgColor: string;
}

export default function CategoryCard({ name, image, bgColor, hoverBgColor }: CategoryCardProps) {
  const isSparklesCard = image === "sparkles";

  return (
    <div className="flex flex-col items-center gap-1">
      {/* İkon Qutusu - Ayrı container */}
      <motion.div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-[1rem] md:rounded-[1.25rem] flex items-center justify-center p-2 md:p-2.5 cursor-pointer ${bgColor} ${hoverBgColor} transition-all duration-300`}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="relative w-full h-full">
          {isSparklesCard ? (
            <Sparkles className="w-full h-full text-[#B8977E]" strokeWidth={1} />
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain drop-shadow-sm"
            />
          )}
        </div>
      </motion.div>
      
      {/* Mətn - Ayrı element, qutunun altında */}
      <span className="text-[10px] md:text-xs font-medium text-gray-800 tracking-wide text-center whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}