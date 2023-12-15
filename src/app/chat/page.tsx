import { getMongoCollection } from "@/service/mongo";
import { CHAT_ROOM_COLLECTION, ChatRoom } from "@/type/mongo";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";

export default async function ChatListPage() {
  const chatRoomCollection = getMongoCollection<ChatRoom>(CHAT_ROOM_COLLECTION);
  const queriedChatRoom = await chatRoomCollection.find({}).toArray();

  return (
    <Flex flexDirection={"column"}>
      <ul>
        {queriedChatRoom?.map?.((room) => (
          <li key={String(room._id)}>
            <Link href={`/chat/${room._id}`}>{room.name}</Link>
          </li>
        ))}
      </ul>
    </Flex>
  );
}
