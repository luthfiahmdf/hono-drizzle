import { db } from "@/database";
import { RegisterUserRequest } from "@/model/userModel";
import { users } from "@/schema";
import { VSREGISTER } from "@/validation/user/userValidation";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const updateUserController = new Hono();

updateUserController.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const request = VSREGISTER.parse(await c.req.json()) as RegisterUserRequest;
    const response = await db
      .update(users)
      .set({
        ...request,
      })
      .where(eq(users.id, id))
      .returning();

    return c.json(
      {
        data: response,
        message: "Update User Success",
      },
      200
    );
  } catch (error) {
    throw new HTTPException(400, {
      message: "Update User Failed",
    });
  }
});
