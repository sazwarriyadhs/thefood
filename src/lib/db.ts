
import { Pool } from 'pg';

// Pastikan variabel lingkungan DATABASE_URL sudah diatur di file .env Anda
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Variabel lingkungan DATABASE_URL tidak diatur.');
}

const pool = new Pool({
  connectionString,
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
