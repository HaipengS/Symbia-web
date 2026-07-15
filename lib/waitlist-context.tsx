"use client";

import { createContext, useContext, useState } from "react";

type WaitlistContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const WaitlistContext = createContext<WaitlistContextType | null>(null);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <WaitlistContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside WaitlistProvider");
  return ctx;
}
