"use server";

import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { DeleteLinkActionResult, LinkActionState } from "@/lib/actions/link-state";
import { auth } from "@/lib/auth/server";
import { createLink, deleteLinkForUser, getLinkBySlugForUser } from "@/lib/db/queries";
import { createLinkSchema, deleteLinkSchema } from "@/lib/validations/links";

const generateSlug = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
async function generateUniqueSlugForUser(userId: string) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = generateSlug();
    const existingLink = await getLinkBySlugForUser(slug, userId);

    if (!existingLink) {
      return slug;
    }
  }

  return generateSlug();
}

export async function createLinkAction(_prevState: LinkActionState, formData: FormData): Promise<LinkActionState> {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/authentication");
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

  const slug = parsed.data.slug ?? (await generateUniqueSlugForUser(session.user.id));

  const existingLink = await getLinkBySlugForUser(slug, session.user.id);

  if (existingLink) {
    return {
      data: null,
      error: "You already have a link with that slug. Please choose another one.",
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
export async function deleteLinkAction(formData: FormData): Promise<DeleteLinkActionResult> {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/authentication");
  }

  const parsed = deleteLinkSchema.safeParse({
    linkId: formData.get("linkId"),
  });

  if (!parsed.success) {
    return {
      data: null,
      error: parsed.error.issues[0]?.message ?? "Invalid link id.",
    };
  }

  const deletedLink = await deleteLinkForUser(parsed.data.linkId, session.user.id);

  if (!deletedLink) {
    return {
      data: null,
      error: "Link was not found or already deleted.",
    };
  }

  revalidatePath("/dashboard");

  return {
    data: {
      id: deletedLink.id,
    },
    error: null,
  };
}
