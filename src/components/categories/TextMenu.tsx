"use client";

import { textMenuCategories } from "@/lib/constants";

interface TextMenuProps {
  mobile?: boolean;
}

export default function TextMenu({ mobile = false }: TextMenuProps) {
  if (mobile) {
    // Mobil: Daha kiçik və yığcam
    return (
      <nav className="bg-white ">
        <div className="container mx-auto px-4">
          <ul className="flex flex-col gap-2 py-3">
            {textMenuCategories.map((category, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 block py-1.5 transition-colors duration-200"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  // Desktop: Original dizayn
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-center gap-10 py-2.5 overflow-x-auto scrollbar-hide">
          {textMenuCategories.map((category, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-sm font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap relative group transition-all duration-200"
              >
                {category}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}