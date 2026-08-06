"use client";

import { useWaitlist } from "@/lib/waitlist-context";

type Props = {
  className?: string;
  children?: React.ReactNode;
  /** Recorded against the signup so the tracker shows where it came from. */
  source?: string;
};

export default function WaitlistButton({ className, children, source = "button" }: Props) {
  const { open } = useWaitlist();
  return (
    <button onClick={() => open(source)} className={className}>
      {children ?? "Join the waitlist"}
    </button>
  );
}
