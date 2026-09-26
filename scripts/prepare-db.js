const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

const dbUrl = process.env.DATABASE_URL || '';

if (dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://')) {
  console.log('>>> [Database Adapter] Detected PostgreSQL connection string (Neon / Supabase / Vercel Postgres)...');
  schema = schema.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
  fs.writeFileSync(schemaPath, schema);

  try {
    console.log('>>> [Database Adapter] Syncing PostgreSQL schema with prisma db push...');
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
    console.log('>>> [Database Adapter] Checking database seeding...');
    execSync('node scripts/seed-all.js', { stdio: 'inherit' });
  } catch (err) {
    console.error('>>> [Database Adapter] PostgreSQL setup error:', err.message);
  }
} else {
  console.log('>>> [Database Adapter] Using local SQLite database...');
  if (schema.includes('provider = "postgresql"')) {
    schema = schema.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
    fs.writeFileSync(schemaPath, schema);
  }
}
