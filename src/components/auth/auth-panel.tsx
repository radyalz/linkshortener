"use client";

import { useActionState, useMemo, useState } from "react";

import { signInAction, signUpAction } from "@/lib/actions/auth";
import { initialAuthActionState } from "@/lib/actions/auth-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "signup";

type AuthPanelProps = {
  initialMode?: AuthMode;
};

export function AuthPanel({ initialMode = "login" }: AuthPanelProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");

  const [loginState, loginAction, isLoggingIn] = useActionState(signInAction, initialAuthActionState);

  const [signupState, signupAction, isSigningUp] = useActionState(signUpAction, initialAuthActionState);

  const isSignup = mode === "signup";
  const isPending = isLoggingIn || isSigningUp;

  const title = useMemo(() => {
    return isSignup ? "Create your account" : "Welcome back";
  }, [isSignup]);

  const description = useMemo(() => {
    return isSignup ? "Sign up to create and manage short links." : "Log in to access your dashboard.";
  }, [isSignup]);

  return (
    <Card variant="glass" className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="relative grid grid-cols-2 rounded-xl border border-border bg-muted/40 p-1">
          <span className={cn("absolute bottom-1 top-1 w-[calc(50%-0.25rem)] rounded-lg bg-background shadow-sm transition-transform duration-300", isSignup ? "translate-x-full" : "translate-x-0")} />

          <button
            type="button"
            onClick={() => setMode("login")}
            className={cn("relative z-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors", !isSignup ? "text-foreground" : "text-muted-foreground")}
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => setMode("signup")}
            className={cn("relative z-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors", isSignup ? "text-foreground" : "text-muted-foreground")}
          >
            Sign up
          </button>
        </div>

        <form action={isSignup ? signupAction : loginAction} className="space-y-4 overflow-hidden">
          <div className={cn("grid transition-all duration-300", isSignup ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
            <div className="min-h-0 overflow-hidden">
              <div className="space-y-2 pb-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" required={isSignup} disabled={!isSignup || isPending} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required disabled={isPending} />
          </div>

          {loginState.error && !isSignup ? <p className="text-sm text-destructive">{loginState.error}</p> : null}

          {signupState.error && isSignup ? <p className="text-sm text-destructive">{signupState.error}</p> : null}

          <Button type="submit" variant={isSignup ? "gold" : "default"} className="w-full" disabled={isPending}>
            {isPending ? (isSignup ? "Creating account..." : "Logging in...") : isSignup ? "Create account" : "Log in"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account?" : "Need an account?"}{" "}
          <button type="button" onClick={() => setMode(isSignup ? "login" : "signup")} className="font-medium underline underline-offset-4">
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
