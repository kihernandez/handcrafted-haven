import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth-middleware";
import { hashPassword } from "@/lib/password";

export async function PUT(request: NextRequest) {
  const auth = getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, email, password } = body;

  // Validation
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!email?.trim() || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  let passwordHash = null;
  if (password) {
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }
    passwordHash = await hashPassword(password);
  }

  await sql`
    UPDATE users
    SET
      name = ${name},
      email = ${email},
      ${passwordHash ? sql`password_hash = ${passwordHash},` : sql``}
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${auth.userId}
  `;

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const auth = getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await sql`DELETE FROM users WHERE id = ${auth.userId}`;

  const response = NextResponse.json({ ok: true });
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}
