import bcryptjs from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

/**
 * Compare a plain password with a hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const match = await bcryptjs.compare(password, hash);
    return match;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
}
