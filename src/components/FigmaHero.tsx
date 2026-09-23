"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowDownRight, 
  Sparkles, 
  MousePointer, 
  MessageSquare, 
  Layers, 
  Check, 
  Copy, 
  Download,
  PenTool,
  Move,
  Maximize2,
  Type,
  Frame
} from "lucide-react";

interface FigmaHeroProps {
  profile: {
    headlineLine1?: string;
    headlineLine2?: string;
    shortBio?: string;
    email?: string;
    resumeUrl?: string;
  };
}

export function FigmaHero({ profile }: FigmaHeroProps) {
  const [activeTool, setActiveTool] = useState<"cursor" | "frame" | "pen" | "text" | "comment" | "ai">("cursor");
  const [showComment, setShowComment] = useState(true);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const copyEmail = () => {
    const emailToCopy = profile.email || "hello@example.com";
    navigator.clipboard.writeText(emailToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[96vh] flex flex-col justify-between px-4 sm:px-6 pt-24 sm:pt-28 pb-10 overflow-hidden bg-[#f8f8f5] select-none"
    >
      {/* 1. Canvas Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#18181b_1.5px,transparent_1.5px)] [background-size:28px_28px]" 
        aria-hidden="true"
      />

      {/* 2. Figma Canvas Coordinate & Status Header */}
      <div className="max-w-[90rem] mx-auto w-full flex items-center justify-between z-20 mb-6 text-xs font-mono font-bold text-zinc-500">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="px-2.5 py-1 bg-white border border-zinc-300 shadow-[2px_2px_0px_0px_rgba(24,24,27,0.1)] text-zinc-900 rounded">
            ❖ Canvas: 01_HERO_VIEW // 1440 × 900
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 bg-zinc-200/70 rounded text-[11px]">
            Scale: 100%
          </span>
          <span className="hidden lg:inline-block text-zinc-400">
            Auto-Layout: Horizontal (Wrap, Space-Between)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="https://www.coursera.org/account/accomplishments/verify/J4W0KI4VK2S6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-300 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors rounded text-xs font-bold"
          >
            <Sparkles size={13} />
            <span>Microsoft Certified</span>
            <span>↗</span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Hire</span>
          </span>
        </div>
      </div>

      {/* 3. Multiplayer Live Cursors (Figma Style) */}
      
      {/* Shihab's Cursor (Lead Designer) */}
      <motion.div
        initial={{ x: 120, y: 80, opacity: 0 }}
        animate={{ 
          x: [100, 140, 110, 130, 100], 
          y: [70, 95, 60, 85, 70],
          opacity: 1 
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 left-[8%] hidden xl:flex items-start gap-1 z-30 pointer-events-none"
      >
        <MousePointer size={18} className="fill-blue-600 text-blue-600 -rotate-45 drop-shadow" />
        <span className="px-2 py-0.5 bg-blue-600 text-white text-[11px] font-mono font-bold rounded-sm shadow-md whitespace-nowrap">
          Shihab (Lead Designer)
        </span>
      </motion.div>

      {/* Recruiter's Cursor with Live Comment Bubble */}
      <motion.div
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ 
          x: [-20, 25, -10, 15, -20], 
          y: [0, 20, -15, 10, 0],
          opacity: 1 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-28 right-[12%] hidden lg:flex flex-col items-start gap-1 z-30 pointer-events-auto"
      >
        <div className="flex items-start gap-1">
          <MousePointer size={18} className="fill-purple-600 text-purple-600 -rotate-45 drop-shadow" />
          <span className="px-2 py-0.5 bg-purple-600 text-white text-[11px] font-mono font-bold rounded-sm shadow-md whitespace-nowrap">
            Recruiter [San Francisco]
          </span>
        </div>
        
        {/* Comment Bubble with Dismiss */}
        <AnimatePresence>
          {showComment && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="mt-1 ml-4 p-3 bg-white border-2 border-purple-600 shadow-[4px_4px_0px_0px_rgba(147,51,234,1)] text-xs font-medium text-zinc-900 rounded max-w-xs relative cursor-pointer group"
              onClick={() => setShowComment(false)}
              title="Click to dismiss"
            >
              <div className="flex items-center justify-between gap-3 font-mono text-[10px] text-purple-700 font-bold mb-1">
                <span>💬 Design Lead Review</span>
                <span className="text-zinc-400 group-hover:text-zinc-900">✕</span>
              </div>
              <p className="font-normal text-zinc-800">
                &ldquo;Love the clean brutalist design system &amp; documented mobile UX flows! 🚀&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Product Lead Cursor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          x: [0, -30, 20, -10, 0], 
          y: [0, 15, -20, 10, 0],
          opacity: 1 
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-28 left-[18%] hidden 2xl:flex items-start gap-1 z-30 pointer-events-none"
      >
        <MousePointer size={18} className="fill-emerald-600 text-emerald-600 -rotate-45 drop-shadow" />
        <span className="px-2 py-0.5 bg-emerald-600 text-white text-[11px] font-mono font-bold rounded-sm shadow-md whitespace-nowrap">
          Client [Berlin] • Reviewing Case Studies
        </span>
      </motion.div>

      {/* 4. Interactive Draggable Canvas Sticky Notes */}
      <motion.div
        drag
        dragConstraints={containerRef}
        whileHover={{ scale: 1.05, cursor: "grab" }}
        whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
        className="absolute bottom-32 left-4 md:left-12 hidden md:block z-20 cursor-grab"
      >
        <div className="w-48 p-4 bg-[#fef9c3] border-2 border-zinc-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] rotate-[-4deg]">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-amber-800 mb-1 border-b border-amber-300/60 pb-1">
            <span>📌 Note (01)</span>
            <span className="text-[9px] bg-amber-200 px-1 rounded">Drag Me</span>
          </div>
          <p className="text-xs font-bold text-zinc-900 leading-snug">
            Impact: +38% user retention achieved on fintech mobile app redesign.
          </p>
        </div>
      </motion.div>

      <motion.div
        drag
        dragConstraints={containerRef}
        whileHover={{ scale: 1.05, cursor: "grab" }}
        whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
        className="absolute top-28 right-6 hidden xl:block z-20 cursor-grab"
      >
        <div className="w-52 p-4 bg-[#e0f2fe] border-2 border-zinc-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] rotate-[3deg]">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-sky-800 mb-1 border-b border-sky-300/60 pb-1">
            <span>🎨 Tokens (02)</span>
            <span className="text-[9px] bg-sky-200 px-1 rounded">Drag Me</span>
          </div>
          <p className="text-xs font-bold text-zinc-900 leading-snug">
            Design Systems: 100% tokenized, dev-ready Figma components.
          </p>
        </div>
      </motion.div>

      {/* 5. Main Figma Component Selection Frame */}
      <div className="max-w-[90rem] mx-auto w-full relative z-10 my-auto">
        <div className="relative p-4 sm:p-8 md:p-12 border-2 border-blue-600 bg-white/80 backdrop-blur-sm shadow-[8px_8px_0px_0px_rgba(37,99,235,0.25)]">
          
          {/* Blue Figma Corner Selection Handles */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-600 z-20" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-600 z-20" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-600 z-20" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-600 z-20" />
          
          {/* Edge Midpoint Handles */}
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-600 z-20 hidden sm:block" />
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-600 z-20 hidden sm:block" />
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-blue-600 z-20 hidden sm:block" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-blue-600 z-20 hidden sm:block" />

          {/* Figma Frame Top Label */}
          <div className="absolute -top-3.5 left-4 px-2 py-0.5 bg-blue-600 text-white text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 rounded-sm shadow-sm">
            <Frame size={11} />
            <span>Frame: Hero_Content // Auto-Layout</span>
          </div>

          {/* Grid Layout: Typography & Info (Left) + Tactile Profile Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
            
            {/* Left Column: Big Editorial Typography & Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Designer Category Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-900 text-zinc-900 text-xs font-black uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Senior UX/UI &bull; Product Designer</span>
              </div>

              {/* Massive Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-zinc-900 uppercase tracking-tighter leading-[0.92]">
                <span>{profile.headlineLine1 || "Digital"}</span> <br />
                <span className="text-zinc-400 italic font-serif lowercase tracking-normal">
                  {profile.headlineLine2 || "experiences"}
                </span>{" "}
                <span className="text-blue-600 block text-4xl sm:text-5xl md:text-6xl mt-1">
                  That Convert.
                </span>
              </h1>

              {/* Clean Bio Copy */}
              <p className="text-base sm:text-lg md:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl">
                {profile.shortBio || "Crafting intuitive, high-conversion interfaces, scalable design systems, and robust mobile applications for ambitious digital products."}
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-3 px-7 py-4 bg-zinc-900 text-white font-black uppercase tracking-widest text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] border-2 border-zinc-900 hover:bg-blue-600 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <span>Explore Selected Work</span>
                  <ArrowDownRight size={18} />
                </Link>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2.5 px-6 py-4 bg-white text-zinc-900 font-black uppercase tracking-widest text-xs sm:text-sm border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:bg-zinc-100 transition-all"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  <span>{copied ? "Email Copied!" : "Copy Email"}</span>
                </button>

                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-4 text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 hover:text-blue-600 underline underline-offset-4"
                  >
                    <Download size={14} />
                    <span>Download CV</span>
                  </a>
                )}
              </div>

              {/* Quick Spec Tags */}
              <div className="pt-4 border-t border-zinc-200 flex flex-wrap gap-2 text-[11px] font-mono font-bold uppercase text-zinc-500">
                <span className="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded">Figma Pro</span>
                <span className="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded">Design Systems</span>
                <span className="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded">Interactive Prototypes</span>
                <span className="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded">iOS / Android</span>
              </div>
            </div>

            {/* Right Column: Figma Framed Profile Card */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                whileHover={{ rotate: 1, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-full max-w-sm bg-white border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] p-4 relative group"
              >
                {/* Component Specs Tag */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-3 border-b-2 border-zinc-900 pb-2">
                  <span className="font-bold text-zinc-900 uppercase">❖ Component: Profile_Card</span>
                  <span>W: 360 &bull; H: 480</span>
                </div>

                {/* Profile Photo */}
                <div className="relative aspect-[4/5] bg-zinc-200 border-2 border-zinc-900 overflow-hidden mb-4">
                  <Image 
                    src="/images/profile.jpg" 
                    alt="Md. Shihabul Islam" 
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-zinc-900/90 backdrop-blur-md p-3 text-white border border-white/20">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider block">
                      Md. Shihabul Islam
                    </span>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                      Product &amp; UX/UI Specialist
                    </span>
                  </div>
                </div>

                {/* Property Inspector Badges */}
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span className="text-zinc-500">Experience</span>
                    <span className="font-bold text-zinc-900">2+ Years Agency</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span className="text-zinc-500">Location</span>
                    <span className="font-bold text-zinc-900">Dhaka (UTC+6)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">Certification</span>
                    <span className="font-bold text-blue-600">Microsoft Verified</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* 6. Exact Figma UI3 Interactive Floating Bottom Toolbar Dock */}
      <div className="max-w-[90rem] mx-auto w-full flex flex-col items-center z-30 mt-8 mb-2">
        
        {/* Optional Figma AI Interactive Bubble */}
        <AnimatePresence>
          {activeTool === "ai" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mb-3 px-4 py-2.5 bg-[#2c2c2c] text-white border border-white/15 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-mono"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#A259FF] to-[#1ABCFE] flex items-center justify-center text-[10px] font-bold">
                ✨
              </div>
              <span className="text-zinc-200">
                Figma AI: <strong className="text-white">Shihab&apos;s Design System</strong> contains 100+ components with zero tech debt.
              </span>
              <button 
                onClick={() => setActiveTool("cursor")}
                className="text-zinc-400 hover:text-white ml-2 text-sm"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Exact Figma UI3 Dock */}
        <div className="flex items-center gap-0.5 sm:gap-1 px-2 py-1.5 bg-[#2c2c2c]/95 backdrop-blur-xl rounded-[18px] shadow-[0_16px_48px_rgba(0,0,0,0.5),0_2px_10px_rgba(0,0,0,0.3)] border border-white/10 select-none">
          
          {/* 1. Figma Logo Icon */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => setActiveTool("cursor")}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Figma Menu"
            >
              <svg width="18" height="18" viewBox="0 0 38 57" fill="none">
                <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
              </svg>
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Main menu
            </div>
          </div>

          {/* 2. Move / Selection Tool */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => setActiveTool("cursor")}
              className={`h-8 sm:h-9 px-2 flex items-center gap-1 rounded-xl transition-all ${
                activeTool === "cursor" 
                  ? "bg-[#0d99ff] text-white shadow-sm" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Move tool (V)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 2.5L20 10.5L12 12.5L8.5 20.5L4.5 2.5Z"/>
              </svg>
              <span className="text-[9px] opacity-60">▾</span>
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Move (V)
            </div>
          </div>

          {/* 3. Frame Tool */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => setActiveTool("frame")}
              className={`h-8 sm:h-9 px-2 flex items-center gap-1 rounded-xl transition-all ${
                activeTool === "frame" 
                  ? "bg-[#0d99ff] text-white shadow-sm" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Frame tool (F)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="9" x2="20" y2="9"/>
                <line x1="4" y1="15" x2="20" y2="15"/>
                <line x1="9" y1="4" x2="9" y2="20"/>
                <line x1="15" y1="4" x2="15" y2="20"/>
              </svg>
              <span className="text-[9px] opacity-60">▾</span>
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Frame (F)
            </div>
          </div>

          {/* 4. Shape / Rectangle Tool */}
          <div className="relative group hidden sm:block">
            <button
              type="button"
              onClick={() => setActiveTool("cursor")}
              className="h-8 sm:h-9 px-2 flex items-center gap-1 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Rectangle tool (R)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
              </svg>
              <span className="text-[9px] opacity-60">▾</span>
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Rectangle (R)
            </div>
          </div>

          {/* 5. Pen / Vector Tool */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => setActiveTool("pen")}
              className={`h-8 sm:h-9 px-2 flex items-center gap-1 rounded-xl transition-all ${
                activeTool === "pen" 
                  ? "bg-[#0d99ff] text-white shadow-sm" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Pen tool (P)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
              <span className="text-[9px] opacity-60">▾</span>
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Pen (P)
            </div>
          </div>

          {/* 6. Text Tool */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => setActiveTool("text")}
              className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl transition-all ${
                activeTool === "text" 
                  ? "bg-[#0d99ff] text-white shadow-sm" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Text tool (T)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 7 4 4 20 4 20 7"/>
                <line x1="9" y1="20" x2="15" y2="20"/>
                <line x1="12" y1="4" x2="12" y2="20"/>
              </svg>
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Text (T)
            </div>
          </div>

          {/* 7. Resources / Components Tool */}
          <div className="relative group hidden sm:block">
            <button
              type="button"
              onClick={() => setActiveTool("cursor")}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Resources (Shift+I)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Resources (Shift+I)
            </div>
          </div>

          {/* 8. Hand Tool */}
          <div className="relative group hidden md:block">
            <button
              type="button"
              onClick={() => setActiveTool("cursor")}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Hand tool (H)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11V6a2 2 0 0 0-4 0v5"/>
                <path d="M14 10V4a2 2 0 0 0-4 0v7"/>
                <path d="M10 10.5V6a2 2 0 0 0-4 0v8"/>
                <path d="M6 14v-2a2 2 0 0 0-4 0v5a7 7 0 0 0 7 7h3a7 7 0 0 0 7-7v-3a2 2 0 0 0-4 0v2"/>
              </svg>
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Hand tool (H)
            </div>
          </div>

          {/* 9. Comment Tool */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => {
                setActiveTool("comment");
                setShowComment(true);
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl transition-all relative ${
                activeTool === "comment" 
                  ? "bg-[#0d99ff] text-white shadow-sm" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Comment tool (C)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {/* Little red/white unread badge */}
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full" />
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Add comment (C)
            </div>
          </div>

          {/* Separator */}
          <div className="h-5 w-[1px] bg-white/15 mx-1" />

          {/* 10. Figma AI Sparkles Button */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => setActiveTool(activeTool === "ai" ? "cursor" : "ai")}
              className={`h-8 sm:h-9 px-2.5 flex items-center gap-1.5 rounded-xl transition-all ${
                activeTool === "ai"
                  ? "bg-gradient-to-r from-[#A259FF] to-[#1ABCFE] text-white shadow-md"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Figma AI"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" fill="url(#figmaAiGrad)"/>
                <defs>
                  <linearGradient id="figmaAiGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A259FF"/>
                    <stop offset="1" stopColor="#1ABCFE"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[11px] font-mono font-bold tracking-tight">AI</span>
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Actions &amp; AI
            </div>
          </div>

          {/* Separator */}
          <div className="h-5 w-[1px] bg-white/15 mx-1 hidden sm:block" />

          {/* 11. Zoom Level / Inspect Dropdown */}
          <div className="relative group hidden sm:block">
            <Link
              href="#projects"
              className="h-8 sm:h-9 px-2.5 flex items-center gap-1 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono"
            >
              <span>100%</span>
              <span className="text-[9px] opacity-60">▾</span>
            </Link>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Zoom &bull; Jump to Projects
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
