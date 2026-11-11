"use client";

import React, { createContext, useContext, useState } from "react";
import { ResumeModal } from "@/components/ResumeModal";

interface ResumeModalContextType {
  openResumeModal: () => void;
  closeResumeModal: () => void;
  isResumeModalOpen: boolean;
}

const ResumeModalContext = createContext<ResumeModalContextType>({
  openResumeModal: () => {},
  closeResumeModal: () => {},
  isResumeModalOpen: false,
});

export function ResumeModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResumeModal = () => setIsOpen(true);
  const closeResumeModal = () => setIsOpen(false);

  return (
    <ResumeModalContext.Provider value={{ openResumeModal, closeResumeModal, isResumeModalOpen: isOpen }}>
      {children}
      <ResumeModal isOpen={isOpen} onClose={closeResumeModal} />
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  return useContext(ResumeModalContext);
}
