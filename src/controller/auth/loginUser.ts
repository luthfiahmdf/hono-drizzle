import { db } from "@/database";
import { LoginUserRequest } from "@/model/userModel";
import { users } from "@/schema/userSchema";
import { VSLOGIN } from "@/validation/user/userValidation";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { HTTPException } from "hono/http-exception";

export const loginController = new Hono();
loginController.post("/login", async (c) => {
  const request = VSLOGIN.parse(await c.req.json()) as LoginUserRequest;
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, request.username))
    .limit(1);

  if (existingUser.length === 0) {
    throw new HTTPException(400, {
      message: "User not found",
    });
  }

  const user = existingUser[0];
  const isPasswordValid = await Bun.password.verify(
    request.password,
    user.password,
    "bcrypt"
  );

  if (!isPasswordValid)
    throw new HTTPException(400, {
      message: "Invalid password",
    });
  const payload = {
    id: user.id,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET!;
  const token = await sign(payload, secret);
  return c.json({
    message: "Login successful",
    token: token,
  });
});
