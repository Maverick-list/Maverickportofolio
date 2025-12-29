import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST() {
  try {
    // Check if tables exist
    const tablesExist = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      ) as exists
    `

    if (tablesExist[0]?.exists) {
      return NextResponse.json({ message: "Database already initialized" }, { status: 200 })
    }

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name VARCHAR(255),
        bio TEXT,
        location VARCHAR(255),
        github VARCHAR(255),
        linkedin VARCHAR(255),
        twitter VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image TEXT,
        tech_stack TEXT[],
        github_url VARCHAR(255),
        live_url VARCHAR(255),
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create skills table
    await sql`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        proficiency INT CHECK (proficiency >= 0 AND proficiency <= 100),
        icon VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create experience table
    await sql`
      CREATE TABLE IF NOT EXISTS experience (
        id SERIAL PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE NOT NULL,
        end_date DATE,
        is_current BOOLEAN DEFAULT false,
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create contact_messages table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Hash password
    const hashedPassword = await bcrypt.hash("Maverick4823#", 10)

    // Insert admin user
    await sql`
      INSERT INTO users (email, password, name, bio)
      VALUES (
        'firzailmidja@gmail.com',
        ${hashedPassword},
        'Firzail Midja',
        'Full Stack Developer & Portfolio Administrator'
      )
    `

    return NextResponse.json({ message: "Database initialized successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Database initialization error:", error)
    return NextResponse.json(
      { error: "Failed to initialize database", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
