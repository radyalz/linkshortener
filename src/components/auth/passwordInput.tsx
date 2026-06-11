"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import { FloatingAuthInput } from "@/components/auth/floatingAuthInput";
import { cn } from "@/lib/utils";

type PasswordInputProps = {
  id: string;
  name: string;
  label: string;
  autoComplete: string;
  disabled: boolean;
  error?: boolean;
  errorMessage?: string | null;
};

export function PasswordInput({ id, name, label, autoComplete, disabled, error, errorMessage }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = Boolean(error || errorMessage);
  return (
    <FloatingAuthInput
      id={id}
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      required
      autoComplete={autoComplete}
      disabled={disabled}
      error={error}
      errorMessage={errorMessage}
      icon={<LockKeyhole className="size-4" />}
      endAdornment={
        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          disabled={disabled}
          className={cn(
            "absolute right-3 top-1/2 z-20 -translate-y-1/2 transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
            hasError ? "text-destructive hover:text-destructive" : "text-muted-foreground",
          )}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      }
    />
  );
}
