import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const projects = await sql`
      SELECT * FROM projects ORDER BY created_at DESC
    `

    return NextResponse.json(projects)
  } catch (error) {
    console.error("[v0] Projects fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const result = await sql`
      INSERT INTO projects (title, description, tech, image, created_at)
      VALUES (${data.title}, ${data.description}, ${data.tech}, ${data.image}, NOW())
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] Project create error:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
