"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const bestsellers = [
  { id: 1, name: "Dubay Şokoladı", image: "/assets/products/dubay2.png" },
  {
    id: 2,
    name: "Çiyələk Buketləri",
    image: "/assets/products/ciyelek-buketi2.png",
  },
  { id: 3, name: "Konfet və Trufellər", image: "/assets/products/truffle2.png" },
  {
    id: 4,
    name: "Korporativ Hədiyyələr",
    image: "/assets/products/korporativ2.png",
  },
  { id: 5, name: "Ad Günü", image: "/assets/products/ad-gunu2.png" },
  { id: 6, name: "Sevgililər", image: "/assets/products/sevgililer2.png" },
  { id: 7, name: "Yeni İş", image: "/assets/products/yeni-is2.png" },
  { id: 8, name: "Keçmiş Olsun", image: "/assets/products/sevgililer.jpg" },
  { id: 9, name: "Özr", image: "/assets/products/ozr2.png" },
  { id: 10, name: "Sublimə Məhsulları", image: "/assets/products/sublime2.png" },
];

export default function Bestsellers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimensions.width > 0 && windowDimensions.width < 768;
  
  // Clear side-by-side spacing with sharp portrait aspect ratio (3/4)
  const itemWidth = isMobile ? 240 : 260; // Active kart böyüdüldü
  const gap = isMobile ? 12 : 20;

  return (
    <section className="relative w-full min-h-[100vh] py-16 md:py-24 flex flex-col justify-center overflow-hidden bg-[#FDFCF7]">
      
      {/* 1. Nəhəng Arxa Fon Möhürü (The Watermark) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none w-full flex justify-center overflow-hidden">
        <span className="font-serif text-[18vw] text-[#F3EFE5] opacity-50 uppercase tracking-tighter leading-none select-none pointer-events-none whitespace-nowrap">
          EXCLUSIVE
        </span>
      </div>

      {/* 2 & 3. Əsas Başlıq və Alt Mətn (Editorial Header) */}
      <div className="container mx-auto px-4 mb-10 md:mb-14 text-center z-10 relative shrink-0">
        <h2 className="text-4xl md:text-6xl text-gray-900 font-serif font-light italic tracking-tight">
          Bestseller Kolleksiyamız
        </h2>
        
        <div className="w-12 h-[1px] bg-[#3E2723] mx-auto mt-4 md:mt-6" />
        
        <p className="max-w-md mx-auto mt-5 md:mt-6 text-gray-500 font-light leading-relaxed tracking-widest text-sm md:text-base">
          Müştərilərimizin ən çox sevdiyi, unudulmaz anlara ləzzət qatan xüsusi seçimlərimiz.
        </p>
      </div>

      {/* Center-mode Slider Container */}
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center z-20 shrink-0 godiva-swiper-container">
        
        <Swiper
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          spaceBetween={gap}
          slideToClickedSlide={true}
          watchSlidesProgress={true}
          speed={1200} // Cinematic heavy 1.2s slide transition
          className="w-full h-full !overflow-visible"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onProgress={(swiper) => {
            // High-performance custom DOM manipulation for exact wave physics without React lag
            swiper.slides.forEach((slide) => {
              const progress = (slide as any).progress; 
              const absProgress = Math.abs(progress);
              
              let scale = 1;
              let y = 0;
              
              // Mobildə qonşu kartlar daha da balaca (0.75) olacaq, desktopda normal (0.9)
              const maxShrink = isMobile ? 0.35 : 0.2; 
              const minScale = 1.1 - maxShrink;
          
              if (absProgress <= 1) { 
                 scale = 1.1 - (maxShrink * absProgress); // 1.1 -> kiçilir
                 y = 35 * Math.pow(absProgress, 2); // 0 up to 35px
              } else if (absProgress <= 2) { 
                 scale = minScale;                      
                 y = 35 - (60 * Math.pow(absProgress - 1, 0.5)); // 35 down to -25px
              } else {
                 scale = minScale;
                 y = 35 - (60 * Math.pow(1, 0.5)); // clamp at outer bounds
              }
              
              slide.style.transitionProperty = "transform";
              slide.style.transitionTimingFunction = "cubic-bezier(0.16, 1, 0.3, 1)";
              slide.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
              
              slide.style.zIndex = `${50 - Math.round(absProgress * 10)}`;
            });
          }}
          onSetTransition={(swiper, duration) => {
            swiper.slides.forEach(slide => {
              slide.style.transitionDuration = `${duration}ms`;
            });
          }}
        >
          {bestsellers.map((item) => (
            <SwiperSlide key={item.id} style={{ width: itemWidth }}>
              
              <div className="w-full h-full flex items-center justify-center">
                
                <div className="w-full relative">
                  {/* Image Container - Paspartu styling handled by CSS when active */}
                  <div className="paspartu-wrapper relative w-full aspect-[3/4] flex flex-col rounded-sm overflow-hidden bg-transparent shadow-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    
                    {/* Inner Image Wrapper */}
                    <div className="relative w-full h-full flex-grow overflow-hidden rounded-sm bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        priority={item.id <= 5}
                        loading={item.id <= 5 ? "eager" : "lazy"}
                        fetchPriority={item.id <= 5 ? "high" : "auto"}
                        className="object-contain object-center w-full h-full scale-[1.1] brightness-[1.02]"
                        quality={85}
                      />
                    </div>
                    
                    {/* Center Card Inside Text (Godiva Style) */}
                    <div className="active-text bg-[#3E2723] text-white flex justify-between items-center rounded-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <h3 className="font-serif text-[9px] md:text-[11px] uppercase truncate tracking-[0.25em]">{item.name}</h3>
                      <span className="font-thin text-base md:text-lg ml-3">→</span>
                    </div>

                  </div>

                  {/* Inactive Card Outside Text */}
                  <div className="inactive-text absolute top-full mt-3 left-0 w-full px-1 flex justify-between items-center text-gray-800 transition-opacity duration-500">
                    <h3 className="font-serif text-[10px] md:text-xs uppercase font-medium truncate pr-2 tracking-[0.15em]">{item.name}</h3>
                    <span className="font-thin text-sm md:text-base opacity-60">→</span>
                  </div>
                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CSS Overrides for Swiper Active State */}
      <style jsx global>{`
        /* Swiper Active Slide gets the Paspartu Box */
        .swiper-slide-active .paspartu-wrapper {
          background-color: white !important;
          padding: 12px !important;
          border: 1px solid #f3f3f3 !important;
          box-shadow: 0 40px 80px -15px rgba(62, 39, 35, 0.12) !important;
        }
        @media (min-width: 768px) {
          .swiper-slide-active .paspartu-wrapper {
            padding: 16px !important;
          }
        }
        
        /* Inner active brown text (Absolute Overlay) */
        .active-text {
          position: absolute;
          bottom: 12px;
          left: 12px;
          width: calc(100% - 24px);
          opacity: 0;
          transform: translateY(10px);
          padding: 8px 12px !important;
          pointer-events: none;
        }
        @media (min-width: 768px) {
          .active-text {
            bottom: 16px;
            left: 16px;
            width: calc(100% - 32px);
            padding: 10px 16px !important;
          }
        }
        .swiper-slide-active .active-text {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* Outside floating text (hidden on active) */
        .inactive-text {
          opacity: 1;
          pointer-events: auto;
        }
        .swiper-slide-active .inactive-text {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
