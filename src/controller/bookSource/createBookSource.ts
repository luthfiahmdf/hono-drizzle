import { db } from "@/database";
import { CreateBookSoureceRequest } from "@/model/booksModel";
import { bookSources } from "@/schema/bookSourceSchema";
import { VSCREATEBOOKSOURCE } from "@/validation/user/booksValidation";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const createBookSourceController = new Hono();

createBookSourceController.post("/", async (c) => {
  try {
    const request = VSCREATEBOOKSOURCE.parse(
      await c.req.json()
    ) as CreateBookSoureceRequest;
    const response = await db
      .insert(bookSources)
      .values({
        name: request.name,
      })
      .returning();
    return c.json({ data: response, message: "success" }, 200);
  } catch (error) {
    throw new HTTPException(400, {
      message: "Failed to create book source",
    });
  }
});
