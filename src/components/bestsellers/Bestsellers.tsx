"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const bestsellers = [
  { id: 1, name: "Dubay Şokoladı", image: "/assets/products/dubay2.png" },
  {
    id: 2,
    name: "Çiyələk Buketləri",
    image: "/assets/products/ciyelek-buketi2.png",
  },
  {
    id: 3,
    name: "Konfet və Trufellər",
    image: "/assets/products/truffle2.png",
  },
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
  {
    id: 10,
    name: "Sublimə Məhsulları",
    image: "/assets/products/sublime2.png",
  },
];

const COUNT = bestsellers.length;
const ITEMS = [...bestsellers, ...bestsellers, ...bestsellers];

export default function Bestsellers() {
  const [isMobile, setIsMobile] = useState(false);
  const [dotIndex, setDotIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(COUNT);
  const scrollRef = useRef(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontal = useRef<boolean | null>(null);
  const startScroll = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CARD_W = isMobile ? 240 : 260;
  const GAP = isMobile ? 12 : 20;
  const STEP = CARD_W + GAP;

  const jumpTrack = useCallback(
    (offset: number) => {
      const t = trackRef.current;
      if (!t) return;
      t.style.transition = "none";
      t.style.transform = `translateX(calc(50vw - ${CARD_W / 2}px - ${offset}px))`;
      scrollRef.current = offset;
    },
    [CARD_W],
  );

  const animTrack = useCallback(
    (offset: number) => {
      const t = trackRef.current;
      if (!t) return;
      t.style.transition = "transform 700ms cubic-bezier(0.16,1,0.3,1)";
      t.style.transform = `translateX(calc(50vw - ${CARD_W / 2}px - ${offset}px))`;
      scrollRef.current = offset;
    },
    [CARD_W],
  );

  const paint = useCallback(
    (centerIdx: number, animated: boolean) => {
      const t = trackRef.current;
      if (!t) return;
      const mobile = isMobile;
      const pad = mobile ? 12 : 16;
      const maxShrink = mobile ? 0.35 : 0.2;
      const minScale = 1.1 - maxShrink;
      const dur = animated ? "700ms" : "0ms";

      (Array.from(t.children) as HTMLElement[]).forEach((card, i) => {
        const p = i - centerIdx;
        const abs = Math.abs(p);
        let scale: number, y: number;

        if (abs <= 1) {
          scale = 1.1 - maxShrink * abs;
          y = 35 * abs * abs;
        } else if (abs <= 2) {
          scale = minScale;
          y = 35 - 60 * Math.sqrt(abs - 1);
        } else {
          scale = minScale;
          y = 35 - 60;
        }

        card.style.transitionProperty = "transform";
        card.style.transitionDuration = dur;
        card.style.transitionTimingFunction = "cubic-bezier(0.16,1,0.3,1)";
        card.style.transform = `translate3d(0,${y}px,0) scale(${scale})`;
        card.style.zIndex = String(50 - Math.round(abs * 10));

        const isActive = abs < 0.5;

        const pw = card.querySelector<HTMLElement>(".pw");
        if (pw) {
          pw.style.transitionProperty =
            "padding,box-shadow,background-color,border";
          pw.style.transitionDuration = dur;
          pw.style.transitionTimingFunction = "cubic-bezier(0.16,1,0.3,1)";
          pw.style.backgroundColor = isActive ? "white" : "transparent";
          pw.style.padding = isActive ? `${pad}px` : "0px";
          pw.style.border = isActive ? "1px solid #f3f3f3" : "none";
          pw.style.boxShadow = isActive
            ? "0 40px 80px -15px rgba(62,39,35,.12)"
            : "none";
        }

        const at = card.querySelector<HTMLElement>(".at");
        if (at) {
          at.style.transitionProperty = "opacity,transform,bottom,left,width";
          at.style.transitionDuration = dur;
          at.style.transitionTimingFunction = "cubic-bezier(0.16,1,0.3,1)";
          at.style.opacity = isActive ? "1" : "0";
          at.style.transform = isActive ? "translateY(0)" : "translateY(8px)";
          at.style.bottom = `${pad}px`;
          at.style.left = `${pad}px`;
          at.style.width = `calc(100% - ${pad * 2}px)`;
          at.style.pointerEvents = isActive ? "auto" : "none";
        }

        const it = card.querySelector<HTMLElement>(".it");
        if (it) {
          it.style.transitionProperty = "opacity";
          it.style.transitionDuration = dur;
          it.style.opacity = isActive ? "0" : "1";
          it.style.pointerEvents = isActive ? "none" : "auto";
        }
      });
    },
    [isMobile],
  );

  const snapTo = useCallback(
    (idx: number, animated: boolean) => {
      idx = Math.max(0, Math.min(ITEMS.length - 1, idx));

      const offset = idx * STEP;
      animated ? animTrack(offset) : jumpTrack(offset);
      paint(idx, animated);
      activeRef.current = idx;
      setDotIndex(idx % COUNT);

      setTimeout(
        () => {
          let ni = idx;
          if (idx < COUNT) ni = idx + COUNT;
          else if (idx >= COUNT * 2) ni = idx - COUNT;
          if (ni !== idx) {
            jumpTrack(ni * STEP);
            paint(ni, false);
            activeRef.current = ni;
          }
        },
        animated ? 720 : 50,
      );
    },
    [STEP, animTrack, jumpTrack, paint],
  );

  // Init
  useEffect(() => {
    requestAnimationFrame(() => snapTo(COUNT, false));
  }, [isMobile]); // eslint-disable-line

  // ─── ALL pointer events on window — nothing can swallow them ─────────────
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = startX.current - e.clientX;
      const dy = startY.current - e.clientY;

      // Determine direction on first significant move
      if (
        isHorizontal.current === null &&
        (Math.abs(dx) > 4 || Math.abs(dy) > 4)
      ) {
        isHorizontal.current = Math.abs(dx) > Math.abs(dy);
      }

      // If vertical gesture — let browser scroll, cancel drag
      if (isHorizontal.current === false) {
        dragging.current = false;
        const t = trackRef.current;
        if (t) t.style.transition = "none";
        snapTo(activeRef.current, false);
        return;
      }

      if (!isHorizontal.current) return; // direction not yet determined

      e.preventDefault();
      const newOff = startScroll.current + dx;
      const t = trackRef.current;
      if (!t) return;
      t.style.transform = `translateX(calc(50vw - ${CARD_W / 2}px - ${newOff}px))`;
      scrollRef.current = newOff;
      paint(newOff / STEP, false);
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = startX.current - e.clientX;
      const cur = scrollRef.current;

      // Click detection: moved less than 6px → snap to that card
      if (Math.abs(dx) < 6 && clickTargetIndex.current !== null) {
        snapTo(clickTargetIndex.current, true);
        clickTargetIndex.current = null;
        return;
      }

      let target = Math.round(cur / STEP);
      if (Math.abs(dx) > 30) {
        target =
          dx > 0 ? Math.floor(cur / STEP) + 1 : Math.ceil(cur / STEP) - 1;
      }
      snapTo(target, true);
      clickTargetIndex.current = null;
    };

    const onCancel = () => {
      if (!dragging.current) return;
      dragging.current = false;
      snapTo(activeRef.current, true);
    };

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
  }, [CARD_W, STEP, paint, snapTo]);

  // ─── Only pointerdown stays on the element ────────────────────────────────
  const clickTargetIndex = useRef<number | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    startScroll.current = scrollRef.current;
    isHorizontal.current = null; // direction not yet determined
    const t = trackRef.current;
    if (t) t.style.transition = "none";
    // record which card was pressed for click detection
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const card = el?.closest("[data-ci]") as HTMLElement | null;
    clickTargetIndex.current = card
      ? parseInt(card.getAttribute("data-ci")!)
      : null;
  }, []);

  const realActive = activeRef.current % COUNT;

  return (
    <section className="relative w-full min-h-[100vh] py-16 md:py-24 flex flex-col justify-center overflow-hidden bg-[#FDFCF7]">
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none w-full flex justify-center overflow-hidden">
        <span className="font-serif text-[18vw] text-[#F3EFE5] opacity-50 uppercase tracking-tighter leading-none select-none whitespace-nowrap">
          EXCLUSIVE
        </span>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 mb-10 md:mb-14 text-center z-10 relative shrink-0">
        <h2 className="text-4xl md:text-6xl text-gray-900 font-serif font-light italic tracking-tight">
          Bestseller Kolleksiyamız
        </h2>
        <div className="w-12 h-[1px] bg-[#3E2723] mx-auto mt-4 md:mt-6" />
        <p className="max-w-md mx-auto mt-5 md:mt-6 text-gray-500 font-light leading-relaxed tracking-widest text-sm md:text-base">
          Müştərilərimizin ən çox sevdiyi, unudulmaz anlara ləzzət qatan xüsusi
          seçimlərimiz.
        </p>
      </div>

      {/* Slider viewport */}
      <div
        ref={wrapRef}
        className="relative w-full h-[400px] md:h-[500px] flex items-center z-20 shrink-0"
        style={{
          overflow: "visible",
          touchAction: "pan-y",
          userSelect: "none",
          cursor: "grab",
        }}
        onPointerDown={onPointerDown}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="absolute flex items-end"
          style={{ gap: GAP, willChange: "transform", pointerEvents: "none" }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              data-ci={i}
              style={{
                width: CARD_W,
                flexShrink: 0,
                position: "relative",
                willChange: "transform",
                pointerEvents: "auto",
                cursor: "pointer",
              }}
            >
              {/* Paspartu */}
              <div
                className="pw"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "transparent",
                  padding: 0,
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: 2,
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority
                    sizes={`${CARD_W}px`}
                    draggable={false}
                    className="object-contain object-center scale-[1.1] brightness-[1.02]"
                    quality={85}
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  />
                </div>

                {/* Active label */}
                <div
                  className="at"
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    width: "calc(100% - 24px)",
                    backgroundColor: "#3E2723",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderRadius: 2,
                    opacity: 0,
                    transform: "translateY(8px)",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Georgia,serif",
                      fontSize: isMobile ? 9 : 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.25em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontWeight: 100,
                      fontSize: isMobile ? 16 : 18,
                      marginLeft: 12,
                    }}
                  >
                    →
                  </span>
                </div>
              </div>

              {/* Inactive label */}
              <div
                className="it"
                style={{
                  position: "absolute",
                  top: "100%",
                  marginTop: 12,
                  left: 0,
                  width: "100%",
                  padding: "0 4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: isMobile ? 10 : 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "#1a1a1a",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontWeight: 100,
                    fontSize: isMobile ? 14 : 16,
                    opacity: 0.6,
                  }}
                >
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8 z-10 shrink-0">
        {bestsellers.map((_, i) => (
          <button
            key={i}
            onClick={() => snapTo(COUNT + i, true)}
            style={{
              width: i === dotIndex ? 24 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === dotIndex ? "#3E2723" : "#D7CFC5",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition:
                "width 400ms cubic-bezier(0.16,1,0.3,1), background-color 400ms ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}
