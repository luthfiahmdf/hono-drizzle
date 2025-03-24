import { Hono } from "hono";

import { UserRoutes } from "./routes/userRoutes";
import { BookRoutes } from "./routes/bookRoutes";
import { CategoryRoutes } from "./routes/categoryRoutes";
import { BooksSourceRoutes } from "./routes/bookSourceRoutes";

const app = new Hono();
app.route("/", UserRoutes);
app.route("/", BookRoutes);
app.route("/", CategoryRoutes);
app.route("/", BooksSourceRoutes);
// app.get("/", async (c) => {
//   const result = await db.execute("select 1");
//   return c.json(result, 200);
// });
app.get("/", (c) => c.text("Hello World"));

export default app;
