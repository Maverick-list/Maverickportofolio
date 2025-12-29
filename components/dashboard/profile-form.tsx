"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function ProfileForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    github: "",
    linkedin: "",
    twitter: "",
  })

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data) setProfile(data)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Profile updated successfully" })
      } else {
        toast({ title: "Error", description: "Failed to update profile", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="mt-2"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={profile.twitter}
                onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
