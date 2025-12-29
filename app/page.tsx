"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Sparkles } from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen gradient-home">
      <main className="pt-20">
        {/* Hero Section with Parallax + Staggered Text Reveal */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <motion.div
            style={{ y, opacity }}
            className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between"
          >
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground"
              >
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Portfolio</span>
              </motion.div>

              <motion.h1
                className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {["Full-Stack", "Developer", "&", "Creative", "Technologist"].map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-4"
                    variants={{
                      hidden: { opacity: 0, y: 50, rotateX: -90 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground"
              >
                I build accessible, pixel-perfect digital experiences for the web. Specializing in React, Next.js, and
                modern web technologies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/projects">
                  <Button size="lg" className="gap-2 group">
                    View Projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm">
                    <Code2 className="h-4 w-4" />
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative h-80 w-80 flex-shrink-0 overflow-hidden rounded-2xl border-4 border-border/50 shadow-2xl md:h-96 md:w-96"
            >
              <Image
                src="/profile.png"
                alt="Profile Photo"
                fill
                className="object-cover object-[center_20%]"
                priority
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="border-t border-border/40 bg-background/30 backdrop-blur-sm py-16">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-3xl font-bold text-balance"
            >
              Featured Skills
            </motion.h2>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Code2,
                  title: "Frontend Development",
                  description: "Expert in React, Next.js, TypeScript, and modern CSS frameworks",
                  delay: 0,
                },
                {
                  icon: Code2,
                  title: "Backend Development",
                  description: "Proficient in Node.js, API design, and database management",
                  delay: 0.1,
                },
                {
                  icon: Sparkles,
                  title: "AI Integration",
                  description: "Building intelligent applications with modern AI technologies",
                  delay: 0.2,
                },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: skill.delay }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  className="rounded-lg border border-border/50 bg-background/70 backdrop-blur-sm p-6 hover:shadow-lg transition-shadow"
                >
                  <motion.div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <skill.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-semibold">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
