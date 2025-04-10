import { db } from "@/database";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const getBookSourceController = new Hono();
getBookSourceController.get("/", async (c) => {
  try {
    const response = await db.query.bookSources.findMany();
    return c.json({ data: response, message: "success" }, 200);
  } catch (error) {
    throw new HTTPException(400, {
      message: "Failed to get book source",
    });
  }
});
