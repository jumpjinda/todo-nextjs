import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(body);
}
