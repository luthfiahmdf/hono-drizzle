import { userController } from "@/controller/auth/createUser";
import { getUserController } from "@/controller/auth/getUser";
import { loginController } from "@/controller/auth/loginUser";
import { Hono } from "hono";

export const UserRoutes = new Hono();

UserRoutes.route("/api/user", userController);
UserRoutes.route("/api/user", loginController);
UserRoutes.route("/api/user", getUserController);
