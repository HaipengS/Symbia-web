import Logo from "@/components/Logo";
import LogoIntro from "@/components/LogoIntro";
import HomeSections from "@/components/HomeSections";
import MissionExpandable from "@/components/MissionExpandable";

export const metadata = {
  title: "Symbia Logo",
  description: "Display the full Symbia website logo.",
};

export default function LogoPage() {
  return (
    <LogoIntro
      // Two copies of one artwork: the hero plays the drop; the fixed clone is the
      // single shared logo scrubbed between hero and navbar. Both share the cached read.
      heroLogo={<Logo animated delay={0} className="hero-logo-mark" />}
      flyingLogo={<Logo label="Symbia" />}
    >
      {/* Mission + expandable brand / supplier pathways */}
      <MissionExpandable />

      <HomeSections />
    </LogoIntro>
  );
}
