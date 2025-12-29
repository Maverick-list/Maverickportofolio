import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sql } from "@/lib/db"
import { experienceSchema } from "@/lib/validations"

export async function GET() {
  try {
    const experiences = await sql`
      SELECT * FROM experiences ORDER BY start_date DESC
    `
    return NextResponse.json(experiences)
  } catch (error) {
    console.error("[v0] Experiences fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = experienceSchema.parse(body)

    const result = await sql`
      INSERT INTO experiences (company, position, description, start_date, end_date, current)
      VALUES (
        ${validatedData.company},
        ${validatedData.position},
        ${validatedData.description},
        ${validatedData.start_date},
        ${validatedData.end_date || null},
        ${validatedData.current}
      )
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] Experiences create error:", error)
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}
