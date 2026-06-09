import { FeaturesSection } from "@/components/landing/featuresSection";
import { HeroSection } from "@/components/landing/heroSection";
import { SiteHeader } from "@/components/landing/header";
import { WorkflowSection } from "@/components/landing/workflowSection";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-6">
      <SiteHeader />
      <div className="px-6">
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      </div>
    </main>
  );
}
