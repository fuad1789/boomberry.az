"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    id: 1,
    quote:
      "Hər dişləmdə Belçikanın ürəyini hiss etdim. Boombery sadəcə şokolad deyil — bu, bir hiss.",
    author: "Aytən M.",
    role: "Daimi Müştəri",
    location: "Bakı",
    product: "Dubay Şokoladı",
    date: "Mart 2024",
    initial: "A",
  },
  {
    id: 2,
    quote:
      "Korporativ hədiyyə olaraq 80 qutu sifariş etdik. Tərəfdaşlarımızın reaksiyası inanılmaz idi. Növbəti dəfə mütləq yenidən.",
    author: "Rəşad K.",
    role: "Müdir, TechAz MMC",
    location: "Bakı",
    product: "Korporativ Kolleksiya",
    date: "Fevral 2024",
    initial: "R",
  },
  {
    id: 3,
    quote:
      "Qutunu açan andan hədiyyənin dəyərini hiss etdim. Qablaşdırma özü bir sənət əsəridir.",
    author: "Nigar S.",
    role: "Bloger & İçerik Yaradıcısı",
    location: "Gəncə",
    product: "Premium Hədiyyə Qutusu",
    date: "Yanvar 2024",
    initial: "N",
  },
  {
    id: 4,
    quote:
      "Ruby şokolad kolleksiyası — dünyada belə bir şey yediyimi xatırlamıram. Nadir bir ləzzət təcrübəsi.",
    author: "Fərid H.",
    role: "Restorator",
    location: "Bakı",
    product: "Ruby Kolleksiya",
    date: "Dekabr 2023",
    initial: "F",
  },
  {
    id: 5,
    quote:
      "Anamın ad günü üçün sifariş etdim. Ağladı. Hər dəfə xüsusi anlarda yalnız Boombery.",
    author: "Leyla C.",
    role: "Müştəri",
    location: "Sumqayıt",
    product: "Ad Günü Kolleksiyası",
    date: "Noyabr 2023",
    initial: "L",
  },
  {
    id: 6,
    quote:
      "Öz qutumu yaratmaq o qədər maraqlı idi ki, prosesi özü hədiyyə oldu. Nəticə isə şedevr.",
    author: "Tural B.",
    role: "Arxitektor",
    location: "Bakı",
    product: "Custom Box Builder",
    date: "Oktyabr 2023",
    initial: "T",
  },
];

// Rəng sistemi — açıq fon
const C = {
  bg: "#FAF7F2",
  bgCard: "#F5F0E8",
  text: "#1C1009",
  textMuted: "rgba(28,16,9,0.5)",
  textFaint: "rgba(28,16,9,0.35)",
  gold: "#B8860B",
  goldMuted: "rgba(139,90,10,0.4)",
  goldBorder: "rgba(139,90,10,0.18)",
  divider: "rgba(28,16,9,0.1)",
};

function StarRow() {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={C.gold}>
          <path d="M6 1l1.4 2.8 3.1.45-2.25 2.19.53 3.1L6 8.1l-2.78 1.44.53-3.1L1.5 4.25l3.1-.45z" />
        </svg>
      ))}
    </div>
  );
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Featured editorial row ────────────────────────────────────────────────────

