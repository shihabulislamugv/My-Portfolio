"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface NorellIntroLoaderProps {
  onComplete: () => void;
  brandName?: string;
  roleTitle?: string;
}

export function NorellIntroLoader({
  onComplete,
  brandName = "SHIHABUL ISLAM®",
  roleTitle = "Product & UX Designer — 2026"
}: NorellIntroLoaderProps) {
  const [count, setCount] = useState("000");
  const [phase, setPhase] = useState<"counting" | "revealing" | "done">("counting");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Duration for counter in ms
    const DURATION = 1600;
    const start = performance.now();

    // Cubic bezier easing matching Norell: t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2
    const ease = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / DURATION);
      const easedProgress = ease(progress);
      const currentVal = Math.round(easedProgress * 100);

      setCount(String(currentVal).padStart(3, "0"));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        // Complete counting, trigger the expansion reveal
        setPhase("revealing");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 750);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  if (phase === "done") {
    return null;
  }

  const isRevealing = phase === "revealing";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: isRevealing ? 0 : 1 }}
      transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-[#f5f5f5] flex flex-col justify-between overflow-hidden select-none pointer-events-auto"
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      {/* 1. Top Header Row */}
      <div className="relative z-30 px-6 sm:px-12 pt-8 flex items-center justify-between text-xs sm:text-sm font-medium tracking-wide">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isRevealing ? "-120%" : "0%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2"
          >
            <span className="font-bold uppercase tracking-wider">{brandName}</span>
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isRevealing ? "-120%" : "0%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
            className="text-zinc-400 font-mono text-[11px] sm:text-xs"
          >
            <span>{roleTitle}</span>
          </motion.div>
        </div>
      </div>

      {/* 2. Central Stage with Card Reveal & Sliding Framing Panels */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
        
        {/* The Card Box */}
        <div className="relative w-[clamp(210px,24vw,340px)] aspect-[4/5] bg-black overflow-hidden border-2 border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          {/* Portrait Image inside card */}
          <motion.div
            initial={{ scale: 1.25 }}
            animate={{ scale: isRevealing ? 1.04 : 1.15 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/profile.jpg"
              alt="Shihabul Islam"
              fill
              priority
              className="object-cover object-[50%_25%]"
            />
            {/* Subtle cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>

          {/* Norell Curtain Sliding Panels */}
          {/* Top Panel */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: isRevealing ? "-105%" : "0%" }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
            className="absolute -top-full left-0 right-0 h-full bg-[#0a0a0a] pointer-events-none z-10"
          />
          {/* Bottom Panel */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: isRevealing ? "105%" : "0%" }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
            className="absolute -bottom-full left-0 right-0 h-full bg-[#0a0a0a] pointer-events-none z-10"
          />
          {/* Left Panel */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: isRevealing ? "-105%" : "0%" }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 -left-full bottom-0 w-full bg-[#0a0a0a] pointer-events-none z-10"
          />
          {/* Right Panel */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: isRevealing ? "105%" : "0%" }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 -right-full bottom-0 w-full bg-[#0a0a0a] pointer-events-none z-10"
          />

          {/* Micro Status Badge on Card */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[10px] font-mono font-bold text-white/80">
            <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm border border-white/10 rounded">
              01 // SHOWCASE
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

      </div>

      {/* 3. Bottom Row: Status Caption & Giant Monospace Counter */}
      <div className="relative z-30 px-6 sm:px-12 pb-8 flex items-end justify-between">
        
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isRevealing ? "-120%" : "0%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1"
          >
            <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
              System Initialization
            </span>
            <span className="text-xs sm:text-sm font-medium text-zinc-300">
              Loading portfolio case studies &amp; design tokens...
            </span>
          </motion.div>
        </div>

        {/* Giant Monospace Numeric Counter */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isRevealing ? "-120%" : "0%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
            className="text-[clamp(52px,10vw,140px)] font-normal leading-[0.85] tracking-tighter text-[#f5f5f5]"
            style={{
              fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {count}
          </motion.div>
        </div>

      </div>

      {/* 4. Bottom Horizontal Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-zinc-900 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isRevealing ? 0 : 1,
            originX: isRevealing ? 1 : 0
          }}
          transition={{
            duration: isRevealing ? 0.6 : 1.6,
            ease: isRevealing ? [0.77, 0, 0.175, 1] : [0.65, 0, 0.35, 1]
          }}
          className="h-full bg-blue-500 w-full origin-left"
        />
      </div>

    </motion.div>
  );
}
