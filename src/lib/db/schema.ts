import { index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const links = pgTable(
  "links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),

    slug: text("slug").notNull(),
    title: text("title"),
    destinationUrl: text("destination_url").notNull(),

    clickCount: integer("click_count").notNull().default(0),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("links_user_id_slug_unique").on(table.userId, table.slug),
    index("links_slug_idx").on(table.slug),
    index("links_user_id_idx").on(table.userId),
  ],
);

export const clicks = pgTable(
  "clicks",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    linkId: uuid("link_id")
      .notNull()
      .references(() => links.id, { onDelete: "cascade" }),

    clickedAt: timestamp("clicked_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("clicks_link_id_idx").on(table.linkId), index("clicks_clicked_at_idx").on(table.clickedAt)],
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;

export type Click = typeof clicks.$inferSelect;
export type NewClick = typeof clicks.$inferInsert;
