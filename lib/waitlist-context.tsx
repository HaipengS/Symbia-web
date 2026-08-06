"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Shared state for the waitlist modal, plus the one bit of memory the automatic
 * scroll prompt needs: whether this visitor has already answered it. Without that,
 * the prompt would reappear on every visit, which is the behaviour that makes
 * popups feel hostile.
 */

const STORAGE_KEY = "symbia.waitlist.prompt";

type Responded = "dismissed" | "joined";

type WaitlistContextType = {
  isOpen: boolean;
  /** Which surface opened the modal; recorded against the signup. */
  source: string;
  open: (source?: string) => void;
  close: () => void;
  hasResponded: () => boolean;
  markResponded: (outcome: Responded) => void;
};

const WaitlistContext = createContext<WaitlistContextType | null>(null);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("site");

  // Read lazily rather than into state: the value is only consulted in event
  // handlers, and touching localStorage during render breaks server rendering.
  const hasResponded = useCallback(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      // Private browsing can throw on access. Treat it as "not yet answered".
      return false;
    }
  }, []);

  const markResponded = useCallback((outcome: Responded) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, outcome);
    } catch {
      // Nothing to do: the prompt simply reappears next visit.
    }
  }, []);

  const open = useCallback((nextSource = "site") => {
    setSource(nextSource);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    markResponded("dismissed");
  }, [markResponded]);

  const value = useMemo(
    () => ({ isOpen, source, open, close, hasResponded, markResponded }),
    [isOpen, source, open, close, hasResponded, markResponded],
  );

  return <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>;
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside WaitlistProvider");
  return ctx;
}
