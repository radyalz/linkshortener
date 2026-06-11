import { Card } from "@/components/ui/card";
import { AuthWizardClient } from "@/components/auth/authWizardClient";
import { RevealSection } from "../ui/RevealSection";

export function AuthWizard() {
  return (
    <RevealSection>
      <Card
        variant="glass"
        className="w-full max-w-md overflow-hidden border-amber-500/15 shadow-2xl shadow-amber-950/10"
      >
        <AuthWizardClient />
      </Card>
    </RevealSection>
  );
}