"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: "dark-choc",
    name: "Tünd Şokolad",
    emoji: "🍫",
    price: 2,
    color: "#3D1C02",
    category: "chocolate",
  },
  {
    id: "milk-choc",
    name: "Südlü Şokolad",
    emoji: "🍬",
    price: 2,
    color: "#8B4513",
    category: "chocolate",
  },
  {
    id: "white-choc",
    name: "Ağ Şokolad",
    emoji: "⬜",
    price: 2,
    color: "#F5E6D0",
    category: "chocolate",
  },
  {
    id: "ruby-choc",
    name: "Ruby Şokolad",
    emoji: "💎",
    price: 4,
    color: "#C44E6A",
    category: "chocolate",
  },
  {
    id: "strawberry",
    name: "Çiyələk",
    emoji: "🍓",
    price: 3,
    color: "#D93B4A",
    category: "berry",
  },
  {
    id: "raspberry",
    name: "Moruq",
    emoji: "🫐",
    price: 3,
    color: "#9B2335",
    category: "berry",
  },
  {
    id: "blueberry",
    name: "Bog Meyvəsi",
    emoji: "🫐",
    price: 3,
    color: "#4A3480",
    category: "berry",
  },
  {
    id: "truffle",
    name: "Trüfel",
    emoji: "🔮",
    price: 5,
    color: "#2C1A0E",
    category: "special",
  },
  {
    id: "macaron",
    name: "Makaron",
    emoji: "🎀",
    price: 4,
    color: "#F4A7B9",
    category: "candy",
  },
  {
    id: "praline",
    name: "Pralin",
    emoji: "🌰",
    price: 3,
    color: "#7B4F2E",
    category: "nut",
  },
  {
    id: "pistachio",
    name: "Püstə",
    emoji: "🌿",
    price: 3,
    color: "#6B8C3A",
    category: "nut",
  },
  {
    id: "gold-choc",
    name: "Qızıl Şokolad",
    emoji: "✨",
    price: 8,
    color: "#C9A96E",
    category: "special",
  },
];

const BOX_LAYOUTS = [
  {
    id: "grid-9",
    name: "Klassik 9-lu",
    desc: "3×3 bərabər xanalar",
    shape: "square",
    price: 8,
    slots: [
      { id: "s1", size: "small" },
      { id: "s2", size: "small" },
      { id: "s3", size: "small" },
      { id: "s4", size: "small" },
      { id: "s5", size: "small" },
      { id: "s6", size: "small" },
      { id: "s7", size: "small" },
      { id: "s8", size: "small" },
      { id: "s9", size: "small" },
    ],
  },
  {
    id: "combo-7",
    name: "Kombo 7-li",
    desc: "1 böyük + 6 kiçik xana",
    shape: "square",
    price: 12,
    slots: [
      { id: "big", size: "large", gridArea: "1 / 1 / 3 / 2" },
      { id: "c1", size: "small", gridArea: "1 / 2 / 2 / 3" },
      { id: "c2", size: "small", gridArea: "1 / 3 / 2 / 4" },
      { id: "c3", size: "small", gridArea: "2 / 2 / 3 / 3" },
      { id: "c4", size: "small", gridArea: "2 / 3 / 3 / 4" },
      { id: "c5", size: "small", gridArea: "3 / 1 / 4 / 2" },
      { id: "c6", size: "small", gridArea: "3 / 2 / 4 / 3" },
      { id: "c7", size: "small", gridArea: "3 / 3 / 4 / 4" },
    ],
  },
  {
    id: "duo-zone",
    name: "Duo Zona",
    desc: "2 bərabər böyük bölmə",
    shape: "heart",
    price: 18,
    slots: [
      { id: "zone-l", size: "large", gridArea: "1 / 1 / 4 / 2" },
      { id: "zone-r", size: "large", gridArea: "1 / 2 / 4 / 3" },
    ],
  },
  {
    id: "grid-12",
    name: "Premium 12-li",
    desc: "3×4 tam collection",
    shape: "square",
    price: 22,
    slots: Array.from({ length: 12 }, (_, i) => ({
      id: `p${i + 1}`,
      size: "small",
    })),
  },
];

