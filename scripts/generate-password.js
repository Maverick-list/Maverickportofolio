const bcrypt = require("bcryptjs")

const password = "Maverick4823#"
const hash = bcrypt.hashSync(password, 10)

console.log("\n=== Admin Password Hash Generator ===\n")
console.log("Password:", password)
console.log("Hash:", hash)
console.log("\nUse this hash in your SQL INSERT statement:\n")
console.log(`INSERT INTO users (email, password, name)`)
console.log(`VALUES ('firzailmidja@gmail.com', '${hash}', 'Firzail Midja');`)
console.log("\n")
