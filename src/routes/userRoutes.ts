import { userController } from "@/controller/auth/createUser";
import { loginController } from "@/controller/auth/loginUser";
import { Hono } from "hono";

export const UserRoutes = new Hono();

UserRoutes.route("/api/user", userController);
UserRoutes.route("/api/user", loginController);
