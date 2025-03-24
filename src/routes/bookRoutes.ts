import { createBooksController } from "@/controller/books/createBook";
import { getBooksController } from "@/controller/books/getBooks";
import { Hono } from "hono";

export const BookRoutes = new Hono();

BookRoutes.route("/api/books", createBooksController);
BookRoutes.route("/api/books", getBooksController);
