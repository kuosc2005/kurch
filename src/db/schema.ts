
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
export const db = drizzle(pool);

export const users = pgTable('user', {
  // Login 
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	email: text('email').notNull(),
  	password_hash: text('password_hash'),
 provider: text('provider').default('credentials'), // Default to 'credentials'
	profile_pic: text('profile_pic'),
	created_at: timestamp('created_at').defaultNow(),
	role: text('role').default('student').notNull(), // Default to 'user'
	is_verified: boolean('is_verified').default(false).notNull(), // New field for email verification

})


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


