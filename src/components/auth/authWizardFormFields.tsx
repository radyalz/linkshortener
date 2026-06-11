import { Mail, UserRound } from "lucide-react";

import { FloatingAuthInput } from "@/components/auth/floatingAuthInput";
import { PasswordInput } from "@/components/auth/passwordInput";
import { AccordionSlide } from "@/components/auth/accordionSlide";
import { type WizardStep } from "@/components/auth/authWizard.types";

type AuthWizardFormFieldsProps = {
  step: WizardStep;
  email: string;
  formResetKey: number;
  isPending: boolean;
  activeError: string | null | undefined;
  onEmailChange: (value: string) => void;
  onResetEmail: () => void;
};

export function AuthWizardFormFields({ step, email, formResetKey, isPending, activeError, onEmailChange, onResetEmail }: AuthWizardFormFieldsProps) {
  const authSlideIndex = step === "email" ? 0 : step === "login" ? 1 : 2;

  return (
    <>
      <div className="space-y-2">
        {step === "email" ? (
          <FloatingAuthInput
            key={`email-${formResetKey}`}
            id="auth-email"
            name="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            disabled={isPending}
            error={step === "email" && Boolean(activeError)}
            errorMessage={step === "email" ? activeError : null}
            icon={<Mail className="size-4" />}
          />
        ) : (
          <SelectedEmailField email={email} disabled={isPending} onResetEmail={onResetEmail} />
        )}
      </div>

      <AuthCredentialSlider step={step} formResetKey={formResetKey} isPending={isPending} activeError={activeError} authSlideIndex={authSlideIndex} />
    </>
  );
}

function SelectedEmailField({ email, disabled, onResetEmail }: { email: string; disabled: boolean; onResetEmail: () => void }) {
  return (
    <>
      <input type="hidden" name="email" value={email} />

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">Email</p>

        <button
          type="button"
          onClick={onResetEmail}
          disabled={disabled}
          className="text-xs font-medium text-amber-700 underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50 dark:text-amber-300"
        >
          Use another email
        </button>
      </div>

      <div className="flex h-10 items-center gap-2 rounded-[4px] border border-slate-300/80 bg-white/70 px-3 text-sm shadow-sm shadow-black/5 dark:border-white/15 dark:bg-white/[0.06]">
        <Mail className="size-4 text-muted-foreground" />
        <span className="truncate font-medium">{email}</span>
      </div>
    </>
  );
}

function AuthCredentialSlider({
  step,
  formResetKey,
  isPending,
  activeError,
  authSlideIndex,
}: {
  step: WizardStep;
  formResetKey: number;
  isPending: boolean;
  activeError: string | null | undefined;
  authSlideIndex: number;
}) {
  return (
    <div className="relative mt-3 overflow-hidden">
      <div className="flex w-[300%] transition-transform duration-[675ms] ease-out will-change-transform" style={{ transform: `translateX(-${authSlideIndex * 33.333333}%)` }}>
        <section className="h-0 w-1/3 shrink-0">
          <AccordionSlide open={step === "email"}>
            <div />
          </AccordionSlide>
        </section>

        <section className="w-1/3 shrink-0">
          <AccordionSlide open={step === "login"}>
            <div className="my-1">
              <PasswordInput
                key={`login-password-${formResetKey}`}
                id="login-password"
                name="password"
                label="Password"
                autoComplete="current-password"
                disabled={isPending || step !== "login"}
                error={step === "login" && Boolean(activeError)}
                errorMessage={step === "login" ? activeError : null}
              />
            </div>
          </AccordionSlide>
        </section>

        <section className="w-1/3 shrink-0">
          <AccordionSlide open={step === "signup"}>
            <div className="my-1 space-y-3">
              <FloatingAuthInput
                key={`signup-name-${formResetKey}`}
                id="signup-name"
                name="name"
                label="Full name"
                type="text"
                required={step === "signup"}
                autoComplete="name"
                disabled={isPending || step !== "signup"}
                icon={<UserRound className="size-4" />}
                error={step === "signup" && Boolean(activeError)}
                errorMessage={step === "signup" ? activeError : null}
              />

              <PasswordInput
                key={`signup-password-${formResetKey}`}
                id="signup-password"
                name="password"
                label="Password"
                autoComplete="new-password"
                disabled={isPending || step !== "signup"}
                error={step === "signup" && Boolean(activeError)}
                errorMessage={step === "signup" ? activeError : null}
              />
            </div>
          </AccordionSlide>
        </section>
      </div>
    </div>
  );
}
