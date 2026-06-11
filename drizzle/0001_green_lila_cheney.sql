DROP INDEX "links_slug_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "links_user_id_slug_unique" ON "links" USING btree ("user_id","slug");--> statement-breakpoint
CREATE INDEX "links_slug_idx" ON "links" USING btree ("slug");