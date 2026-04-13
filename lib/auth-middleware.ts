import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JwtPayload } from "./jwt";

/**
 * Middleware to check if user is authenticated
 * Returns user payload if valid, null if not authenticated
 */
export function getAuthFromRequest(
  request: NextRequest
): JwtPayload | null {
  try {
    // Get token from httpOnly cookie
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    // Verify token
    const payload = verifyToken(token);
    return payload;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return null;
  }
}

/**
 * Wrapper for protected routes
 */
export function withAuth(
  handler: (request: NextRequest, user: JwtPayload) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const user = getAuthFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    return handler(request, user);
  };
}

/**
 * Check if request has valid auth token
 */
export function isAuthenticated(request: NextRequest): boolean {
  const user = getAuthFromRequest(request);
  return user !== null;
}
