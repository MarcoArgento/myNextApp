import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  debugger;
  try {
    //if(request.)
    const user = await sql`SELECT * FROM Users;`;
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
