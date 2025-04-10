import { createBookSourceController } from "@/controller/bookSource/createBookSource";
import { getBookSourceController } from "@/controller/bookSource/getBookSource";
import { Hono } from "hono";

export const BooksSourceRoutes = new Hono();
BooksSourceRoutes.route("/api/bookSource", createBookSourceController);
BooksSourceRoutes.route("/api/bookSource", getBookSourceController);
