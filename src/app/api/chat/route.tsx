import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ chatRoomList: [{ id: 1 }] });
}
