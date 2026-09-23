"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener("change", handlePointerChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest("input") ||
        target?.closest("textarea") ||
        target?.closest("[role='button']") ||
        target?.getAttribute("data-cursor-hover") === "true"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", handlePointerChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isFinePointer) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2 border-zinc-900 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 56 : 28,
          height: isHovered ? 56 : 28,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0)",
          borderColor: isHovered ? "#ffffff" : "#ffffff",
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
