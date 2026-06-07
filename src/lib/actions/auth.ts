"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";

export type AuthActionState = {
  data: null;
  error: string | null;
};

export const initialAuthActionState: AuthActionState = {
  data: null,
  error: null,
};

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

  redirect("/login");
}
