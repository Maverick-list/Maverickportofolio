"use client"

import { useEffect, useState } from "react"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const [dbStatus, setDbStatus] = useState<"checking" | "ready" | "needs-init">("checking")
  const [initializing, setInitializing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    checkDatabase()
  }, [])

  async function checkDatabase() {
    try {
      const res = await fetch("/api/profile")
      if (res.ok) {
        setDbStatus("ready")
      } else if (res.status === 500) {
        setDbStatus("needs-init")
      }
    } catch (error) {
      console.error("[v0] Database check failed:", error)
      setDbStatus("needs-init")
    }
  }

  async function initializeDatabase() {
    setInitializing(true)
    try {
      const res = await fetch("/api/init-db", { method: "POST" })
      const data = await res.json()

      if (res.ok) {
        toast({
          title: "Success",
          description: "Database initialized successfully!",
        })
        setDbStatus("ready")
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to initialize database",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to database",
        variant: "destructive",
      })
    } finally {
      setInitializing(false)
    }
  }

  if (dbStatus === "checking") {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Checking database status...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (dbStatus === "needs-init") {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <Card className="max-w-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <CardTitle>Database Setup Required</CardTitle>
              </div>
              <CardDescription>
                Your database needs to be initialized before you can use the admin dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Click the button below to automatically create all required tables and set up your admin account.
              </p>
              <Button onClick={initializeDatabase} disabled={initializing} className="w-full">
                {initializing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  "Initialize Database"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            Database Connected
          </div>
        </div>
        <StatsCards />
      </div>
    </DashboardLayout>
  )
}
