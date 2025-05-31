<<<<<<< HEAD
import { pgTable, serial, text, integer, boolean, timestamp, PgTimestamp, uuid} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './user_schema';

export const project = pgTable('project', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(()=>users.id).notNull(), 
  title: text('title').notNull(),
  description: text('description').notNull(),
  keywords: text('keywords').array().notNull(),
  abstract: text('abstract').notNull(),
  uploaded_files: text('uploaded_files').array(), 
  collaborators: text('collaborators').array(), 
  visibility: text('visibility').notNull(),
  view_count: integer('view_count').default(0),
  like_count: integer('like_count').default(0),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp(),
})
