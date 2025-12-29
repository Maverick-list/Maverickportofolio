import bcrypt

# Password to hash
password = "Maverick4823#"

# Generate hash
password_bytes = password.encode('utf-8')
salt = bcrypt.gensalt(rounds=10)
hash_bytes = bcrypt.hashpw(password_bytes, salt)
hash_string = hash_bytes.decode('utf-8')

print("\n=== Password Hash Generated ===")
print(f"Password: {password}")
print(f"Hash: {hash_string}")
print(f"\nSQL Update Command:")
print(f"UPDATE users SET password = '{hash_string}' WHERE email = 'firzailmidja@gmail.com';")
print("\n")

# Verify the hash works
if bcrypt.checkpw(password_bytes, hash_bytes):
    print("✓ Hash verification successful!")
else:
    print("✗ Hash verification failed!")
