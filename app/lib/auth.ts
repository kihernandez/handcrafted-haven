import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type User = {
  id: string;
  name: string;
  email: string;
};

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token || !JWT_SECRET) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as User;
    return decoded;
  } catch {
    return null; // Invalid or expired token
  }
}