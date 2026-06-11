"use client";
import { useState, type ComponentProps, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const floatingFieldClassName =
  "group relative rounded-[4px] border border-slate-300/80 bg-white/90 shadow-sm shadow-black/5 transition-all focus-within:border-amber-500/75 focus-within:ring-2 focus-within:ring-amber-500/15 dark:border-white/15 dark:bg-white/[0.06] dark:shadow-black/30 dark:focus-within:border-amber-300/65 dark:focus-within:ring-amber-300/15";
const floatingFieldErrorClassName =
  "border-destructive/70 bg-destructive/5 focus-within:border-destructive focus-within:ring-2 focus-within:ring-destructive/15 dark:border-destructive/60 dark:bg-destructive/10 dark:focus-within:border-destructive dark:focus-within:ring-destructive/20";
const floatingInputClassName =
  "peer h-10 rounded-[4px] border-0 bg-transparent px-3 pb-2.5 pt-3.5 text-sm leading-none shadow-none placeholder:text-transparent focus-visible:border-transparent focus-visible:ring-0 disabled:bg-transparent disabled:opacity-100";
const floatingLabelClassName =
  "pointer-events-none absolute top-0 z-10 -translate-y-1/2 rounded-[3px] bg-background px-1 text-[11px] font-medium leading-none text-muted-foreground transition-all duration-150 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:bg-background peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-amber-700 dark:bg-card dark:peer-placeholder-shown:bg-transparent dark:peer-focus:bg-card dark:peer-focus:text-amber-200";

type FloatingAuthInputProps = Omit<ComponentProps<typeof Input>, "id" | "placeholder"> & {
  id: string;
  label: string;
  icon: ReactNode;
  endAdornment?: ReactNode;
  fieldClassName?: string;
  error?: boolean;
  errorMessage?: string | null;
};

export function FloatingAuthInput({ id, label, icon, endAdornment, fieldClassName, className, disabled, error, errorMessage, onInvalid, onInput, ...props }: FloatingAuthInputProps) {
  const [nativeErrorMessage, setNativeErrorMessage] = useState("");
  const visibleErrorMessage = errorMessage || nativeErrorMessage;
  const hasError = Boolean(error || visibleErrorMessage);
  return (
    <div className="space-y-1.5">
      <div className={cn(floatingFieldClassName, hasError && floatingFieldErrorClassName, disabled && "opacity-60", fieldClassName)}>
        <span
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-amber-700 dark:group-focus-within:text-amber-200",
            hasError && "text-destructive group-focus-within:text-destructive dark:group-focus-within:text-destructive",
          )}
        >
          {icon}
        </span>
        <Input
          id={id}
          disabled={disabled}
          placeholder=" "
          aria-invalid={hasError || undefined}
          aria-describedby={visibleErrorMessage ? `${id}-error` : undefined}
          onInvalid={(event) => {
            setNativeErrorMessage(event.currentTarget.validationMessage);
            onInvalid?.(event);
          }}
          onInput={(event) => {
            setNativeErrorMessage("");
            onInput?.(event);
          }}
          className={cn(floatingInputClassName, "pl-9", endAdornment && "pr-9", hasError && "text-destructive caret-destructive", className)}
          {...props}
        />
        <label htmlFor={id} className={cn(floatingLabelClassName, "left-8", hasError && "text-destructive peer-focus:text-destructive dark:peer-focus:text-destructive")}>
          {label}
        </label>
        {endAdornment}
      </div>
    </div>
  );
}