const CATEGORIES = [
  { id: "all", label: "Hamısı" },
  { id: "chocolate", label: "Şokolad" },
  { id: "berry", label: "Giləmeyvə" },
  { id: "candy", label: "Şirniyyat" },
  { id: "nut", label: "Qoz-fındıq" },
  { id: "special", label: "Xüsusi" },
];

// ─── Draggable Product Card ────────────────────────────────────────────────────

function DraggableProduct({ product }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `palette-${product.id}`,
      data: { product, source: "palette" },
    });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.95 }}
      style={{
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
        padding: "10px 8px",
        background: "#fff",
        border: "1.5px solid rgba(201,169,110,0.18)",
        borderRadius: 3,
        textAlign: "center",
        userSelect: "none",
        touchAction: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: isDragging ? "none" : "0 1px 8px rgba(28,16,9,0.06)",
      }}
    >
      <div style={{ fontSize: 26, lineHeight: 1, marginBottom: 5 }}>
        {product.emoji}
      </div>
      <p
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.45rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#1C1009",
          margin: "0 0 4px",
          lineHeight: 1.2,
        }}
      >
        {product.name}
      </p>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.72rem",
          color: "#C9A96E",
          fontWeight: 500,
        }}
      >
        +{product.price} ₼
      </span>
    </motion.div>
  );
}

// ─── Droppable Slot ────────────────────────────────────────────────────────────

function DroppableSlot({ slot, filled, onRemove, isLarge }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `slot-${slot.id}`,
    data: { slotId: slot.id },
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `slot-product-${slot.id}`,
    data: { product: filled, source: "slot", slotId: slot.id },
    disabled: !filled,
  });

  const combinedRef = (node) => {
    setNodeRef(node);
    setDragRef(node);
  };

  return (
    <motion.div
      ref={combinedRef}
      {...(filled ? { ...listeners, ...attributes } : {})}
      style={{
        gridArea: slot.gridArea,
        position: "relative",
        background: isOver
          ? "rgba(201,169,110,0.15)"
          : filled
            ? "rgba(201,169,110,0.07)"
            : "rgba(62,39,35,0.03)",
        border: isOver
          ? "2px dashed #C9A96E"
          : filled
            ? `2px solid ${filled.color}33`
            : "2px dashed rgba(62,39,35,0.15)",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: isLarge ? 140 : 78,
        cursor: filled ? "grab" : "default",
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.3 : 1,
        transition: "background 0.2s, border-color 0.2s",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        {filled ? (
          <motion.div
            key={filled.id}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{ textAlign: "center", width: "100%", padding: "4px" }}
          >
            <div
              style={{
                fontSize: isLarge ? 36 : 24,
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {filled.emoji}
            </div>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.38rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1C1009",
                margin: "0 0 2px",
                lineHeight: 1.2,
                paddingInline: 4,
              }}
            >
              {filled.name}
            </p>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(slot.id);
              }}
              style={{
                position: "absolute",
                top: 3,
                right: 3,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "rgba(62,39,35,0.65)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.5rem",
                lineHeight: 1,
                padding: 0,
              }}
            >
              ✕
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                fontSize: isLarge ? 20 : 14,
                color: isOver ? "#C9A96E" : "rgba(62,39,35,0.2)",
                marginBottom: 3,
                transition: "color 0.2s",
              }}
            >
              +
            </div>
            {isLarge && (
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.7rem",
                  color: isOver ? "#C9A96E" : "rgba(62,39,35,0.25)",
                  margin: 0,
                  transition: "color 0.2s",
                }}
              >
                Buraya at
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Drag Overlay Ghost ────────────────────────────────────────────────────────

