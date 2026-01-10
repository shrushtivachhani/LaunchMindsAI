const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; 

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing Environment Variables!');
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    // Note: The user might only have ANON key. We need SERVICE_ROLE for admin tasks.
    // If they don't have it, we might need to fallback or ask them.
    console.log('Ensure you copied the "service_role" secret from Supabase Dashboard > Settings > API');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function seedAdmin() {
    console.log('🌱 Seeding Admin Account...');

    const email = 'admin@launchminds.ai';
    const password = 'admin123';

    try {
        // 1. Create User (or get existing ID)
        console.log(`Creating auth user: ${email}`);
        const { data: userData, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: 'System Admin' }
        });

        let userId = userData?.user?.id;

        if (createError) {
            if (createError.message.includes('already registered')) {
                console.log('⚠️ User exists. Fetching ID to promote...');
                // Since we are admin, we can list users to find the ID.
                const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
                if (listError) throw listError;
                
                const existingUser = users.find(u => u.email === email);
                if (existingUser) {
                    userId = existingUser.id;
                    console.log(`   Found User ID: ${userId}`);
                } else {
                    throw new Error("User says registered but cannot find in list. Strange.");
                }
            } else {
                throw createError;
            }
        }

        if (userId) {
            // 2. Force Update Profile to Admin
            console.log(` promoting user ${userId} to ADMIN...`);
            
            // Upsert profile
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: userId,
                    email: email,
                    full_name: 'System Admin',
                    role: 'admin',
                    created_at: new Date().toISOString()
                });

            if (profileError) {
                // If profile table doesn't exist yet, this fails.
                throw new Error(`Profile Update Failed: ${profileError.message} (Did you run the SQL setup script?)`);
            }

            console.log('✅ SUCCESS: Admin account active.');
            console.log(`   Email: ${email}`);
            console.log(`   Pass:  ${password}`);
        }

    } catch (err) {
        console.error('❌ Script Failed:', err.message);
        process.exit(1);
    }
}

seedAdmin();
