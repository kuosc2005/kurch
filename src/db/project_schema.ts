import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user_schema";

export const project = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  abstract: text("abstract").notNull(),
  tags: text("tags").notNull(), // store JSON stringified
  semester: text("semester").notNull(),
  field_of_study: text("field_of_study").notNull(),
  technologies: text("technologies").notNull(), // store JSON stringified
  categories: text("categories").notNull(), // store JSON stringified
  view_count: integer("view_count").default(0),
  like_count: integer("like_count").default(0),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at"),
  views: integer("views").default(0),
  forks: integer("forks").default(0),
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  github_link: text("github_link"), // New field
  report_link: text("report_link"), // New field
});
