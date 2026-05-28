import { Hono } from "hono";
import { handle } from "hono/vercel";
// import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db";
import { accounts } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { clerkMiddleware, getAuth } from "@clerk/hono";

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
      const data = await db.select().from(accounts);
      return c.json({ data });
    }
  )
  .post(
    "/accounts",
    clerkMiddleware({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }),
    zValidator("json", z.object({
      name: z.string(),
    })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const { name } = c.req.valid("json");
      const data = await db.insert(accounts).values({
        id: createId(),
        name,
        userId: auth.userId,
      }).returning();
      return c.json({ data });
    }
  );

export const GET = handle(app);
export const POST = handle(app);