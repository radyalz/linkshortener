"use server";

import { cookies } from "next/headers";
import { z } from "zod";

export type AppTheme = "light" | "dark";

const themeSchema = z.enum(["light", "dark"]);

export async function setThemeAction(theme: AppTheme) {
  const parsed = themeSchema.safeParse(theme);

  if (!parsed.success) {
    return;
  }

  const cookieStore = await cookies();

  cookieStore.set("theme", parsed.data, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}
