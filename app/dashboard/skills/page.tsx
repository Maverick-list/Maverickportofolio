"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import { Trash2, Plus, Edit } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Skill {
  id: number
  name: string
  category: string
  level: number
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: 50,
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  async function fetchSkills() {
    try {
      const res = await fetch("/api/skills")
      if (res.ok) {
        const data = await res.json()
        setSkills(data)
      }
    } catch (error) {
      toast.error("Failed to load skills")
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : "/api/skills"
      const method = editingSkill ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast.success(editingSkill ? "Skill updated" : "Skill created")
        setIsDialogOpen(false)
        setFormData({ name: "", category: "", level: 50 })
        setEditingSkill(null)
        fetchSkills()
      } else {
        toast.error("Failed to save skill")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this skill?")) return

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Skill deleted")
        fetchSkills()
      } else {
        toast.error("Failed to delete skill")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  function openEditDialog(skill: Skill) {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    })
    setIsDialogOpen(true)
  }

  function openCreateDialog() {
    setEditingSkill(null)
    setFormData({ name: "", category: "", level: 50 })
    setIsDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Skills</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingSkill ? "Edit" : "Add"} Skill</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Skill Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Frontend, Backend, Database"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="level">Proficiency Level: {formData.level}%</Label>
                  <Slider
                    id="level"
                    min={1}
                    max={100}
                    step={1}
                    value={[formData.level]}
                    onValueChange={(value) => setFormData({ ...formData, level: value[0] })}
                    className="mt-2"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingSkill ? "Update" : "Create"} Skill
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{skill.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(skill)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(skill.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground mb-2">{skill.category}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${skill.level}%` }} />
                    </div>
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
