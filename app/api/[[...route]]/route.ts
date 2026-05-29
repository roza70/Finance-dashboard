import { z } from "zod";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@clerk/hono";
import { db } from "@/db";
import { accounts } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq, and, inArray } from "drizzle-orm";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app
  .get(
    "/accounts",
    clerkMiddleware({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const data = await db
        .select({ id: accounts.id, name: accounts.name })
        .from(accounts)
        .where(eq(accounts.userId, auth.userId));
      return c.json({ data });
    }
  )
  .post(
    "/accounts",
    clerkMiddleware({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }),
    zValidator("json", z.object({ name: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const { name } = c.req.valid("json");
      const data = await db
        .insert(accounts)
        .values({ id: createId(), name, userId: auth.userId })
        .returning();
      return c.json({ data });
    }
  )
  .post(
    "/accounts/bulk-delete",
    clerkMiddleware({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }),
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const { ids } = c.req.valid("json");
      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, ids)
          )
        )
        .returning({ id: accounts.id });
      return c.json({ data });
    }
  );

export const GET = handle(app);
export const POST = handle(app);