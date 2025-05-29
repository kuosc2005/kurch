import { pgTable, serial, text,textArray, integer, boolean, timestamp, PgTimestamp, uuid} from 'drizzle-orm/pg-core';
import { users } from './user_schema';

export const project = pgTable('project', {
	id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(()=>users.id), 
	title: text('title').notNull(),
	description: text('description').notNull(),
  keywords: textArray('keywords').notNull(),
	abstract: text('abstract').notNull(),
	uploaded_files: text('uploaded_files'),
	status: text('role').default('user').notNull(),
  visibility: text('visibility').notNull(),
  view_count: integer('view_count').default(0),
  like_count: integer('like_count').default(0),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp(),
})

