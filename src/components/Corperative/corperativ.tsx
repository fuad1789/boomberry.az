"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Münasibət", sub: "Özəl anı seçin" },
  { id: 2, label: "Həcm", sub: "Miqyası müəyyən edin" },
  { id: 3, label: "Brendinq", sub: "Brendinizin toxunuşu" },
  { id: 4, label: "Əlaqə", sub: "Sizi yaxından tanıyaq" },
];

const OCCASIONS = [
  {
    id: "vip",
    icon: "◈",
    name: "VIP Müştərilər",
    desc: "Ən dəyərli tərəfdaşlarınıza xüsusi diqqət",
  },
  {
    id: "team",
    icon: "◇",
    name: "Komanda & Bayramlar",
    desc: "Uğurları birgə qeyd edin",
  },
  {
    id: "event",
    icon: "◉",
    name: "Tədbir & Konfrans",
    desc: "İştirakçılara unudulmaz xatirə",
  },
  {
    id: "anniversary",
    icon: "◆",
    name: "Şirkət İldönümü",
    desc: "Tarixi anları premium qeyd edin",
  },
];

const VOLUMES = [
  {
    id: "s",
    name: "20 – 50 Qutu",
    desc: "Kiçik komandalar & seçilmiş VIP-lər",
    tag: "Başlanğıc",
  },
  {
    id: "m",
    name: "50 – 150 Qutu",
    desc: "Orta miqyaslı korporativ distribusiya",
    tag: "Populyar",
  },
  {
    id: "l",
    name: "150 – 500 Qutu",
    desc: "Böyük miqyaslı tədbirlər & konfranslar",
    tag: "Korporativ",
  },
  {
    id: "xl",
    name: "500+ Qutu",
    desc: "Əsas distribusiya partnyorluğu",
    tag: "Enterpris",
  },
];

const BRANDINGS = [
  {
    id: "ribbon",
    name: "Loqolu Qızıl Lent",
    desc: "Brendinizi hər bağlamada görünür edin",
  },
  {
    id: "card",
    name: "Xüsusi Təbrik Kartı",
    desc: "Şəxsiləşdirilmiş mesaj və dizayn",
  },
  {
    id: "emboss",
    name: "Qutu Üzərində Qabartma",
    desc: "Daimi, premium brend izi",
  },
  {
    id: "standard",
    name: "Standart Boombery",
    desc: "Boombery-nin öz premium dizaynı",
  },
];

interface ContactForm {
  company: string;
  contact: string;
  phone: string;
  email: string;
  notes: string;
}
interface CorporateOrder {
  occasion: string;
  volume: string;
  branding: string;
  contact: ContactForm;
}

// ── Desktop Selection Card (unchanged) ────────────────────────────────────────

function SelectionCard({
  id,
  icon,
  name,
  desc,
  tag,
  selected,
  onSelect,
  isMobile,
}: any) {
  return (
    <motion.button
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        textAlign: "left",
        cursor: "pointer",
        outline: "none",
        background: selected ? "#FAF7F2" : "#fff",
        border: selected
          ? "1.5px solid #C9A96E"
          : "1.5px solid rgba(62,39,35,0.1)",
        borderRadius: 4,
        padding: isMobile ? "16px 14px" : "24px 20px",
        transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
        boxShadow: selected ? "0 2px 20px rgba(201,169,110,0.18)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#C9A96E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
      </AnimatePresence>
      {icon && (
        <span
          style={{
            fontSize: isMobile ? "1.1rem" : "1.3rem",
            color: selected ? "#C9A96E" : "rgba(62,39,35,0.25)",
            lineHeight: 1,
            transition: "color 0.25s",
          }}
        >
          {icon}
        </span>
      )}
      {tag && (
        <span
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "0.42rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: selected ? "#C9A96E" : "rgba(62,39,35,0.35)",
            background: selected
              ? "rgba(201,169,110,0.1)"
              : "rgba(62,39,35,0.05)",
            padding: "2px 8px",
            borderRadius: 2,
            alignSelf: "flex-start",
            transition: "all 0.25s",
          }}
        >
          {tag}
        </span>
      )}
      <div>
        <p
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: isMobile ? "0.9rem" : "1rem",
            fontWeight: 500,
            color: "#1C1009",
            margin: "0 0 5px",
            lineHeight: 1.2,
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isMobile ? "0.82rem" : "0.88rem",
            color: "#8B6347",
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          {desc}
        </p>
      </div>
    </motion.button>
  );
}

