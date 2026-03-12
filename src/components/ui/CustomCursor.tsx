"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let tx = -100, ty = -100;
    let cx = -100, cy = -100;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.13;
      cy += (ty - cy) * 0.13;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx - 16}px, ${cy - 16}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const show = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };
    const hide = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseenter", show);
    document.documentElement.addEventListener("mouseleave", hide);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseenter", show);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <>
      {/* Premium crosshair cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transition: "opacity 0.4s",
        }}
      >
        {/* Horizontal bar */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: 1,
            background: "rgba(201,169,110,0.85)",
            transform: "translateY(-50%)",
          }}
        />
        {/* Vertical bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 1,
            height: "100%",
            background: "rgba(201,169,110,0.85)",
            transform: "translateX(-50%)",
          }}
        />
        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#C9A96E",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
