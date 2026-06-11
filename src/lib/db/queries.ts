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
    .orderBy(desc(links.createdAt))
    .limit(1);

  return link ?? null;
}

export async function createLink(data: NewLink) {
  const [link] = await db.insert(links).values(data).returning();

  return link;
}

export async function getLinkBySlugForUser(slug: string, userId: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(and(eq(links.slug, slug), eq(links.userId, userId)))
    .limit(1);

  return link ?? null;
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

function formatChartDay(isoDay: string) {
  const [year, month, day] = isoDay.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export async function getClicksPerDayForLastSevenDays(linkId: string) {
  const now = new Date();

  const startDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 6),
  );

  const rows = await db
    .select({
      isoDay: sql<string>`to_char(date_trunc('day', ${clicks.clickedAt} AT TIME ZONE 'UTC'), 'YYYY-MM-DD')`,
      total: count(clicks.id),
    })
    .from(clicks)
    .where(and(eq(clicks.linkId, linkId), gte(clicks.clickedAt, startDate)))
    .groupBy(sql`date_trunc('day', ${clicks.clickedAt} AT TIME ZONE 'UTC')`)
    .orderBy(sql`date_trunc('day', ${clicks.clickedAt} AT TIME ZONE 'UTC')`);

  const totalsByDay = new Map(rows.map((row) => [row.isoDay, row.total]));

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + index);

    const isoDay = date.toISOString().slice(0, 10);

    return {
      day: formatChartDay(isoDay),
      clicks: totalsByDay.get(isoDay) ?? 0,
    };
  });
}