// ── Mobile Selection Card — full-width horizontal row ─────────────────────────

function MobileSelectionRow({
  icon,
  name,
  desc,
  tag,
  selected,
  onSelect,
}: any) {
  return (
    <motion.button
      onClick={onSelect}
      whileTap={{ scale: 0.985 }}
      style={{
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        outline: "none",
        background: selected ? "#FAF7F2" : "#fff",
        border: selected
          ? "1.5px solid #C9A96E"
          : "1.5px solid rgba(62,39,35,0.09)",
        borderRadius: 8,
        padding: "14px 16px",
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
        boxShadow: selected ? "0 2px 16px rgba(201,169,110,0.15)" : "none",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* Left: icon or tag badge */}
      <div
        style={{
          flexShrink: 0,
          width: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon ? (
          <span
            style={{
              fontSize: "1.4rem",
              color: selected ? "#C9A96E" : "rgba(62,39,35,0.2)",
              transition: "color 0.2s",
            }}
          >
            {icon}
          </span>
        ) : tag ? (
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "0.38rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: selected ? "#C9A96E" : "rgba(62,39,35,0.3)",
              background: selected
                ? "rgba(201,169,110,0.1)"
                : "rgba(62,39,35,0.04)",
              padding: "3px 6px",
              borderRadius: 2,
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {tag}
          </span>
        ) : (
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: selected ? "#C9A96E" : "rgba(62,39,35,0.15)",
              transition: "background 0.2s",
            }}
          />
        )}
      </div>

      {/* Middle: text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#1C1009",
            margin: "0 0 2px",
            lineHeight: 1.2,
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "0.8rem",
            color: "#8B6347",
            margin: 0,
            lineHeight: 1.35,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {desc}
        </p>
      </div>

      {/* Right: check */}
      <div
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: selected ? "#C9A96E" : "transparent",
          border: selected ? "none" : "1.5px solid rgba(62,39,35,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </motion.button>
  );
}

// ── LuxInput (unchanged) ───────────────────────────────────────────────────────

function LuxInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  multiline,
}: any) {
  const base: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(62,39,35,0.18)",
    outline: "none",
    padding: "10px 0",
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "1rem",
    color: "#1C1009",
    transition: "border-color 0.2s",
    resize: "none",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: "0.48rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(62,39,35,0.45)",
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...base, paddingTop: 12 }}
          onFocus={(e) => (e.target.style.borderBottomColor = "#C9A96E")}
          onBlur={(e) =>
            (e.target.style.borderBottomColor = "rgba(62,39,35,0.18)")
          }
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={base}
          onFocus={(e) => (e.target.style.borderBottomColor = "#C9A96E")}
          onBlur={(e) =>
            (e.target.style.borderBottomColor = "rgba(62,39,35,0.18)")
          }
        />
      )}
    </div>
  );
}

// ── Success State ──────────────────────────────────────────────────────────────

function SuccessState({ isMobile }: { isMobile: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: isMobile ? "48px 24px 56px" : "80px 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: isMobile ? 20 : 24,
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{
          width: isMobile ? 60 : 72,
          height: isMobile ? 60 : 72,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#C9A96E,#8B4513)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(201,169,110,0.35)",
        }}
      >
        <svg
          width={isMobile ? 22 : 28}
          height={isMobile ? 18 : 22}
          viewBox="0 0 30 24"
          fill="none"
        >
          <path
            d="M2 12l8 8L28 2"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ maxWidth: 480 }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: isMobile ? "1.35rem" : "2rem",
            fontWeight: 400,
            color: "#1C1009",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}
        >
          Tələbiniz uğurla{" "}
          <em style={{ fontStyle: "italic", color: "#8B4513" }}>
            qəbul edildi.
          </em>
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isMobile ? "0.95rem" : "1.1rem",
            color: "#5C3D2E",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          VIP Korporativ satış menecerimiz xüsusi konsept və qiymət təklifi ilə{" "}
          <strong style={{ fontWeight: 500 }}>ən qısa zamanda</strong> əlaqə
          saxlayacaq.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Mobile Progress Bar + Step Header ─────────────────────────────────────────

