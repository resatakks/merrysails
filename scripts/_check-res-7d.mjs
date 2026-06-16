import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
const url = new URL(process.env.DATABASE_URL);
url.searchParams.set('sslmode','verify-full');
url.searchParams.delete('uselibpqcompat');
const adapter = new PrismaPg({ connectionString: url.toString() });
const p = new PrismaClient({ adapter });
const since = new Date(Date.now() - 7*86400000);
const rows = await p.reservation.findMany({
  where: { createdAt: { gte: since } },
  select: { reservationId:true, createdAt:true, status:true, tourSlug:true, totalPrice:true, customerCountry:true, gclid: true },
  orderBy: { createdAt: 'desc' }
});
console.log('=== MS last 7d:', rows.length, '===');
rows.forEach(r=>console.log(`${r.createdAt.toISOString()} | ${r.reservationId} | ${r.status} | ${r.tourSlug} | €${r.totalPrice} | ${r.customerCountry||'?'} | gclid=${r.gclid?'Y':'N'}`));
const grouped = {};
rows.forEach(r=>{ const d=r.createdAt.toISOString().slice(0,10); grouped[d]=(grouped[d]||0)+1; });
console.log('\n--- by day ---');
Object.entries(grouped).sort().forEach(([d,c])=>console.log(`${d}: ${c}`));
await p.$disconnect();
