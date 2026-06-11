import { type WizardStep } from "@/components/auth/authWizard.types";

export const authHeaderContent: Record<
  WizardStep,
  {
    title: string;
    description: string;
  }
> = {
  email: {
    title: "Authentication required",
    description: "To continue, you need to be authenticated. Enter your email and we’ll take you to the right next step.",
  },
  login: {
    title: "Welcome back",
    description: "This email already has an account. Enter your password to continue.",
  },
  signup: {
    title: "Create your account",
    description: "No account found for this email. Create your account now.",
  },
};

export const authButtonClassName: Record<WizardStep, string> = {
  email:
    "h-10 w-full rounded-[4px] border-amber-500/40 bg-amber-500/5 text-amber-800 shadow-none transition-all hover:bg-amber-500/10 hover:text-amber-900 dark:border-amber-300/35 dark:bg-amber-300/10 dark:text-amber-100 dark:hover:bg-amber-300/15",
  login:
    "h-10 w-full rounded-[4px] border border-amber-500/45 bg-amber-500/10 text-amber-900 shadow-sm shadow-amber-950/10 transition-all hover:bg-amber-500/15 hover:text-amber-950 dark:border-amber-300/35 dark:bg-amber-300/10 dark:text-amber-100 dark:shadow-black/20 dark:hover:bg-amber-300/15",
  signup: "h-10 w-full rounded-[4px] shadow-lg shadow-amber-950/15 transition-all",
};
