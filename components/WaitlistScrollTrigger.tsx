"use client";

import { useEffect } from "react";
import { useWaitlist } from "@/lib/waitlist-context";

/**
 * Opens the waitlist modal once, after the visitor has read their way into the
 * landing page. Mounted on the homepage only.
 *
 * It waits for roughly two viewports of scrolling rather than firing on the first
 * wheel event, so the prompt arrives after someone has shown interest instead of
 * interrupting them on arrival. The opening logo drop locks scrolling while it
 * plays, so this cannot fire during the intro. Once dismissed or joined it never
 * returns, which the context records in localStorage.
 */

const VIEWPORTS_BEFORE_PROMPT = 1.8;

export default function WaitlistScrollTrigger() {
  const { open, hasResponded } = useWaitlist();

  useEffect(() => {
    if (hasResponded()) return;

    let fired = false;
    let ticking = false;

    const evaluate = () => {
      ticking = false;
      if (fired) return;
      // Re-checked here as well as on mount: the visitor may have opened and
      // dismissed the modal from the navbar while this listener was attached.
      if (hasResponded()) {
        detach();
        return;
      }
      if (window.scrollY < window.innerHeight * VIEWPORTS_BEFORE_PROMPT) return;
      fired = true;
      detach();
      open("scroll-popup");
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    function detach() {
      window.removeEventListener("scroll", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return detach;
  }, [open, hasResponded]);

  return null;
}
