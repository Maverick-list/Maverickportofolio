"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Github, Linkedin, Twitter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ContactPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Message sent!",
        description: "I'll get back to you as soon as possible.",
      })
      ;(e.target as HTMLFormElement).reset()
    }, 1000)
  }

  const socialLinks = [
    { icon: Mail, label: "hello@example.com", href: "mailto:hello@example.com", delay: 0 },
    { icon: Github, label: "GitHub", href: "https://github.com", delay: 0.1 },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", delay: 0.2 },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com", delay: 0.3 },
  ]

  return (
    <div className="min-h-screen gradient-contact">
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

          <div className="mx-auto max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-4xl font-bold md:text-5xl text-balance"
            >
              Get in Touch
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12 text-xl text-muted-foreground"
            >
              Have a project in mind or just want to chat? Feel free to reach out!
            </motion.p>

            <div className="mb-12 grid gap-4 md:grid-cols-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: social.delay + 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/70 backdrop-blur-sm p-4 transition-colors hover:bg-accent"
                >
                  <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                    <social.icon className="h-5 w-5" />
                  </motion.div>
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <motion.div
                animate={{
                  y: focusedField === "name" ? -5 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="mt-2 bg-background/70 backdrop-blur-sm"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </motion.div>

              <motion.div
                animate={{
                  y: focusedField === "email" ? -5 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 bg-background/70 backdrop-blur-sm"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </motion.div>

              <motion.div
                animate={{
                  y: focusedField === "message" ? -5 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="mt-2 bg-background/70 backdrop-blur-sm"
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </section>
      </main>
    </div>
  )
}
