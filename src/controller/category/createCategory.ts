import { db } from "@/database";
import { CreateBookCategoryRequest } from "@/model/booksModel";
import { categories } from "@/schema/categorySchema";
import { VSCREATECATEGORY } from "@/validation/user/booksValidation";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const createCategoryController = new Hono();

createCategoryController.post("/create", async (c) => {
  try {
    const request = VSCREATECATEGORY.parse(
      await c.req.json()
    ) as CreateBookCategoryRequest;
    const response = await db
      .insert(categories)
      .values({
        name: request.name,
      })
      .returning();
    return c.json({ data: response, message: "success" }, 200);
  } catch (error) {
    throw new HTTPException(400, {
      message: "Failed to create category",
    });
  }
});
