import { and, count, desc, eq, gte, sql } from "drizzle-orm";

import { db } from "./index";
import { clicks, links, type NewLink } from "./schema";

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function getLinkByIdForUser(linkId: string, userId: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .limit(1);

  return link ?? null;
}

export async function getLinkBySlug(slug: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.slug, slug))
    .limit(1);

  return link ?? null;
}

export async function createLink(data: NewLink) {
  const [link] = await db.insert(links).values(data).returning();

  return link;
}

export async function deleteLinkForUser(linkId: string, userId: string) {
  const [deletedLink] = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  return deletedLink ?? null;
}

export async function recordClick(linkId: string) {
  await db.insert(clicks).values({
    linkId,
  });

  const [updatedLink] = await db
    .update(links)
    .set({
      clickCount: sql`${links.clickCount} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(links.id, linkId))
    .returning();

  return updatedLink ?? null;
}

export async function getClicksPerDayForLastSevenDays(linkId: string) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);

  const rows = await db
    .select({
      day: sql<string>`to_char(date_trunc('day', ${clicks.clickedAt}), 'YYYY-MM-DD')`,
      total: count(clicks.id),
    })
    .from(clicks)
    .where(and(eq(clicks.linkId, linkId), gte(clicks.clickedAt, startDate)))
    .groupBy(sql`date_trunc('day', ${clicks.clickedAt})`)
    .orderBy(sql`date_trunc('day', ${clicks.clickedAt})`);

  const totalsByDay = new Map(rows.map((row) => [row.day, row.total]));

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const day = date.toISOString().slice(0, 10);

    return {
      day,
      clicks: totalsByDay.get(day) ?? 0,
    };
  });
}