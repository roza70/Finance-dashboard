import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@clerk/hono";
import { db } from "@/db";
import { accounts } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq, and, inArray } from "drizzle-orm";

const app = new Hono()
  .get(
    "/",
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
  .get(
    "/:id",
    clerkMiddleware({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const { id } = c.req.param();
      const data = await db
        .select({ id: accounts.id, name: accounts.name })
        .from(accounts)
        .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)));
      if (!data[0]) return c.json({ error: "Not found" }, 404);
      return c.json({ data: data[0] });
    }
  )
  .post(
    "/",
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
    "/bulk-delete",
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
          and(eq(accounts.userId, auth.userId), inArray(accounts.id, ids))
        )
        .returning({ id: accounts.id });
      return c.json({ data });
    }
  )
  .patch(
    "/:id",
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
      const { id } = c.req.param();
      const { name } = c.req.valid("json");
      const data = await db
        .update(accounts)
        .set({ name })
        .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))
        .returning();
      if (!data[0]) return c.json({ error: "Not found" }, 404);
      return c.json({ data: data[0] });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const { id } = c.req.param();
      const data = await db
        .delete(accounts)
        .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))
        .returning({ id: accounts.id });
      if (!data[0]) return c.json({ error: "Not found" }, 404);
      return c.json({ data: data[0] });
    }
  );

export default app;