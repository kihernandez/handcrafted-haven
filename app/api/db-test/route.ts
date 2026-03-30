import { sql } from '@/lib/db';

export async function GET() {
  const result = await sql`SELECT 'Database connected successfully!' AS message`;
  return Response.json(result);
}
