import { sql } from "drizzle-orm";

import { db } from "@/lib/db";

type NeonAuthUserRow = {
  id: string;
  emailVerified: boolean | null;
};

export async function getNeonAuthUserByEmail(email: string) {
  const result = await db.execute<NeonAuthUserRow>(sql`
    select
      id,
      "emailVerified"
    from neon_auth."user"
    where lower(email) = lower(${email})
    limit 1
  `);

  return result.rows[0] ?? null;
}
