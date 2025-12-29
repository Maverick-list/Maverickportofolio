import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profiles = await sql`
      SELECT * FROM profiles LIMIT 1
    `

    return NextResponse.json(
      profiles[0] || {
        name: "",
        title: "",
        bio: "",
        email: "",
        github: "",
        linkedin: "",
        twitter: "",
      },
    )
  } catch (error) {
    console.error("[v0] Profile fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const result = await sql`
      INSERT INTO profiles (name, title, bio, email, github, linkedin, twitter, updated_at)
      VALUES (${data.name}, ${data.title}, ${data.bio}, ${data.email}, ${data.github}, ${data.linkedin}, ${data.twitter}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        name = ${data.name},
        title = ${data.title},
        bio = ${data.bio},
        email = ${data.email},
        github = ${data.github},
        linkedin = ${data.linkedin},
        twitter = ${data.twitter},
        updated_at = NOW()
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] Profile update error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
