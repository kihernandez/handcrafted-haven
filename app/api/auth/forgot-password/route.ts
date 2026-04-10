import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Generate a fake reset token (in real app this would be saved in DB with expiry)
    const resetToken = "reset_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    
    // Fake reset URL (this will work in development)
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

    console.log(`✅ Password reset requested for: ${email}`);
    console.log(`🔗 Reset Link: ${resetUrl}`);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    return NextResponse.json({
      message: "If an account with this email exists, you will receive a password reset link shortly.",
      resetUrl   // ← We return this so the frontend can show the link
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}