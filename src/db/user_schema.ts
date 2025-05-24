import {
	timestamp,
	pgTable,
	text,
	uuid,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

const connectionString = process.env.AUTH_DRIZZLE_URL || "";
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)

export const users = pgTable('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	email: text('email').notNull(),
  password_hash: text('password_hash'),
	profile_pic: text('profile_pic'),
	createdAt: timestamp('created_at').defaultNow(),
	orcid: text('orcid')
})

