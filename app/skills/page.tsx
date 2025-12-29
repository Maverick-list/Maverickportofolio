"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Code2, Database, Sparkles, Palette, Server, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function SkillsPage() {
  const skills = [
    {
      category: "Frontend",
      icon: Code2,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      category: "Backend",
      icon: Server,
      items: ["Node.js", "Express", "REST APIs", "GraphQL", "Serverless"],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      category: "Database",
      icon: Database,
      items: ["PostgreSQL", "MongoDB", "Prisma", "Supabase", "Redis"],
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      category: "UI/UX",
      icon: Palette,
      items: ["Figma", "Responsive Design", "Accessibility", "Design Systems", "Animations"],
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      category: "Mobile",
      icon: Smartphone,
      items: ["React Native", "PWA", "Mobile-First", "Touch Interactions", "App Store"],
      color: "from-teal-500/20 to-cyan-500/20",
    },
    {
      category: "AI/ML",
      icon: Sparkles,
      items: ["OpenAI API", "Vercel AI SDK", "LangChain", "Vector DBs", "RAG"],
      color: "from-indigo-500/20 to-violet-500/20",
    },
  ]

  return (
    <div className="min-h-screen gradient-skills">
      <main className="pt-20">
        <section className="container mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/">
              <Button variant="ghost" className="mb-8 gap-2 bg-background/50 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-4xl font-bold md:text-5xl text-balance"
          >
            Skills & Technologies
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 text-xl text-muted-foreground max-w-2xl"
          >
            A comprehensive toolkit for building modern web applications
          </motion.p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                className={`rounded-xl border border-border/50 bg-gradient-to-br ${skill.color} backdrop-blur-sm p-6 hover:shadow-xl transition-shadow`}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm"
                >
                  <skill.icon className="h-7 w-7 text-primary" />
                </motion.div>

                <h3 className="mb-4 text-2xl font-bold">{skill.category}</h3>

                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + itemIndex * 0.05 + 0.3 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <motion.div
                        whileHover={{ scale: 1.5, rotate: 90 }}
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
