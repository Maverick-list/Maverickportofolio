import { neon } from "@neondatabase/serverless"

// Get database URL from environment
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error("[v0] DATABASE_URL environment variable is not set")
  throw new Error("DATABASE_URL environment variable is not set")
}

// Create SQL client
export const sql = neon(databaseUrl)

// Helper to check if database is initialized
export async function isDatabaseInitialized() {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      ) as exists
    `
    return result[0]?.exists || false
  } catch (error) {
    console.error("[v0] Database check failed:", error)
    return false
  }
}
