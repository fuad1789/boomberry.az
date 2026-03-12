"use client";

import { motion } from "framer-motion";

export default function CraftPhilosophy() {
  return (
    <section className="bg-[#FAF7F2] w-full relative">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />

      {/* ══════════════════════════════
          DESKTOP: 2 kolumn
      ══════════════════════════════ */}
      <div className="hidden md:grid md:grid-cols-2 md:items-center max-w-[1400px] mx-auto px-12 xl:px-20 gap-16">
        {/* LEFT: Text */}
        <div className="py-20 relative">
          {/* Watermark */}
          <div
            className="absolute bottom-0 -left-2 select-none pointer-events-none text-transparent leading-none"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "10rem",
              fontWeight: 700,
              WebkitTextStroke: "1px rgba(62,39,35,0.04)",
            }}
          >
            BB
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-7 bg-[#C9A96E] shrink-0" />
              <p
                className="text-[#C9A96E] uppercase tracking-[0.32em]"
                style={{ fontFamily: "'Cinzel',serif", fontSize: "0.56rem" }}
              >
                Bloomberry Freeze-Dry
              </p>
            </div>

            <h2
              className="mb-5"
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,3.8vw,3.4rem)",
                fontWeight: 400,
                lineHeight: 1.12,
                color: "#1C1009",
              }}
            >
              Mükəmməllik hər{" "}
              <em style={{ fontStyle: "italic", color: "#8B4513" }}>
                dənəcikdə
              </em>{" "}
              gizlidir.
            </h2>

            <div
              className="w-10 h-0.5 mb-5"
              style={{
                background: "linear-gradient(to right,#C9A96E,#8B4513)",
              }}
            />

            <p
              className="mb-8 max-w-[400px]"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "#5C3D2E",
              }}
            >
              Hər bir məhsulumuz ən təzə giləmeyvələrdən dondurularaq qurudulur
              — heç bir qatqı, heç bir konservant. Təbiətin rəngi, dadı və
              qidalılığı olduğu kimi qorunur.
            </p>

            <button
              className="inline-flex items-center gap-3 mb-9 hover:opacity-80 transition-opacity"
              style={{
                background: "#1C1009",
                color: "#F5ECD7",
                padding: "14px 28px",
                borderRadius: 2,
                fontFamily: "'Cinzel',serif",
                fontSize: "0.6rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span>Kolleksiyanı Kəşf Et</span>
              <svg width="13" height="10" viewBox="0 0 14 10" fill="none">
                <path
                  d="M1 5h12M8 1l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="grid grid-cols-3 pt-5 border-t border-[rgba(62,39,35,0.11)]">
              {[
                { num: "100%", label: "Təbii Meyvə" },
                { num: "Sıfır", label: "Qatqı" },
                { num: "Bol", label: "Vitaminlər" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1"
                  style={{
                    paddingLeft: i > 0 ? 20 : 0,
                    paddingRight: i < 2 ? 20 : 0,
                    borderLeft: i > 0 ? "1px solid rgba(62,39,35,0.1)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "#8B4513",
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "0.46rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(62,39,35,0.4)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Mosaic */}
        <div
          className="grid grid-cols-2 gap-2.5 py-16"
          style={{ alignItems: "start" }}
        >
          {/* Big left card */}
          <div
            className="relative overflow-hidden rounded-sm col-span-1 row-span-2"
            style={{ aspectRatio: "3/4", background: "#E8DDD4" }}
          >
            <img
              src="/assets/imgs/philosop/mehsul paket.png"
              alt=""
              className="w-full h-full object-cover block"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-3"
              style={{
                background:
                  "linear-gradient(to top,rgba(28,16,9,0.65),transparent)",
                paddingTop: 28,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "0.44rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(245,236,215,0.85)",
                }}
              >
                Premium Paket
              </span>
            </div>
          </div>
          {/* Top right */}
          <div
            className="relative overflow-hidden rounded-sm"
            style={{ aspectRatio: "1/1", background: "#E0D4CA", marginTop: 32 }}
          >
            <img
              src="/assets/imgs/philosop/mehsul ici.jpg"
              alt=""
              className="w-full h-full object-cover block"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-3"
              style={{
                background:
                  "linear-gradient(to top,rgba(28,16,9,0.6),transparent)",
                paddingTop: 22,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "0.44rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(245,236,215,0.85)",
                }}
              >
                Məhsul İçi
              </span>
            </div>
          </div>
          {/* Bottom right video */}
          <div
            className="relative overflow-hidden rounded-sm"
            style={{ aspectRatio: "4/3", background: "#D9CCBF" }}
          >
            <video
              src="/assets/imgs/philosop/hazirlanis.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover block"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-3"
              style={{
                background:
                  "linear-gradient(to top,rgba(28,16,9,0.6),transparent)",
                paddingTop: 22,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "0.44rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(245,236,215,0.85)",
                }}
              >
                Hazırlanış
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          MOBILE: tam ayrı layout
      ══════════════════════════════ */}
      <div className="md:hidden">
        {/* Text bloku */}
        <div className="px-5 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-[#C9A96E] shrink-0" />
            <p
              className="text-[#C9A96E] uppercase tracking-[0.28em]"
              style={{ fontFamily: "'Cinzel',serif", fontSize: "0.48rem" }}
            >
              Bloomberry Sənətkarlığı
            </p>
          </div>

          <h2
            className="mb-4 text-[#1C1009]"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1.75rem",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Mükəmməllik hər{" "}
            <em style={{ fontStyle: "italic", color: "#8B4513" }}>qatda</em>{" "}
            gizlidir.
          </h2>

          <div
            className="w-9 h-0.5 mb-4"
            style={{ background: "linear-gradient(to right,#C9A96E,#8B4513)" }}
          />

          <p
            className="mb-6 text-[#5C3D2E]"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            Hər bir şokoladımız yalnız ən yüksək keyfiyyətli Belçika şokoladı və
            təbii inqrediyentlərlə, ustalarımızın əlində bir sənət əsərinə
            çevrilir.
          </p>

          <button
            className="w-full flex items-center justify-center gap-3 mb-6"
            style={{
              background: "#1C1009",
              color: "#F5ECD7",
              padding: "15px 24px",
              borderRadius: 2,
              fontFamily: "'Cinzel',serif",
              fontSize: "0.58rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span>Kolleksiyanı Kəşf Et</span>
            <svg width="13" height="10" viewBox="0 0 14 10" fill="none">
              <path
                d="M1 5h12M8 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="grid grid-cols-3 pt-4 border-t border-[rgba(62,39,35,0.11)]">
            {[
              { num: "100%", label: "Belçika" },
              { num: "Əl ilə", label: "İstehsal" },
              { num: "Təbii", label: "Inqrediyent" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col gap-1"
                style={{
                  paddingLeft: i > 0 ? 12 : 0,
                  paddingRight: i < 2 ? 12 : 0,
                  borderLeft: i > 0 ? "1px solid rgba(62,39,35,0.1)" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#8B4513",
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: "0.44rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(62,39,35,0.4)",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero + detail grid */}
        <div className="px-5 pb-8 flex flex-col gap-2.5">
          {/* Böyük hero şəkil — tam genişlik */}
          <div
            className="relative overflow-hidden rounded-sm w-full"
            style={{ aspectRatio: "4/3", background: "#E8DDD4" }}
          >
            <img
              src="/assets/imgs/philosop/mehsul paket mobile.png"
              alt="Premium Paket"
              className="w-full h-full object-cover block"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Gold corner */}
            <div className="absolute top-3 right-3 opacity-50">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <path d="M0 0 H32 V2 H2 V32 H0 Z" fill="#C9A96E" />
              </svg>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-10"
              style={{
                background:
                  "linear-gradient(to top,rgba(28,16,9,0.65),transparent)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "0.48rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(245,236,215,0.88)",
                }}
              >
                Premium Paket
              </span>
            </div>
          </div>

          {/* 2 kiçik kart yan-yana */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Sol — şəkil */}
            <div
              className="relative overflow-hidden rounded-sm"
              style={{ aspectRatio: "1/1", background: "#E0D4CA" }}
            >
              <img
                src="/assets/imgs/philosop/mehsul ici.jpg"
                alt="Məhsul İçi"
                className="w-full h-full object-cover block"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-8"
                style={{
                  background:
                    "linear-gradient(to top,rgba(28,16,9,0.6),transparent)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: "0.44rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(245,236,215,0.85)",
                  }}
                >
                  Məhsul İçi
                </span>
              </div>
            </div>

            {/* Sağ — video */}
            <div
              className="relative overflow-hidden rounded-sm"
              style={{ aspectRatio: "1/1", background: "#D9CCBF" }}
            >
              <video
                src="/assets/imgs/philosop/hazirlanis.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover block"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-8"
                style={{
                  background:
                    "linear-gradient(to top,rgba(28,16,9,0.6),transparent)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: "0.44rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(245,236,215,0.85)",
                  }}
                >
                  Hazırlanış
                </span>
              </div>
              {/* Gold corner */}
              <div className="absolute bottom-3 right-3 opacity-50">
                <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                  <path d="M32 32 H0 V30 H30 V0 H32 Z" fill="#C9A96E" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right,transparent,rgba(201,169,110,0.4),transparent)",
        }}
      />
    </section>
  );
}
