import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { DistrictStrip } from "@/components/sections/DistrictStrip";
import { TrustStats } from "@/components/sections/TrustStats";
import { JobsPreview } from "@/components/sections/JobsPreview";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TalentSection } from "@/components/sections/TalentSection";
import { WhyMicrojobs } from "@/components/sections/WhyMicrojobs";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="top-content">
        <Hero />
        <DistrictStrip />
        <TrustStats />
        <JobsPreview />
        <ProjectsSection />
        <TalentSection />
        <WhyMicrojobs />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
