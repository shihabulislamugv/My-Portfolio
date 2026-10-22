"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface NorellHeroProps {
  profile?: {
    name?: string;
    headlineLine1?: string;
    headlineLine2?: string;
    shortBio?: string;
    email?: string;
  };
}

export function NorellHero({ profile }: NorellHeroProps) {
  const [count, setCount] = useState("000");
  const [introState, setIntroState] = useState<"counting" | "revealing" | "done">("counting");
  const heroRef = useRef<HTMLElement>(null);

  // Parallax on scroll for hero media and letters
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["9%", "24%"]);

  // Brand word (e.g. "shihab" with 6 letters like "norell")
  const brandWord = profile?.name ? profile.name.split(" ")[0].toLowerCase() : "shihab";
  const brandLetters = Array.from(brandWord);

  const taglineWords = [
    "Crafting",
    "intuitive",
    "stories",
    "that",
    "give",
    "digital",
    "products",
    "a",
    "pulse."
  ];

  // 1. Intro Animation Sequence (Matching Norell exact 1.6s duration and cubic bezier)
  useEffect(() => {
    // If arriving with a hash or prefers-reduced-motion, skip intro
    if (
      (typeof window !== "undefined" && window.location.hash && window.location.hash.length > 1) ||
      (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      setIntroState("done");
      return;
    }

    const DURATION = 1600;
    const startTime = performance.now();

    // Exact Norell cubic-bezier easing: t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2
    const ease = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    let animationFrame: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / DURATION);
      const eased = ease(progress);
      const val = Math.round(100 * eased);

      setCount(String(val).padStart(3, "0"));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        // Counter reached 100, trigger curtain panel expansion
        setIntroState("revealing");
        setTimeout(() => {
          setIntroState("done");
        }, 750);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const isRevealed = introState === "revealing" || introState === "done";
  const showIntro = introState !== "done";

  return (
    <section
      ref={heroRef}
      id="hero"
      className="nrlh"
      style={{
        width: "100%",
        position: "relative",
        containerType: "inline-size",
        background: "rgb(245, 245, 245)",
        color: "rgb(10, 10, 10)",
        paddingTop: "80px",
        fontFamily: 'Inter, "Inter Placeholder", system-ui, -apple-system, sans-serif',
        WebkitFontSmoothing: "antialiased"
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .nrlh * { box-sizing: border-box; }
        .nrlh-media {
          position: relative;
          overflow: hidden;
          height: calc(100svh - 80px);
          min-height: 520px;
          background: #000;
          color: #fff;
        }
        .nrlh-par {
          position: absolute;
          inset: -6% -2%;
        }
        .nrlh-zoom {
          position: absolute;
          inset: 0;
        }
        .nrlh-par img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: 50% 28%;
          display: block;
          max-width: none;
          left: 0;
          right: 0;
          margin-left: auto;
          margin-right: auto;
          mask-image: linear-gradient(90deg, transparent 0%, #000 22%, #000 78%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 22%, #000 78%, transparent 100%);
        }
        .nrlh-shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,0) 28%), linear-gradient(0deg, rgba(0,0,0,.35), rgba(0,0,0,0) 35%);
        }
        .nrlh-tag {
          position: absolute;
          margin: 0;
          top: clamp(24px, 4.2cqi, 64px);
          left: max(clamp(16px, 5cqi, 80px), calc(50cqi - 600px));
          width: min(10.6em, calc(100% - 32px));
          font-size: clamp(17px, 1.6cqi, 25px);
          line-height: 1.28;
          letter-spacing: -.015em;
          font-weight: 500;
          z-index: 10;
        }
        .nrlh-mask {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          padding-bottom: .08em;
          margin-bottom: -.08em;
        }
        .nrlh-word {
          position: absolute;
          margin: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-size: clamp(120px, 28cqi, 520px);
          line-height: .8;
          letter-spacing: -.065em;
          font-weight: 500;
          transform: translateY(9%);
          pointer-events: none;
          white-space: nowrap;
          z-index: 10;
          user-select: none;
        }
        .nrlh-letter {
          display: inline-block;
          overflow: hidden;
        }
        .nrlh-mark {
          display: inline-block;
          font-size: .17em;
          line-height: 1;
          letter-spacing: 0;
          margin: -.02em 0 0 .1em;
          font-weight: 400;
        }
        .nrlh-bar {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1fr auto;
          align-items: center;
          padding: 20px clamp(16px, 5cqi, 80px);
          font-size: 13px;
          font-weight: 500;
        }
        .nrlh-status {
          display: inline-flex;
          align-items: center;
        }
        .nrlh-pulse {
          position: relative;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          margin-right: 10px;
        }
        .nrlh-pulse::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: inherit;
          animation: nrlhPulse 1.8s cubic-bezier(.16,1,.3,1) infinite;
        }
        @keyframes nrlhPulse {
          from { transform: scale(1); opacity: .7; }
          to { transform: scale(3.2); opacity: 0; }
        }
        .nrlh-social {
          display: inline-flex;
          gap: 6px;
        }
        .nrlh-social a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nrlh-social a:hover {
          color: #2563eb;
        }
        .nrlh-scroll {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nrlh-scroll:hover {
          color: #2563eb;
        }
        .nrlh-arrow {
          display: inline-block;
          animation: nrlhNudge 1.8s cubic-bezier(.77,0,.18,1) infinite;
        }
        @keyframes nrlhNudge {
          0%, 100% { transform: translateY(-2px); }
          50% { transform: translateY(3px); }
        }
        @container (max-width: 1199px) {
          .nrlh-bar {
            grid-template-columns: 1fr 1fr;
            row-gap: 12px;
          }
          .nrlh-bar > :nth-child(even) {
            justify-self: end;
          }
        }
        @container (max-width: 809px) {
          .nrlh-word {
            font-size: 33cqi;
          }
          .nrlh-media {
            min-height: 460px;
          }
        }
        
        /* Intro Loader Styles */
        .nrlh-intro {
          position: fixed;
          inset: 0;
          z-index: 9000;
          background: rgb(245, 245, 245);
          color: rgb(10, 10, 10);
          font-family: Inter, system-ui, sans-serif;
        }
        .nrlh-stage {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 80px;
          overflow: hidden;
          background: #000;
          --fw: clamp(180px, 26vw, 340px);
          --fhh: min(calc(var(--fw) * .64), 35%);
        }
        .nrlh-pan {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgb(245, 245, 245);
          will-change: transform;
          backface-visibility: hidden;
          transition: transform 0.65s cubic-bezier(.77, 0, .175, 1);
        }
        .nrlh-pan.t { transform: translateY(calc(-50% - min(calc(var(--fw) * .64), 35%))); }
        .nrlh-pan.b { transform: translateY(calc(50% + min(calc(var(--fw) * .64), 35%))); }
        .nrlh-pan.l { transform: translateX(calc(-50% - var(--fw) / 2)); }
        .nrlh-pan.r { transform: translateX(calc(50% + var(--fw) / 2)); }

        .nrlh-stage.revealing .nrlh-pan.t { transform: translateY(-100%); }
        .nrlh-stage.revealing .nrlh-pan.b { transform: translateY(100%); }
        .nrlh-stage.revealing .nrlh-pan.l { transform: translateX(-100%); }
        .nrlh-stage.revealing .nrlh-pan.r { transform: translateX(100%); }

        .nrlh-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          will-change: transform, opacity;
          transition: opacity 0.4s ease;
        }
        .nrlh-stage.revealing .nrlh-corner {
          opacity: 0;
        }
        .nrlh-corner.tl {
          left: calc(50% - var(--fw) / 2);
          top: calc(50% - var(--fhh));
          background: radial-gradient(circle at 100% 100%, transparent 9.5px, rgb(245, 245, 245) 10px);
        }
        .nrlh-corner.tr {
          left: calc(50% + var(--fw) / 2 - 10px);
          top: calc(50% - var(--fhh));
          background: radial-gradient(circle at 0 100%, transparent 9.5px, rgb(245, 245, 245) 10px);
        }
        .nrlh-corner.bl {
          left: calc(50% - var(--fw) / 2);
          top: calc(50% + var(--fhh) - 10px);
          background: radial-gradient(circle at 100% 0, transparent 9.5px, rgb(245, 245, 245) 10px);
        }
        .nrlh-corner.br {
          left: calc(50% + var(--fw) / 2 - 10px);
          top: calc(50% + var(--fhh) - 10px);
          background: radial-gradient(circle at 0 0, transparent 9.5px, rgb(245, 245, 245) 10px);
        }

        .nrlh-stage-par {
          position: absolute;
          inset: -6% -2%;
        }
        .nrlh-stage img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: 50% 28%;
          mask-image: linear-gradient(90deg, transparent 0%, #000 22%, #000 78%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 22%, #000 78%, transparent 100%);
        }
        .nrlh-row {
          position: absolute;
          left: clamp(16px, 5vw, 80px);
          right: clamp(16px, 5vw, 80px);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 13px;
          font-weight: 500;
          z-index: 20;
        }
        .nrlh-count {
          font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
          font-size: clamp(64px, 11vw, 190px);
          line-height: .9;
          letter-spacing: -.05em;
          font-weight: 400;
          font-variant-numeric: tabular-nums;
        }
        .nrlh-line {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: rgb(10, 10, 10);
          transform-origin: 0 50%;
        }
      `}} />

      {/* 1. Norell Full-Screen Media Stage */}
      <div className="nrlh-media">
        <motion.div className="nrlh-par" style={{ y: mediaY }}>
          <div className="nrlh-zoom">
            <img
              src="/images/profile.jpg"
              alt="Shihabul Islam"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Ambient Top & Bottom Shade */}
        <div className="nrlh-shade" />

        {/* Top Tagline */}
        <p className="nrlh-tag">
          {taglineWords.map((word, idx) => (
            <span key={idx}>
              <span className="nrlh-mask">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: isRevealed ? "0%" : "110%" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.25 + idx * 0.04,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
              </span>{" "}
            </span>
          ))}
        </p>

        {/* Giant Bottom Kinetic Word Heading */}
        <motion.h1 className="nrlh-word" aria-label={brandWord} style={{ y: wordY }}>
          <span aria-hidden="true" style={{ display: "inline-flex" }}>
            {brandLetters.map((char, idx) => (
              <span key={idx} className="nrlh-letter">
                <motion.span
                  initial={{ y: "118%" }}
                  animate={{ y: isRevealed ? "0%" : "118%" }}
                  transition={{
                    duration: 1.6,
                    delay: 0.05 + idx * 0.07,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </span>

          {/* Trademark Accent Mark */}
          <motion.span
            className="nrlh-mark"
            aria-hidden="true"
            initial={{ scale: 0, rotate: -140 }}
            animate={{
              scale: isRevealed ? 1 : 0,
              rotate: isRevealed ? 0 : -140
            }}
            transition={{
              duration: 1.6,
              delay: 0.45,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            ®
          </motion.span>
        </motion.h1>
      </div>

      {/* 2. Norell 4-Column Bottom Bar */}
      <div className="nrlh-bar">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 14 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="nrlh-status">
            <i className="nrlh-pulse" />
            Available for new work
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 14 }}
          transition={{ duration: 1.1, delay: 0.51, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="nrlh-social">
            <a href="https://www.linkedin.com/in/md-shihabul-islam404/" target="_blank" rel="noopener noreferrer">In,</a>
            <a href="https://www.behance.net/mdshihabulislam" target="_blank" rel="noopener noreferrer">Be,</a>
            <a href="https://dribbble.com/Shihabul_Islam002" target="_blank" rel="noopener noreferrer">Dr,</a>
            <a href="https://github.com/shihabulislamugv" target="_blank" rel="noopener noreferrer">Gh</a>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 14 }}
          transition={{ duration: 1.1, delay: 0.57, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link className="nrlh-scroll" href="#projects">
            Scroll to explore <span className="nrlh-arrow" aria-hidden="true">↓</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 14 }}
          transition={{ duration: 1.1, delay: 0.63, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>©2026</span>
        </motion.div>
      </div>

      {/* 3. Norell Exact Intro Preloader */}
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: introState === "revealing" ? 0 : 1 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="nrlh-intro"
          aria-hidden="true"
        >
          <div className={`nrlh-stage ${introState === "revealing" ? "revealing" : ""}`}>
            <div className="nrlh-stage-par">
              <img
                src="/images/profile.jpg"
                alt="Shihabul Islam"
              />
            </div>

            {/* 4 Sliding Framing Panels */}
            <div className="nrlh-pan t" />
            <div className="nrlh-pan b" />
            <div className="nrlh-pan l" />
            <div className="nrlh-pan r" />

            {/* Radial Corner Cutouts */}
            <i className="nrlh-corner tl" />
            <i className="nrlh-corner tr" />
            <i className="nrlh-corner bl" />
            <i className="nrlh-corner br" />
          </div>

          {/* Top Intro Row */}
          <div className="nrlh-row" style={{ top: "22px", alignItems: "flex-start" }}>
            <span className="nrlh-mask">
              <motion.span
                animate={{ y: introState === "revealing" ? "-110%" : "0%" }}
                transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
                style={{ display: "block" }}
              >
                {brandWord}®
              </motion.span>
            </span>

            <span className="nrlh-mask">
              <motion.span
                animate={{ y: introState === "revealing" ? "-110%" : "0%" }}
                transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1], delay: 0.04 }}
                style={{ display: "block" }}
              >
                Studio portfolio — 2026
              </motion.span>
            </span>
          </div>

          {/* Bottom Intro Row with Monospace Counter */}
          <div className="nrlh-row" style={{ bottom: "18px" }}>
            <span className="nrlh-mask">
              <motion.span
                animate={{ y: introState === "revealing" ? "-110%" : "0%" }}
                transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
                style={{ display: "block" }}
              >
                Loading the good stuff
              </motion.span>
            </span>

            <span className="nrlh-mask">
              <motion.span
                animate={{ y: introState === "revealing" ? "-110%" : "0%" }}
                transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1], delay: 0.04 }}
                className="nrlh-count"
              >
                {count}
              </motion.span>
            </span>
          </div>

          {/* Bottom Horizontal Expanding Line */}
          <motion.span
            className="nrlh-line"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: introState === "revealing" ? 0 : 1,
              originX: introState === "revealing" ? 1 : 0
            }}
            transition={{
              duration: introState === "revealing" ? 0.6 : 1.6,
              ease: introState === "revealing" ? [0.77, 0, 0.175, 1] : [0.65, 0, 0.35, 1]
            }}
          />
        </motion.div>
      )}
    </section>
  );
}
