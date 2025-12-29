# Admin Dashboard Setup Guide

Your portfolio now has a fully functional admin dashboard! Follow these steps to set it up:

## 1. Database Setup

You already have Neon PostgreSQL connected. Now run the initialization script:

1. Go to your Neon dashboard at https://console.neon.tech
2. Select your project
3. Click on "SQL Editor"
4. Copy the contents of `scripts/init-database.sql`
5. Paste and run the SQL script

This will create:
- **users** table for authentication
- **profiles** table for your personal info
- **projects** table for your portfolio projects
- Your admin account and sample projects

## 2. Admin Account

The database script automatically creates your admin account with these credentials:

**Email:** `firzailmidja@gmail.com`  
**Password:** `Maverick4823#`

**IMPORTANT:** Only this account has admin access. Keep these credentials secure!

## 3. Environment Variables

Make sure these are set in your Vercel project (they should already be there):

- `DATABASE_URL` - Your Neon connection string
- `NEXTAUTH_URL` - Your site URL (e.g., https://yoursite.vercel.app)
- `NEXTAUTH_SECRET` - Random secret key

Generate a secret:
```bash
openssl rand -base64 32
```

## 4. Deploy & Test

1. Click **Publish** in v0
2. Wait for deployment to complete
3. Visit `https://yoursite.vercel.app/auth/login`
4. Log in with your admin credentials
5. Access dashboard at `/dashboard`

## Features

### Dashboard Pages:
- **Dashboard** - Overview with stats
- **Profile** - Edit your personal info (name, title, bio, social links)
- **Projects** - Full CRUD operations (Create, Read, Update, Delete projects)

### Security:
- NextAuth authentication
- Password hashing with bcrypt (10 rounds)
- Protected API routes
- Session management
- Single admin account access

## Troubleshooting

**Can't log in?**
- Check that you ran the SQL script in Neon
- Verify credentials: firzailmidja@gmail.com / Maverick4823#
- Check environment variables are set

**Database errors?**
- Verify DATABASE_URL is correct in environment variables
- Check Neon project is active
- Run the init script again if tables are missing

**Build errors?**
- The site uses Neon SDK directly (no Prisma)
- Should deploy successfully to Vercel
- Check build logs for specific errors

## Changing Your Password

To change your admin password later:

1. Generate a new hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('NEW_PASSWORD', 10))"
```

2. Update in Neon SQL Editor:
```sql
UPDATE users 
SET password = '$2a$10$YOUR_NEW_HASH' 
WHERE email = 'firzailmidja@gmail.com';
