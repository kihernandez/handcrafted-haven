# Authentication Implementation Guide

## Overview

This document provides a complete guide to the user login authentication system implemented in the Handcrafted Haven project.

## Architecture

The authentication system consists of:

1. **Database Layer**: PostgreSQL with Neon
2. **Security**: Password hashing (bcryptjs) and JWT tokens
3. **API Endpoints**: RESTful routes for sign-up, sign-in, and user management
4. **Session Management**: httpOnly cookies with JWT tokens
5. **Middleware**: Authentication verification for protected routes

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

This installs:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation and verification
- TypeScript types for both libraries

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=your_neon_database_url

# JWT Secret (change this to a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**IMPORTANT**: In production, use a strong, randomly generated JWT_SECRET.

### 3. Initialize the Database

Run the initialization endpoint to create the users table:

```bash
curl -X POST http://localhost:3000/api/init
```

Or use this TypeScript:

```typescript
import { initializeDatabase } from '@/lib/database-schema';

await initializeDatabase();
```

The database schema includes:
- `users` table with id, name, email, password_hash, created_at, updated_at
- Index on email for fast lookups
- Password hashing with bcryptjs

## API Endpoints

### Sign Up

**Endpoint**: `POST /api/sign-up`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Validation**:
- Email: must be valid format and unique
- Password: 8-32 characters, uppercase, lowercase, number, symbol
- Name: required

---

### Sign In / Login

**Endpoint**: `POST /api/sign-in`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Also Sets**:
- `auth_token` httpOnly cookie (7 days expiration)

**Error Responses**:
- 401: Invalid credentials
- 400: Missing/invalid input

---

### Get Current User

**Endpoint**: `GET /api/user/me`

**Headers**:
```
Cookie: auth_token=<jwt_token>
```

**Response** (200):
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-04-05T10:30:00Z"
  }
}
```

**Error Responses**:
- 401: Not authenticated
- 404: User not found

---

### Sign Out / Logout

**Endpoint**: `POST /api/sign-out`

**Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Also**:
- Clears `auth_token` cookie

---

## Client-Side Usage

### Sign Up (Sign-Up Page)

```typescript
const response = await fetch("/api/sign-up", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, password })
});

const data = await response.json();
if (!response.ok) {
  // Handle error
  console.error(data.error);
} else {
  // Redirect to sign-in
  router.push("/sign-in");
}
```

### Sign In (Sign-In Page)

```typescript
const response = await fetch("/api/sign-in", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
if (!response.ok) {
  // Handle error
  console.error(data.error);
} else {
  // Token is set in httpOnly cookie automatically
  // Redirect to dashboard
  router.push("/");
}
```

### Get Current User

```typescript
const response = await fetch("/api/user/me");
const data = await response.json();

if (response.ok) {
  const user = data.user;
} else {
  // User not authenticated
}
```

### Sign Out

```typescript
const response = await fetch("/api/sign-out", { method: "POST" });
// Cookie is cleared, user is logged out
router.push("/sign-in");
```

## Using Protected Routes

### Server-Side (API Routes)

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth-middleware";

export async function GET(request: NextRequest) {
  const user = getAuthFromRequest(request);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // User is authenticated, use user.userId, user.email, user.name
  return NextResponse.json({ message: `Hello ${user.name}` });
}
```

### Client-Side (Protected Pages)

You can create a custom hook to check authentication:

```typescript
// lib/use-auth.ts
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/me")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        }
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
```

Usage in components:

```typescript
"use client";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

## Security Considerations

1. **Password Hashing**: Using bcryptjs with salt rounds = 10
2. **JWT Secret**: Must be strong and kept in environment variables
3. **httpOnly Cookies**: Token stored in httpOnly cookie to prevent XSS attacks
4. **Secure Flag**: Set to true in production (HTTPS only)
5. **SameSite**: Set to "lax" to prevent CSRF attacks
6. **HTTPS**: Always use HTTPS in production
7. **Token Expiration**: Set to 7 days (configurable in JWT_EXPIRY)

## Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

## File Structure

```
lib/
├── db.ts                    # Database connection
├── database-schema.ts       # User table operations
├── password.ts              # Password hashing utilities
├── jwt.ts                   # JWT token management
└── auth-middleware.ts       # Authentication middleware

app/
├── api/
│   ├── init/route.ts       # Database initialization
│   ├── sign-up/route.ts    # Registration endpoint
│   ├── sign-in/route.ts    # Login endpoint
│   ├── sign-out/route.ts   # Logout endpoint
│   └── user/
│       └── me/route.ts     # Get current user
├── sign-in/
│   └── page.tsx            # Sign-in page (updated)
└── sign-up/
    └── page.tsx            # Sign-up page (updated)
```

## Testing

### Test Sign Up

```bash
curl -X POST http://localhost:3000/api/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### Test Sign In

```bash
curl -X POST http://localhost:3000/api/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### Test Protected Route

```bash
curl http://localhost:3000/api/user/me \
  -H "Cookie: auth_token=<your_token_here>"
```

## Troubleshooting

### "DATABASE_URL not set"
Ensure `.env.local` has the correct DATABASE_URL environment variable.

### "JWT_SECRET not set"
Add JWT_SECRET to `.env.local`. Use a strong random string in production.

### "User not found" or "Invalid credentials"
- Verify the user exists in the database
- Check email is lowercase in the database
- Verify password was hashed correctly

### CORS Issues
If accessing from a different domain, configure CORS in Next.js:

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  
  return response;
}
```

## Next Steps

1. ✅ Install dependencies: `pnpm install`
2. ✅ Set up `.env.local` with DATABASE_URL and JWT_SECRET
3. ✅ Initialize database: `POST /api/init`
4. ✅ Test sign-up and sign-in endpoints
5. Build protected pages using useAuth hook
6. Add password reset functionality (future)
7. Add email verification (future)
8. Implement refresh tokens (future)

## Support

For issues or questions, refer to:
- JWT documentation: https://github.com/auth0/node-jsonwebtoken
- Bcryptjs: https://github.com/dcodeIO/bcrypt.js
- Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