function DragGhost({ product }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        background: "#fff",
        border: `2px solid ${product.color}`,
        borderRadius: 4,
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(28,16,9,0.22)",
        transform: "rotate(3deg) scale(1.05)",
        pointerEvents: "none",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 4 }}>{product.emoji}</div>
      <p
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.42rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#1C1009",
          margin: 0,
        }}
      >
        {product.name}
      </p>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CustomBoxBuilder() {
  const [selectedLayout, setSelectedLayout] = useState(BOX_LAYOUTS[0]);
  const [slots, setSlots] = useState(() =>
    BOX_LAYOUTS[0].slots.map((s) => ({ slotId: s.id, product: null })),
  );
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeSourceSlot, setActiveSourceSlot] = useState(null);
  const [filterCat, setFilterCat] = useState("all");
  const [showSuccess, setShowSuccess] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
  );

  const changeLayout = useCallback((layout) => {
    setSelectedLayout(layout);
    setSlots(layout.slots.map((s) => ({ slotId: s.id, product: null })));
  }, []);

  const removeFromSlot = useCallback((slotId) => {
    setSlots((prev) =>
      prev.map((s) => (s.slotId === slotId ? { ...s, product: null } : s)),
    );
  }, []);

  const clearAll = useCallback(() => {
    setSlots((prev) => prev.map((s) => ({ ...s, product: null })));
  }, []);

  const onDragStart = useCallback((event) => {
    const data = event.active.data.current;
    if (data?.product) setActiveProduct(data.product);
    if (data?.source === "slot") setActiveSourceSlot(data.slotId);
    else setActiveSourceSlot(null);
  }, []);

  const onDragEnd = useCallback((event) => {
    const { active, over } = event;
    setActiveProduct(null);
    setActiveSourceSlot(null);

    if (!over) return;

    const activeData = active.data.current;
    const overId = String(over.id);

    if (!overId.startsWith("slot-")) return;
    const targetSlotId = overId.replace("slot-", "");
    const product = activeData?.product ?? null;
    if (!product) return;

    const sourceSlotId =
      activeData?.source === "slot" ? activeData.slotId : null;

    setSlots((prev) => {
      const next = prev.map((s) => ({ ...s }));

      if (sourceSlotId) {
        // Move from slot to slot — swap
        const targetSlot = next.find((s) => s.slotId === targetSlotId);
        const sourceSlot = next.find((s) => s.slotId === sourceSlotId);
        if (targetSlot && sourceSlot) {
          const temp = targetSlot.product;
          targetSlot.product = sourceSlot.product;
          sourceSlot.product = temp;
        }
      } else {
        // Drop from palette into slot
        const target = next.find((s) => s.slotId === targetSlotId);
        if (target) target.product = product;
      }
      return next;
    });
  }, []);

  // Price calculation
  const filledProducts = slots
    .filter((s) => s.product !== null)
    .map((s) => s.product);
  const productTotal = filledProducts.reduce((sum, p) => sum + p.price, 0);
  const total = selectedLayout.price + productTotal;
  const filledCount = filledProducts.length;
  const slotCount = selectedLayout.slots.length;

  const filteredProducts =
    filterCat === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filterCat);

  const handleAddToCart = () => {
    if (filledCount === 0) return;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Determine grid template
  const getGridTemplate = (layout) => {
    if (layout.id === "combo-7")
      return {
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
      };
    if (layout.id === "duo-zone")
      return { gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "1fr" };
    if (layout.id === "grid-12")
      return {
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
      };
    return {
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(3, 1fr)",
    };
  };

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #FAF7F2 0%, #F5ECD7 100%)",
        padding: "80px 0 100px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap');
      `}</style>

      {/* ── Section Header ── */}
      <div style={{ textAlign: "center", marginBottom: 56, padding: "0 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div style={{ height: 1, width: 32, background: "#C9A96E" }} />
          <p
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "0.47rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A96E",
              margin: 0,
            }}
          >
            Boombery Xüsusi Sifariş
          </p>
          <div style={{ height: 1, width: 32, background: "#C9A96E" }} />
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 400,
            color: "#1C1009",
            margin: "0 0 10px",
            lineHeight: 1.1,
          }}
        >
          Öz Qutunuzu{" "}
          <em style={{ fontStyle: "italic", color: "#8B4513" }}>
            Özünüz Yığın
          </em>
        </h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "1.05rem",
            color: "#8B6347",
            margin: 0,
          }}
        >
          Məhsulları sürüşdürüb istədiyiniz xanaya buraxın. Hər xana, hər seçim,
          yalnız sizin üçün.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        {/* ── Layout Selector ── */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 32,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {BOX_LAYOUTS.map((layout) => (
            <motion.button
              key={layout.id}
              onClick={() => changeLayout(layout)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: "0.45rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "10px 18px",
                background:
                  selectedLayout.id === layout.id ? "#1C1009" : "#fff",
                color: selectedLayout.id === layout.id ? "#F5ECD7" : "#8B6347",
                border:
                  selectedLayout.id === layout.id
                    ? "1.5px solid #1C1009"
                    : "1.5px solid rgba(62,39,35,0.15)",
                borderRadius: 2,
                transition: "all 0.22s",
              }}
            >
              {layout.name}
              <span
                style={{
                  marginLeft: 8,
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "0.8rem",
                  opacity: 0.6,
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                ({layout.price} ₼)
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── Main Builder Area ── */}
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: 24,
              alignItems: "start",
            }}
          >
            {/* ── LEFT: Box Canvas ── */}
            <div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: 6,
                  padding: 28,
                  boxShadow: "0 4px 40px rgba(28,16,9,0.07)",
                }}
              >
                {/* Box header info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "1.25rem",
                        fontWeight: 400,
                        color: "#1C1009",
                        margin: "0 0 3px",
                      }}
                    >
                      {selectedLayout.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "0.88rem",
                        color: "#8B6347",
                        margin: 0,
                      }}
                    >
                      {selectedLayout.desc} · {filledCount}/{slotCount} dolu
                    </p>
                  </div>
                  {filledCount > 0 && (
                    <motion.button
                      onClick={clearAll}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: "0.4rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#8B6347",
                        background: "none",
                        border: "1px solid rgba(62,39,35,0.2)",
                        borderRadius: 2,
                        padding: "7px 14px",
                        cursor: "pointer",
                      }}
                    >
                      Təmizlə
                    </motion.button>
                  )}
                </div>

                {/* Fill progress bar */}
                <div
                  style={{
                    height: 3,
                    background: "rgba(201,169,110,0.12)",
                    borderRadius: 2,
                    marginBottom: 24,
                  }}
                >
                  <motion.div
                    animate={{ width: `${(filledCount / slotCount) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(to right, #C9A96E, #8B4513)",
                      borderRadius: 2,
                    }}
                  />
                </div>

                {/* Box grid */}
                <div
                  style={{
                    display: "grid",
                    ...getGridTemplate(selectedLayout),
                    gap: 8,
                    minHeight: 280,
                    padding: 16,
                    background: "rgba(250,247,242,0.8)",
                    border: "1.5px solid rgba(201,169,110,0.15)",
                    borderRadius: 4,
                    position: "relative",
                  }}
                >
                  {/* Heart shape hint for duo-zone */}
                  {selectedLayout.shape === "heart" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "0.72rem",
                        color: "rgba(201,169,110,0.25)",
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        zIndex: 0,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      }}
                    >
                      ♥ Ürək Qutu
                    </div>
                  )}

                  {selectedLayout.slots.map((slot) => {
                    const filled =
                      slots.find((s) => s.slotId === slot.id)?.product ?? null;
                    return (
                      <DroppableSlot
                        key={slot.id}
                        slot={slot}
                        filled={filled}
                        onRemove={removeFromSlot}
                        isLarge={slot.size === "large"}
                      />
                    );
                  })}
                </div>

                {/* Drag hint */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "0.78rem",
                    color: "rgba(62,39,35,0.35)",
                    textAlign: "center",
                    margin: "16px 0 0",
                    letterSpacing: "0.05em",
                  }}
                >
                  ← Sağ sütundan məhsulu tutub xanaya sürüşdürün
                </p>
              </div>

              {/* ── Price Summary ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 16,
                  padding: "18px 24px",
                  background: "#fff",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: 4,
                  boxShadow: "0 2px 16px rgba(28,16,9,0.05)",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: "0.42rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(62,39,35,0.4)",
                      margin: "0 0 3px",
                    }}
                  >
                    Qutu qiyməti
                  </p>
                  <motion.p
                    key={total}
                    initial={{ y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.7rem",
                      fontWeight: 500,
                      color: "#8B4513",
                      margin: 0,
                    }}
                  >
                    {total} ₼
                  </motion.p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "0.78rem",
                      color: "rgba(62,39,35,0.4)",
                      margin: "2px 0 0",
                    }}
                  >
                    Qutu {selectedLayout.price} ₼ + Məhsullar {productTotal} ₼
                  </p>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  whileHover={filledCount > 0 ? { scale: 1.03, y: -1 } : {}}
                  whileTap={filledCount > 0 ? { scale: 0.97 } : {}}
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    padding: "14px 28px",
                    background:
                      filledCount > 0
                        ? "linear-gradient(135deg, #C9A96E 0%, #8B4513 100%)"
                        : "rgba(62,39,35,0.08)",
                    color: filledCount > 0 ? "#fff" : "rgba(62,39,35,0.25)",
                    border: "none",
                    borderRadius: 2,
                    cursor: filledCount > 0 ? "pointer" : "default",
                    transition: "all 0.25s",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Səbətə Əlavə Et
                </motion.button>
              </div>

              {/* Success Toast */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      marginTop: 12,
                      padding: "14px 20px",
                      background: "#1C1009",
                      color: "#F5ECD7",
                      borderRadius: 4,
                      textAlign: "center",
                      fontFamily: "'Cinzel',serif",
                      fontSize: "0.48rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    ✓ &nbsp; Qutunuz səbətə əlavə edildi!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── RIGHT: Ingredient Palette ── */}
            <div
              style={{
                background: "#fff",
                border: "1px solid rgba(201,169,110,0.2)",
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: "0 4px 40px rgba(28,16,9,0.07)",
                position: "sticky",
                top: 20,
              }}
            >
              <div
                style={{
                  padding: "18px 18px 14px",
                  borderBottom: "1px solid rgba(62,39,35,0.07)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: "0.48rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#1C1009",
                    margin: "0 0 12px",
                  }}
                >
                  Məhsullar
                </p>

                {/* Category filter */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCat(cat.id)}
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: "0.38rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "5px 10px",
                        background:
                          filterCat === cat.id ? "#1C1009" : "transparent",
                        color:
                          filterCat === cat.id
                            ? "#F5ECD7"
                            : "rgba(62,39,35,0.5)",
                        border: "1px solid",
                        borderColor:
                          filterCat === cat.id
                            ? "#1C1009"
                            : "rgba(62,39,35,0.15)",
                        borderRadius: 2,
                        cursor: "pointer",
                        transition: "all 0.18s",
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product grid */}
              <div
                style={{
                  padding: 14,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 8,
                  maxHeight: 480,
                  overflowY: "auto",
                }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DraggableProduct product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Palette footer tip */}
              <div
                style={{
                  padding: "12px 14px",
                  borderTop: "1px solid rgba(62,39,35,0.07)",
                  background: "rgba(250,247,242,0.6)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "0.76rem",
                    color: "rgba(62,39,35,0.4)",
                    margin: 0,
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}
                >
                  Məhsulu tutub sol tərəfdəki qutuya sürüşdürün
                </p>
              </div>
            </div>
          </div>

          {/* ── Drag Overlay ── */}
          <DragOverlay
            dropAnimation={{
              duration: 200,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            {activeProduct ? <DragGhost product={activeProduct} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
}