function MobileStepHeader({
  step,
  totalSteps,
  label,
  sub,
}: {
  step: number;
  totalSteps: number;
  label: string;
  sub: string;
}) {
  return (
    <div style={{ padding: "0 0 12px" }}>
      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: i < step ? (i === step - 1 ? 2 : 1) : 1,
              height: 3,
              borderRadius: 2,
              background:
                i < step
                  ? i === step - 1
                    ? "#C9A96E"
                    : "rgba(201,169,110,0.45)"
                  : "rgba(62,39,35,0.1)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ))}
      </div>

      {/* Step label */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1.3rem",
              fontWeight: 400,
              color: "#1C1009",
              margin: "0 0 2px",
              lineHeight: 1.2,
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "0.88rem",
              color: "#8B6347",
              margin: 0,
            }}
          >
            {sub}
          </p>
        </div>
        <span
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "0.44rem",
            letterSpacing: "0.14em",
            color: "rgba(62,39,35,0.3)",
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          {step} / {totalSteps}
        </span>
      </div>
    </div>
  );
}

// ── Mobile Contact Form ────────────────────────────────────────────────────────

function MobileContactForm({
  contact,
  setContact,
  onSubmit,
  canSubmit,
  onBack,
}: any) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Scrollable fields */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <LuxInput
          label="Şirkətin Adı *"
          value={contact.company}
          onChange={(v: string) => setContact("company", v)}
          placeholder="Boombery MMC"
        />
        <LuxInput
          label="Əlaqədar Şəxs *"
          value={contact.contact}
          onChange={(v: string) => setContact("contact", v)}
          placeholder="Ad Soyad"
        />
        <LuxInput
          label="Telefon *"
          type="tel"
          value={contact.phone}
          onChange={(v: string) => setContact("phone", v)}
          placeholder="+994 50 000 00 00"
        />
        <LuxInput
          label="E-poçt *"
          type="email"
          value={contact.email}
          onChange={(v: string) => setContact("email", v)}
          placeholder="vip@shirket.az"
        />
        <LuxInput
          label="Əlavə Qeydlər"
          value={contact.notes}
          onChange={(v: string) => setContact("notes", v)}
          placeholder="Xüsusi tələblər..."
          multiline
        />
      </div>

      {/* Fixed bottom CTA */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(62,39,35,0.08)",
          background: "#fff",
          display: "flex",
          gap: 10,
        }}
      >
        <button
          onClick={onBack}
          style={{
            flex: "0 0 auto",
            padding: "14px 18px",
            background: "transparent",
            border: "1.5px solid rgba(62,39,35,0.12)",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "'Cinzel',serif",
            fontSize: "0.48rem",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "#8B6347",
          }}
        >
          Geri
        </button>
        <motion.button
          onClick={onSubmit}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontFamily: "'Cinzel',serif",
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: canSubmit
              ? "linear-gradient(135deg,#C9A96E 0%,#8B4513 100%)"
              : "rgba(62,39,35,0.07)",
            color: canSubmit ? "#fff" : "rgba(62,39,35,0.25)",
            border: "none",
            cursor: canSubmit ? "pointer" : "default",
            padding: "14px 20px",
            borderRadius: 6,
            transition: "background 0.25s, color 0.25s",
          }}
        >
          VIP Təklif Tələb Et
        </motion.button>
      </div>
    </div>
  );
}

// ── Mobile Modal — bottom sheet style ─────────────────────────────────────────

function MobileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState<CorporateOrder>({
    occasion: "",
    volume: "",
    branding: "",
    contact: { company: "", contact: "", phone: "", email: "", notes: "" },
  });
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      setOrder({
        occasion: "",
        volume: "",
        branding: "",
        contact: { company: "", contact: "", phone: "", email: "", notes: "" },
      });
    }
  }, [isOpen]);

  const setField = (field: "occasion" | "volume" | "branding", val: string) =>
    setOrder((p) => ({ ...p, [field]: val }));
  const setContact = (field: keyof ContactForm, val: string) =>
    setOrder((p) => ({ ...p, contact: { ...p.contact, [field]: val } }));

  const canNext = () => {
    if (step === 1) return !!order.occasion;
    if (step === 2) return !!order.volume;
    if (step === 3) return !!order.branding;
    if (step === 4)
      return !!(
        order.contact.company &&
        order.contact.contact &&
        order.contact.phone &&
        order.contact.email
      );
    return false;
  };

  const goNext = () => {
    if (canNext() && step < 4) setStep((s) => s + 1);
  };
  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const currentItems =
    step === 1 ? OCCASIONS : step === 2 ? VOLUMES : BRANDINGS;
  const currentField: "occasion" | "volume" | "branding" =
    step === 1 ? "occasion" : step === 2 ? "volume" : "branding";

  // Drag-to-dismiss
  const onTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const dy = e.touches[0].clientY - startY.current;
    currentY.current = dy;
    if (dy > 0 && sheetRef.current)
      sheetRef.current.style.transform = `translateY(${dy}px)`;
  };
  const onTouchEnd = () => {
    if (currentY.current > 120) {
      onClose();
    } else if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }
    currentY.current = 0;
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15,8,4,0.72)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Bottom Sheet */}
      <motion.div
        ref={sheetRef}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 300 }}
        style={{
          position: "relative",
          zIndex: 10,
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          display: "flex",
          flexDirection: "column",
          maxHeight: "92dvh",
          overflow: "hidden",
          boxShadow: "0 -8px 48px rgba(0,0,0,0.2)",
        }}
      >
        {/* Drag handle */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            padding: "12px 0 6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            cursor: "grab",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "rgba(62,39,35,0.15)",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            padding: "8px 20px 16px",
            borderBottom: "1px solid rgba(62,39,35,0.07)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "#1C1009",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Korporativ Sifariş
            </h2>
            {!submitted && (
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "0.82rem",
                  color: "#8B6347",
                  margin: "2px 0 0",
                }}
              >
                Brendinizə layiq hədiyyə həlləri.
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(62,39,35,0.06)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              stroke="#1C1009"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M1 1l12 12M1 13L13 1" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ overflowY: "auto" }}
            >
              <SuccessState isMobile={true} />
            </motion.div>
          ) : (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden",
              }}
            >
              {/* Step header */}
              <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
                <MobileStepHeader
                  step={step}
                  totalSteps={4}
                  label={STEPS[step - 1].label}
                  sub={STEPS[step - 1].sub}
                />
              </div>

              {step < 4 ? (
                <>
                  {/* Scrollable option list */}
                  <div
                    style={{
                      flex: 1,
                      overflowY: "auto",
                      padding: "0 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {currentItems.map((item: any) => (
                      <MobileSelectionRow
                        key={item.id}
                        {...item}
                        selected={order[currentField] === item.id}
                        onSelect={() => setField(currentField, item.id)}
                      />
                    ))}
                    <div style={{ height: 8 }} />
                  </div>

                  {/* Bottom nav */}
                  <div
                    style={{
                      padding: "14px 20px",
                      borderTop: "1px solid rgba(62,39,35,0.07)",
                      background: "#fff",
                      display: "flex",
                      gap: 10,
                      flexShrink: 0,
                    }}
                  >
                    <button
                      onClick={goBack}
                      disabled={step === 1}
                      style={{
                        flex: "0 0 auto",
                        padding: "14px 18px",
                        background: "transparent",
                        border: "1.5px solid rgba(62,39,35,0.12)",
                        borderRadius: 6,
                        cursor: step === 1 ? "default" : "pointer",
                        opacity: step === 1 ? 0.35 : 1,
                        fontFamily: "'Cinzel',serif",
                        fontSize: "0.48rem",
                        letterSpacing: "0.13em",
                        textTransform: "uppercase",
                        color: "#8B6347",
                        transition: "opacity 0.2s",
                      }}
                    >
                      Geri
                    </button>
                    <motion.button
                      onClick={goNext}
                      whileTap={canNext() ? { scale: 0.97 } : {}}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        fontFamily: "'Cinzel',serif",
                        fontSize: "0.5rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        background: canNext()
                          ? "#1C1009"
                          : "rgba(62,39,35,0.07)",
                        color: canNext() ? "#F5ECD7" : "rgba(62,39,35,0.25)",
                        border: "none",
                        cursor: canNext() ? "pointer" : "default",
                        padding: "14px 20px",
                        borderRadius: 6,
                        transition: "background 0.25s, color 0.25s",
                      }}
                    >
                      Növbəti
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                      >
                        <path
                          d="M1 5h12M8 1l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </>
              ) : (
                <MobileContactForm
                  contact={order.contact}
                  setContact={setContact}
                  onSubmit={() => {
                    if (canNext()) setSubmitted(true);
                  }}
                  canSubmit={canNext()}
                  onBack={goBack}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ── Desktop Modal Wizard (unchanged) ─────────────────────────────────────────

function CorporateWizardModal({ isOpen, onClose, isMobile }: any) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState<CorporateOrder>({
    occasion: "",
    volume: "",
    branding: "",
    contact: { company: "", contact: "", phone: "", email: "", notes: "" },
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      setOrder({
        occasion: "",
        volume: "",
        branding: "",
        contact: { company: "", contact: "", phone: "", email: "", notes: "" },
      });
    }
  }, [isOpen]);

  const setField = (field: "occasion" | "volume" | "branding", val: string) =>
    setOrder((prev) => ({ ...prev, [field]: val }));
  const setContact = (field: keyof ContactForm, val: string) =>
    setOrder((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: val },
    }));

  const canNext = () => {
    if (step === 1) return !!order.occasion;
    if (step === 2) return !!order.volume;
    if (step === 3) return !!order.branding;
    if (step === 4)
      return !!(
        order.contact.company &&
        order.contact.contact &&
        order.contact.phone &&
        order.contact.email
      );
    return false;
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(28, 16, 9, 0.7)",
          backdropFilter: "blur(6px)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          maxHeight: "90vh",
          background: "#FAF7F2",
          borderRadius: 8,
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(62,39,35,0.05)",
            border: "none",
            width: 32,
            height: 32,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="#1C1009"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M1 1l12 12M1 13L13 1" />
          </svg>
        </button>
        <div style={{ padding: "40px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "2.2rem",
                color: "#1C1009",
                margin: "0 0 8px",
                overflowX: "auto",
              }}
            >
              Korporativ Sifariş
            </h2>
            {!submitted && (
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1rem",
                  color: "#8B6347",
                  margin: 0,
                }}
              >
                Brendinizə layiq hədiyyə həlləri.
              </p>
            )}
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 4px 40px rgba(28,16,9,0.04)",
            }}
          >
            <div style={{ height: 3, background: "rgba(201,169,110,0.1)" }}>
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(to right,#C9A96E,#8B4513)",
                }}
                animate={{ width: submitted ? "100%" : `${(step / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessState key="success" isMobile={false} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Desktop stepper */}
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
                                    color: active
                                      ? "#fff"
                                      : "rgba(62,39,35,0.3)",
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
                                    OCCASIONS.find(
                                      (b) => b.id === order.occasion,
                                    )?.name}
                                  {s.id === 2 &&
                                    VOLUMES.find((f) => f.id === order.volume)
                                      ?.name}
                                  {s.id === 3 &&
                                    BRANDINGS.find(
                                      (t) => t.id === order.branding,
                                    )?.name}
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

                  <div style={{ padding: "40px 32px 32px" }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.3 }}
                      >
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

                        {step < 4 ? (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(2,1fr)",
                              gap: 12,
                            }}
                          >
                            {(step === 1
                              ? OCCASIONS
                              : step === 2
                                ? VOLUMES
                                : BRANDINGS
                            ).map((item: any, i: number) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                              >
                                <SelectionCard
                                  item={item}
                                  selected={
                                    order[
                                      step === 1
                                        ? "occasion"
                                        : step === 2
                                          ? "volume"
                                          : "branding"
                                    ] === item.id
                                  }
                                  onSelect={() =>
                                    setField(
                                      step === 1
                                        ? "occasion"
                                        : step === 2
                                          ? "volume"
                                          : "branding",
                                      item.id,
                                    )
                                  }
                                  isMobile={false}
                                  {...item}
                                />
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 20,
                            }}
                          >
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 20,
                              }}
                            >
                              <LuxInput
                                label="Şirkətin Adı *"
                                value={order.contact.company}
                                onChange={(v: string) =>
                                  setContact("company", v)
                                }
                                placeholder="Boombery MMC"
                              />
                              <LuxInput
                                label="Əlaqədar Şəxs *"
                                value={order.contact.contact}
                                onChange={(v: string) =>
                                  setContact("contact", v)
                                }
                                placeholder="Ad Soyad"
                              />
                              <LuxInput
                                label="Telefon *"
                                type="tel"
                                value={order.contact.phone}
                                onChange={(v: string) => setContact("phone", v)}
                                placeholder="+994 50 000 00 00"
                              />
                              <LuxInput
                                label="E-poçt *"
                                type="email"
                                value={order.contact.email}
                                onChange={(v: string) => setContact("email", v)}
                                placeholder="vip@shirket.az"
                              />
                            </div>
                            <LuxInput
                              label="Əlavə Qeydlər"
                              value={order.contact.notes}
                              onChange={(v: string) => setContact("notes", v)}
                              placeholder="Xüsusi tələblər..."
                              multiline
                            />
                            <motion.button
                              onClick={() => {
                                if (canNext()) setSubmitted(true);
                              }}
                              whileTap={canNext() ? { scale: 0.99 } : {}}
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 12,
                                fontFamily: "'Cinzel',serif",
                                fontSize: "0.54rem",
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                background: canNext()
                                  ? "linear-gradient(135deg,#C9A96E 0%,#8B4513 100%)"
                                  : "rgba(62,39,35,0.08)",
                                color: canNext()
                                  ? "#fff"
                                  : "rgba(62,39,35,0.25)",
                                border: "none",
                                cursor: canNext() ? "pointer" : "default",
                                padding: "18px 32px",
                                borderRadius: 4,
                                marginTop: 10,
                              }}
                            >
                              VIP Təklif Tələb Et
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {step < 4 && (
                    <div
                      style={{
                        borderTop: "1px solid rgba(62,39,35,0.08)",
                        padding: "16px 24px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        onClick={() => setStep((s) => Math.max(1, s - 1))}
                        disabled={step === 1}
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: "0.5rem",
                          letterSpacing: "0.13em",
                          textTransform: "uppercase",
                          color: step === 1 ? "rgba(62,39,35,0.18)" : "#8B6347",
                          background: "none",
                          border: "none",
                          cursor: step === 1 ? "default" : "pointer",
                        }}
                      >
                        Geri
                      </button>
                      <motion.button
                        onClick={() => canNext() && setStep((s) => s + 1)}
                        whileTap={canNext() ? { scale: 0.97 } : {}}
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: "0.5rem",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          background: canNext()
                            ? "#1C1009"
                            : "rgba(62,39,35,0.08)",
                          color: canNext() ? "#F5ECD7" : "rgba(62,39,35,0.25)",
                          border: "none",
                          cursor: canNext() ? "pointer" : "default",
                          padding: "10px 20px",
                          borderRadius: 2,
                        }}
                      >
                        Növbəti
                      </motion.button>
                    </div>
                  )}
                  {step === 4 && (
                    <div
                      style={{
                        borderTop: "1px solid rgba(62,39,35,0.08)",
                        padding: "16px 24px",
                      }}
                    >
                      <button
                        onClick={() => setStep(3)}
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: "0.5rem",
                          letterSpacing: "0.13em",
                          textTransform: "uppercase",
                          color: "#8B6347",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Geri
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function CorporateGifting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (!mounted) return null;

  return (
    <section
      style={{
        background: "#FAF7F2",
        padding: isMobile ? "64px 20px" : "100px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap');
        ::placeholder { color: rgba(62,39,35,0.28); font-family: 'Cormorant Garamond',serif; font-size: 0.95rem; }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at center, rgba(201,169,110,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div style={{ height: 1, width: 30, background: "#C9A96E" }} />
          <p
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "0.5rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A96E",
              margin: 0,
            }}
          >
            Korporativ Hədiyyələr
          </p>
          <div style={{ height: 1, width: 30, background: "#C9A96E" }} />
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: isMobile ? "2.2rem" : "3.5rem",
            fontWeight: 400,
            color: "#1C1009",
            margin: "0 0 20px",
            lineHeight: 1.1,
          }}
        >
          Korporativ Sifarişlər
        </h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isMobile ? "1.1rem" : "1.3rem",
            color: "#5C3D2E",
            margin: "0 auto 40px",
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          Tərəfdaşlarınız və komandanız üçün unudulmaz, brendinizə özəl lüks
          şokolad həlləri. Korporativ sifarişlərinizi birlikdə şedevrə çevirək.
        </p>
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #C9A96E, #8B4513)",
            color: "#fff",
            border: "none",
            padding: isMobile ? "18px 36px" : "20px 48px",
            borderRadius: 4,
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(201,169,110,0.25)",
          }}
        >
          Xüsusi Təklif Al
        </motion.button>
      </div>

      <AnimatePresence>
        {isModalOpen &&
          (isMobile ? (
            <MobileModal
              key="mobile-modal"
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          ) : (
            <CorporateWizardModal
              key="desktop-modal"
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              isMobile={false}
            />
          ))}
      </AnimatePresence>
    </section>
  );
}
