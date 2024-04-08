import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  debugger;
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  try {
    if (!name) throw new Error("User name required");
    await sql`INSERT INTO Users VALUES (${email}, ${name});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
