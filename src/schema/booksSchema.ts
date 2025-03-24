import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { categories } from "./categorySchema";
import { relations } from "drizzle-orm";
import { bookSources } from "./bookSourceSchema";

export const books = table("books", {
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  booksName: t.text("books_name").notNull(),
  categoryId: t
    .text("category_id")
    .notNull()
    .references(() => categories.id),
  bookSourceId: t
    .text("book_source_id")
    .notNull()
    .references(() => bookSources.id),
  createdAt: t.timestamp("created_at").defaultNow(),
});
export const categoryBookRelation = relations(categories, ({ many }) => ({
  books: many(books),
}));
export const bookSourceRelation = relations(bookSources, ({ many }) => ({
  books: many(books),
}));
