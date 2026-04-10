
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Check if JWT_SECRET is properly loaded
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing in environment variables");
      return NextResponse.json(
        { message: "Server configuration error. Please contact admin." },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: "user_" + Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
    };

    console.log("✅ New user registered:", user.email);

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        message: "Account created and logged in successfully!",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 }
    );

    // Set auth cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong during registration" },
      { status: 500 }
    );
  }
}