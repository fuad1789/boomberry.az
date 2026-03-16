"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Şokolad Əsası", sub: "Zövqünüzə uyğun təməli yaradın" },
  { id: 2, label: "İç Dolğusu", sub: "Şokoladınızın qəlbini seçin" },
  {
    id: 3,
    label: "Son Toxunuş",
    sub: "Şedevrinizi tamamlayacaq zərif detalı seçin",
  },
  {
    id: 4,
    label: "Kolleksiya Həcmi",
    sub: "Özəl qutunuzun ölçüsünü müəyyən edin",
  },
];

const BASES = [
  {
    id: "dark",
    name: "Tünd Şokolad",
    desc: "Zəngin və dərin kakao notları",
    img: "/assets/custom-box/dark chocolate.png",
    price: 0,
  },
  {
    id: "milk",
    name: "Südlü Şokolad",
    desc: "İpək kimi yumşaq, kremli ləzzət",
    img: "/assets/custom-box/milk chocolate.png",
    price: 0,
  },
  {
    id: "white",
    name: "Ağ Şokolad",
    desc: "Zərif Madaqaskar vanili toxunuşu",
    img: "/assets/custom-box/white chocolate.png",
    price: 0,
  },
  {
    id: "pink",
    name: "Ruby Şokolad",
    desc: "Təbii giləmeyvə notları ilə nadir çeşid",
    img: "/assets/custom-box/pink chocolate.png",
    price: 5,
  },
];

const FILLINGS = [
  {
    id: "ganache",
    name: "Qanaş",
    desc: "İpək kimi yumşaq, zəngin şokolad kremi",
    img: "/assets/custom-box/ganache.png",
    price: 0,
  },
  {
    id: "caramel",
    name: "Duzlu Karamel",
    desc: "Şirin karamel və zərif dəniz duzunun ahəngi",
    img: "/assets/custom-box/caramel.png",
    price: 2,
  },
  {
    id: "praline",
    name: "Pralin",
    desc: "Karamelləşdirilmiş və qovrulmuş fındıq əzməsi",
    img: "/assets/custom-box/Praline.png",
    price: 2,
  },
  {
    id: "fruit",
    name: "Meyvə Püresi",
    desc: "Təzə moruq və meşə meyvələrinin təbii özü",
    img: "/assets/custom-box/Fruit Pure.png",
    price: 3,
  },
];

const TOPPINGS = [
  {
    id: "gold",
    name: "24K Qızıl Yarpaq",
    desc: "Yeməli qızılla möhtəşəm və lüks toxunuş",
    img: "/assets/custom-box/gold leaf.png",
    price: 8,
  },
  {
    id: "salt",
    name: "Dəniz Duzu",
    desc: "Şirinliyi tarazlayan zərif xırtıltı",
    img: "/assets/custom-box/Sea Salt.png",
    price: 0,
  },
  {
    id: "pist",
    name: "Qovrulmuş Püstə",
    desc: "Xırda əzilmiş, təzə və xırtıldayan püstə dənələri",
    img: "/assets/custom-box/Crushed Pistachios.png",
    price: 3,
  },
  {
    id: "cacao",
    name: "Kakao Tozu",
    desc: "Zəngin, tünd və məxməri son toxunuş",
    img: "/assets/custom-box/cacao.png",
    price: 0,
  },
];

const BOXES = [
  {
    id: "6",
    name: "6 Ədəd",
    desc: "Zərif dequstasiya və şəxsi anlar üçün ideal seçim",
    img: "/assets/custom-box/Box - 6.png",
    price: 12,
  },
  {
    id: "12",
    name: "12 Ədəd",
    desc: "Klassik kolleksiya. Dəyərlilərinizlə paylaşmaq üçün mükəmməl ahəng",
    img: "/assets/custom-box/Box - 12.png",
    price: 22,
  },
  {
    id: "24",
    name: "24 Ədəd",
    desc: "Premium Kolleksiya. Unudulmaz təəssürat yaradan zəngin çeşid",
    img: "/assets/custom-box/Box - 24.png",
    price: 40,
  },
  {
    id: "48",
    name: "48 Ədəd",
    desc: "Qrand Kolleksiya. Möhtəşəm anlar və əsl qurmanlar üçün mütləq lüks",
    img: "/assets/custom-box/Box - 48.png",
    price: 75,
  },
];

