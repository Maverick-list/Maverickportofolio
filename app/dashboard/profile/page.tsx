import { ProfileForm } from "@/components/dashboard/profile-form"
import { DashboardLayout } from "@/components/dashboard/layout"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <ProfileForm />
      </div>
    </DashboardLayout>
  )
}
