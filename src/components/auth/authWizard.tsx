"use client";

import { Mail, UserRound } from "lucide-react";
import { useActionState, useEffect, useMemo, useState, type ReactNode } from "react";

import { checkEmailAction, signInAction, signUpAction } from "@/lib/actions/auth";
import { initialAuthActionState, initialEmailCheckActionState } from "@/lib/actions/auth-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingAuthInput } from "@/components/auth/floatingAuthInput";
import { PasswordInput } from "@/components/auth/passwordInput";
import { RevealSection } from "../ui/RevealSection";

type WizardStep = "email" | "login" | "signup";

function AccordionSlide({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={
        open
          ? "grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out"
          : "grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out"
      }
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function AuthWizard() {
  const [step, setStep] = useState<WizardStep>("email");
  const [email, setEmail] = useState("");
  const [submittedStep, setSubmittedStep] = useState<WizardStep | null>(null);
  const [formResetKey, setFormResetKey] = useState(0);
  const [emailState, checkEmailFormAction, isCheckingEmail] = useActionState(checkEmailAction, initialEmailCheckActionState);

  const [loginState, loginFormAction, isLoggingIn] = useActionState(signInAction, initialAuthActionState);

  const [signupState, signupFormAction, isSigningUp] = useActionState(signUpAction, initialAuthActionState);

  useEffect(() => {
    if (!emailState.data) {
      return;
    }

    setEmail(emailState.data.email);
    setSubmittedStep(null);
    setFormResetKey((key) => key + 1);
    setStep(emailState.data.mode);
  }, [emailState.data]);

  const isPending = isCheckingEmail || isLoggingIn || isSigningUp;

  const activeAction = useMemo(() => {
    if (step === "login") {
      return loginFormAction;
    }

    if (step === "signup") {
      return signupFormAction;
    }

    return checkEmailFormAction;
  }, [step, loginFormAction, signupFormAction, checkEmailFormAction]);

  const buttonLabel = {
    email: isCheckingEmail ? "Checking email..." : "Continue",
    login: isLoggingIn ? "Logging in..." : "Log in",
    signup: isSigningUp ? "Creating account..." : "Create account",
  }[step];

  const rawActiveError = step === "email" ? emailState.error : step === "login" ? loginState.error : signupState.error;

  const activeError = submittedStep === step ? rawActiveError : null;
  const authSlideIndex = step === "email" ? 0 : step === "login" ? 1 : 2;

  const buttonVariant = step === "signup" ? "gold" : step === "login" ? "default" : "outline";

  const buttonClassName = {
    email:
      "h-10 w-full rounded-[4px] border-amber-500/40 bg-amber-500/5 text-amber-800 shadow-none transition-all hover:bg-amber-500/10 hover:text-amber-900 dark:border-amber-300/35 dark:bg-amber-300/10 dark:text-amber-100 dark:hover:bg-amber-300/15",
    login:
      "h-10 w-full rounded-[4px] border border-amber-500/45 bg-amber-500/10 text-amber-900 shadow-sm shadow-amber-950/10 transition-all hover:bg-amber-500/15 hover:text-amber-950 dark:border-amber-300/35 dark:bg-amber-300/10 dark:text-amber-100 dark:shadow-black/20 dark:hover:bg-amber-300/15",
    signup: "h-10 w-full rounded-[4px] shadow-lg shadow-amber-950/15 transition-all",
  }[step];

  function resetEmailStep() {
    setEmail("");
    setSubmittedStep(null);
    setFormResetKey((key) => key + 1);
    setStep("email");
  }
  return (
    <RevealSection>
      <Card variant="glass" className="w-full max-w-md overflow-hidden border-amber-500/15 shadow-2xl shadow-amber-950/10">
        <CardHeader className="pb-4">
          <AccordionSlide open={step === "email"}>
            <div className="space-y-2">
              <CardTitle className="text-2xl tracking-tight">Authentication required</CardTitle>
              <CardDescription className="leading-6">To continue, you need to be authenticated. Enter your email and we’ll take you to the right next step.</CardDescription>
            </div>
          </AccordionSlide>

          <AccordionSlide open={step === "login"}>
            <div className="space-y-2">
              <CardTitle className="text-2xl tracking-tight">Welcome back</CardTitle>
              <CardDescription className="leading-6">This email already has an account. Enter your password to continue.</CardDescription>
            </div>
          </AccordionSlide>

          <AccordionSlide open={step === "signup"}>
            <div className="space-y-2">
              <CardTitle className="text-2xl tracking-tight">Create your account</CardTitle>
              <CardDescription className="leading-6">No account found for this email. Create your account now.</CardDescription>
            </div>
          </AccordionSlide>
        </CardHeader>

        <CardContent>
          <form action={activeAction} onSubmit={() => setSubmittedStep(step)} className="flex flex-col">
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
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isPending}
                  error={step === "email" && Boolean(activeError)}
                  errorMessage={step === "email" ? activeError : null}
                  icon={<Mail className="size-4" />}
                />
              ) : (
                <>
                  <input type="hidden" name="email" value={email} />

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium text-muted-foreground">Email</p>

                    <button
                      type="button"
                      onClick={resetEmailStep}
                      disabled={isPending}
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
              )}
            </div>

            <div className="relative mt-3 overflow-hidden">
              <div
                className="flex w-[300%] transition-transform duration-[675ms] ease-out will-change-transform"
                style={{
                  transform: `translateX(-${authSlideIndex * 33.333333}%)`,
                }}
              >
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

            <div className="mt-auto space-y-3 pt-4">
              <Button type="submit" variant={buttonVariant} className={buttonClassName} disabled={isPending}>
                <span className="grid w-full place-items-center">
                  <AccordionSlide open={step === "email"}>
                    <span className="block">{buttonLabel}</span>
                  </AccordionSlide>

                  <AccordionSlide open={step === "login"}>
                    <span className="block">{buttonLabel}</span>
                  </AccordionSlide>

                  <AccordionSlide open={step === "signup"}>
                    <span className="block">{buttonLabel}</span>
                  </AccordionSlide>
                </span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </RevealSection>
  );
}
