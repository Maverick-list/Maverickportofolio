# Production Deployment Guide

Complete step-by-step guide to deploy your Next.js portfolio website to production with Neon PostgreSQL.

---

## 1. PRE-DEPLOYMENT CHECKLIST

Before deploying, verify:

- [x] Neon PostgreSQL integration connected (already done!)
- [ ] All pages load without errors in local dev
- [ ] TypeScript builds without errors: `npm run build`
- [ ] Images are optimized and in public folder
- [ ] NextAuth secret is generated
- [ ] Environment variables documented

---

## 2. DATABASE SETUP (Neon PostgreSQL)

### ✅ Database Already Connected!

Your project is already connected to **Neon PostgreSQL** via the Neon integration. The `DATABASE_URL` environment variable is automatically configured in Vercel.

### Initialize Database Tables

You need to create the database tables using the SQL scripts provided:

**Option 1: Via Neon Console (Recommended)**

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Click "SQL Editor" in the left sidebar
4. Copy the contents of `scripts/init-database.sql`
5. Paste and click "Run"
6. Then copy and run `scripts/seed-database.sql`

**Option 2: Via Command Line**

If you have `psql` installed:

```bash
# Run initialization script
psql $DATABASE_URL -f scripts/init-database.sql

# Run seed script
psql $DATABASE_URL -f scripts/seed-database.sql
```

---

## 3. VERCEL DEPLOYMENT

### Step 1: Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Copy the output - you'll need this in the next step.

### Step 2: Configure Environment Variables

In the v0 interface, go to the **Vars section** in the in-chat sidebar and verify these variables:

**Already Set (via Neon integration):**
- ✅ `DATABASE_URL` - Automatically configured

**You Need to Add:**

1. `NEXTAUTH_SECRET`
   - Value: [paste the secret you generated above]
   
2. `NEXTAUTH_URL`
   - For first deployment: `https://your-project-name.vercel.app`
   - After custom domain: `https://yourdomain.com`
   - Note: You can update this after deployment when you know your URL

