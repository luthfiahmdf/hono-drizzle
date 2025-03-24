import { Hono } from "hono";
import { db } from "./database";
import { userController } from "./controller/auth/createUser";
import { UserRoutes } from "./routes/userRoutes";

const app = new Hono();
app.route("/", UserRoutes);
// app.get("/", async (c) => {
//   const result = await db.execute("select 1");
//   return c.json(result, 200);
// });
app.get("/", (c) => c.text("Hello World"));

export default app;
