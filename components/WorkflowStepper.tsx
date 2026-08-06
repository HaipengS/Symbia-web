"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The six-step supply workflow with a frame beside it that follows the step you are
 * reading. The panel used to hold one fixed photograph for all six.
 *
 * An IntersectionObserver with a band across the middle of the viewport decides
 * which step is current, rather than scroll maths: it stays correct when the steps
 * are different heights, which they are.
 *
 * On the images. Symbia has no photograph of the supply side, so steps one and two
 * carry finished material and say so in the caption instead of pretending to show
 * a collection that was never shot. Steps three to six are the real thing.
 */

export type WorkflowStep = {
  step: string;
  title: string;
  body: string;
  you: string | null;
  us: string;
  image: { src: string; alt: string; caption: string };
};

export default function WorkflowStepper({ steps }: { steps: WorkflowStep[] }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The topmost step currently crossing the band wins, so scrolling up and
        // down lands on the same step at the same place.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLLIElement);
        if (index !== -1) setActive(index);
      },
      // A band roughly a third of the way down, not the whole viewport.
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [steps.length]);

  const current = steps[active] ?? steps[0];

  // Even halves. A 400px panel next to a 1fr list left the list's text stopping
  // 470px short of its own track, which was the widest hole on the page.
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
      <ol className="relative space-y-8 border-l border-ink/12 pl-8">
        {steps.map((s, i) => {
          const isActive = i === active;
          return (
            <li
              key={s.step}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative"
            >
              <span
                className={`absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full font-display text-xs font-bold ring-4 ring-[#ffffff] transition-colors duration-300 ${
                  isActive ? "bg-coral text-soft" : "bg-ink/15 text-ink/60"
                }`}
                aria-hidden
              >
                {s.step}
              </span>
              <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
              {/* text-base in a half-width track, held to a measure that keeps the
                  line near 75 characters rather than the 96 the old width gave. */}
              <p className="mt-2 max-w-[38rem] text-base leading-[1.6] text-ink/65">
                {s.body}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs">
                {s.you && (
                  <span className="text-ink/55">
                    <span className="font-semibold uppercase tracking-[0.1em] text-amber-warm/70">
                      You
                    </span>{" "}
                    · {s.you}
                  </span>
                )}
                <span className="text-ink/55">
                  <span className="font-semibold uppercase tracking-[0.1em] text-coral/80">
                    Symbia
                  </span>{" "}
                  · {s.us}
                </span>
              </div>

              {/* Below the two-column breakpoint the frame belongs with its own step,
                  since there is no sticky panel to put it in. */}
              <div className="mt-5 lg:hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.14em] text-ink/50">
                  {s.image.caption}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <aside className="hidden lg:sticky lg:top-24 lg:block" aria-hidden>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream">
          {/* Every frame is mounted and cross-faded. Swapping a single src would
              show the previous photograph until the next one had decoded. */}
          {steps.map((s, i) => (
            <Image
              key={s.image.src}
              src={s.image.src}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 400px, 100vw"
              className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink/50">
            {current.image.caption}
          </p>
          <p className="shrink-0 font-display text-xs text-amber-warm/70">
            {current.step} / {steps[steps.length - 1].step}
          </p>
        </div>
      </aside>
    </div>
  );
}
