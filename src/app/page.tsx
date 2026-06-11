import { BackToTopButton } from "@/components/layout/backToTopButton";
import { FeaturesSection } from "@/components/landing/featuresSection";
import { HeroSection } from "@/components/landing/heroSection";
import { WorkflowSection } from "@/components/landing/workflowSection";
import { RevealSection } from "@/components/ui/RevealSection";
import { auth } from "@/lib/auth/server";
export const dynamic = "force-dynamic";
export default async function HomePage() {
  const { data: session } = await auth.getSession();

  const createLinkHref = session?.user ? "/dashboard" : "/authentication";

  return (
    <main className="min-h-screen px-6 pb-40">
      <RevealSection>
        <HeroSection createLinkHref={createLinkHref} />
      </RevealSection>

      <RevealSection>
        <FeaturesSection />
      </RevealSection>

      <RevealSection>
        <WorkflowSection />
      </RevealSection>

      <RevealSection>
        <BackToTopButton />
      </RevealSection>
    </main>
  );
}
