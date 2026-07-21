import Logo from "@/components/Logo";
import LogoIntro from "@/components/LogoIntro";
import HomeSections from "@/components/HomeSections";
import MissionExpandable from "@/components/MissionExpandable";

// The homepage is the animated logo hero. Metadata is inherited from the root
// layout ("Symbia"). This is the ONLY page with the animated navbar.
export default function Home() {
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
