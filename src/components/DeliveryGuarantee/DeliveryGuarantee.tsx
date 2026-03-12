"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const IconTruck = () => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    className="w-full h-full"
    stroke="currentColor"
    strokeWidth="1"
  >
    <rect x="4" y="18" width="34" height="22" rx="2" />
    <path d="M38 24 L38 40 L52 40 L52 32 L46 24 Z" />
    <path d="M46 24 L46 32 L52 32" />
    <circle cx="13" cy="42" r="5" strokeWidth="1.2" />
    <circle cx="43" cy="42" r="5" strokeWidth="1.2" />
    <path d="M18 42 L38 42" />
    <path d="M4 28 L38 28" strokeDasharray="3 3" strokeOpacity="0.4" />
  </svg>
);

const IconShield = () => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    className="w-full h-full"
    stroke="currentColor"
    strokeWidth="1"
  >
    <path d="M28 6 L8 14 L8 28 C8 40 18 50 28 54 C38 50 48 40 48 28 L48 14 Z" />
    <path
      d="M19 28 L25 34 L37 22"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCalendar = () => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    className="w-full h-full"
    stroke="currentColor"
    strokeWidth="1"
  >
    <rect x="8" y="12" width="40" height="36" rx="3" />
    <path d="M8 22 L48 22" />
    <path d="M18 8 L18 16 M38 8 L38 16" strokeLinecap="round" />
    <rect
      x="16"
      y="30"
      width="8"
      height="8"
      rx="1"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path d="M30 34 L40 34 M30 42 L36 42" strokeLinecap="round" />
  </svg>
);

const IconClock = () => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    className="w-full h-full"
    stroke="currentColor"
    strokeWidth="1"
  >
    <circle cx="28" cy="28" r="22" />
    <path
      d="M28 14 L28 28 L38 36"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
    />
    <circle cx="28" cy="28" r="2.5" fill="currentColor" />
    <path
      d="M28 8 L28 4 M28 52 L28 48 M8 28 L4 28 M52 28 L48 28"
      strokeLinecap="round"
      strokeOpacity="0.3"
    />
  </svg>
);

