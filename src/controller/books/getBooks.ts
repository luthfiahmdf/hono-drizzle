import { db } from "@/database";
import { bookSources } from "@/schema/bookSourceSchema";
import { books } from "@/schema/booksSchema";
import { categories } from "@/schema/categorySchema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const getBooksController = new Hono();

getBooksController.get("/", async (c) => {
  try {
    const response = await db.query.books.findMany({
      with: {
        category: true,
        bookSource: true,
      },
    });

    return c.json({ data: response, message: "success" }, 200);
  } catch (error) {
    throw new HTTPException(400, {
      message: "Failed to get books",
    });
  }
});
