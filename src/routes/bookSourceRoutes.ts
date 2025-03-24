import { createBookSourceController } from "@/controller/bookSource/createBookSource";
import { Hono } from "hono";

export const BooksSourceRoutes = new Hono();
BooksSourceRoutes.route("/api/bookSource", createBookSourceController);
