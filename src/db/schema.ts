
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

const {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_HOST = "localhost",
	POSTGRES_PORT = "5432",
	POSTGRES_DB,
} = process.env;

if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB) {
	throw new Error("Missing required PostgreSQL environment variables");
}

const connectionString = `postgres://${encodeURIComponent(POSTGRES_USER)}:${encodeURIComponent(POSTGRES_PASSWORD)}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const pool = postgres(connectionString, { max: 1 });
export const db = drizzle(pool);
