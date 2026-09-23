"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-40 p-4 bg-zinc-900 text-white border-2 border-zinc-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] hover:bg-blue-600 transition-colors rounded-full flex items-center justify-center cursor-pointer"
        >
          <ArrowUp size={22} strokeWidth={3} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
