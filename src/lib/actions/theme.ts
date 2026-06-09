"use server";

import { cookies } from "next/headers";

export type AppTheme = "light" | "dark";

export async function setThemeAction(theme: AppTheme) {
  const cookieStore = await cookies();

  cookieStore.set("theme", theme, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}
