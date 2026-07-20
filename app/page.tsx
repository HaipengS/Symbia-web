import Image from "next/image";
import Navbar from "@/components/Navbar";
import HomeSections from "@/components/HomeSections";
import WaitlistButton from "@/components/WaitlistButton";

export default function Home() {
  return (
    <div className="warm-bg relative min-h-screen overflow-hidden text-ink">
      <div className="absolute inset-0" />

      <Navbar onHomePage />

      <main className="relative z-10" id="home">

        {/* ── Hero ── */}
        <section className="mx-auto max-w-5xl px-6 pb-0 pt-16 md:pt-24">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-warm/60">
                Biofabrication · Indonesia
              </p>
              <h1 className="font-display text-6xl font-bold leading-[0.92] tracking-tight text-ink sm:text-7xl md:text-8xl">
                Grow&shy;ing the future of craft
              </h1>
              <p className="max-w-sm text-base leading-relaxed text-ink/60">
                Symbia grows leather from recycled Kombucha and bacterial cellulose — redefining sustainability and unlocking new income for rural craftspeople worldwide.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <WaitlistButton className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition hover:bg-amber-warm">
                  Join the waitlist
                </WaitlistButton>
                <a
                  href="/about"
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-ink/40 transition hover:text-ink"
                >
                  Our story →
                </a>
              </div>
            </div>

            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl md:h-[520px]">
              <Image
                src="/landing/landing.png"
                alt="Symbia bioleather material"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 480px, 90vw"
                unoptimized
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </section>

        <HomeSections />

      </main>
    </div>
  );
}
