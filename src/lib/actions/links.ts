"use server";

import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { LinkActionState } from "@/lib/actions/link-state";
import { auth } from "@/lib/auth/server";
import { createLink, deleteLinkForUser,getLinkBySlug } from "@/lib/db/queries";
import { createLinkSchema } from "@/lib/validations/links";

const generateSlug = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);

export async function createLinkAction(_prevState: LinkActionState, formData: FormData): Promise<LinkActionState> {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const parsed = createLinkSchema.safeParse({
    destinationUrl: formData.get("destinationUrl"),
    slug: formData.get("slug"),
    title: formData.get("title"),
  });

  if (!parsed.success) {
    return {
      data: null,
      error: parsed.error.issues[0]?.message ?? "Please check the link details and try again.",
    };
  }

  const slug = parsed.data.slug ?? generateSlug();

  const existingLink = await getLinkBySlug(slug);

  if (existingLink) {
    return {
      data: null,
      error: "That slug is already taken. Please choose another one.",
    };
  }

  try {
    await createLink({
      userId: session.user.id,
      slug,
      title: parsed.data.title ?? null,
      destinationUrl: parsed.data.destinationUrl,
    });

    revalidatePath("/dashboard");

    return {
      data: {
        slug,
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "Could not create the short link. Please try again.",
    };
  }
}
export async function deleteLinkAction(formData: FormData) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const linkId = formData.get("linkId");

  if (typeof linkId !== "string" || linkId.length === 0) {
    return;
  }

  await deleteLinkForUser(linkId, session.user.id);

  revalidatePath("/dashboard");
}