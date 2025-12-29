import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
})

export const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tech: z.array(z.string()).min(1, "At least one technology is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
})

export const skillSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  level: z.number().min(1, "Level must be between 1-100").max(100, "Level must be between 1-100"),
})

export const experienceSchema = z.object({
  company: z.string().min(2, "Company must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional().or(z.literal("")),
  current: z.boolean(),
})

export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone must be at least 5 characters").optional().or(z.literal("")),
  location: z.string().min(2, "Location must be at least 2 characters").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
})
