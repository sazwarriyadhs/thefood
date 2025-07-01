
import { db } from '@vercel/postgres';

// The 'db' object from @vercel/postgres provides a query method and a connect method
// that are compatible with node-postgres, making it a suitable replacement.
// It manages connections efficiently for serverless environments like Vercel.
export default db;
