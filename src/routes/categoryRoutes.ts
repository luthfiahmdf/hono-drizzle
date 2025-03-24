import { createCategoryController } from "@/controller/category/createCategory";
import { Hono } from "hono";

export const CategoryRoutes = new Hono();

CategoryRoutes.route("/api/category", createCategoryController);
