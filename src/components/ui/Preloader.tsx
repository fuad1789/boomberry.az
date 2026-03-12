"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Minimum enforced loading time for cinematic feel and allowing assets to buffer
    const timer = setTimeout(() => {
      // Once timer is done, wait for window load if not already fired
      if (document.readyState === "complete") {
        setLoading(false);
      } else {
        const handleLoad = () => setLoading(false);
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }, 2200); // 2.2 seconds cinematic loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;500;600&display=swap');
        
        body {
          /* Prevent scrolling while loading */
          overflow: ${loading ? "hidden" : "auto"};
        }
      `}</style>

      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999, // Ensure it's above everything
              background: "#1C1009", // Deep chocolate luxury background
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Pulsating Logo Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Monogram / Icon Placeholder */}
              <motion.div
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,169,110,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: "linear-gradient(135deg, #C9A96E, #8B4513)",
                    borderRadius: "50%",
                  }}
                />
              </motion.div>

              {/* Brand Name */}
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  color: "#FAF7F2",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                Bloomberry
              </h1>

              {/* Tagline / Subtitle */}
              <p
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  margin: 0,
                  opacity: 0.8,
                }}
              >
                Premium Chocolate & Gifts
              </p>
            </motion.div>

            {/* Subtle Progress Bar Line */}
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                width: 120,
                height: 1,
                background: "rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#C9A96E",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
