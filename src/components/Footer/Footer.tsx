"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "Kolleksiya", href: "/catalog" },
  { label: "Öz Qutunu Yarat", href: "/custom" },
  { label: "Korporativ", href: "/corporate" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Əlaqə", href: "/contact" },
];

function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true);
      },
      { threshold: 0.1 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return { ref, v };
}

export default function Footer() {
  const { ref, v } = useInView();

  return (
    <footer ref={ref} style={{ background: "#FAF7F2", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');
        .fl { color: rgba(28,16,9,0.5); text-decoration: none; font-family: 'Cormorant Garamond',serif; font-size: 1.1rem; letter-spacing: 0.02em; transition: color 0.2s; }
        .fl:hover { color: #8B4513; }
        .fsl { color: rgba(28,16,9,0.38); text-decoration: none; font-family: 'Cormorant Garamond',serif; font-size: 0.95rem; transition: color 0.2s; }
        .fsl:hover { color: #C9A96E; }
      `}</style>

      {/* Top divider */}
      <div
        style={{
          height: "0.5px",
          background:
            "linear-gradient(to right, transparent, rgba(139,69,19,0.2), transparent)",
        }}
      />

      {/* Main content — centered */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "52px 32px 40px",
          textAlign: "center",
        }}
      >
        {/* Brand name — large */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(139,69,19,0.45)",
              margin: "0 0 16px",
            }}
          >
            Bakı, Azərbaycan
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(3.5rem, 7vw, 6rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#1C1009",
              margin: "0 0 12px",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            Boombery
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1.15rem",
              fontStyle: "italic",
              color: "rgba(28,16,9,0.4)",
              margin: "0 0 32px",
              letterSpacing: "0.04em",
            }}
          >
            Hər dişləm bir hiss, hər hiss bir xatirədir.
          </p>
        </motion.div>

        {/* Nav links — single row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0 28px",
            marginBottom: 28,
          }}
        >
          {LINKS.map((l, i) => (
            <span
              key={l.label}
              style={{ display: "flex", alignItems: "center", gap: 32 }}
            >
              <a href={l.href} className="fl">
                {l.label}
              </a>
              {i < LINKS.length - 1 && (
                <span
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: "rgba(139,69,19,0.2)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
              )}
            </span>
          ))}
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {[
            {
              label: "Instagram",
              href: "https://instagram.com/Boombery.az",
              icon: (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              ),
            },
            {
              label: "WhatsApp",
              href: "https://wa.me/994501234567",
              icon: (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              ),
            },
            {
              label: "TikTok",
              href: "https://tiktok.com/@Boombery.az",
              icon: (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
                </svg>
              ),
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              title={s.label}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "0.5px solid rgba(139,69,19,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(28,16,9,0.35)",
                textDecoration: "none",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(201,169,110,0.6)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(201,169,110,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(139,69,19,0.2)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(28,16,9,0.35)";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Gold divider + diamond */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={v ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              flex: 1,
              height: "0.5px",
              background:
                "linear-gradient(to right, transparent, rgba(139,69,19,0.2))",
            }}
          />
          <div
            style={{
              width: 5,
              height: 5,
              background: "#C9A96E",
              transform: "rotate(45deg)",
              opacity: 0.5,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1,
              height: "0.5px",
              background:
                "linear-gradient(to left, transparent, rgba(139,69,19,0.2))",
            }}
          />
        </motion.div>

        {/* Micro footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={v ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.28 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px 28px",
          }}
        >
          <span className="fsl">© {new Date().getFullYear()} Boombery</span>
          <span
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(139,69,19,0.2)",
              display: "inline-block",
            }}
          />
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4CAF50",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span className="fsl" style={{ fontStyle: "italic" }}>
              09:00 – 21:00 · Həftə içi
            </span>
          </span>
          <span
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(139,69,19,0.2)",
              display: "inline-block",
            }}
          />
          <a href="/privacy" className="fsl">
            Məxfilik
          </a>
          <a href="/terms" className="fsl">
            Şərtlər
          </a>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(201,169,110,0.4) 35%, rgba(139,69,19,0.3) 65%, transparent)",
        }}
      />
    </footer>
  );
}
