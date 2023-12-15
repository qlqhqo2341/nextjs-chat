import { ObjectId } from "mongodb";

export const CHAT_ROOM_COLLECTION = "chatRoom";
export interface ChatRoom {
  _id: ObjectId;
  name: string;
  admin: string;
  participants: string[] | null;
}
