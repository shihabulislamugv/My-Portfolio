"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ResumeModal } from "@/components/ResumeModal";

interface ResumeModalContextType {
  openResumeModal: () => void;
  closeResumeModal: () => void;
  prefetchResume: () => void;
  isResumeModalOpen: boolean;
}

const ResumeModalContext = createContext<ResumeModalContextType>({
  openResumeModal: () => {},
  closeResumeModal: () => {},
  prefetchResume: () => {},
  isResumeModalOpen: false,
});

export function ResumeModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrefetched, setHasPrefetched] = useState(false);

  const prefetchResume = useCallback(() => {
    if (typeof window === "undefined" || hasPrefetched) return;
    setHasPrefetched(true);

    try {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = "/api/resume/view";
      link.as = "fetch";
      document.head.appendChild(link);
    } catch {
      // ignore
    }
  }, [hasPrefetched]);

  // Idle background prefetch shortly after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      prefetchResume();
    }, 1200);
    return () => clearTimeout(timer);
  }, [prefetchResume]);

  const openResumeModal = () => {
    prefetchResume();
    setIsOpen(true);
  };

  const closeResumeModal = () => {
    setIsOpen(false);
  };

  return (
    <ResumeModalContext.Provider
      value={{
        openResumeModal,
        closeResumeModal,
        prefetchResume,
        isResumeModalOpen: isOpen,
      }}
    >
      {children}
      <ResumeModal isOpen={isOpen} onClose={closeResumeModal} />
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  return useContext(ResumeModalContext);
}
