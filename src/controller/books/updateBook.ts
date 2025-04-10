import { db } from "@/database";
import { CreateBookRequest } from "@/model/booksModel";
import { books } from "@/schema";
import { VSCREATEBOOK } from "@/validation/user/booksValidation";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

export const updateBookController = new Hono();
updateBookController.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const request = VSCREATEBOOK.parse(await c.req.json()) as CreateBookRequest;
    const response = await db
      .update(books)
      .set({
        ...request,
      })
      .where(eq(books.id, id))
      .returning();
    return c.json({ data: response, message: "update Book success" }, 200);
  } catch (error) {
    return c.json({ message: "Failed to update book" }, 400);
  }
});
