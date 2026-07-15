import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import HomeSections from "@/components/HomeSections";
import Image from "next/image";

export const metadata = {
  title: "Symbia Logo",
  description: "Display the full Symbia website logo.",
};

export default function LogoPage() {
  return (
    <div className="bg-white">
      <Navbar onHomePage variant="light" revealAfterHero />

      <main>
        {/* ── Logo hero ── */}
        <section className="logo-wallet-scene" id="home">
          <div className="hero-logo-placement">
            <Logo animated delay={0} className="hero-logo-mark" />
          </div>

          <Image
            src="/Font/wallet.png"
            alt="Symbia bioleather wallet"
            fill
            priority
            unoptimized
            className="wallet-product-image object-contain"
            sizes="100vw"
          />
        </section>

        {/* ── Leather-backed content, same as the home page ── */}
        <div className="warm-bg relative text-cream">
          <div className="absolute inset-0 bg-gradient-to-b from-coral/5 via-transparent to-black/60" />
          <div className="relative z-10">
            <HomeSections />
          </div>
        </div>
      </main>
    </div>
  );
}
