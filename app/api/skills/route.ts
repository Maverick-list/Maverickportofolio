import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sql } from "@/lib/db"
import { skillSchema } from "@/lib/validations"

export async function GET() {
  try {
    const skills = await sql`
      SELECT * FROM skills ORDER BY category, level DESC
    `
    return NextResponse.json(skills)
  } catch (error) {
    console.error("[v0] Skills fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = skillSchema.parse(body)

    const result = await sql`
      INSERT INTO skills (name, category, level)
      VALUES (${validatedData.name}, ${validatedData.category}, ${validatedData.level})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] Skills create error:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
