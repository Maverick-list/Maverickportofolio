# Next.js Portfolio Website

A modern, production-ready portfolio website with beautiful animations and responsive design.

## ✨ Features

- 🎨 Premium animated design with Framer Motion
- 🎭 Unique page transitions for each section
- 🌊 Beautiful teal-to-white gradient backgrounds
- 📱 Fully responsive design
- ⚡ Optimized for production deployment
- 🚀 Deploy-ready to Vercel
- 🤖 Optional AI chatbot (Ollama-based)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui + Radix UI
- **Hosting**: Vercel (recommended)
- **AI**: Ollama (optional, self-hosted)

## 🚀 Quick Deploy

**Option 1: Deploy from v0**
1. Click the **Publish** button
2. Your site will be live in ~2 minutes
3. Done!

**Option 2: Deploy to Vercel**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

**Other Options**: See [DEPLOY.md](./DEPLOY.md) for Netlify, Railway, Render, and GitHub Pages.

## 💻 Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio-website/
├── app/                      # Next.js App Router
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── experience/          # Experience page
│   ├── projects/            # Projects showcase
│   ├── skills/              # Skills page
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── navigation.tsx       # Main navigation
│   └── page-transition.tsx  # Animation wrapper
├── lib/                     # Utilities
│   ├── mock-data.ts         # Sample project data
│   └── utils.ts             # Helper functions
├── public/                  # Static files
│   └── profile.png          # Your profile photo
└── DEPLOY.md                # Deployment guide
```

## 🎨 Pages

- **Home** (`/`) - Hero section with animated introduction
- **About** (`/about`) - Profile, bio, and interests
- **Skills** (`/skills`) - Technical skills with hover effects
- **Projects** (`/projects`) - Portfolio projects with 3D animations
- **Experience** (`/experience`) - Work history timeline
- **Contact** (`/contact`) - Contact form with animations

## 🤖 AI Chatbot (Optional)

Free, local AI using Ollama:

**Setup:**
```bash
# 1. Install Ollama from https://ollama.com

# 2. Pull model
ollama pull mistral

# 3. Start server
ollama serve
```

The chatbot will automatically connect to `http://localhost:11434`

## 📦 Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Customization

### Update Your Profile Photo

Replace `public/profile.png` with your own photo.

### Edit Colors

Edit `app/globals.css`:
```css
:root {
  --primary: 180 100% 45%;  /* Teal */
  --background: 0 0% 100%;  /* White */
  /* ... change to your preferred colors */
}
```

### Modify Content

Edit the page files directly:
- `app/page.tsx` - Hero section text
- `app/about/page.tsx` - About content
- `app/skills/page.tsx` - Skills list
- `app/projects/page.tsx` - Projects showcase
- `app/experience/page.tsx` - Work history
- `app/contact/page.tsx` - Contact info

### Change Animations

Modify `components/page-transition.tsx`:
- Adjust animation variants
- Change durations
- Customize easing

## 🌐 Deployment

### ✅ Vercel (Easiest)

1. Click **Publish** in v0, or
2. Connect your GitHub repo to Vercel
3. Done! No configuration needed.

### Other Platforms

See [DEPLOY.md](./DEPLOY.md) for:
- Netlify
- Railway
- Render
- GitHub Pages

## 🔮 Future Enhancements

Want to add more features later? Consider:

1. **CMS Integration**: Sanity, Contentful, or Strapi for easy content management
2. **Analytics**: Google Analytics or Vercel Analytics
3. **Blog**: Add MDX blog posts
4. **Email**: Integrate SendGrid or Resend for contact form
5. **Database**: Add Supabase or Neon for dynamic content

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vercel Docs](https://vercel.com/docs)

## 📄 License

MIT License - Free to use for your own portfolio!

---

**Built with ❤️ using Next.js 16, TypeScript, and Tailwind CSS v4**

🎉 **Ready to deploy? Just click the Publish button in v0!**
