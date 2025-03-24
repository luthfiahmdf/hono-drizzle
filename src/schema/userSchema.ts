import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const users = table("users", {
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  username: t.text("username").notNull().unique(),
  password: t.text("password").notNull(),
  createdAt: t.timestamp("created_at").defaultNow(),
});
