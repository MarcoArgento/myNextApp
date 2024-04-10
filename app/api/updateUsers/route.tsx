import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  debugger;
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  try {
    await sql`UPDATE Users SET name = ${name} WHERE email = ${email} ;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
