import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const bookSources = table("book_sources", {
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: t.text("name").notNull().unique(),
  createdAt: t.timestamp("created_at").defaultNow(),
});
