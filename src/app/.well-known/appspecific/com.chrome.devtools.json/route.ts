import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    "version": 1,
    "name": "financa-facil"
  });
}
