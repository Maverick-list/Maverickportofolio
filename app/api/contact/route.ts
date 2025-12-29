import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sql } from "@/lib/db"
import { contactSchema } from "@/lib/validations"

export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM contact_settings LIMIT 1
    `
    return NextResponse.json(result[0] || null)
  } catch (error) {
    console.error("[v0] Contact settings fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch contact settings" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = contactSchema.parse(body)

    const existing = await sql`SELECT id FROM contact_settings LIMIT 1`

    let result
    if (existing.length > 0) {
      result = await sql`
        UPDATE contact_settings
        SET email = ${validatedData.email},
            phone = ${validatedData.phone || null},
            location = ${validatedData.location || null},
            github = ${validatedData.github || null},
            linkedin = ${validatedData.linkedin || null},
            twitter = ${validatedData.twitter || null},
            instagram = ${validatedData.instagram || null},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existing[0].id}
        RETURNING *
      `
    } else {
      result = await sql`
        INSERT INTO contact_settings (email, phone, location, github, linkedin, twitter, instagram)
        VALUES (
          ${validatedData.email},
          ${validatedData.phone || null},
          ${validatedData.location || null},
          ${validatedData.github || null},
          ${validatedData.linkedin || null},
          ${validatedData.twitter || null},
          ${validatedData.instagram || null}
        )
        RETURNING *
      `
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] Contact settings update error:", error)
    return NextResponse.json({ error: "Failed to update contact settings" }, { status: 500 })
  }
}
