"use client";

import { iconSliderCategories } from "@/lib/constants";
import CategoryCard from "./CategoryCard";

export default function IconSlider() {
  return (
    <div className="bg-white py-2 md:py-6 border-b border-[rgba(62,39,35,0.06)]">
      <div className="container mx-auto px-4">
        {/* Slayder - Mobil: snap-x, Desktop: mərkəzləşdirilmiş */}
        <div className="flex md:justify-center gap-3 md:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2 pb-1 md:py-3 -mx-4 px-4 md:mx-0 md:px-0">
          {iconSliderCategories.map((category) => (
            <div className="snap-center flex-shrink-0" key={category.id}>
              <CategoryCard
                name={category.name}
                image={category.image}
                bgColor={category.bgColor}
                hoverBgColor={category.hoverBgColor}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}