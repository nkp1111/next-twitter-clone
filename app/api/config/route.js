import { NextResponse } from 'next/server'
import { configMongoose } from "@/lib"

export async function GET() {
  try {
    await configMongoose();
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error occur during config" }, { status: 400 })
  }
}
