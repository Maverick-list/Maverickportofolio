"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Trash2, Plus, Edit, Briefcase } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Experience {
  id: number
  company: string
  position: string
  description: string
  start_date: string
  end_date: string | null
  current: boolean
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    start_date: "",
    end_date: "",
    current: false,
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  async function fetchExperiences() {
    try {
      const res = await fetch("/api/experiences")
      if (res.ok) {
        const data = await res.json()
        setExperiences(data)
      }
    } catch (error) {
      toast.error("Failed to load experiences")
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const url = editingExperience ? `/api/experiences/${editingExperience.id}` : "/api/experiences"
      const method = editingExperience ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast.success(editingExperience ? "Experience updated" : "Experience created")
        setIsDialogOpen(false)
        setFormData({
          company: "",
          position: "",
          description: "",
          start_date: "",
          end_date: "",
          current: false,
        })
        setEditingExperience(null)
        fetchExperiences()
      } else {
        toast.error("Failed to save experience")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this experience?")) return

    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Experience deleted")
        fetchExperiences()
      } else {
        toast.error("Failed to delete experience")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  function openEditDialog(experience: Experience) {
    setEditingExperience(experience)
    setFormData({
      company: experience.company,
      position: experience.position,
      description: experience.description,
      start_date: experience.start_date,
      end_date: experience.end_date || "",
      current: experience.current,
    })
    setIsDialogOpen(true)
  }

  function openCreateDialog() {
    setEditingExperience(null)
    setFormData({
      company: "",
      position: "",
      description: "",
      start_date: "",
      end_date: "",
      current: false,
    })
    setIsDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Experience</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingExperience ? "Edit" : "Add"} Experience</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      disabled={formData.current}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="current"
                    checked={formData.current}
                    onCheckedChange={(checked) => setFormData({ ...formData, current: checked as boolean })}
                  />
                  <Label htmlFor="current" className="cursor-pointer">
                    I currently work here
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  {editingExperience ? "Update" : "Create"} Experience
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <Card key={exp.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle>{exp.position}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {exp.start_date} - {exp.current ? "Present" : exp.end_date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(exp)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
