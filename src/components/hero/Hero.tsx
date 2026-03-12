"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    tag: "Bestseller",
    t1: "Dubay",
    t2: "Şokoladı",
    sub: "100% təbii püstə kremi və xırtıldayan kadayıfın Belçika şokoladı ilə mükəmməl rəqsi.",
    video: "/assets/videos/dubai chokolot.mp4",
    pill: "Yeni",
    accent: "#B8977E",
  },
  {
    id: 2,
    tag: "Yeni Kolleksiya",
    t1: "Çiyələk",
    t2: "Möcüzəsi",
    sub: "Gününüzü xüsusi edəcək təzə giləmeyvə və premium şokoladın ahəngi.",
    video: "/assets/videos/ciyelek.mp4",
    pill: "Sezonal",
    accent: "#C4607A",
  },
  {
    id: 3,
    tag: "Premium Seçim",
    t1: "Eksklüziv",
    t2: "Hədiyyələr",
    sub: "Sevdiklərinizi unudulmaz premium ləzzətlərlə təəccübləndirin.",
    video: "/assets/videos/hediye.mp4",
    pill: "Limitəd",
    accent: "#B8977E",
  },
];

export default function Hero() {
  const [cur, setCur] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = (idx: number) => {
    if (idx === cur) return;
    setVisible(false);
    setProgress(0);
    setTimeout(() => {
      setCur(idx);
      setVisible(true);
    }, 280);
  };

  // Track active video progress and auto-advance on end
  useEffect(() => {
    const vid = videoRefs.current[cur];
    if (!vid) return;

    vid.currentTime = 0;
    vid.play().catch(() => {});

    const onTimeUpdate = () => {
      if (!vid.duration) return;
      setProgress((vid.currentTime / vid.duration) * 100);
    };

    const onEnded = () => {
      goTo((cur + 1) % slides.length);
    };

    vid.addEventListener("timeupdate", onTimeUpdate);
    vid.addEventListener("ended", onEnded);

    return () => {
      vid.removeEventListener("timeupdate", onTimeUpdate);
      vid.removeEventListener("ended", onEnded);
    };
  }, [cur]);

  const s = slides[cur];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .hr {
          --nav-h: 100px;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          height: calc(100vh - var(--nav-h));
          min-height: 520px;
          max-height: 860px;
          background: #FAF7F2;
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 0.72fr;
        }

        /* ═══════════════════════════
           LEFT — text panel
        ═══════════════════════════ */
        .hr-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 clamp(32px, 5vw, 80px);
          position: relative;
          z-index: 2;
          background: #FAF7F2;
        }

        /* Faint radial warm tint */
        .hr-left::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 60% at 0% 60%, rgba(184,151,126,0.07) 0%, transparent 70%);
        }

        .hr-tag {
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: #B8977E; margin-bottom: 22px;
          display: flex; align-items: center; gap: 12px;
          transition: opacity 0.3s, transform 0.3s;
        }
        .hr-tag::before, .hr-tag::after {
          content: ''; display: block;
          height: 1px; width: 20px;
          background: #B8977E; opacity: 0.5;
        }

        .hr-title {
          font-family: 'Playfair Display', serif;
          line-height: 0.92; margin-bottom: 22px;
        }
        .hr-t1 {
          display: block;
          font-size: clamp(48px, 5.5vw, 84px);
          font-weight: 900; color: #2A1F1A;
          transition: opacity 0.35s, transform 0.35s;
        }
        .hr-t2 {
          display: block;
          font-size: clamp(52px, 6vw, 92px);
          font-weight: 400; font-style: italic; color: #2A1F1A;
          transition: opacity 0.35s 0.06s, transform 0.35s 0.06s;
        }

        .hr-line {
          width: 36px; height: 1.5px; background: #B8977E;
          margin-bottom: 18px;
          transition: opacity 0.35s 0.1s, transform 0.35s 0.1s;
          transform-origin: left;
        }

        .hr-sub {
          font-size: 14px; font-weight: 300; line-height: 1.8;
          color: #7A6659; max-width: 380px; margin-bottom: 32px;
          transition: opacity 0.35s 0.14s, transform 0.35s 0.14s;
        }

        .hr-actions {
          display: flex; align-items: center; gap: 20px; margin-bottom: 32px;
          transition: opacity 0.35s 0.18s, transform 0.35s 0.18s;
        }

        .hr-btn {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 18px 42px; font-size: 12px; font-weight: 500;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #FAF7F2; background: #3E2723; border: none; cursor: pointer;
          border-radius: 2px; font-family: 'DM Sans', sans-serif;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
        }
        .hr-btn:hover {
          background: #2A1F1A; transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(62,39,35,0.28);
        }
        .hr-btn svg { transition: transform 0.25s; }
        .hr-btn:hover svg { transform: translateX(4px); }

        .hr-btn2 {
          font-size: 11px; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase;
          color: #9A8070; background: none; border: none;
          border-bottom: 1px solid rgba(154,128,112,0.3);
          cursor: pointer; padding: 3px 0; font-family: 'DM Sans', sans-serif;
          transition: color 0.25s, border-color 0.25s;
        }
        .hr-btn2:hover { color: #3E2723; border-color: #3E2723; }

        .hr-trust {
          display: flex; align-items: stretch; gap: 0;
          padding-top: 24px; border-top: 1px solid rgba(58,40,32,0.09);
          transition: opacity 0.35s 0.22s, transform 0.35s 0.22s;
        }
        .hr-stat {
          display: flex; flex-direction: column; justify-content: center;
          padding-right: 22px;
        }
        .hr-stat + .hr-stat {
          padding-left: 22px; padding-right: 22px;
          border-left: 1px solid rgba(58,40,32,0.1);
        }
        .hr-stat:last-child { padding-right: 0; }
        .hr-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700;
          color: #2A1F1A; line-height: 1; margin-bottom: 5px;
        }
        .hr-stat-num em {
          font-style: normal; font-size: 13px; font-weight: 400;
          color: #B8977E; margin-left: 1px;
        }
        .hr-stat-lbl {
          font-size: 9.5px; font-weight: 400;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #9A8070;
        }

        /* ── SLIDE-IN/OUT STATES ── */
        .hr-hidden .hr-tag,
        .hr-hidden .hr-t1,
        .hr-hidden .hr-t2,
        .hr-hidden .hr-line,
        .hr-hidden .hr-sub,
        .hr-hidden .hr-actions,
        .hr-hidden .hr-trust { opacity: 0; transform: translateY(-12px); }
        .hr-hidden .hr-line { transform: scaleX(0); }

        .hr-shown .hr-tag,
        .hr-shown .hr-t1,
        .hr-shown .hr-t2,
        .hr-shown .hr-line,
        .hr-shown .hr-sub,
        .hr-shown .hr-actions,
        .hr-shown .hr-trust { opacity: 1; transform: translateY(0) scaleX(1); }

        /* ═══════════════════════════
           RIGHT — full video panel
        ═══════════════════════════ */
        .hr-right {
          position: relative;
          overflow: hidden;
          background: #2A1F1A;
        }

        /* Videos stacked, active one fades in */
        .hr-vid {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.9s ease;
        }
        .hr-vid.on { opacity: 1; }

        /* Left edge soft blend into cream */
        .hr-right-fade {
          position: absolute; inset-y: 0; left: 0;
          width: 80px; z-index: 3; pointer-events: none;
          background: linear-gradient(to right, #FAF7F2, transparent);
        }

        /* Pill badge */
        .hr-pill {
          position: absolute; top: 20px; left: 28px; z-index: 5;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          font-weight: 500; color: #FAF7F2;
          padding: 5px 14px; border-radius: 20px;
          transition: background 0.5s;
        }

        /* Slide controls — bottom center of right panel */
        .hr-ctrls {
          position: absolute; bottom: 20px; left: 0; right: 0;
          z-index: 6;
          display: flex; justify-content: center; align-items: center; gap: 20px;
        }
        .hr-ctrl {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          cursor: pointer; background: none; border: none; padding: 4px;
          opacity: 0.4; transition: opacity 0.3s;
          font-family: 'Playfair Display', serif;
        }
        .hr-ctrl.on { opacity: 1; }
        .hr-ctrl:hover { opacity: 0.7; }
        .hr-cnum {
          font-size: 9px; letter-spacing: 0.2em;
          color: rgba(250,247,242,0.8); font-style: italic;
        }
        .hr-cbar {
          width: 32px; height: 1.5px;
          background: rgba(250,247,242,0.2); border-radius: 2px; overflow: hidden;
        }
        .hr-cfill {
          height: 100%; border-radius: 2px;
          background: rgba(250,247,242,0.85);
          width: 0%; transition: width 0.08s linear;
        }

        /* ═══════════════════════════
           MOBILE — full bleed video bg
        ═══════════════════════════ */
        @media (max-width: 767px) {
          .hr {
            --nav-h: 116px;
            grid-template-columns: 1fr;
            height: calc(100dvh - var(--nav-h));
            max-height: none;
            position: relative;
          }

          /* Video fills entire hero */
          .hr-right {
            position: absolute; inset: 0;
            z-index: 1;
          }
          .hr-right-fade { display: none; }

          /* Gradient overlay for text legibility */
          .hr-right::after {
            content: '';
            position: absolute; inset: 0; z-index: 2;
            background: linear-gradient(
              to bottom,
              rgba(0,0,0,0) 30%,
              rgba(0,0,0,0.6) 70%,
              rgba(0,0,0,0.78) 100%
            );
          }

          /* Text pinned above controls */
          .hr-left {
            position: absolute; bottom: 50px; left: 0; right: 0;
            z-index: 5; padding: 0 22px;
            background: transparent;
          }
          .hr-left::before { display: none; }

          .hr-tag { color: rgba(250,247,242,0.7); margin-bottom: 10px; }
          .hr-tag::before, .hr-tag::after { background: rgba(250,247,242,0.3); }
          .hr-t1 { font-size: clamp(42px, 12vw, 64px); color: #FAF7F2; }
          .hr-t2 { font-size: clamp(46px, 13vw, 70px); color: #FAF7F2; }
          .hr-line { background: rgba(250,247,242,0.35); margin-bottom: 10px; }
          .hr-sub {
            font-size: 13px; color: rgba(250,247,242,0.72);
            max-width: 100%; margin-bottom: 18px;
            display: -webkit-box;
            -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          }
          .hr-btn {
            padding: 12px 24px;
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.25);
            color: #FAF7F2;
          }
          .hr-btn:hover { background: rgba(255,255,255,0.25); }
          .hr-btn2 { color: rgba(250,247,242,0.5); border-color: rgba(250,247,242,0.18); }
          .hr-trust {
            border-color: rgba(250,247,242,0.12); padding-top: 12px;
          }
          .hr-stat-num { color: #FAF7F2; }
          .hr-stat-num em { color: rgba(250,247,242,0.5); }
          .hr-stat-lbl { color: rgba(250,247,242,0.45); }
          .hr-stat + .hr-stat { border-color: rgba(250,247,242,0.12); }

          .hr-pill { top: 14px; left: 16px; }
          .hr-ctrls { bottom: 10px; }
        }
      `}</style>

      <div className={`hr ${visible ? "hr-shown" : "hr-hidden"}`}>
        {/* ── LEFT: Text ── */}
        <div className="hr-left">
          <div className="hr-tag">{s.tag}</div>

          <div className="hr-title">
            <span className="hr-t1">{s.t1}</span>
            <span className="hr-t2">{s.t2}</span>
          </div>

          <div className="hr-line" />

          <p className="hr-sub">{s.sub}</p>

          <div className="hr-actions">
            <button className="hr-btn">
              Kəşf Et
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="hr-btn2">Kolleksiya</button>
          </div>

          <div className="hr-trust">
            <div className="hr-stat">
              <div className="hr-stat-num">
                5K<em>+</em>
              </div>
              <div className="hr-stat-lbl">Müştəri</div>
            </div>
            <div className="hr-stat">
              <div className="hr-stat-num">
                4.9<em>★</em>
              </div>
              <div className="hr-stat-lbl">Reytinq</div>
            </div>
            <div className="hr-stat">
              <div className="hr-stat-num">
                3<em>il</em>
              </div>
              <div className="hr-stat-lbl">Təcrübə</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Full video panel ── */}
        <div className="hr-right">
          {/* Left-edge cream blend */}
          <div className="hr-right-fade" />

          {/* All videos stacked, active fades in */}
          {slides.map((sl, i) => (
            <video
              key={sl.id}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className={`hr-vid${cur === i ? " on" : ""}`}
              src={sl.video}
              autoPlay
              muted
              playsInline
            />
          ))}

          {/* Pill */}
          <div className="hr-pill" style={{ background: `${s.accent}E0` }}>
            {s.pill}
          </div>

          {/* Slide controls */}
          <div className="hr-ctrls">
            {slides.map((sl, i) => (
              <button
                key={sl.id}
                className={`hr-ctrl${cur === i ? " on" : ""}`}
                onClick={() => goTo(i)}
              >
                <span className="hr-cnum">0{i + 1}</span>
                <div className="hr-cbar">
                  <div
                    className="hr-cfill"
                    style={{ width: cur === i ? `${progress}%` : "0%" }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* ── Transition to Bestsellers ── */}
      <div
        style={{
          position: "relative",
          height: 80,
          background: "#FAF7F2",
          marginTop: -1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#FDFCF7",
            clipPath: "polygon(0 60%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>
    </>
  );
}
