import { ProjectsList } from "@/components/dashboard/projects-list"
import { DashboardLayout } from "@/components/dashboard/layout"

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <ProjectsList />
      </div>
    </DashboardLayout>
  )
}
