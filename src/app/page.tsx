import { FeaturesSection } from "@/components/landing/featuresSection";
import { HeroSection } from "@/components/landing/heroSection";
import { SiteHeader } from "@/components/landing/header";
import { WorkflowSection } from "@/components/landing/workflowSection";
import { RevealSection } from "@/components/ui/RevealSection";
export default function HomePage() {
  return (
    <main className="min-h-screen pb-20">
      <SiteHeader />
      <div className="px-6">
        <RevealSection>
          <HeroSection />
        </RevealSection>
        <RevealSection>
          <FeaturesSection />
        </RevealSection>
        <RevealSection>
          <WorkflowSection />
        </RevealSection>
      </div>
    </main>
  );
}
