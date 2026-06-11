"use client";
import { startTransition, useActionState, useEffect, useState } from "react";
import { checkEmailAction, signInAction, signUpAction } from "@/lib/actions/auth";
import { initialAuthActionState, initialEmailCheckActionState } from "@/lib/actions/auth-state";
import { CardContent } from "@/components/ui/card";
import { AuthWizardHeader } from "@/components/auth/authWizardHeader";
import { AuthWizardFormFields } from "@/components/auth/authWizardFormFields";
import { AuthSubmitButton } from "@/components/auth/authSubmitButton";
import { type WizardStep } from "@/components/auth/authWizard.types";

export function AuthWizardClient() {
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

    startTransition(() => {
      setEmail(emailState.data.email);
      setSubmittedStep(null);
      setFormResetKey((key) => key + 1);
      setStep(emailState.data.mode);
    });
  }, [emailState.data]);

  const isPending = isCheckingEmail || isLoggingIn || isSigningUp;

  const activeAction = step === "login" ? loginFormAction : step === "signup" ? signupFormAction : checkEmailFormAction;

  const buttonLabel = {
    email: isCheckingEmail ? "Checking email..." : "Continue",
    login: isLoggingIn ? "Logging in..." : "Log in",
    signup: isSigningUp ? "Creating account..." : "Create account",
  }[step];

  const rawActiveError = step === "email" ? emailState.error : step === "login" ? loginState.error : signupState.error;

  const activeError = submittedStep === step ? rawActiveError : null;

  function resetEmailStep() {
    setEmail("");
    setSubmittedStep(null);
    setFormResetKey((key) => key + 1);
    setStep("email");
  }

  return (
    <>
      <AuthWizardHeader step={step} />

      <CardContent>
        <form action={activeAction} onSubmit={() => setSubmittedStep(step)} className="flex flex-col">
          <AuthWizardFormFields step={step} email={email} formResetKey={formResetKey} isPending={isPending} activeError={activeError} onEmailChange={setEmail} onResetEmail={resetEmailStep} />

          <div className="mt-auto space-y-3 pt-4">
            <AuthSubmitButton step={step} label={buttonLabel} disabled={isPending} />
          </div>
        </form>
      </CardContent>
    </>
  );
}
