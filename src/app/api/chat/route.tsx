import { getMongoDB, getMongoCollection } from "@/service/mongo";
import { CHAT_ROOM_COLLECTION, ChatRoom } from "@/type/mongo";
import { NextRequest, NextResponse } from "next/server";

const getChatRoomCollection = () =>
  getMongoCollection<ChatRoom>(CHAT_ROOM_COLLECTION);
export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ chatRoomList: [{ id: 1 }] });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const chatRoomCollection = getChatRoomCollection();

  const { name, admin }: { name: string | null; admin: string | null } =
    await request.json();

  if (name && admin) {
    const result = await chatRoomCollection.updateOne(
      { name, admin },
      { $set: { name: name, admin } },
      { upsert: true },
    );
    return NextResponse.json({ roomId: result.upsertedId });
  } else {
    return NextResponse.json({ error: "needs name, admin" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const chatRoomCollection = getChatRoomCollection();

  const { name, admin }: { name: string | null; admin: string | null } =
    await request.json();

  if (name && admin) {
    await chatRoomCollection.deleteOne({
      name,
      admin,
    });
    return NextResponse.json({ status: true });
  } else {
    return NextResponse.json({ error: "needs name, admin" }, { status: 400 });
  }
}
