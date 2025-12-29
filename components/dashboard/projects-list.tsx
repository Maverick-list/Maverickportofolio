"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  image: string
}

export function ProjectsList() {
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const response = await fetch("/api/projects")
    const data = await response.json()
    setProjects(data)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" })
    if (response.ok) {
      toast({ title: "Success", description: "Project deleted" })
      fetchProjects()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      tech: (formData.get("tech") as string).split(",").map((t) => t.trim()),
      image: formData.get("image") as string,
    }

    const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects"
    const method = editingProject ? "PUT" : "POST"

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      toast({ title: "Success", description: `Project ${editingProject ? "updated" : "created"}` })
      setDialogOpen(false)
      setEditingProject(null)
      fetchProjects()
    }
  }

  return (
    <div className="space-y-6">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit" : "Add"} Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={editingProject?.title} required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingProject?.description}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="tech">Technologies (comma-separated)</Label>
              <Input id="tech" name="tech" defaultValue={editingProject?.tech.join(", ")} required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" defaultValue={editingProject?.image} required className="mt-2" />
            </div>
            <Button type="submit">Save Project</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span>{project.title}</span>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setEditingProject(project)
                      setDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
