"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";
import type { AuthActionState, EmailCheckActionState } from "@/lib/actions/auth-state";
import { checkEmailSchema, signInSchema, signUpSchema } from "@/lib/validations/auth";
import { getNeonAuthUserByEmail } from "@/lib/db/authQueries";
export async function checkEmailAction(_prevState: EmailCheckActionState, formData: FormData): Promise<EmailCheckActionState> {
  const parsed = checkEmailSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      data: null,
      error: parsed.error.issues[0]?.message ?? "Enter a valid email address.",
    };
  }

  const user = await getNeonAuthUserByEmail(parsed.data.email);

  return {
    data: {
      email: parsed.data.email,
      mode: user ? "login" : "signup",
      emailVerified: user?.emailVerified ?? null,
    },
    error: null,
  };
}
export async function signUpAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      data: null,
      error: parsed.error.issues[0]?.message ?? "Invalid sign up details.",
    };
  }

  const { error } = await auth.signUp.email({
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      data: null,
      error: "Could not create account. Try another email or sign in.",
    };
  }

  redirect("/dashboard");
}

export async function signInAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      data: null,
      error: parsed.error.issues[0]?.message ?? "Invalid login details.",
    };
  }

  const { error } = await auth.signIn.email({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      data: null,
      error: "Invalid email or password.",
    };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  await auth.signOut();

  redirect("/");
}
