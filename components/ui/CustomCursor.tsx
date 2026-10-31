"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribeFinePointer = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(
    "(pointer: fine) and (prefers-reduced-motion: no-preference)"
  );
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getPointerSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(
    "(pointer: fine) and (prefers-reduced-motion: no-preference)"
  ).matches;
};

const getServerPointerSnapshot = () => false;

/**
 * Neo-Brutalist Geometric Custom Cursor:
 * - Square crosshair viewfinder + central target dot
 * - 0px radius, sharp ink lines matching "Kotak dan Lipatan"
 * - Interactive hover expansion on links, buttons, and inputs
 * - Tactile snap-down effect on mousedown
 * - Automatically disabled on touch / mobile devices via useSyncExternalStore
 * - Zero blocking (pointer-events: none)
 */
export function CustomCursor() {
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getPointerSnapshot,
    getServerPointerSnapshot
  );

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Smooth lerp coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!isFinePointer) return;

    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, input, select, textarea, [role='button'], .pressable-hard, [data-interactive]"
      ) as HTMLElement | null;

      if (interactive) {
        setHovered(true);
        const customLabel =
          interactive.getAttribute("data-cursor-label") ||
          (interactive.tagName.toLowerCase() === "a" ? "LIHAT" : null);
        setCursorLabel(customLabel);
      } else {
        setHovered(false);
        setCursorLabel(null);
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // Smooth trailing animation loop
    const render = () => {
      const factor = 0.22;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * factor;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * factor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isFinePointer]);

  if (!isFinePointer || !visible) return null;

  return (
    <>
      {/* Immediate center target dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999999] h-1.5 w-1.5 bg-brick transition-opacity duration-150"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Trailing Neo-Brutalist Square Viewfinder */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999998] flex items-center justify-center transition-[width,height,background-color,border-color,transform] duration-150 ease-out"
        style={{
          width: hovered ? (cursorLabel ? 56 : 42) : clicked ? 16 : 24,
          height: hovered ? (cursorLabel ? 32 : 42) : clicked ? 16 : 24,
          border: hovered
            ? "2px solid var(--color-brick)"
            : "2px solid var(--color-ink)",
          backgroundColor: hovered
            ? "rgba(240, 180, 41, 0.2)"
            : "transparent",
        }}
      >
        {/* Corner tick marks when expanded */}
        {hovered && (
          <div className="absolute inset-[-4px] flex items-center justify-center pointer-events-none">
            <span className="absolute top-0 left-0 h-1.5 w-1.5 border-t-2 border-l-2 border-ink" />
            <span className="absolute top-0 right-0 h-1.5 w-1.5 border-t-2 border-r-2 border-ink" />
            <span className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b-2 border-l-2 border-ink" />
            <span className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b-2 border-r-2 border-ink" />
          </div>
        )}

        {/* Action badge label when hovering clickable items */}
        {cursorLabel && (
          <span className="text-[9px] font-black tracking-widest text-ink uppercase font-display bg-gold px-1 py-0.5 border border-ink">
            {cursorLabel}
          </span>
        )}
      </div>
    </>
  );
}
