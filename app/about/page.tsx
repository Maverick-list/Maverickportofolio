"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export default function AboutPage() {
  const imageRef = useRef(null)
  const isImageInView = useInView(imageRef, { once: true })

  const contentRef = useRef(null)
  const isContentInView = useInView(contentRef, { once: true })

  return (
    <div className="min-h-screen gradient-about">
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

          <div className="mx-auto max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-4xl font-bold md:text-5xl text-balance"
            >
              About Me
            </motion.h1>

            <div ref={imageRef} className="mb-8 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                animate={
                  isImageInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                      }
                    : {}
                }
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative h-64 w-64 overflow-hidden rounded-2xl border-4 border-border/50 shadow-xl"
              >
                <Image
                  src="/profile.png"
                  alt="Profile Photo"
                  fill
                  className="object-cover object-[center_20%]"
                  priority
                />
              </motion.div>
            </div>

            <div ref={contentRef} className="prose prose-neutral dark:prose-invert max-w-none">
              <motion.p
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                animate={
                  isContentInView
                    ? {
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }
                    : {}
                }
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl leading-relaxed text-muted-foreground"
              >
                I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend
                thoughtful design with robust engineering.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                animate={
                  isContentInView
                    ? {
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }
                    : {}
                }
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="mt-12 mb-4 text-2xl font-bold">Background</h2>
                <p className="leading-relaxed text-muted-foreground">
                  With over 5 years of experience in web development, I've had the opportunity to work on diverse
                  projects ranging from startup MVPs to enterprise-scale applications. My favorite work lies at the
                  intersection of design and development, creating experiences that not only look great but are
                  meticulously built for performance and usability.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                animate={
                  isContentInView
                    ? {
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }
                    : {}
                }
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="mt-12 mb-4 text-2xl font-bold">Philosophy</h2>
                <p className="leading-relaxed text-muted-foreground">
                  I believe in writing clean, maintainable code and building products that solve real problems. Every
                  project is an opportunity to learn something new and push the boundaries of what's possible on the
                  web.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                animate={
                  isContentInView
                    ? {
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }
                    : {}
                }
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2 className="mt-12 mb-4 text-2xl font-bold">Current Focus</h2>
                <p className="leading-relaxed text-muted-foreground">
                  Currently, I'm focused on building modern web applications with Next.js and exploring AI integration
                  to create more intelligent and intuitive user experiences.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
