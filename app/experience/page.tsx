"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const experiences = [
  {
    period: "2023 — Present",
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    description:
      "Leading development of modern web applications using Next.js and TypeScript. Mentoring junior developers and establishing best practices.",
    skills: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    period: "2021 — 2023",
    title: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    description:
      "Built responsive web applications and collaborated with design teams to create exceptional user experiences.",
    skills: ["React", "JavaScript", "CSS", "REST APIs"],
  },
  {
    period: "2019 — 2021",
    title: "Junior Web Developer",
    company: "Startup Ventures",
    description: "Developed features for multiple client projects and learned modern web development practices.",
    skills: ["HTML", "CSS", "JavaScript", "Git"],
  },
]

function TimelineItem({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative border-l-2 border-border/50 pl-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
        className="absolute -left-2 top-0 h-4 w-4 rounded-full border-2 border-primary bg-background"
      />

      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className="absolute left-0 top-4 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent origin-top"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
      >
        <div className="mb-2 text-sm font-medium text-muted-foreground">{exp.period}</div>
        <h3 className="mb-1 text-2xl font-bold">{exp.title}</h3>
        <div className="mb-4 text-lg text-primary">{exp.company}</div>
        <p className="mb-4 leading-relaxed text-muted-foreground">{exp.description}</p>
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + i * 0.05 + 0.4, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, backgroundColor: "oklch(0.7 0.18 180)" }}
              className="rounded-full bg-muted px-3 py-1 text-sm font-medium transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen gradient-experience">
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
            className="mb-12 text-4xl font-bold md:text-5xl text-balance"
          >
            Experience
          </motion.h1>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <TimelineItem key={index} exp={exp} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
