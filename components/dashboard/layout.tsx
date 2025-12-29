"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, User, FolderKanban, LogOut, Home, Lightbulb, Briefcase, Mail } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Skills", href: "/dashboard/skills", icon: Lightbulb },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Experience", href: "/dashboard/experience", icon: Briefcase },
  { name: "Contact", href: "/dashboard/contact", icon: Mail },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r bg-card">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="text-xl font-bold">
            Admin Panel
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
          <div className="my-4 border-t" />
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4 w-4" />
            View Site
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}
