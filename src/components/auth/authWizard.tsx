"use client";

import { LockKeyhole, Mail, Eye, EyeOff, UserRound } from "lucide-react";
import { useActionState, useEffect, useMemo, useState } from "react";

import {
  checkEmailAction,
  signInAction,
  signUpAction,
} from "@/lib/actions/auth";
import {
  initialAuthActionState,
  initialEmailCheckActionState,
} from "@/lib/actions/auth-state";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type WizardStep = "email" | "login" | "signup";

const inputClassName =
  "h-11 rounded-[4px] border-border/70 bg-background/80 shadow-inner shadow-black/5 transition-all placeholder:text-muted-foreground/60 focus-visible:border-amber-500/70 focus-visible:ring-amber-500/20";

export function AuthWizard() {
  const [step, setStep] = useState<WizardStep>("email");
  const [email, setEmail] = useState("");

  const [emailState, checkEmailFormAction, isCheckingEmail] = useActionState(
    checkEmailAction,
    initialEmailCheckActionState,
  );

  const [loginState, loginFormAction, isLoggingIn] = useActionState(
    signInAction,
    initialAuthActionState,
  );

  const [signupState, signupFormAction, isSigningUp] = useActionState(
    signUpAction,
    initialAuthActionState,
  );

  useEffect(() => {
    if (!emailState.data) {
      return;
    }

    setEmail(emailState.data.email);
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

  const title = {
    email: "Continue to your dashboard",
    login: "Welcome back",
    signup: "Create your account",
  }[step];

  const description = {
    email: "Start with your email. We’ll find the right next step for you.",
    login: "This email already has an account. Enter your password to continue.",
    signup: "No account found for this email. Create your account now.",
  }[step];

  const buttonLabel = {
    email: isCheckingEmail ? "Checking email..." : "Continue",
    login: isLoggingIn ? "Logging in..." : "Log in",
    signup: isSigningUp ? "Creating account..." : "Create account",
  }[step];

  const activeError =
    step === "email"
      ? emailState.error
      : step === "login"
        ? loginState.error
        : signupState.error;

  const slideIndex = step === "email" ? 0 : step === "login" ? 1 : 2;

  function resetEmailStep() {
    setStep("email");
  }

  return (
    <Card
      variant="glass"
      className="w-full max-w-md overflow-hidden border-amber-500/15 shadow-2xl shadow-amber-950/10"
    >
      <CardHeader className="space-y-3 pb-5">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-800 dark:text-amber-100">
          <span className="size-1.5 rounded-full bg-amber-500" />
          Secure Neon Auth
        </div>

        <div className="space-y-1.5">
          <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
          <CardDescription className="leading-6">{description}</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form action={activeAction} className="flex min-h-[390px] flex-col">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="auth-email">Email</Label>

              {step !== "email" ? (
                <button
                  type="button"
                  onClick={resetEmailStep}
                  disabled={isPending}
                  className="text-xs font-medium text-amber-700 underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50 dark:text-amber-300"
                >
                  Use another email
                </button>
              ) : null}
            </div>

            {step === "email" ? (
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="auth-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isPending}
                  placeholder="you@example.com"
                  className={cn(inputClassName, "pl-10")}
                />
              </div>
            ) : (
              <>
                <input type="hidden" name="email" value={email} />

                <div className="flex h-11 items-center gap-3 rounded-[4px] border border-border/70 bg-muted/40 px-3 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="truncate font-medium">{email}</span>
                </div>
              </>
            )}
          </div>

          <div className="relative mt-6 flex-1 overflow-hidden">
            <div
              className="flex h-full w-[300%] transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${slideIndex * 33.333333}%)`,
              }}
            >
              <section className="w-1/3 shrink-0 pr-3">
                <div className="rounded-[4px] border border-border/60 bg-muted/30 p-4">
                  <p className="text-sm font-medium">One simple start.</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    We’ll check your email and move you to login or signup
                    automatically.
                  </p>
                </div>
              </section>

              <section className="w-1/3 shrink-0 px-3">
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>

                  <PasswordInput
                    id="login-password"
                    name="password"
                    autoComplete="current-password"
                    disabled={isPending || step !== "login"}
                    placeholder="Enter your password"
                  />
                </div>
              </section>

              <section className="w-1/3 shrink-0 pl-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>

                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="signup-name"
                        name="name"
                        type="text"
                        required={step === "signup"}
                        autoComplete="name"
                        disabled={isPending || step !== "signup"}
                        placeholder="Your name"
                        className={cn(inputClassName, "pl-10")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>

                    <PasswordInput
                      id="signup-password"
                      name="password"
                      autoComplete="new-password"
                      disabled={isPending || step !== "signup"}
                      placeholder="Create a password"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-auto space-y-3 pt-6">
            {activeError ? (
              <p className="rounded-[4px] border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {activeError}
              </p>
            ) : null}

            <Button
              type="submit"
              variant={step === "signup" ? "gold" : "default"}
              className="h-11 w-full rounded-[4px]"
              disabled={isPending}
            >
              {buttonLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

type PasswordInputProps = {
  id: string;
  name: string;
  autoComplete: string;
  disabled: boolean;
  placeholder: string;
};

function PasswordInput({
  id,
  name,
  autoComplete,
  disabled,
  placeholder,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        required
        autoComplete={autoComplete}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(inputClassName, "pl-10 pr-10")}
      />

      <button
        type="button"
        onClick={() => setShowPassword((value) => !value)}
        disabled={disabled}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}