import { pgTable, serial, text, integer, boolean, varchar, timestamp } from 'drizzle-orm/pg-core';

export const researchPapers = pgTable('research_papers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  title: text('title'),
  description: text('description'),
  abstract: text('abstract'),

  // Research Type
  researchType: text('research_type'),

  // Journal / Conference
  journalName: text('journal_name'),
  conferenceName: text('conference_name'),
  bookTitle: text('book_title'),
  publisher: text('publisher'),

  // Publication Info
  volume: text('volume'),
  issue: text('issue'),
  pages: text('pages'),
  doi: text('doi'),
  isbn: text('isbn'),
  issn: text('issn'),
  arxivId: text('arxiv_id'),
  pubmedId: text('pubmed_id'),

  // URLs
  url: text('url'),
  pdfUrl: text('pdf_url'),

  // Authors
  authors: text('authors'),
  correspondingAuthor: text('corresponding_author'),
  authorPosition: text('author_position'),

  // Metrics
  citations: integer('citations'),
  viewCount: integer('view_count'),
  downloadCount: integer('download_count'),
  likeCount: integer('like_count'),
  bookmarkCount: integer('bookmark_count'),

  // Keywords & Files
  keywords: text('keywords'),
  researchArea: text('research_area'),
  fileAttachment: text('file_attachment'),

  // Visibility
  visibility: boolean('visibility').default(true),
  isFeatured: boolean('is_featured').default(false),
  status: text('status'),

  createdAt: timestamp('created_at').defaultNow(),
});
