import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

/**
 * Shell for every page except the homepage: a static (sticky) navbar, a shared
 * warm-white page surface, and the footer. The homepage (app/page.tsx) is outside
 * this group and brings its own animated navbar via LogoIntro.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="warm-bg relative min-h-screen text-ink">
      <Navbar logoMark={<Logo mark label="Symbia" />} />
      {children}
      <Footer />
    </div>
  );
}
