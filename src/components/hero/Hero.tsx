"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Dubay Şokoladı",
    subtitle: "100% təbii püstə kremi və xırtıldayan kadayıfın Belçika şokoladı ilə mükəmməl rəqsi.",
    video: "/assets/videos/dubai chokolot.mp4",
    overlayColor: "rgba(240, 244, 241, 0.8)", // bg-[#F0F4F1]
  },
  {
    id: 2,
    title: "Çiyələk Möcüzəsi",
    subtitle: "Gününüzü xüsusi edəcək təzə giləmeyvə və premium şokoladın ahəngi.",
    video: "/assets/videos/ciyelek.mp4",
    overlayColor: "rgba(253, 246, 247, 0.8)", // bg-[#FDF6F7]
  },
  {
    id: 3,
    title: "Eksklüziv Hədiyyələr",
    subtitle: "Sevdiklərinizi unudulmaz premium ləzzətlərlə təəccübləndirin.",
    video: "/assets/videos/hediye.mp4",
    overlayColor: "rgba(252, 250, 239, 0.8)", // bg-[#FCFAEF]
  },
];

const SMOOTH_EASING = [0.16, 1, 0.3, 1] as const;
const SLOW_TRANSITION = { duration: 1.4, ease: SMOOTH_EASING };
const MEDIUM_TRANSITION = { duration: 0.8, ease: SMOOTH_EASING };
const BG_TRANSITION = { duration: 1.5, ease: "easeInOut" as const };

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-140px)] min-h-[400px] max-h-[700px] overflow-hidden">
      
      {/* 1. İmmersiv Arxa Fon - PERFORMANS ÜÇÜN YALNIZ RƏNG KEÇİDİ (6 video problemini həll etdi) */}
      <div className="absolute inset-0 w-full h-full bg-white z-0">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ backgroundColor: slides[currentSlide].overlayColor }}
          transition={BG_TRANSITION}
        />
        {/* Lüks dərinlik üçün statik blur elementi */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/40 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* 2. Mərkəzi Glassmorphism Kart */}
      <div className="relative z-30 container mx-auto px-4 h-full flex items-center">
        <div className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto w-full p-4 pt-2 md:p-10 rounded-[3rem]">
          
          {/* Sol Tərəf: Editorial Tipografiya (YALNIZ DESKTOP) */}
          <div className="hidden md:block w-1/2 relative h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desktop-text-${currentSlide}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={MEDIUM_TRANSITION}
                className="absolute inset-0 flex flex-col justify-center gap-4 px-8"
              >
                <p className="text-xs tracking-[0.3em] text-[#B8977E] uppercase font-medium">
                  ✧ YENİ KOLLEKSİYA ✧
                </p>

                <h1 className="font-serif text-5xl md:text-7xl text-gray-900 leading-[1.1]">
                  <span className="block">{slides[currentSlide].title.split(" ")[0]}</span>
                  <span className="block italic font-light">{slides[currentSlide].title.split(" ").slice(1).join(" ")}</span>
                </h1>
                
                <div className="relative min-h-[60px]">
                  <p className="text-gray-600 text-lg font-light leading-relaxed">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>
                
                <button className="mt-4 px-10 py-4 w-fit tracking-wider text-xs uppercase transition-all duration-500 rounded-full bg-[#3E2723] text-white hover:bg-black shadow-lg hover:shadow-xl">
                  Kəşf Et
                </button>

                {/* Trust Badge */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-white shadow-sm flex items-center justify-center"
                      >
                        <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 font-light">
                    Bakıda <span className="font-medium text-gray-700">+5000</span> xoşbəxt müştəri
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center mt-2 md:mt-0">
            <div className="relative w-[90%] mx-auto md:w-[260px] h-[calc(100vh-240px)] min-h-[400px] max-h-[550px] md:h-[50vh] md:max-h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-white">
              
              {/* Qara Qradiyent Overlay (yalnız mobil) - Gücləndirilmiş oxunaqlılıq */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/50 to-transparent md:hidden pointer-events-none" />

              {/* Mətnlər (yalnız mobil) - Ən aşağı yığılmış, yığcam */}
              <div className="absolute inset-0 z-30 md:hidden pointer-events-none flex flex-col justify-end p-5 pb-8">
                <div className="relative h-[160px] w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`mobile-text-${currentSlide}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={MEDIUM_TRANSITION}
                      className="absolute inset-0 flex flex-col justify-end"
                    >
                      <h2 className="text-white font-serif text-3xl mb-1 leading-none drop-shadow-xl">
                        {slides[currentSlide].title}
                      </h2>
                      <div className="min-h-[36px] mb-3">
                        <p className="text-white/95 text-sm line-clamp-2 font-light drop-shadow-lg leading-snug">
                          {slides[currentSlide].subtitle}
                        </p>
                      </div>
                      <button className="bg-white/20 backdrop-blur-md border border-white/50 text-white font-light rounded-full px-7 py-2.5 w-max hover:bg-white/30 transition-all pointer-events-auto shadow-xl">
                        Kəşf Et
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Foreground Videos (Yalnız 3 video qaldı, lag yoxdur) */}
              {slides.map((slide, index) => (
                <motion.video
                  key={`content-video-${slide.id}`}
                  initial={false}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0,
                    zIndex: currentSlide === index ? 10 : 0
                  }}
                  transition={SLOW_TRANSITION}
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
              
              {/* Glossy overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20 z-40" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group py-1.5 px-0.5 focus:outline-none"
          >
            <div
              className={`h-[2px] transition-all duration-500 ease-out rounded-full ${
                currentSlide === index
                  ? "w-10 bg-gray-900"
                  : "w-5 bg-gray-400 group-hover:bg-gray-600"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}