import { drizzle } from "drizzle-orm/node-postgres";
import { PgSchema } from "drizzle-orm/pg-core";
import { Pool } from "pg";
import * as schema from "../schema/index";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle({ schema, client: pool });
