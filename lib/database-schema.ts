import { sql } from "./db";

/**
 * Initialize database schema - creates users table if it doesn't exist
 * Run this once during initial setup
 */
export async function initializeDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create index on email for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `;

    console.log("✓ Database schema initialized successfully");
    return { success: true, message: "Database initialized" };
  } catch (error) {
    console.error("✗ Database initialization error:", error);
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  try {
    const result = await sql`
      SELECT id, name, email, password_hash, created_at FROM users
      WHERE email = ${email.toLowerCase()}
      LIMIT 1;
    `;
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: number) {
  try {
    const result = await sql`
      SELECT id, name, email, created_at FROM users
      WHERE id = ${id}
      LIMIT 1;
    `;
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

/**
 * Create a new user
 */
export async function createUser(
  name: string,
  email: string,
  passwordHash: string
) {
  try {
    const result = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email.toLowerCase()}, ${passwordHash})
      RETURNING id, name, email, created_at;
    `;
    return result[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Update user's password
 */
export async function updateUserPassword(
  userId: number,
  passwordHash: string
) {
  try {
    const result = await sql`
      UPDATE users
      SET password_hash = ${passwordHash}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId}
      RETURNING id, name, email;
    `;
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}
