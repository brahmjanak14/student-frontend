import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@shared/schema';

function getReplitDatabaseUrl(): string {
  const pgHost = process.env.PGHOST;
  const pgUser = process.env.PGUSER;
  const pgPassword = process.env.PGPASSWORD;
  const pgDatabase = process.env.PGDATABASE;
  const pgPort = process.env.PGPORT || '5432';
  
  if (pgHost && pgUser && pgPassword && pgDatabase) {
    return `postgresql://${pgUser}:${pgPassword}@${pgHost}:${pgPort}/${pgDatabase}`;
  }
  
  return '';
}

const replitDbUrl = getReplitDatabaseUrl();
const dbUrl = replitDbUrl || process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is not set and Replit database credentials not found");
}

console.log(`Using database: ${dbUrl.includes('heliumdb') ? 'Replit built-in database' : 'External database'}`);

const sql = neon(dbUrl);
export const db = drizzle(sql, { schema });
