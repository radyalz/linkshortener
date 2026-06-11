import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AccordionSlide } from "@/components/auth/accordionSlide";
import { authHeaderContent } from "@/components/auth/authWizard.styles";
import { type WizardStep } from "@/components/auth/authWizard.types";

export function AuthWizardHeader({ step }: { step: WizardStep }) {
  return (
    <CardHeader className="pb-4">
      {(["email", "login", "signup"] as const).map((item) => (
        <AccordionSlide key={item} open={step === item}>
          <div className="space-y-2">
            <CardTitle className="text-2xl tracking-tight">{authHeaderContent[item].title}</CardTitle>

            <CardDescription className="leading-6">{authHeaderContent[item].description}</CardDescription>
          </div>
        </AccordionSlide>
      ))}
    </CardHeader>
  );
}
