import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
  email: string;
  name: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";
const JWT_EXPIRY = "7d"; // 7 days

/**
 * Generate JWT token
 */
export function generateToken(payload: JwtPayload): string {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
      algorithm: "HS256",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

/**
 * Decode token without verifying (for debugging)
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
