const bcrypt = require("bcryptjs")

// Hash the password: Maverick4823#
const password = "Maverick4823#"
const saltRounds = 10

async function generateHash() {
  const hash = await bcrypt.hash(password, saltRounds)
  console.log("\n=== Password Hash Generated ===")
  console.log("Password:", password)
  console.log("Hash:", hash)
  console.log("\nSQL Update Command:")
  console.log(`UPDATE users SET password = '${hash}' WHERE email = 'firzailmidja@gmail.com';`)
  console.log("\n")
}

generateHash()
