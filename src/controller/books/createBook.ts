import { db } from "@/database";
import { CreateBookRequest } from "@/model/booksModel";
import { books } from "@/schema/booksSchema";
import { VSCREATEBOOK } from "@/validation/user/booksValidation";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const createBooksController = new Hono();

createBooksController.post("/", async (c) => {
  try {
    const request = VSCREATEBOOK.parse(await c.req.json()) as CreateBookRequest;
    const response = await db
      .insert(books)
      .values({
        booksName: request.booksName,
        categoryId: request.categoryId,
        bookSourceId: request.bookSourceId,
      })
      .returning();
    return c.json({ data: response, message: "success" }, 200);
  } catch (error) {
    throw new HTTPException(400, {
      message: "Failed to create book",
    });
  }
});
