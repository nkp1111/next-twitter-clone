import User from '@/models/user';
import sendToken from "@/lib/sendToken";
import { NextResponse } from 'next/server';

export async function POST(request) {

  const { email, password } = await request.json();

  try {
    if (!email || !password) {
      console.log(email, password, "2")
      return NextResponse.json({ error: "Email and password are required" },
        { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User not found" },
        { status: 400 });
    }

    const passwordMatched = await user.comparePassword(password)
    if (!passwordMatched) {
      return NextResponse.json({ error: "Please check your password" },
        { status: 400 });
    }

    return sendToken(user, NextResponse, "Successfully logged In")

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message, stack: error.stack },
      { status: 500 });
  }
}
