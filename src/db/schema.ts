
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { is } from "drizzle-orm";

const {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_HOST ,
	POSTGRES_PORT ,
	POSTGRES_DB,
} = process.env;

if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB) {
	throw new Error("Missing required PostgreSQL environment variables");
}

const connectionString = `postgres://${encodeURIComponent(POSTGRES_USER)}:${encodeURIComponent(POSTGRES_PASSWORD)}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const pool = postgres(connectionString, { max: 1 });



export const users = pgTable("user", {
	//Login

  id: uuid("id").primaryKey().defaultRandom(),  // Login 
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash"),
  provider: text("provider").default("credentials"),
  profile_pic: text("profile_pic"),
  created_at: timestamp("created_at").defaultNow(),
  role: text("role").default("student").notNull(),
  is_verified: boolean("is_verified").default(false).notNull(),
});

export const email_otps = pgTable("email_otps", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  otp: text("otp").notNull(),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});




export const project = pgTable('project', {
	id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(()=>users.id), 
	title: text('title').notNull(),
	description: text('description').notNull(),
  keywords: (text('keywords')).notNull(),
	abstract: text('abstract').notNull(),
	uploaded_files: text('uploaded_files'),
	status: text('role').default('user').notNull(),
  visibility: text('visibility').notNull(),
  view_count: integer('view_count').default(0),
  like_count: integer('like_count').default(0),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp(),
})


export const db = drizzle(pool, {
  schema: {
    users,
    email_otps,
    project,
  },
});