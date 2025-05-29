import {
	timestamp,
	pgTable,
	text,
	uuid,
} from "drizzle-orm/pg-core"


export const users = pgTable('user', {
  // Login 
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	email: text('email').notNull(),
  password_hash: text('password_hash'),
  // Post Login 
	profile_pic: text('profile_pic'),
	created_at: timestamp('created_at').defaultNow(),
	role: text('role').default('user').notNull(), // Default to 'user'

})