3. `NEXT_PUBLIC_ENABLE_CHATBOT` (Optional)
   - Value: `false` (or `true` if you've set up Ollama on a VPS)

### Step 3: Deploy to Vercel

**From v0:**
1. Click the **"Publish"** button in the top right
2. Follow the prompts to deploy
3. Wait 2-3 minutes for the build to complete

The deployment will:
- Install dependencies
- Generate Prisma client
- Build Next.js application
- Deploy to Vercel's global edge network

### Step 4: Update NEXTAUTH_URL

After your first deployment:

1. Copy your Vercel URL (e.g., `https://portfolio-abc123.vercel.app`)
2. Update the `NEXTAUTH_URL` environment variable in the Vars section
3. Redeploy (Vercel will auto-redeploy when you update env vars)

---

## 4. INITIAL SETUP

### Create Admin Account

After deployment, you need to create your admin user:

**Option 1: Via Neon SQL Editor**

1. Go to [Neon Console](https://console.neon.tech) → SQL Editor
2. Generate a password hash first:

```javascript
// Run this in Node.js or browser console
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('YOUR_PASSWORD_HERE', 10);
console.log(hash);
```

3. Then run this SQL (replace values):

```sql
INSERT INTO "User" ("id", "name", "email", "password", "createdAt", "updatedAt")
VALUES (
    'user_' || gen_random_uuid()::text,
    'Your Name',
    'your-email@example.com',
    '$2a$10$...YOUR_BCRYPT_HASH_HERE...',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
```

**Option 2: Use the Login Page**

If you've implemented a registration flow, you can register directly at `/auth/login`.

### Add Your Profile Information

1. Login at `https://your-site.vercel.app/auth/login`
2. Go to `/dashboard/profile`
3. Fill in your information:
   - Name
   - Professional title
   - Bio
   - Email
   - GitHub, LinkedIn, Twitter URLs
4. Save changes

### Add Projects

1. Go to `/dashboard/projects`
2. Click "Add Project"
3. Fill in project details:
   - Title
   - Description
   - Technologies (comma-separated)
   - Project image URL
4. Save and repeat for all projects

---

## 5. AI CHATBOT (OPTIONAL)

### Option A: Disable Chatbot (Recommended Initially)

In the Vars section, set:
```
NEXT_PUBLIC_ENABLE_CHATBOT=false
```

The chatbot will be completely hidden.

### Option B: Deploy with Ollama

If you want the AI chatbot working in production:

#### Requirements:
- A VPS with 2GB+ RAM (DigitalOcean, Linode, AWS, etc.)
- Basic Linux knowledge

#### Quick Setup:

1. **SSH into your VPS:**
```bash
ssh root@your-vps-ip
```

2. **Install Ollama:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

3. **Pull AI model:**
```bash
ollama pull mistral
```

4. **Configure as service:**
```bash
# Create service file
sudo tee /etc/systemd/system/ollama.service > /dev/null <<EOF
[Unit]
Description=Ollama Service
After=network.target

[Service]
Type=simple
User=root
Environment="OLLAMA_HOST=0.0.0.0:11434"
ExecStart=/usr/local/bin/ollama serve
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Start service
sudo systemctl daemon-reload
sudo systemctl enable ollama
sudo systemctl start ollama
```

5. **Setup domain and SSL:**
   - Point a subdomain (e.g., `ai.yourdomain.com`) to your VPS IP
   - Install Nginx and Certbot
   - Configure reverse proxy with SSL

6. **Update Vercel environment variables:**
```
NEXT_PUBLIC_OLLAMA_API_URL=https://ai.yourdomain.com
NEXT_PUBLIC_ENABLE_CHATBOT=true
```

For detailed instructions, see: https://ollama.com/blog/ollama-on-production

---

## 6. CUSTOM DOMAIN

### Step 1: Add Domain in Vercel

1. Go to your Vercel project
2. Navigate to Settings → Domains
3. Enter your domain (e.g., `yourdomain.com`)
4. Click "Add"

### Step 2: Configure DNS

Add these DNS records in your domain registrar:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Update Environment Variable

Update `NEXTAUTH_URL` in the Vars section:
```
NEXTAUTH_URL=https://yourdomain.com
```

### Step 4: Wait for SSL

Vercel automatically provisions SSL certificates. Your site will be live with HTTPS within 5-60 minutes.

---

## 7. POST-DEPLOYMENT VALIDATION

### Test All Pages

- [ ] Home: `https://yoursite.com`
- [ ] About: `https://yoursite.com/about`
- [ ] Skills: `https://yoursite.com/skills`
- [ ] Projects: `https://yoursite.com/projects`
- [ ] Experience: `https://yoursite.com/experience`
- [ ] Contact: `https://yoursite.com/contact`

### Test Authentication

- [ ] Visit `/auth/login`
- [ ] Login successfully
- [ ] Redirects to `/dashboard`
- [ ] Can edit profile
- [ ] Can manage projects

### Performance Check

Run Lighthouse in Chrome DevTools:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## 8. COMMON ISSUES

### Build Fails

**Error: "Prisma Client not generated"**

Fix: The build script automatically runs `prisma generate`. If it fails:
1. Check that `DATABASE_URL` is set in Vercel
2. Verify the database is accessible
3. Try redeploying

**Error: "Cannot connect to database"**

Fix:
1. Go to Neon Console
2. Check database is not suspended
3. Verify connection string in Vercel env vars

### Authentication Issues

**Error: "Invalid callback URL"**

Fix: Ensure `NEXTAUTH_URL` matches your exact domain (including https://)

**Can't login after deployment**

Fix:
1. Verify admin user exists in database
2. Check password hash is correct
3. Ensure `NEXTAUTH_SECRET` is set

### Database Issues

**Tables don't exist**

Fix: Run the init script in Neon SQL Editor (see Section 2)

**Seed data not showing**

Fix: Run the seed script in Neon SQL Editor

---

## 9. MAINTENANCE

### Update Content

Content updates don't require redeployment:
1. Login to `/dashboard`
2. Edit profile or projects
3. Changes are instant

### Deploy Code Changes

Code changes auto-deploy if connected to GitHub:
1. Make changes locally
2. Push to GitHub: `git push origin main`
3. Vercel auto-deploys in 2-3 minutes

### Monitor Performance

View in Vercel Dashboard:
- Analytics → Visitor stats
- Logs → Error tracking
- Performance → Core Web Vitals

---

## 10. YOUR SITE IS LIVE! 🎉

Your portfolio is now:
- ✅ Deployed globally on Vercel Edge Network
- ✅ Secured with HTTPS
- ✅ Connected to Neon PostgreSQL database
- ✅ Optimized for performance
- ✅ Mobile responsive
- ✅ SEO ready

Share your portfolio on LinkedIn, resume, and GitHub!

---

## Need Help?

- Check [SETUP.md](./SETUP.md) for detailed setup instructions
- Visit [Vercel Help](https://vercel.com/help)
- Review [Neon Docs](https://neon.tech/docs)
- Check [Next.js Docs](https://nextjs.org/docs)
