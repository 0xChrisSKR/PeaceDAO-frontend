// app/config/route.ts
import { peaceConfig } from '@/lib/peaceConfig';

export const dynamic = 'force-static';
export const revalidate = 60;

export async function GET() {
  return Response.json(peaceConfig, {
    headers: { 'Cache-Control': 'public, max-age=60, s-maxage=300' },
  });
}
