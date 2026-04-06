# Quick Start Guide - Authentication Setup

## Step 1: Install Dependencies

```bash
pnpm install
```

## Step 2: Create .env.local

Create a file named `.env.local` in the root directory with:

```env
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=your-secret-key-change-this-to-something-strong
```

**Get your DATABASE_URL from Neon:**
1. Go to https://console.neon.tech
2. Click on your project
3. Copy the connection string
4. Add it to `.env.local` as shown above

## Step 3: Initialize Database

```bash
pnpm dev
```

Then in another terminal:

```bash
curl -X POST http://localhost:3000/api/init
```

You should see: `"Database schema initialized successfully"`

## Step 4: Test the Endpoints

### Create an account (Sign Up)
Go to: http://localhost:3000/sign-up

Or use curl:
```bash
curl -X POST http://localhost:3000/api/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your@email.com",
    "password": "SecurePass123!"
  }'
```

**Password Requirements:**
- 8-32 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one symbol (!@#$%^&*, etc.)

### Sign In (Login)
Go to: http://localhost:3000/sign-in

Or use curl:
```bash
curl -X POST http://localhost:3000/api/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@email.com",
    "password": "SecurePass123!"
  }'
```

The response will include a JWT token and set an httpOnly cookie.

## Step 5: Verify Authentication

```bash
curl http://localhost:3000/api/user/me
```

This will show your current user info if you're logged in.

## Files Created/Modified

### New Files:
- `lib/db.ts` - Database connection (existing)
- `lib/database-schema.ts` - User table operations
- `lib/password.ts` - Password hashing
- `lib/jwt.ts` - JWT token handling
- `lib/auth-middleware.ts` - Authentication middleware
- `lib/use-auth.ts` - React hook for auth
- `app/api/init/route.ts` - Database initialization
- `app/api/sign-up/route.ts` - Registration endpoint
- `app/api/sign-in/route.ts` - Login endpoint
- `app/api/sign-out/route.ts` - Logout endpoint
- `app/api/user/me/route.ts` - Get current user

### Modified Files:
- `package.json` - Added bcryptjs and jsonwebtoken
- `app/sign-in/page.tsx` - Connected to login API
- `app/sign-up/page.tsx` - Connected to sign-up API

## What's Implemented

✅ **User Registration** - Sign up with email and password
✅ **User Login** - Sign in with email and password
✅ **Password Hashing** - Secure bcryptjs hashing
✅ **JWT Tokens** - Secure token-based authentication
✅ **httpOnly Cookies** - Tokens stored safely
✅ **Session Management** - 7-day session duration
✅ **Authentication Middleware** - Protect API routes
✅ **User Management** - Get current user info
✅ **Logout** - Clear session/token

## Example: Using useAuth Hook

```typescript
"use client";
import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => {
        logout();
        router.push("/sign-in");
      }}>
        Logout
      </button>
    </div>
  );
}
```

## Troubleshooting

### "Cannot find module 'bcryptjs'"
Run: `pnpm install`

### "DATABASE_URL is not set"
Make sure `.env.local` has DATABASE_URL

### "JWT_SECRET is not set"
Make sure `.env.local` has JWT_SECRET

### Database initialization fails
Check that DATABASE_URL is correct and you can connect to Neon

### Login returns "Invalid credentials"
- Verify the account was created successfully
- Check the email and password are correct
- Verify database connection is working

## Next Steps

1. Build a dashboard page using the `useAuth` hook
2. Add a profile page showing user information
3. Add change password functionality
4. Add password reset via email
5. Add email verification

## More Information

See `AUTHENTICATION.md` for complete API documentation and advanced usage.
