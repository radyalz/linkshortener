import { Button } from "@/components/ui/button";
import { AccordionSlide } from "@/components/auth/accordionSlide";
import { authButtonClassName } from "@/components/auth/authWizard.styles";
import { type WizardStep } from "@/components/auth/authWizard.types";

type AuthSubmitButtonProps = {
  step: WizardStep;
  label: string;
  disabled: boolean;
};

export function AuthSubmitButton({ step, label, disabled }: AuthSubmitButtonProps) {
  const buttonVariant = step === "signup" ? "gold" : step === "login" ? "default" : "outline";

  return (
    <Button type="submit" variant={buttonVariant} className={authButtonClassName[step]} disabled={disabled}>
      <span className="grid w-full place-items-center">
        {(["email", "login", "signup"] as const).map((item) => (
          <AccordionSlide key={item} open={step === item}>
            <span className="block">{label}</span>
          </AccordionSlide>
        ))}
      </span>
    </Button>
  );
}