interface Selection {
  base: string;
  filling: string;
  topping: string;
  box: string;
}

// ── Option Card ───────────────────────────────────────────────────────────────
function OptionCard({
  item,
  selected,
  onSelect,
  isMobile,
  isBoxStep,
}: {
  item: { id: string; name: string; desc: string; img: string; price: number };
  selected: boolean;
  onSelect: () => void;
  isMobile: boolean;
  isBoxStep?: boolean;
}) {
  // Bütün addımlarda eyni sabit hündürlük — şəkil ölçüsündən asılı olmamalı
  const CARD_HEIGHT = isMobile ? 170 : 192;
  const IMG_HEIGHT = isMobile ? 80 : 96;

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: isMobile ? 0 : -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: "relative",
        width: "100%",
        textAlign: "left",
        background: selected ? "#FAF7F2" : "#fff",
        border: selected
          ? "1.5px solid #C9A96E"
          : "1.5px solid rgba(62,39,35,0.1)",
        borderRadius: 4,
        padding: isMobile ? "14px 12px 12px" : "18px 14px 16px",
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
        outline: "none",
        boxShadow: selected ? "0 2px 16px rgba(201,169,110,0.15)" : "none",
        display: "flex",
        flexDirection: "column",
        height: CARD_HEIGHT,
        overflow: "hidden",
      }}
    >
      {/* Gold check */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#C9A96E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}

      {/* Image — sabit hündürlük, heç vaxt böyüməz */}
      <div
        style={{
          width: "100%",
          height: IMG_HEIGHT,
          minHeight: IMG_HEIGHT,
          maxHeight: IMG_HEIGHT,
          marginBottom: isMobile ? 8 : 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <img
          src={item.img}
          alt={item.name}
          style={{
            width: "auto",
            height: "100%",
            maxWidth: "80%",
            objectFit: "contain",
            display: "block",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0.3";
          }}
        />
      </div>

      {/* Name */}
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: isMobile ? "0.82rem" : "0.88rem",
          fontWeight: 500,
          color: "#1C1009",
          margin: "0 0 2px",
          lineHeight: 1.2,
          minHeight: isMobile ? "1.2em" : "1.3em",
        }}
      >
        {item.name}
      </p>

      {/* Desc — yalnız desktop + qeyri-box addımlarda göstər, overflow yoxdur */}
      {!isMobile && !isBoxStep && (
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.78rem",
            color: "#8B6347",
            margin: "0 0 6px",
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
          }}
        >
          {item.desc}
        </p>
      )}

      {/* Price */}
      <div style={{ marginTop: "auto" }}>
        {item.price > 0 ? (
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.44rem",
              letterSpacing: "0.14em",
              color: "#C9A96E",
              textTransform: "uppercase",
              background: "rgba(201,169,110,0.1)",
              padding: "2px 7px",
              borderRadius: 2,
              marginTop: isMobile ? 4 : 0,
              alignSelf: "flex-start",
            }}
          >
            +{item.price} ₼
          </span>
        ) : (
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.44rem",
              letterSpacing: "0.14em",
              color: "rgba(62,39,35,0.3)",
              textTransform: "uppercase",
              marginTop: isMobile ? 4 : 0,
            }}
          >
            Standart
          </span>
        )}
      </div>
    </motion.button>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function CustomBoxBuilder() {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState<Selection>({
    base: "",
    filling: "",
    topping: "",
    box: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const setField = (field: keyof Selection, val: string) =>
    setSel((prev) => ({ ...prev, [field]: val }));

  const basePrice = BASES.find((b) => b.id === sel.base)?.price ?? 0;
  const fillPrice = FILLINGS.find((f) => f.id === sel.filling)?.price ?? 0;
  const topPrice = TOPPINGS.find((t) => t.id === sel.topping)?.price ?? 0;
  const boxPrice = BOXES.find((b) => b.id === sel.box)?.price ?? 0;
  const total = boxPrice + basePrice + fillPrice + topPrice;

  const canNext = () => {
    if (step === 1) return !!sel.base;
    if (step === 2) return !!sel.filling;
    if (step === 3) return !!sel.topping;
    if (step === 4) return !!sel.box;
    return false;
  };

  const currentItems =
    step === 1 ? BASES : step === 2 ? FILLINGS : step === 3 ? TOPPINGS : BOXES;
  const currentField: keyof Selection =
    step === 1
      ? "base"
      : step === 2
        ? "filling"
        : step === 3
          ? "topping"
          : "box";
  const currentValue = sel[currentField];

  const goNext = () => {
    if (canNext()) setStep((s) => Math.min(4, s + 1));
  };
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  if (!mounted) return null;

  return (
    <section
      style={{
        background: "#FAF7F2",
        padding: isMobile ? "48px 0 64px" : "80px 0 100px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap');
      `}</style>

      {/* ── Section header ── */}
      <div
        style={{
          textAlign: "center",
          marginBottom: isMobile ? 32 : 56,
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div style={{ height: 1, width: 28, background: "#C9A96E" }} />
          <p
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "0.48rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#C9A96E",
              margin: 0,
            }}
          >
            Boombery Xüsusi Sifariş
          </p>
          <div style={{ height: 1, width: 28, background: "#C9A96E" }} />
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: isMobile ? "1.8rem" : "clamp(2rem,4vw,3rem)",
            fontWeight: 400,
            color: "#1C1009",
            margin: "0 0 10px",
            lineHeight: 1.1,
          }}
        >
          Öz Şokoladınızı{" "}
          <em style={{ fontStyle: "italic", color: "#8B4513" }}>Yaradın</em>
        </h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "1rem",
            color: "#8B6347",
            margin: 0,
          }}
        >
          Hər detal sizin seçiminizdir.
        </p>
      </div>

      {/* ── Builder card ── */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(201,169,110,0.2)",
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0 4px 40px rgba(28,16,9,0.07)",
          }}
        >
          {/* Progress bar */}
          <div style={{ height: 3, background: "rgba(201,169,110,0.12)" }}>
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(to right,#C9A96E,#8B4513)",
              }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* ── STEP INDICATOR ── */}
          {isMobile ? (
            /* Mobile: minimal — aktiv addım adı + "X / 4" */
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(62,39,35,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#1C1009",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "0.55rem",
                      color: "#fff",
                    }}
                  >
                    {step}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "0.5rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#1C1009",
                      margin: 0,
                    }}
                  >
                    {STEPS[step - 1].label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "0.78rem",
                      color: "rgba(62,39,35,0.45)",
                      margin: 0,
                    }}
                  >
                    {STEPS[step - 1].sub}
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "0.46rem",
                  letterSpacing: "0.12em",
                  color: "rgba(62,39,35,0.35)",
                }}
              >
                {step} / 4
              </span>
            </div>
          ) : (
            /* Desktop: full stepper */
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid rgba(62,39,35,0.08)",
                padding: "20px 32px",
                overflowX: "auto",
              }}
            >
              {STEPS.map((s, i) => {
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <div
                    key={s.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flex: i < 3 ? 1 : 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: done
                            ? "#C9A96E"
                            : active
                              ? "#1C1009"
                              : "transparent",
                          border: done
                            ? "2px solid #C9A96E"
                            : active
                              ? "2px solid #1C1009"
                              : "2px solid rgba(62,39,35,0.18)",
                          transition: "all 0.3s",
                        }}
                      >
                        {done ? (
                          <svg
                            width="11"
                            height="9"
                            viewBox="0 0 12 10"
                            fill="none"
                          >
                            <path
                              d="M1 5l3 3L11 1"
                              stroke="#fff"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <span
                            style={{
                              fontFamily: "'Cinzel',serif",
                              fontSize: "0.6rem",
                              color: active ? "#fff" : "rgba(62,39,35,0.3)",
                            }}
                          >
                            {s.id}
                          </span>
                        )}
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: "0.5rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            margin: 0,
                            color: active
                              ? "#1C1009"
                              : done
                                ? "#C9A96E"
                                : "rgba(62,39,35,0.32)",
                          }}
                        >
                          {s.label}
                        </p>
                        {done && (
                          <p
                            style={{
                              fontFamily: "'Cormorant Garamond',serif",
                              fontSize: "0.74rem",
                              margin: 0,
                              color: "rgba(62,39,35,0.42)",
                            }}
                          >
                            {s.id === 1 &&
                              BASES.find((b) => b.id === sel.base)?.name}
                            {s.id === 2 &&
                              FILLINGS.find((f) => f.id === sel.filling)?.name}
                            {s.id === 3 &&
                              TOPPINGS.find((t) => t.id === sel.topping)?.name}
                            {s.id === 4 &&
                              BOXES.find((b) => b.id === sel.box)?.name}
                          </p>
                        )}
                      </div>
                    </div>
                    {i < 3 && (
                      <div
                        style={{
                          flex: 1,
                          height: 1,
                          margin: "0 12px",
                          background: done
                            ? "rgba(201,169,110,0.4)"
                            : "rgba(62,39,35,0.08)",
                          transition: "background 0.4s",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Step content ── */}
          <div
            style={{ padding: isMobile ? "24px 16px 20px" : "40px 32px 32px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Step heading — desktop only (mobile has it in header) */}
                {!isMobile && (
                  <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <span
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: "0.46rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(62,39,35,0.38)",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      Addım {step} / 4
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "1.55rem",
                        fontWeight: 400,
                        color: "#1C1009",
                        margin: "0 0 5px",
                      }}
                    >
                      {STEPS[step - 1].label}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "1rem",
                        color: "#8B6347",
                        margin: 0,
                      }}
                    >
                      {STEPS[step - 1].sub}
                    </p>
                  </div>
                )}

                {/* 2x2 on mobile, 4-col on desktop */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "repeat(2, 1fr)"
                      : "repeat(4, 1fr)",
                    gap: isMobile ? 10 : 12,
                  }}
                >
                  {currentItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                    >
                      <OptionCard
                        item={item}
                        selected={currentValue === item.id}
                        onSelect={() => setField(currentField, item.id)}
                        isMobile={isMobile}
                        isBoxStep={step === 4}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Footer ── */}
          <div
            style={{
              borderTop: "1px solid rgba(62,39,35,0.08)",
              padding: isMobile ? "16px 16px" : "20px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {/* Back */}
            <button
              onClick={goBack}
              disabled={step === 1}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontFamily: "'Cinzel',serif",
                fontSize: "0.5rem",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: step === 1 ? "rgba(62,39,35,0.18)" : "#8B6347",
                background: "none",
                border: "none",
                cursor: step === 1 ? "default" : "pointer",
                padding: 0,
                flexShrink: 0,
                transition: "color 0.2s",
              }}
            >
              <svg width="13" height="10" viewBox="0 0 14 10" fill="none">
                <path
                  d="M13 5H1M6 1L2 5l4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {!isMobile && "Geri"}
            </button>

            {/* Price */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <p
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "0.42rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(62,39,35,0.35)",
                  margin: "0 0 2px",
                }}
              >
                Təxmini Qiymət
              </p>
              <motion.p
                key={total}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: isMobile ? "1.2rem" : "1.4rem",
                  fontWeight: 500,
                  color: "#8B4513",
                  margin: 0,
                }}
              >
                {total > 0 ? `${total} ₼` : "—"}
              </motion.p>
            </div>

            {/* Next / Add to Cart */}
            {step < 4 ? (
              <motion.button
                onClick={goNext}
                whileTap={canNext() ? { scale: 0.97 } : {}}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexShrink: 0,
                  fontFamily: "'Cinzel',serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  background: canNext() ? "#1C1009" : "rgba(62,39,35,0.08)",
                  color: canNext() ? "#F5ECD7" : "rgba(62,39,35,0.25)",
                  border: "none",
                  cursor: canNext() ? "pointer" : "default",
                  padding: isMobile ? "12px 18px" : "13px 24px",
                  borderRadius: 2,
                  transition: "background 0.25s, color 0.25s",
                }}
              >
                Növbəti
                <svg width="12" height="10" viewBox="0 0 14 10" fill="none">
                  <path
                    d="M1 5h12M8 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                onClick={() =>
                  canNext() && console.log("Add to cart:", sel, total)
                }
                whileTap={canNext() ? { scale: 0.97 } : {}}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexShrink: 0,
                  fontFamily: "'Cinzel',serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: canNext()
                    ? "linear-gradient(135deg,#C9A96E,#8B4513)"
                    : "rgba(62,39,35,0.08)",
                  color: canNext() ? "#fff" : "rgba(62,39,35,0.25)",
                  border: "none",
                  cursor: canNext() ? "pointer" : "default",
                  padding: isMobile ? "12px 16px" : "13px 22px",
                  borderRadius: 2,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {isMobile ? "Səbətə" : "Səbətə Əlavə Et"}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
