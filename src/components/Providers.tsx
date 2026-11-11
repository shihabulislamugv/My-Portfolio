"use client";

import { SessionProvider } from "next-auth/react";
import { ResumeModalProvider } from "@/context/ResumeModalContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ResumeModalProvider>
        {children}
      </ResumeModalProvider>
    </SessionProvider>
  );
};
