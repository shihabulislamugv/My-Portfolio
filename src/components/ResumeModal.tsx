"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ArrowDownToLine, 
  ExternalLink, 
  FileText, 
  Loader2, 
  Sparkles,
  Maximize2
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [loading, setLoading] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setLoading(true);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-5xl h-[92vh] max-h-[920px] bg-white border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] flex flex-col overflow-hidden z-10"
          >
            
            {/* Top Command Bar */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#f8f8f5] border-b-4 border-zinc-900 flex flex-wrap items-center justify-between gap-3 select-none">
              
              {/* Document Meta Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-blue-600 text-white border-2 border-zinc-900 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] shrink-0">
                  <FileText size={18} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-900 truncate">
                      Curriculum Vitae
                    </h3>
                    <span className="hidden sm:inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase tracking-wider border border-blue-300 rounded">
                      PDF &bull; Live Preview
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest truncate">
                    Md. Shihabul Islam &bull; Senior UX/UI &amp; Product Designer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                
                {/* Open in New Tab Button */}
                <a
                  href="/api/resume/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-zinc-900 hover:text-blue-600 text-xs font-black uppercase tracking-wider border-2 border-zinc-900 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  title="Open PDF directly in a new browser tab"
                >
                  <ExternalLink size={14} strokeWidth={2.5} />
                  <span>Open Fullscreen</span>
                </a>

                {/* Direct Download PDF Button */}
                <a
                  href="/api/resume/download"
                  download="Md_Shihabul_Islam_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-blue-600 text-white text-xs font-black uppercase tracking-wider border-2 border-zinc-900 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:bg-zinc-900 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  title="Save PDF file to your device"
                >
                  <ArrowDownToLine size={14} strokeWidth={2.5} />
                  <span>Download PDF</span>
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close CV preview"
                  className="p-2 bg-zinc-900 text-white hover:bg-red-600 border-2 border-zinc-900 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all inline-flex items-center justify-center cursor-pointer"
                  title="Press ESC to close"
                >
                  <X size={18} strokeWidth={3} />
                </button>

              </div>
            </div>

            {/* Embedded PDF Viewer Stage */}
            <div className="relative flex-1 w-full bg-zinc-900 overflow-hidden flex items-center justify-center">
              
              {/* Loading Indicator */}
              {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950 text-white gap-3 select-none">
                  <Loader2 size={36} className="text-blue-500 animate-spin" />
                  <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                    Loading Document...
                  </span>
                </div>
              )}

              {/* PDF iFrame */}
              <iframe
                src="/api/resume/view#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
                title="Md Shihabul Islam Resume"
                className="w-full h-full border-0 bg-white"
                onLoad={() => setLoading(false)}
              />

            </div>

            {/* Bottom Status Ribbon */}
            <div className="px-4 sm:px-6 py-2 bg-zinc-100 border-t-2 border-zinc-300 flex items-center justify-between text-[11px] font-mono font-bold text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Verified Resume &bull; Updated 2026</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block">Press ESC or click outside to close</span>
                <a
                  href="/api/resume/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-zinc-900 sm:hidden underline"
                >
                  Open in Tab ↗
                </a>
              </div>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
