import { db } from "@/database";
import { users } from "@/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const getUserController = new Hono();

getUserController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const response = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return c.json({ data: response, message: "success" }, 200);
  } catch (error) {
    throw new HTTPException(400, {
      message: "Failed to get user",
    });
  }
});
