// run-migration.mjs
// Node.js script to run the Supabase DB migration
// Usage: node run-migration.mjs
//
// This uses the Supabase Management API with the service role key.
// You can get the service_role key from:
// Supabase Dashboard → Project Settings → API → service_role key

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from .env file
const envContent = readFileSync(join(__dirname, '.env'), 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) env[key.trim()] = vals.join('=').trim();
});

const SUPABASE_URL = env['VITE_SUPABASE_URL'];
const SUPABASE_ANON_KEY = env['VITE_SUPABASE_ANON_KEY'];

// NOTE: For migrations you need the service_role key (not anon).
// Paste your service_role key here temporarily:
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

console.log('🍦 MUU Heladería — Supabase Migration Runner');
console.log('━'.repeat(50));
console.log(`📡 Connecting to: ${SUPABASE_URL}`);

async function runMigration() {
    // Run the migration via Supabase REST API endpoint
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
            'apikey': SERVICE_ROLE_KEY,
        },
        body: JSON.stringify({ sql: readFileSync(join(__dirname, 'supabase_migration.sql'), 'utf8') }),
    });

    if (response.ok) {
        console.log('✅ Migration executed successfully!');
    } else {
        const error = await response.text();
        console.error('❌ Migration failed:', error);
        console.log('\n💡 You can run the migration manually:');
        console.log('   1. Go to https://supabase.com/dashboard/project/emlmhykfymetpivrlxwr/sql/new');
        console.log('   2. Copy the contents of supabase_migration.sql');
        console.log('   3. Paste and click Run');
    }
}

runMigration().catch(console.error);
