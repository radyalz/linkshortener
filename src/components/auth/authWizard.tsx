"use client";

import { useActionState, useEffect, useState } from "react";

import { checkEmailAction, signInAction, signUpAction } from "@/lib/actions/auth";
import { initialAuthActionState, initialEmailCheckActionState } from "@/lib/actions/auth-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type WizardStep = "email" | "login" | "signup";

export function AuthWizard() {
  const [step, setStep] = useState<WizardStep>("email");
  const [email, setEmail] = useState("");

  const [emailState, checkEmailFormAction, isCheckingEmail] = useActionState(checkEmailAction, initialEmailCheckActionState);

  const [loginState, loginFormAction, isLoggingIn] = useActionState(signInAction, initialAuthActionState);

  const [signupState, signupFormAction, isSigningUp] = useActionState(signUpAction, initialAuthActionState);

  useEffect(() => {
    if (!emailState.data) {
      return;
    }

    setEmail(emailState.data.email);
    setStep(emailState.data.mode);
  }, [emailState.data]);

  const isPending = isCheckingEmail || isLoggingIn || isSigningUp;

  return (
    <Card variant="glass" className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {step === "email" ? "Continue to your dashboard" : null}
          {step === "login" ? "Welcome back" : null}
          {step === "signup" ? "Create your account" : null}
        </CardTitle>

        <CardDescription>
          {step === "email" ? "Enter your email and we’ll continue with login or signup." : null}

          {step === "login" ? "This email already has an account. Enter your password." : null}

          {step === "signup" ? "No account found for this email. Create one now." : null}
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-hidden">
        <div
          className={cn(
            "flex w-[300%] transition-transform duration-500 ease-in-out",
            step === "email" && "translate-x-0",
            step === "login" && "-translate-x-1/3",
            step === "signup" && "-translate-x-2/3",
          )}
        >
          <section className="w-1/3 shrink-0 pr-1">
            <form action={checkEmailFormAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="auth-email">Email</Label>
                <Input id="auth-email" name="email" type="email" required autoComplete="email" defaultValue={email} disabled={isPending} />
              </div>

              {emailState.error ? <p className="text-sm text-destructive">{emailState.error}</p> : null}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isCheckingEmail ? "Checking..." : "Continue"}
              </Button>
            </form>
          </section>

          <section className="w-1/3 shrink-0 px-1">
            <form action={loginFormAction} className="space-y-4">
              <input type="hidden" name="email" value={email} />

              <div className="rounded-lg border bg-muted/40 px-3 py-2 text-sm">{email}</div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" name="password" type="password" required autoComplete="current-password" disabled={isPending} />
              </div>

              {loginState.error ? <p className="text-sm text-destructive">{loginState.error}</p> : null}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isLoggingIn ? "Logging in..." : "Log in"}
              </Button>

              <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("email")} disabled={isPending}>
                Use another email
              </Button>
            </form>
          </section>

          <section className="w-1/3 shrink-0 pl-1">
            <form action={signupFormAction} className="space-y-4">
              <input type="hidden" name="email" value={email} />

              <div className="rounded-lg border bg-muted/40 px-3 py-2 text-sm">{email}</div>

              <div className="space-y-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input id="signup-name" name="name" type="text" required autoComplete="name" disabled={isPending} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" name="password" type="password" required autoComplete="new-password" disabled={isPending} />
              </div>

              {signupState.error ? <p className="text-sm text-destructive">{signupState.error}</p> : null}

              <Button type="submit" variant="gold" className="w-full" disabled={isPending}>
                {isSigningUp ? "Creating account..." : "Create account"}
              </Button>

              <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("email")} disabled={isPending}>
                Use another email
              </Button>
            </form>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
