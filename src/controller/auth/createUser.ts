import { db } from "@/database";
import { RegisterUserRequest } from "@/model/userModel";
import { users } from "@/schema/userSchema";
import { VSREGISTER } from "@/validation/user/userValidation";
import { eq, or } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const userController = new Hono();

userController.post("/register", async (c) => {
  const request = VSREGISTER.parse(await c.req.json()) as RegisterUserRequest;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, request.username))
    .limit(1);

  if (existingUser.length > 0) {
    throw new HTTPException(400, {
      message: "User already exists",
    });
  }

  const hashedPassword = await Bun.password.hash(request.password, {
    algorithm: "bcrypt",
    cost: 12,
  });

  const response = await db
    .insert(users)
    .values({
      username: request.username,
      password: hashedPassword,
    })
    .returning();

  return c.json({ data: response, message: "success" }, 200);
});