function FeaturedCard({
  review,
  index,
}: {
  review: (typeof REVIEWS)[0];
  index: number;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: "relative",
        padding: "44px 52px",
        borderTop: `0.5px solid ${C.divider}`,
        display: "grid",
        gridTemplateColumns: "1fr 200px",
        gap: 48,
        alignItems: "center",
      }}
    >
      {/* Watermark " */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 8,
          left: 36,
          fontFamily: "'Playfair Display',serif",
          fontSize: "7rem",
          lineHeight: 1,
          color: "rgba(139,90,10,0.07)",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 700,
        }}
      >
        "
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <StarRow />
        <blockquote
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem,1.6vw,1.25rem)",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.7,
            color: C.text,
            margin: "16px 0 22px",
            maxWidth: 600,
          }}
        >
          "{review.quote}"
        </blockquote>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 13px",
            border: `0.5px solid ${C.goldBorder}`,
            borderRadius: 2,
          }}
        >
          <div
            style={{
              width: 4,
              height: 4,
              background: C.gold,
              transform: "rotate(45deg)",
              flexShrink: 0,
              opacity: 0.7,
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.gold,
            }}
          >
            {review.product}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "rgba(139,90,10,0.08)",
            border: `1px solid ${C.goldBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Playfair Display',serif",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: C.gold,
          }}
        >
          {review.initial}
        </div>
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1rem",
              fontWeight: 500,
              color: C.text,
              margin: "0 0 4px",
            }}
          >
            {review.author}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.88rem",
              color: C.textMuted,
              margin: "0 0 3px",
            }}
          >
            {review.role}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.82rem",
              color: C.textFaint,
              margin: 0,
            }}
          >
            {review.location} · {review.date}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Horizontal scroll tape ────────────────────────────────────────────────────

function ScrollTape({ reviews }: { reviews: typeof REVIEWS }) {
  const { ref, inView } = useInView(0.05);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const checkScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    setCanLeft(t.scrollLeft > 10);
    setCanRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 10);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative" }}
    >
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          zIndex: 10,
          background: `linear-gradient(to right, ${C.bg} 30%, transparent)`,
          display: "flex",
          alignItems: "center",
          paddingLeft: 16,
          pointerEvents: "none",
        }}
      >
        <button
          onClick={() =>
            trackRef.current?.scrollBy({ left: -420, behavior: "smooth" })
          }
          style={{
            pointerEvents: "auto",
            opacity: canLeft ? 1 : 0,
            transition: "opacity 0.3s",
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "rgba(139,90,10,0.08)",
            border: `0.5px solid ${C.goldBorder}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7l5 5"
              stroke={C.gold}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          zIndex: 10,
          background: `linear-gradient(to left, ${C.bg} 30%, transparent)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 16,
          pointerEvents: "none",
        }}
      >
        <button
          onClick={() =>
            trackRef.current?.scrollBy({ left: 420, behavior: "smooth" })
          }
          style={{
            pointerEvents: "auto",
            opacity: canRight ? 1 : 0,
            transition: "opacity 0.3s",
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "rgba(139,90,10,0.08)",
            border: `0.5px solid ${C.goldBorder}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2l5 5-5 5"
              stroke={C.gold}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        ref={trackRef}
        onScroll={checkScroll}
        onMouseDown={(e) => {
          dragging.current = true;
          startX.current = e.clientX;
          startScroll.current = trackRef.current?.scrollLeft ?? 0;
        }}
        onMouseMove={(e) => {
          if (!dragging.current || !trackRef.current) return;
          trackRef.current.scrollLeft =
            startScroll.current - (e.clientX - startX.current);
        }}
        onMouseUp={() => {
          dragging.current = false;
        }}
        onMouseLeave={() => {
          dragging.current = false;
        }}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        <div style={{ flexShrink: 0, width: 40 }} />
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.1 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              flexShrink: 0,
              width: "clamp(280px, 28vw, 380px)",
              padding: "32px 28px",
              borderLeft: `0.5px solid ${C.divider}`,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <StarRow />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "2.4rem",
                  fontStyle: "italic",
                  lineHeight: 0.9,
                  color: "rgba(139,90,10,0.12)",
                  flexShrink: 0,
                  marginTop: 4,
                }}
              >
                {String(i + 3).padStart(2, "0")}
              </span>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  color: C.text,
                  margin: 0,
                }}
              >
                "{r.quote}"
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingTop: 16,
                borderTop: `0.5px solid ${C.divider}`,
                marginTop: "auto",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "rgba(139,90,10,0.07)",
                  border: `0.5px solid ${C.goldBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  color: C.gold,
                }}
              >
                {r.initial}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: C.text,
                    margin: "0 0 2px",
                  }}
                >
                  {r.author}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.84rem",
                    color: C.textMuted,
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.role}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.goldMuted,
                  flexShrink: 0,
                  textAlign: "right",
                  maxWidth: 80,
                  lineHeight: 1.5,
                }}
              >
                {r.product}
              </span>
            </div>
          </motion.div>
        ))}
        <div style={{ flexShrink: 0, width: 40 }} />
      </div>
    </motion.div>
  );
}

// ── Mobile Carousel (Swiper) ──────────────────────────────────────────────────

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function MobileCarousel({ reviews }: { reviews: typeof REVIEWS }) {
  return (
    <>
      <style>{`
        .testimonials-swiper { padding: 8px 0 48px !important; }
        .testimonials-swiper .swiper-slide { padding: 0 10px; }
        .testimonials-swiper .swiper-pagination { bottom: 12px !important; }
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(139,90,10,0.25) !important;
          opacity: 1 !important; width: 6px !important; height: 6px !important;
          transition: all 0.3s !important;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: ${C.gold} !important;
          width: 20px !important; border-radius: 3px !important;
        }
      `}</style>

      <Swiper
        className="testimonials-swiper"
        modules={[Pagination]}
        slidesPerView={1.08}
        centeredSlides
        grabCursor
        pagination={{ clickable: true }}
      >
        {reviews.map((r) => (
          <SwiperSlide key={r.id}>
            <div
              style={{
                background: "#FFFFFF",
                border: `0.5px solid ${C.goldBorder}`,
                borderRadius: 8,
                padding: "24px 20px",
                height: 300,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 20px rgba(28,16,9,0.07)",
                overflow: "hidden",
              }}
            >
              <StarRow />

              {/* Sitat — sabit 5 sətir */}
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  color: C.text,
                  margin: "12px 0 0",
                  flex: 1,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical" as const,
                }}
              >
                "{r.quote}"
              </p>

              {/* Alt hissə — həmişə dibdə */}
              <div
                style={{
                  paddingTop: 14,
                  borderTop: `0.5px solid ${C.divider}`,
                  marginTop: 14,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    border: `0.5px solid ${C.goldBorder}`,
                    borderRadius: 2,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      height: 3,
                      background: C.gold,
                      transform: "rotate(45deg)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: C.gold,
                    }}
                  >
                    {r.product}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "rgba(139,90,10,0.07)",
                      border: `1px solid ${C.goldBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "0.9rem",
                      fontStyle: "italic",
                      color: C.gold,
                    }}
                  >
                    {r.initial}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        color: C.text,
                        margin: "0 0 2px",
                      }}
                    >
                      {r.author}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.82rem",
                        color: C.textMuted,
                        margin: 0,
                      }}
                    >
                      {r.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        background: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;500&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');
      `}</style>

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: isMobile ? "52px 24px 32px" : "64px 40px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              height: "0.5px",
              width: 36,
              background: `linear-gradient(to right, transparent, ${C.gold})`,
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.gold,
            }}
          >
            Müştəri Rəyləri
          </span>
          <div
            style={{
              height: "0.5px",
              width: 36,
              background: `linear-gradient(to left, transparent, ${C.gold})`,
            }}
          />
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: isMobile ? "1.9rem" : "clamp(2.2rem,3.8vw,3.2rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: C.text,
            margin: "0 0 14px",
          }}
        >
          Onlar <em style={{ fontStyle: "italic", color: C.gold }}>danışır,</em>
          {!isMobile && <br />} biz dinləyirik.
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: isMobile ? "0.95rem" : "1rem",
            color: C.textMuted,
            margin: "0 auto 24px",
            maxWidth: 420,
            lineHeight: 1.7,
          }}
        >
          5.000-dən çox müştərinin sözü — hər biri bir an, bir xatirədir.
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 20px",
            border: `0.5px solid ${C.goldBorder}`,
            borderRadius: 2,
          }}
        >
          <StarRow />
          <span
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1rem",
              fontWeight: 500,
              color: C.text,
            }}
          >
            4.9
          </span>
          <div
            style={{ width: "0.5px", height: 14, background: C.goldBorder }}
          />
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.gold,
            }}
          >
            5.000+ Rəy
          </span>
        </div>
      </div>

      {/* Desktop */}
      {!isMobile && (
        <>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
            {REVIEWS.slice(0, 2).map((r, i) => (
              <FeaturedCard key={r.id} review={r} index={i} />
            ))}
          </div>
          <div
            style={{ borderTop: `0.5px solid ${C.divider}`, paddingBottom: 64 }}
          >
            <ScrollTape reviews={REVIEWS.slice(2)} />
          </div>
        </>
      )}

      {/* Mobile */}
      {isMobile && <MobileCarousel reviews={REVIEWS} />}

      <div
        style={{
          height: "0.5px",
          background: `linear-gradient(to right, transparent, ${C.goldBorder}, transparent)`,
        }}
      />
    </section>
  );
}
