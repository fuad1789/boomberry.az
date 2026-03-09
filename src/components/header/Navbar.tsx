"use client";

import { useState } from "react";
import { X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "./AnnouncementBar";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import HeaderIcons from "./HeaderIcons";
import { textMenuCategories } from "@/lib/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <AnnouncementBar />
      
      {/* Sticky Header: Yalnız Logo və İkonlar */}
      <header className="sticky top-0 z-50 bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
      
      {/* Desktop Header: Search - Logo - Icons (eyni sətirdə) */}
      <div className="hidden md:block container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Sol: Axtarış Paneli */}
          <div className="w-72">
            <SearchBar />
          </div>
          
          {/* Mərkəz: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo />
          </div>
          
          {/* Sağ: İkonlar */}
          <div className="flex items-center gap-2">
            <HeaderIcons />
          </div>
        </div>
      </div>

      {/* Mobil Header: Hamburger - Logo - Icons */}
      <div className="md:hidden container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Sol: Hamburger Menyu */}
          <button 
            className="p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Mərkəz: Logo */}
          <div className="flex-1 flex justify-center">
            <Logo />
          </div>
          
          {/* Sağ: İkonlar (Heart + Cart) */}
          <div className="flex items-center gap-2">
            <HeaderIcons mobile />
          </div>
        </div>
      </div>
      </header>
      
      {/* Skroll Olunan Alt Bölmələr (Fixed/Sticky DEYİL) */}
      <div className="relative z-40 bg-white">
        {/* Mobil Axtarış Paneli (yalnız mobil) */}
        <div className="md:hidden px-4 py-3 border-b border-gray-50">
          <SearchBar />
        </div>
        
        {/* Desktop Mətn Menyu */}
        <div className="hidden md:block border-b border-gray-50">
        <nav className="bg-white">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center gap-10 py-3 overflow-x-auto scrollbar-hide">
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
      </div>
      </div>

      {/* Lüks Tam Ekran Mobil Menyu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menyu Paneli */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 z-50 md:hidden bg-[#FCFAEF] min-h-screen"
            >
              {/* Üst Panel: Logo + Bağla */}
              <div className="flex items-center justify-between px-6 py-4">
                <div /> {/* Boşluq */}
                <div className="flex-1 flex justify-center">
                  <Logo />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="w-7 h-7" strokeWidth={1} />
                </button>
              </div>

              {/* Naviqasiya Linkləri */}
              <nav className="flex flex-col justify-center h-full px-8 pb-20">
                <ul className="flex flex-col gap-6">
                  {textMenuCategories.map((category, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.15 + index * 0.08,
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                    >
                      <a
                        href="#"
                        className="block font-serif text-3xl text-gray-900 hover:text-[#B8977E] transition-colors duration-200 text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Alt Hissə (Footer) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 px-6 pb-8"
              >
                <div className="border-t border-gray-300 pt-4 flex items-center justify-center gap-4">
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    Bizimlə Əlaqə
                  </a>
                  <span className="text-gray-300">|</span>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <Instagram className="w-5 h-5" strokeWidth={1} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}