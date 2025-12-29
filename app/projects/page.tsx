"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with payment integration and admin dashboard",
    tech: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    image: "/modern-ecommerce-dashboard.png",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "/kanban-task-board.jpg",
  },
  {
    id: 3,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot using natural language processing",
    tech: ["Next.js", "OpenAI", "TypeScript", "Tailwind"],
    image: "/ai-chatbot-interface.png",
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]))
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]))

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, z: -100 }}
      animate={{ opacity: 1, scale: 1, z: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05, z: 50 }}
      className="perspective-1000"
    >
      <Card className="overflow-hidden border-border/50 bg-background/70 backdrop-blur-sm hover:shadow-2xl transition-shadow">
        <motion.div
          className="aspect-video w-full bg-muted overflow-hidden"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="h-full w-full object-cover" />
        </motion.div>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + i * 0.05 + 0.3 }}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2 bg-background/50">
              <Github className="h-4 w-4" />
              Code
            </Button>
            <Button size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen gradient-projects">
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="mb-12 text-4xl font-bold md:text-5xl text-balance"
          >
            Projects
          </motion.h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