export default function DeliveryGuarantee() {
  const { ref, inView } = useInView();

  const stats = [
    { value: "5K+", label: "Məmnun Müştəri" },
    { value: "4.9★", label: "Ortalama Reytinq" },
    { value: "24h", label: "Çatdırılma" },
    { value: "100%", label: "Zəmanət" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: "#F5F0E8" }}
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`mb-12 md:mb-20 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p
            style={{ color: "#A07850", letterSpacing: "0.28em" }}
            className="text-[11px] uppercase font-medium mb-4 md:mb-5"
          >
            Niyə bizi seçməlisiniz
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#1E0F06" }}
          >
            Çatdırılma &{" "}
            <em className="not-italic" style={{ color: "#A07850" }}>
              Zəmanət
            </em>
          </h2>
          <p
            className="text-sm leading-relaxed max-w-sm mx-auto"
            style={{ color: "#7A5C44" }}
          >
            Hər sifarişdə mükəmməlliyi vəd edirik — qablaşdırmadan qapınıza
            çatana qədər.
          </p>
          <div
            className="mt-6 md:mt-8 h-px w-16 mx-auto"
            style={{ background: "#C4A882" }}
          />
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          {/* HERO CARD — dark */}
          <div
            className={`lg:col-span-5 relative rounded-2xl md:rounded-3xl p-7 sm:p-10 flex flex-col justify-between overflow-hidden
              transition-all duration-700 delay-100
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ background: "#1E0F06", minHeight: "320px" }}
          >
            <div
              className="absolute -right-16 -top-16 w-72 h-72 rounded-full opacity-10"
              style={{ background: "#A07850" }}
            />
            <div
              className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full opacity-[0.07]"
              style={{ background: "#C4A882" }}
            />

            <div className="flex items-start justify-between relative z-10">
              <span
                className="text-7xl sm:text-[100px] leading-none font-light opacity-10 select-none"
                style={{ color: "#C4A882", fontFamily: "Georgia, serif" }}
              >
                01
              </span>
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 mt-1"
                style={{ color: "#C4A882" }}
              >
                <IconShield />
              </div>
            </div>

            <div className="relative z-10 mt-6 md:mt-auto">
              <h3
                className="text-2xl sm:text-3xl mb-2 leading-snug"
                style={{ fontFamily: "Georgia, serif", color: "#F5F0E8" }}
              >
                Keyfiyyət
                <br />
                Zəmanəti
              </h3>
              <p
                className="text-[10px] uppercase tracking-widest mb-3 md:mb-4"
                style={{ color: "#A07850", letterSpacing: "0.2em" }}
              >
                100% Təbii İnqrediyentlər
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#C4A882" }}
              >
                Hər məhsul göndərilməzdən əvvəl keyfiyyət yoxlamasından keçir.
                Razı qalmadıqda 24 saat ərzində dəyişdiririk — heç bir sual
                vermədən.
              </p>
              <div
                className="mt-6 md:mt-8 h-px w-16"
                style={{ background: "#A07850" }}
              />
            </div>
          </div>

          {/* Right 3 cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {/* Wide card — Çatdırılma */}
            <div
              className={`sm:col-span-2 rounded-2xl md:rounded-3xl p-6 sm:p-8 flex gap-5 sm:gap-8 items-center group border
                transition-all duration-500 delay-200 hover:shadow-lg hover:border-[#C4A882]
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ background: "#FFFFFF", borderColor: "#E8DDD0" }}
            >
              <div
                className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 transition-transform duration-500 group-hover:scale-110"
                style={{ color: "#A07850" }}
              >
                <IconTruck />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-xl sm:text-2xl mb-1"
                  style={{ fontFamily: "Georgia, serif", color: "#1E0F06" }}
                >
                  Sürətli Çatdırılma
                </h3>
                <p
                  className="text-[10px] uppercase tracking-widest mb-2 md:mb-3"
                  style={{ color: "#A07850" }}
                >
                  Bakı daxili 24 saat
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7A5C44" }}
                >
                  Sifarişiniz təsdiqləndikdən sonra maksimum 24 saat ərzində
                  qapınıza çatdırılır. Həftə sonu da fasiləsiz işləyirik.
                </p>
              </div>
              <div className="ml-auto shrink-0 hidden lg:flex flex-col items-center gap-1 pr-2">
                <span
                  className="text-6xl font-light leading-none"
                  style={{ fontFamily: "Georgia, serif", color: "#E8DDD0" }}
                >
                  24
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#C4A882" }}
                >
                  saat
                </span>
              </div>
            </div>

            {/* Card 3 — Əvvəlcədən Sifariş */}
            <div
              className={`rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col justify-between group border
                transition-all duration-500 delay-300 hover:border-[#A07850] hover:shadow-md
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                background: "#FAF7F2",
                borderColor: "#E8DDD0",
                minHeight: "200px",
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 mb-5 transition-transform duration-500 group-hover:scale-110 origin-left"
                style={{ color: "#A07850" }}
              >
                <IconCalendar />
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl mb-1"
                  style={{ fontFamily: "Georgia, serif", color: "#1E0F06" }}
                >
                  Əvvəlcədən Sifariş
                </h3>
                <p
                  className="text-[10px] uppercase tracking-widest mb-2 md:mb-3"
                  style={{ color: "#A07850" }}
                >
                  7 gün öncəyə planlaşdır
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7A5C44" }}
                >
                  Tədbirlər üçün öncədən sifariş verin, vaxtında hazırlayaq.
                </p>
              </div>
            </div>

            {/* Card 4 — 7/24 Dəstək */}
            <div
              className={`rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col justify-between group border
                transition-all duration-500 delay-[400ms] hover:border-[#A07850] hover:shadow-md
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                background: "#FAF7F2",
                borderColor: "#E8DDD0",
                minHeight: "200px",
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 mb-5 transition-transform duration-500 group-hover:scale-110 origin-left"
                style={{ color: "#A07850" }}
              >
                <IconClock />
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl mb-1"
                  style={{ fontFamily: "Georgia, serif", color: "#1E0F06" }}
                >
                  7/24 Dəstək
                </h3>
                <p
                  className="text-[10px] uppercase tracking-widest mb-2 md:mb-3"
                  style={{ color: "#A07850" }}
                >
                  WhatsApp & Telefon
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7A5C44" }}
                >
                  Sualınız və ya xüsusi istəyiniz üçün istənilən vaxt əlaqə
                  saxlayın.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={`mt-12 md:mt-16 border-t transition-all duration-700 delay-500
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ borderColor: "#C4A882" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`py-6 md:py-8 px-4 md:px-6 text-center
                  ${i % 2 === 0 ? "border-r" : ""}
                  ${i < 2 ? "border-b md:border-b-0" : ""}
                  md:border-r md:last:border-r-0`}
                style={{ borderColor: "#C4A882" }}
              >
                <div
                  className="text-3xl md:text-4xl mb-1"
                  style={{ fontFamily: "Georgia, serif", color: "#1E0F06" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[10px] uppercase tracking-widest"
                  style={{ color: "#A07850" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
